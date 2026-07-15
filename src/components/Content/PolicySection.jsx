/**
 * 개인정보·이용약관·소개 — 오픈 문서 톤
 */
import { CONTACT_EMAIL } from '../../lib/site'

export default function PolicySection() {
  return (
    <section className="space-y-0">
      <article id="privacy" className="section-open section-rule scroll-mt-20 pt-10 sm:pt-12">
        <h2 className="text-xl font-bold text-ink">개인정보 처리방침</h2>
        <p className="mt-1.5 text-xs text-ink-faint">최종 업데이트: 2026년 7월 15일</p>
        <div className="mt-5 max-w-3xl space-y-3 text-sm leading-relaxed break-keep text-ink-soft">
          <p>
            샐러리핏(SalaryFit, 이하 ‘서비스’)은 연봉 실수령액 계산을 제공하는 웹
            도구입니다. 서비스는 이용자가 입력한 연봉·부양가족 등 정보를 서버에
            저장하지 않으며, 계산은 이용자 브라우저에서만 수행됩니다.
          </p>
          <p>
            <strong className="text-ink">수집 항목:</strong> 원칙적으로 회원가입·이름·연락처
            등 개인 식별 정보를 수집하지 않습니다. 계산을 위해 화면에 입력된 금액·옵션은
            해당 세션의 기기 메모리에서만 처리됩니다.
          </p>
          <p>
            <strong className="text-ink">자동 수집:</strong> 안정적인 서비스 제공과 트래픽
            파악을 위해 접속 일시, 브라우저 종류, 대략적 지역(IP 기반) 등 로그가
            호스팅·분석 도구를 통해 수집될 수 있습니다. Google AdSense 등 광고 파트너가
            쿠키를 사용할 수 있으며, 이용자는 브라우저 설정으로 쿠키를 거부할 수
            있습니다.
          </p>
          <p>
            <strong className="text-ink">제3자 제공:</strong> 법령에 따른 요청이 없는 한
            이용자 입력값을 제3자에게 판매·제공하지 않습니다. 광고·통계 도구는 각
            사업자의 정책을 따릅니다.
          </p>
          <p>
            문의:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-navy hover:underline">
              {CONTACT_EMAIL}
            </a>
            로 개인정보 관련 요청을 접수합니다.
          </p>
        </div>
      </article>

      <article id="terms" className="section-open section-rule scroll-mt-20 pt-10 sm:pt-12">
        <h2 className="text-xl font-bold text-ink">이용약관</h2>
        <p className="mt-1.5 text-xs text-ink-faint">최종 업데이트: 2026년 7월 15일</p>
        <div className="mt-5 max-w-3xl space-y-3 text-sm leading-relaxed break-keep text-ink-soft">
          <p>
            본 약관은 샐러리핏 웹사이트 이용에 적용됩니다. 서비스를 이용하면 본 약관에
            동의한 것으로 봅니다.
          </p>
          <p>
            <strong className="text-ink">서비스 성격:</strong> 제공되는 세금·보험료·실수령
            계산 및 연봉 참고표·가이드는 일반적인 정보 제공 목적이며, 세무·법률·취업
            자문이 아닙니다. 중요한 계약·신고 전에는 전문가 또는 관할 기관 자료를
            확인하세요.
          </p>
          <p>
            <strong className="text-ink">지적재산:</strong> 사이트 문구, 레이아웃, 계산
            결과 화면 구성 등은 서비스에 귀속됩니다. 무단 대량 복제·재배포를 금지합니다.
          </p>
          <p>
            <strong className="text-ink">책임 제한:</strong> 계산 오차, 광고 내용, 외부
            링크, 통신 장애로 인한 손해에 대해 법령이 허용하는 범위에서 책임을 제한합니다.
          </p>
          <p>약관은 필요 시 개정될 수 있으며, 변경 시 본 페이지에 게시합니다.</p>
        </div>
      </article>

      <article id="about" className="section-open section-rule scroll-mt-20 pt-10 sm:pt-12 pb-4">
        <h2 className="text-xl font-bold text-ink">서비스 소개</h2>
        <div className="mt-5 max-w-3xl space-y-3 text-sm leading-relaxed break-keep text-ink-soft">
          <p>
            샐러리핏은 신입·경력 구직자와 이직 준비 직장인이 계약 연봉을 입력해 월
            실수령액과 공제 내역을 빠르게 가늠할 수 있도록 만든 연봉 계산기입니다.
          </p>
          <p>
            샐러리핏은 연봉·퇴직금·실업급여·연차 계산기와 소비 환산, 연봉 협상 유형
            테스트를 한곳에서 제공하는 급여·취업 유틸리티입니다.
          </p>
        </div>
      </article>
    </section>
  )
}
