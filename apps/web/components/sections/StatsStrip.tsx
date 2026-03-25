import { StatCounter } from '@/components/ui/StatCounter'

interface StatsStripProps {
  items: Array<{
    value: number
    suffix: string
    label: string
    prefix?: string
  }>
}

export function StatsStrip({ items }: StatsStripProps) {
  return (
    <section className="section-shell" style={{ paddingBlock: '3.5rem', borderTop: '1px solid var(--border)' }}>
      <div
        className="container-web"
        style={{
          display: 'grid',
          gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        }}
      >
        {items.map((item) => (
          <StatCounter
            key={`${item.label}-${item.value}`}
            value={item.value}
            suffix={item.suffix}
            label={item.label}
            prefix={item.prefix}
          />
        ))}
      </div>
    </section>
  )
}
