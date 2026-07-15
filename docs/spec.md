# Technical Specification (SPEC)

## 1. 기술 스택 (Tech Stack)
- **Framework:** React 19 (Vite 기반 빌드)
- **Styling:** Tailwind CSS (정적 클래스 기반의 빠른 스타일링)
- **Icons:** Lucide React (가볍고 현대적인 오픈소스 아이콘 팩)
- **Charts:** Recharts (React에 최적화된 반응형 SVG 차트 라이브러리)
- **Deployment:** Vercel (무료, 깃허브 연동 자동 배포)

## 2. 프로젝트 폴더 구조 (Folder Structure)
```text
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx         # 상단 네비게이션 및 로고
│   │   ├── Footer.jsx         # 푸터 (이용약관 및 면책조항)
│   │   └── AdSlot.jsx         # 광고 레이아웃 플레이스홀더
│   ├── SalaryCalc/
│   │   ├── InputSection.jsx   # 급여 조건 입력 폼
│   │   ├── ResultSection.jsx  # 실수령액 및 세금 내역 출력
│   │   └── TaxChart.jsx       # Recharts를 활용한 세금 비율 차트
│   ├── SeveranceCalc/
│   │   └── SeveranceCalc.jsx  # 퇴직금 계산 탭 컴포넌트
│   └── FunContent/
│       └── Consumption.jsx    # "이 돈으로 뭐 살까?" 재미 컴포넌트
├── utils/
│   └── taxCalculator.js       # 2026년 요율 반영 세금 연산 유틸 함수
├── App.jsx                    # 글로벌 탭 상태 및 메인 구조 관리
└── main.jsx