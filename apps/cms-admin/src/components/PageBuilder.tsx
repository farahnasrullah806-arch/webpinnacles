import type { ContentSection } from '@webpinnacles/contracts'

interface PageBuilderProps {
  sections: ContentSection[]
  onChange: (next: ContentSection[]) => void
}

export function PageBuilder({ sections, onChange }: PageBuilderProps) {
  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= sections.length) return
    const next = [...sections]
    const [item] = next.splice(index, 1)
    if (!item) return
    next.splice(target, 0, item)
    onChange(next.map((section, order) => ({ ...section, order })))
  }

  function toggleVisibility(index: number) {
    const next = [...sections]
    const current = next[index]
    if (!current) return
    next[index] = { ...current, visible: !current.visible }
    onChange(next)
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Page Builder</h3>
      <p style={{ color: 'var(--muted)', marginTop: 0 }}>
        Drag-sort replacement controls for section order and visibility.
      </p>
      <div style={{ display: 'grid', gap: 8 }}>
        {sections.map((section, index) => (
          <div
            key={`${section.type}-${index}`}
            style={{
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: 10,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <strong style={{ textTransform: 'capitalize' }}>{section.type}</strong>
            <span style={{ marginLeft: 'auto', color: 'var(--muted)' }}>
              {section.visible ? 'Visible' : 'Hidden'}
            </span>
            <button className="btn" type="button" onClick={() => move(index, -1)}>
              ↑
            </button>
            <button className="btn" type="button" onClick={() => move(index, 1)}>
              ↓
            </button>
            <button className="btn" type="button" onClick={() => toggleVisibility(index)}>
              Toggle
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
