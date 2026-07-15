# 배포 후 수동 설정 가이드

코드 배포(Vercel)가 끝난 뒤 **사용자가 직접** 진행할 단계입니다.

## 1. Vercel 배포

### GitHub 연동 (권장)

```bash
git init
git add .
git commit -m "chore: Phase 5 deploy SEO AdSense prep"
# GitHub에 salary_calculator 저장소 생성 후
git remote add origin https://github.com/<user>/salary_calculator.git
git push -u origin main
```

1. [vercel.com](https://vercel.com) → **Add New Project** → GitHub 저장소 선택
2. Framework: **Vite**, Build: `pnpm run build`, Output: `dist`
3. Install Command: `pnpm install`
4. **Deploy**

### CLI 배포

```bash
pnpm add -g vercel
vercel login
vercel --prod
```

### Production 환경 변수

Vercel → Project → Settings → Environment Variables:

| Name | Example |
|------|---------|
| `VITE_SITE_URL` | `https://your-project.vercel.app` |
| `VITE_CONTACT_EMAIL` | `you@example.com` |
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` |

변경 후 **Redeploy** (canonical·sitemap·OG URL 반영).

---

## 2. 배포 직후 스모크 테스트

- [ ] 홈에서 연봉 입력 → 실수령·보험/세금 % 표시
- [ ] 퇴직금 / 실업급여 / 연차 탭 전환
- [ ] `#privacy`, `#faq`, `#deduction-brackets` 앵커 스크롤
- [ ] `https://<URL>/robots.txt`
- [ ] `https://<URL>/sitemap.xml` (Production URL 포함)
- [ ] `https://<URL>/ads.txt`
- [ ] 모바일 320px 레이아웃

---

## 3. Google Search Console

1. [Search Console](https://search.google.com/search-console)
2. **속성 추가** → URL 접두어: `https://<배포-URL>/`
3. 소유권 확인 (HTML 태그 또는 DNS — Vercel DNS 사용 시)
4. **Sitemap 제출**: `https://<배포-URL>/sitemap.xml`
5. 며칠 후 색인·검색 노출 확인

---

## 4. Google Analytics 4

1. [Analytics](https://analytics.google.com/) → 속성 생성
2. 데이터 스트림 → **웹** → 사이트 URL 입력
3. **측정 ID** (`G-XXXXXXXX`) 복사
4. Vercel에 `VITE_GA_MEASUREMENT_ID` 추가 → Redeploy
5. Realtime에서 본인 방문 확인

로컬/프리뷰에서는 ID가 없으면 Analytics 스크립트가 로드되지 않습니다.

---

## 5. Google AdSense

상세 체크리스트: [adsense-checklist.md](./adsense-checklist.md)

1. 사이트 공개·정책 페이지·문의 이메일 확인
2. AdSense → 사이트 추가
3. `public/ads.txt` Publisher ID 반영 후 재배포
4. **승인 전**에는 광고 플레이스홀더 유지
5. 승인 후 `VITE_ADSENSE_CLIENT`·(선택) slot ID·스크립트 추가 → Redeploy

---

## 6. 배포 URL 확정 후 할 일

실제 Vercel URL이 `https://salaryfit.vercel.app`과 다르면:

1. Vercel `VITE_SITE_URL` 업데이트
2. Redeploy
3. Search Console sitemap URL 재제출

---

## 문제 해결

| 증상 | 확인 |
|------|------|
| 새로고침 404 | `vercel.json` rewrites 존재 여부 |
| canonical이 `%VITE_SITE_URL%` 그대로 | Production env + rebuild |
| sitemap URL 오류 | `VITE_SITE_URL` + `pnpm run build` 후 `dist/sitemap.xml` 확인 |
| GA 미집계 | Ad blocker off, Measurement ID·Redeploy |
