const VIEW_META = {
  salary: {
    title: '연봉 실수령액 계산기',
    description:
      '계약 연봉을 입력하면 월 실수령액과 세금·4대보험 공제 내역이 자동으로 계산됩니다.',
  },
  severance: {
    title: '퇴직금 계산기',
    description: '입사일·퇴사일과 평균임금으로 예상 퇴직금을 계산합니다.',
  },
  unemployment: {
    title: '실업급여 계산기',
    description: '고용보험 가입기간·연령·임금으로 예상 실업급여를 참고합니다.',
  },
  leave: {
    title: '연차 계산기',
    description: '입사일 기준 발생·사용·잔여 연차 일수를 계산합니다.',
  },
}

export default function ToolPageHeader({ activeView }) {
  const meta = VIEW_META[activeView] ?? VIEW_META.salary

  return (
    <header className="mb-8 min-w-0 scroll-mt-20 sm:mb-10">
      <p className="mb-2 text-sm font-semibold text-navy">SalaryFit</p>
      <h1 className="text-2xl font-bold tracking-tight break-keep text-ink sm:text-3xl md:text-[2rem] md:leading-tight">
        {meta.title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed break-keep text-ink-soft sm:text-base">
        {meta.description}
      </p>
    </header>
  )
}
