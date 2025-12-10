'use client';

import { useState, useEffect } from 'react';
import { products as initialProducts, Product } from '@/lib/products';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    enName: '',
    price: 0,
    category: 'Cup',
    image: '/images/placeholder.jpg', // Default or need upload
    description: ''
  });
  const router = useRouter();

  useEffect(() => {
    // Load local products
    const localProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    setProducts([...initialProducts, ...localProducts]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseInt(value) : value
    }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now(); // Simple ID generation
    const productToAdd = { ...newProduct, id } as Product;
    
    const localProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    const updatedLocalProducts = [...localProducts, productToAdd];
    localStorage.setItem('adminProducts', JSON.stringify(updatedLocalProducts));
    
    setProducts([...initialProducts, ...updatedLocalProducts]);
    setNewProduct({
      name: '',
      enName: '',
      price: 0,
      category: 'Cup',
      image: '/images/placeholder.jpg',
      description: ''
    });
    alert('상품이 추가되었습니다.');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">관리자 페이지</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">상품 추가</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block mb-1">상품명 (한글)</label>
              <input 
                type="text" 
                name="name" 
                value={newProduct.name} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block mb-1">상품명 (영문)</label>
              <input 
                type="text" 
                name="enName" 
                value={newProduct.enName} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block mb-1">가격</label>
              <input 
                type="number" 
                name="price" 
                value={newProduct.price} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block mb-1">카테고리</label>
              <select 
                name="category" 
                value={newProduct.category} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded"
              >
                <option value="Cup">Cup</option>
                <option value="Vase">Vase</option>
                <option value="Plate">Plate</option>
                <option value="Bowl">Bowl</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">이미지 URL</label>
              <input 
                type="text" 
                name="image" 
                value={newProduct.image} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded" 
                placeholder="/images/..."
              />
            </div>
            <div>
              <label className="block mb-1">설명</label>
              <textarea 
                name="description" 
                value={newProduct.description} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded h-24" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              상품 등록
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">상품 목록 ({products.length})</h2>
          <div className="overflow-y-auto max-h-[600px]">
            <table className="w-full text-left">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">이름</th>
                  <th className="p-2">가격</th>
                  <th className="p-2">카테고리</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-2 text-sm text-gray-500">{product.id}</td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.price.toLocaleString()}</td>
                    <td className="p-2">{product.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}