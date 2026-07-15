import { useState } from 'react'
import { formatWon } from '../../utils/format'

const QUESTIONS = [
  {
    id: 1,
    text: '연봉 제안을 받았을 때 첫 반응은?',
    options: [
      { label: '일단 숫자부터 검증한다', scores: { data: 2 } },
      { label: '감사 인사 후 여유를 두고 답한다', scores: { relation: 2 } },
      { label: '바로 카운터 오퍼를 준비한다', scores: { bold: 2 } },
      { label: '조건 전체를 꼼꼼히 읽는다', scores: { careful: 2 } },
    ],
  },
  {
    id: 2,
    text: '협상에서 가장 중요하게 보는 것은?',
    options: [
      { label: '시장 평균 대비 공정성', scores: { data: 2 } },
      { label: '팀·상사와의 관계', scores: { relation: 2 } },
      { label: '내 가치에 맞는 대우', scores: { bold: 2 } },
      { label: '장기 안정성과 리스크', scores: { careful: 2 } },
    ],
  },
  {
    id: 3,
    text: '카운터 오퍼를 할 때 선호하는 방식은?',
    options: [
      { label: '근거 자료와 함께 제시', scores: { data: 2 } },
      { label: '상대 입장을 먼저 듣고 조율', scores: { relation: 2 } },
      { label: '원하는 숫자를 분명히 말한다', scores: { bold: 2 } },
      { label: '여러 시나리오를 준비한다', scores: { careful: 2 } },
    ],
  },
  {
    id: 4,
    text: '협상이 막혔을 때 나는?',
    options: [
      { label: '데이터로 다시 설득한다', scores: { data: 2 } },
      { label: '관계를 해치지 않게 조율한다', scores: { relation: 2 } },
      { label: '다른 회사 옵션을 언급한다', scores: { bold: 2 } },
      { label: '시간을 두고 재검토한다', scores: { careful: 2 } },
    ],
  },
  {
    id: 5,
    text: '연봉 외에 협상할 항목은?',
    options: [
      { label: '성과급·스톡옵션 구조', scores: { data: 2 } },
      { label: '근무 형태·팀 배치', scores: { relation: 2 } },
      { label: '직급·타이틀', scores: { bold: 2 } },
      { label: '복지·휴가·교육비', scores: { careful: 2 } },
    ],
  },
]

const RESULTS = {
  data: {
    title: '데이터형 협상가',
    desc: '시장 데이터와 근거로 설득하는 타입. 연봉표·실수령 계산기로 숫자를 준비하면 강해집니다.',
  },
  relation: {
    title: '관계형 협상가',
    desc: '상대와의 신뢰를 중시하는 타입. 조건을 명확히 정리해 두면 관계를 해치지 않고 협상할 수 있어요.',
  },
  bold: {
    title: '주도형 협상가',
    desc: '원하는 조건을 분명히 말하는 타입. 실수령액 하한선을 미리 정해 두면 협상이 수월합니다.',
  },
  careful: {
    title: '신중형 협상가',
    desc: '리스크를 꼼꼼히 보는 타입. 퇴직금·실업급여까지 시뮬레이션하면 안정적으로 결정할 수 있어요.',
  },
}

/**
 * 연봉 협상 유형 5문항 미니 테스트
 * @param {{ netPay?: number }} props
 */
export default function NegotiationQuiz({ netPay = 0 }) {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({ data: 0, relation: 0, bold: 0, careful: 0 })
  const [finished, setFinished] = useState(false)

  const current = QUESTIONS[step]
  const isLast = step === QUESTIONS.length - 1

  const handleAnswer = (option) => {
    const nextScores = { ...scores }
    Object.entries(option.scores).forEach(([key, val]) => {
      nextScores[key] = (nextScores[key] || 0) + val
    })
    setScores(nextScores)

    if (isLast) {
      setFinished(true)
    } else {
      setStep((s) => s + 1)
    }
  }

  const handleReset = () => {
    setStep(0)
    setScores({ data: 0, relation: 0, bold: 0, careful: 0 })
    setFinished(false)
  }

  const topType = finished
    ? Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
    : null
  const result = topType ? RESULTS[topType] : null

  return (
    <section className="section-open section-rule pt-8 sm:pt-10">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-ink sm:text-xl">나의 연봉 협상 유형</h2>
        <p className="mt-1.5 text-sm text-ink-soft">재미로 보는 5문항 미니 테스트</p>
      </div>

      {!finished ? (
        <>
          <p className="mb-1 text-xs font-medium text-ink-faint">
            {step + 1} / {QUESTIONS.length}
          </p>
          <p className="mb-4 text-sm font-semibold break-keep text-ink sm:text-base">
            {current.text}
          </p>
          <div className="space-y-2">
            {current.options.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleAnswer(opt)}
                className="w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-left text-sm text-ink transition-colors hover:border-navy hover:bg-navy-soft"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl bg-navy-soft px-5 py-8 text-center sm:px-8">
          <p className="text-xs font-semibold tracking-wide text-navy">당신의 유형</p>
          <p className="mt-2 text-xl font-bold text-ink sm:text-2xl">{result?.title}</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed break-keep text-ink-soft">
            {result?.desc}
          </p>
          {netPay > 0 && (
            <p className="mt-3 text-sm text-ink-faint">
              현재 월 실수령 {formatWon(netPay)}원 기준으로 협상 하한선을 정해 보세요.
            </p>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="mt-5 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            다시 하기
          </button>
        </div>
      )}
    </section>
  )
}
