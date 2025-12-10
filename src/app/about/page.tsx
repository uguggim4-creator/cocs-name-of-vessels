import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-serif mb-8">About Us</h1>
      
      <div className="mb-12">
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          '기물의 이름'은 일상 속에서 마주하는 아름다운 사물들의 가치를 재조명합니다.
          <br />
          우리는 단순히 물건을 파는 것이 아니라, 물건에 담긴 이야기와 정성을 전달하고자 합니다.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          장인의 손길이 닿은 도자기부터, 현대적인 감각의 유리 공예품까지.
          <br />
          당신의 공간을 채울 특별한 기물들을 만나보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg">
          <span className="text-gray-400">Brand Image 1</span>
        </div>
        <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg">
          <span className="text-gray-400">Brand Image 2</span>
        </div>
      </div>

      <div className="text-left bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-serif mb-4">Our Philosophy</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>시간이 흘러도 변치 않는 가치를 지향합니다.</li>
          <li>자연 친화적인 소재와 공정을 중요하게 생각합니다.</li>
          <li>사용자의 삶에 스며드는 편안함을 추구합니다.</li>
        </ul>
      </div>
    </div>
  );
}