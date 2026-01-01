'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

interface Address {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  postal_code: string;
  address: string;
  detail_address: string;
  is_default: boolean;
}

export default function AddressPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    recipient: '',
    phone: '',
    postal_code: '',
    address: '',
    detail_address: '',
    is_default: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchAddresses();
    }
  }, [user, authLoading, router]);

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user!.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching addresses:', error);
      } else {
        setAddresses(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      label: '',
      recipient: '',
      phone: '',
      postal_code: '',
      address: '',
      detail_address: '',
      is_default: false,
    });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleEdit = (addr: Address) => {
    setFormData({
      label: addr.label,
      recipient: addr.recipient,
      phone: addr.phone,
      postal_code: addr.postal_code,
      address: addr.address,
      detail_address: addr.detail_address || '',
      is_default: addr.is_default,
    });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 배송지를 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);

      if (error) {
        setError('삭제에 실패했습니다.');
      } else {
        fetchAddresses();
      }
    } catch (err) {
      setError('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      // 기본 배송지로 설정하는 경우, 기존 기본 배송지 해제
      if (formData.is_default) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user!.id);
      }

      if (editingId) {
        // 수정
        const { error } = await supabase
          .from('addresses')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        // 추가
        const { error } = await supabase
          .from('addresses')
          .insert({
            user_id: user!.id,
            ...formData,
          });

        if (error) throw error;
      }

      resetForm();
      fetchAddresses();
    } catch (err) {
      setError('저장에 실패했습니다.');
    }

    setIsSaving(false);
  };

  if (authLoading || isLoading) {
    return (
      <div className="page-content">
        <section className="section">
          <div className="container">
            <p className="loading-text">로딩 중...</p>
          </div>
        </section>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="page-content">
      <section className="page-hero">
        <h1 className="page-title">배송지 관리</h1>
      </section>

      <section className="section">
        <div className="container">
          <div className="address-container">
            <Link href="/mypage" className="back-link">← 마이페이지로 돌아가기</Link>

            {!showForm && (
              <button 
                className="btn btn-primary add-btn"
                onClick={() => setShowForm(true)}
              >
                새 배송지 추가
              </button>
            )}

            {showForm && (
              <form onSubmit={handleSubmit} className="address-form">
                <h3 className="form-title">
                  {editingId ? '배송지 수정' : '새 배송지 추가'}
                </h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="label">배송지명</label>
                    <input
                      type="text"
                      id="label"
                      value={formData.label}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      required
                      placeholder="예: 집, 회사"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient">수령인</label>
                    <input
                      type="text"
                      id="recipient"
                      value={formData.recipient}
                      onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                      required
                      placeholder="수령인 이름"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">연락처</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="010-0000-0000"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postal_code">우편번호</label>
                    <input
                      type="text"
                      id="postal_code"
                      value={formData.postal_code}
                      onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                      required
                      placeholder="우편번호"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">주소</label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    placeholder="기본 주소"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="detail_address">상세 주소</label>
                  <input
                    type="text"
                    id="detail_address"
                    value={formData.detail_address}
                    onChange={(e) => setFormData({ ...formData, detail_address: e.target.value })}
                    placeholder="상세 주소 (선택)"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.is_default}
                      onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                    />
                    <span>기본 배송지로 설정</span>
                  </label>
                </div>

                {error && <p className="form-error">{error}</p>}

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    취소
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    {isSaving ? '저장 중...' : '저장'}
                  </button>
                </div>
              </form>
            )}

            {!showForm && (
              <div className="address-list">
                {addresses.length === 0 ? (
                  <p className="empty-message">등록된 배송지가 없습니다.</p>
                ) : (
                  addresses.map((addr) => (
                    <div key={addr.id} className="address-item">
                      <div className="address-header">
                        <span className="address-label">
                          {addr.label}
                          {addr.is_default && <span className="default-badge">기본</span>}
                        </span>
                        <div className="address-actions">
                          <button onClick={() => handleEdit(addr)}>수정</button>
                          <button onClick={() => handleDelete(addr.id)}>삭제</button>
                        </div>
                      </div>
                      <p className="address-recipient">{addr.recipient} / {addr.phone}</p>
                      <p className="address-detail">
                        [{addr.postal_code}] {addr.address}
                        {addr.detail_address && `, ${addr.detail_address}`}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .loading-text {
          text-align: center;
          color: var(--color-muted);
          padding: 60px 0;
        }
        .address-container {
          max-width: 600px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 30px;
          color: var(--color-muted);
          font-size: 0.875rem;
        }
        .back-link:hover {
          color: var(--color-text);
        }
        .add-btn {
          width: 100%;
          margin-bottom: 20px;
        }
        .address-form {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          padding: 30px;
          margin-bottom: 20px;
        }
        .form-title {
          font-size: 1.125rem;
          margin-bottom: 24px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .form-group input[type="text"],
        .form-group input[type="tel"] {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--color-border);
          font-size: 0.9375rem;
        }
        .checkbox-group {
          margin-top: 8px;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .checkbox-label input {
          width: 18px;
          height: 18px;
        }
        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .form-actions .btn {
          flex: 1;
        }
        .address-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .empty-message {
          text-align: center;
          color: var(--color-muted);
          padding: 40px 0;
        }
        .address-item {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          padding: 20px;
        }
        .address-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .address-label {
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .default-badge {
          font-size: 0.75rem;
          padding: 2px 8px;
          background: var(--color-primary);
          color: var(--color-white);
        }
        .address-actions {
          display: flex;
          gap: 12px;
        }
        .address-actions button {
          font-size: 0.875rem;
          color: var(--color-muted);
          background: none;
          border: none;
          cursor: pointer;
        }
        .address-actions button:hover {
          color: var(--color-text);
        }
        .address-recipient {
          font-size: 0.9375rem;
          margin-bottom: 4px;
        }
        .address-detail {
          font-size: 0.875rem;
          color: var(--color-muted);
        }
        @media (max-width: 480px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
