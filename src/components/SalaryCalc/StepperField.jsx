/**
 * −/+ 스텝per + 프리셋 칩
 */
export default function StepperField({
  id,
  label,
  hint,
  value,
  min,
  max,
  presets = [1, 2, 3, 4, 5],
  onChange,
}) {
  const clamp = (n) => Math.min(max, Math.max(min, n))

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2.5 block text-sm font-semibold break-keep text-ink">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`${label} 감소`}
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-canvas text-lg font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40 hover:border-navy hover:bg-navy-soft hover:text-navy"
        >
          −
        </button>
        <span
          id={id}
          className="font-mono flex h-10 min-w-[3.5rem] flex-1 items-center justify-center rounded-xl border border-line bg-canvas text-base font-semibold tabular-nums text-ink"
        >
          {value}
        </span>
        <button
          type="button"
          aria-label={`${label} 증가`}
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-canvas text-lg font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40 hover:border-navy hover:bg-navy-soft hover:text-navy"
        >
          +
        </button>
        <span className="shrink-0 text-sm text-ink-faint">명</span>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {presets
          .filter((p) => p >= min && p <= max)
          .map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={`rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${
                value === preset
                  ? 'bg-navy text-white'
                  : 'border border-line bg-canvas text-ink-soft hover:border-navy hover:text-navy'
              }`}
            >
              {preset}명
            </button>
          ))}
      </div>
      {hint && <p className="mt-2 text-xs text-ink-faint">{hint}</p>}
    </div>
  )
}
