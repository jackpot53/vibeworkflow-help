const FALLBACK_RATE = 1380

async function getUsdToKrw(): Promise<{ rate: number; date: string }> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('fetch failed')
    const data = await res.json()
    const date = (data.time_last_update_utc as string).slice(0, 16)
    return { rate: Math.round(data.rates.KRW), date }
  } catch {
    return { rate: FALLBACK_RATE, date: '' }
  }
}

function toKrw(usd: number, rate: number): string {
  const krw = Math.round((usd * rate) / 1000) * 1000
  return new Intl.NumberFormat('ko-KR').format(krw) + '원'
}

const PLANS = [
  {
    name: 'Free',
    usd: null as number[] | null,
    cc: '❌ 불가',
    note: 'Claude 채팅만 써보고 싶은 분',
  },
  {
    name: 'Pro',
    usd: [20],
    cc: '✅ 가능',
    note: '가끔 짧게 코딩하는 분',
  },
  {
    name: 'Max 5x',
    usd: [100],
    cc: '✅ 가능',
    note: '자주, 다양한 작업에 Claude를 쓰는 분',
  },
  {
    name: 'Max 20x',
    usd: [200],
    cc: '✅ 가능',
    note: '거의 모든 작업을 Claude와 함께 하는 분',
  },
  {
    name: 'Team',
    usd: [30, 125],
    perUser: true,
    cc: '✅ 가능',
    note: '팀 단위로 협업하는 분',
  },
]

export async function PlanTable() {
  const { rate, date } = await getUsdToKrw()

  function usdLabel(plan: (typeof PLANS)[number]) {
    if (!plan.usd) return '무료'
    const suffix = plan.perUser ? '/인/월' : '/월'
    return plan.usd.length === 2
      ? `$${plan.usd[0]}~${plan.usd[1]}${suffix}`
      : `$${plan.usd[0]}${suffix}`
  }

  function krwLabel(plan: (typeof PLANS)[number]) {
    if (!plan.usd) return '무료'
    const suffix = plan.perUser ? '/인/월' : '/월'
    return plan.usd.length === 2
      ? `약 ${toKrw(plan.usd[0], rate)}~${toKrw(plan.usd[1], rate)}${suffix}`
      : `약 ${toKrw(plan.usd[0], rate)}${suffix}`
  }

  return (
    <div className="my-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {['플랜', '가격 (USD)', '가격 (원화)', 'Claude Code', '이런 분께 맞아요'].map((h) => (
                <th key={h} className="text-left py-2.5 px-3 font-semibold whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PLANS.map((plan) => (
              <tr key={plan.name} className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2.5 px-3 font-medium whitespace-nowrap">{plan.name}</td>
                <td className="py-2.5 px-3 text-gray-500 dark:text-gray-400 whitespace-nowrap tabular-nums">
                  {usdLabel(plan)}
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap tabular-nums">{krwLabel(plan)}</td>
                <td className="py-2.5 px-3 whitespace-nowrap">{plan.cc}</td>
                <td className="py-2.5 px-3 text-gray-500 dark:text-gray-400">{plan.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        💱 적용 환율: 1 USD = {rate.toLocaleString('ko-KR')} KRW
        {date ? ` (${date} UTC 기준 · Open Exchange Rates)` : ' (기준값)'}
        {' · '}
        매시간 갱신
      </p>
    </div>
  )
}
