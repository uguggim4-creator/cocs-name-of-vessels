# Name of Vessels - 쇼핑몰 웹사이트

브랜드 'Name of Vessels'의 공식 쇼핑몰 웹사이트입니다.

## 프로젝트 구조

```
cocs-name-of-vessels/
├── index.html          # 메인 페이지
├── shop.html           # 쇼핑 페이지
├── about.html          # 소개 페이지
├── styles/
│   └── main.css        # 메인 스타일시트
├── scripts/
│   └── main.js         # JavaScript 기능
├── images/
│   └── README.txt      # 이미지 플레이스홀더
└── README.md           # 프로젝트 문서
```

## 디자인 컨셉

- **컬러**: 흑백 기반 미니멀 디자인
- **브랜드**: Name of Vessels
- **스타일**: 깔끔하고 모던한 e-커머스 레이아웃

## 주요 페이지

1. **index.html** - 메인 페이지
   - 히어로 섹션
   - Featured 상품 그리드
   - About 프리뷰 섹션

2. **shop.html** - 쇼핑 페이지
   - 카테고리 필터
   - 상품 그리드 (8개 상품)
   - 페이지네이션

3. **about.html** - 브랜드 소개
   - 브랜드 스토리
   - 철학 및 가치
   - 장인정신

## 기능

- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 모바일 햄버거 메뉴
- 상품 호버 효과
- 카테고리 필터링
- 스무스 스크롤
- 장바구니 카운터

## 사용 방법

1. `index.html` 파일을 브라우저에서 열기
2. 또는 로컬 서버 실행:
   ```
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   ```
3. 브라우저에서 `http://localhost:8000` 접속

## 이미지 추가하기

`images/` 폴더에 다음 이미지들을 추가하세요:
- `placeholder-1.jpg` ~ `placeholder-4.jpg` - 상품 이미지
- `about-1.jpg`, `about-2.jpg` - About 페이지 이미지

## 향후 개발 계획

- [ ] 상품 상세 페이지
- [ ] 장바구니 페이지
- [ ] 로그인/회원가입 페이지
- [ ] 검색 기능
- [ ] 결제 시스템
- [ ] 관리자 페이지

## 기술 스택

- HTML5
- CSS3 (Pure CSS, No frameworks)
- Vanilla JavaScript
- 반응형 Grid Layout

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이선스

© 2025 Name of Vessels. All rights reserved.
