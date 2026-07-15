# 샐러리핏 (SalaryFit)

연봉 실수령액·4대보험·세금 계산기와 퇴직금·실업급여·연차 유틸리티.

## 로컬 개발

```bash
pnpm install
pnpm run dev
```

## 빌드

```bash
pnpm run build
pnpm run preview
```

환경 변수는 [`.env.example`](.env.example) 참고. Production 기본 URL은 [`.env.production`](.env.production)에 있습니다.

## 배포 (Vercel)

- Build: `pnpm run build`
- Output: `dist`
- SPA rewrite: [`vercel.json`](vercel.json)

배포 후: [docs/post-deploy-guide.md](docs/post-deploy-guide.md)  
AdSense: [docs/adsense-checklist.md](docs/adsense-checklist.md)

### ads.txt

AdSense 승인 후 [`public/ads.txt`](public/ads.txt)의 `pub-XXXXXXXX`를 실제 Publisher ID로 교체하고 재배포하세요.

## 스택

React 19 · Vite · Tailwind CSS 4 · Lucide React
