# SalaryFit 운영·갱신 체크리스트

연 1~2회, 또는 세법·요율 변경 공지 시 점검합니다. 배포 후 수동 설정은 [post-deploy-guide.md](./post-deploy-guide.md)를 참고하세요.

## 매년 1~3월 (요율·세법 갱신)

- [ ] `src/utils/taxCalculator.js` — 국민연금·건강보험·장기요양·고용보험 요율 및 `PENSION_LIMITS` 상·하한
- [ ] `src/data/deductionBrackets.js` (또는 간이세액 관련 데이터) — 연도·구간 반영
- [ ] `PolicySection.jsx` 면책·기준 연도 문구 (예: 「2026년 기준」)
- [ ] `src/data/financialNews.js` — 항목 날짜·요약·`sourceUrl` 유효성
- [ ] `src/data/financialTips.js` — 날짜·본문 최신성
- [ ] `pnpm test` 실행 후 골든 케이스 수치 조정 여부 확인
- [ ] 변경 시 Vercel Production 재배포 → Search Console sitemap 재제출

## 분기별 (10분)

- [ ] Google Search Console — 색인·크롤링 오류, 핵심 URL(`/`, `/severance` 등) 상태
- [ ] GA4 — 트래픽 이상치, 주요 페이지 조회
- [ ] AdSense — 정책 알림, 수익·노출(승인 후)

## 월간 (선택, 10분)

| 항목 | 확인 |
|------|------|
| Vercel 배포 | 최근 빌드 성공, env `VITE_SITE_URL` 일치 |
| `robots.txt` / `sitemap.xml` | Production URL·경로 수 |
| `ads.txt` | Publisher ID `pub-8125995278513075` |
| 문의 메일 | `VITE_CONTACT_EMAIL` 수신 가능 |

## 코드 변경 시 스모크

- [ ] `/`, `/severance`, `/unemployment`, `/leave` 탭·URL 동기화
- [ ] `/tips/:slug` 팁 페이지·목록 링크
- [ ] `#privacy`, `#faq` 앵커
- [ ] 모바일 320px 레이아웃
- [ ] 사이드바 광고 슬롯 1개(연봉·기타 탭 각 1)

## 외부(이 레포 밖)

- [ ] `coredxi.com/ads.txt` — AdSense 도메인 단위와 동일 Publisher 라인 여부 (`core-dxi-web` 등)

## 참고 링크

- Production: https://salaryfit.coredxi.com
- Sitemap: https://salaryfit.coredxi.com/sitemap.xml
- AdSense 체크리스트: [adsense-checklist.md](./adsense-checklist.md)
