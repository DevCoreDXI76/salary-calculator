# Google AdSense 승인 체크리스트

배포 URL이 공개된 뒤, AdSense 콘솔에서 사이트를 추가하기 전에 확인하세요.

## 사이트 준비

- [ ] HTTPS로 정상 접속 (`https://<project>.vercel.app`)
- [ ] 연봉·퇴직금·실업급여·연차 계산기 동작
- [ ] 하단 FAQ, 개인정보 처리방침(`#privacy`), 이용약관(`#terms`), 면책(`#disclaimer`) 링크 동작
- [ ] 푸터·정책에 문의 이메일(`VITE_CONTACT_EMAIL`) 표시
- [ ] `/robots.txt`, `/sitemap.xml` 접근 가능
- [ ] `/ads.txt` — 승인 후 Publisher ID로 교체

## ads.txt 교체

1. AdSense에서 Publisher ID 확인 (`pub-XXXXXXXXXXXXXXXX`)
2. [`public/ads.txt`](../public/ads.txt) 주석 해제 후 ID 입력:

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

3. 재배포 후 `https://<도메인>/ads.txt`에서 내용 확인

## 환경 변수 (Vercel Production)

| 변수 | 설명 |
|------|------|
| `VITE_SITE_URL` | 배포 URL (끝 `/` 없음) |
| `VITE_CONTACT_EMAIL` | 실제 문의 이메일 |
| `VITE_GA_MEASUREMENT_ID` | GA4 (선택) |
| `VITE_ADSENSE_CLIENT` | `ca-pub-XXXXXXXX` (승인 후) |
| `VITE_ADSENSE_SLOT_*` | 유닛별 slot ID (선택, 승인 후) |

## 승인 후 광고 활성화

1. `VITE_ADSENSE_CLIENT` 설정
2. (선택) `VITE_ADSENSE_SLOT_TOP` 등 유닛 ID 설정 — 없으면 플레이스홀더 유지
3. [`index.html`](../index.html)에 AdSense 스크립트 추가 (필요 시):

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossorigin="anonymous"></script>
```

4. 재배포 후 광고 노출·정책 위반 여부 확인

## 심사 시 주의

- 클릭 유도 문구·가짜 버튼으로 광고 영역과 혼동 금지
- 계산 결과는 참고용임을 면책에 명시 (이미 포함)
- 저작권 없는 오리지널 콘텐츠 위주 (금융 팁·뉴스는 정적 요약)

## AdSense 신청 (사용자 직접)

1. [Google AdSense](https://www.google.com/adsense/) 로그인
2. **사이트** → URL 추가
3. ads.txt 검증 대기
4. 심사 통과 후 환경 변수·광고 코드 반영
