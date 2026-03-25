import type { Seo } from '@webpinnacles/contracts'

interface SeoPanelProps {
  value: Seo
  onChange: (next: Seo) => void
}

export function SeoPanel({ value, onChange }: SeoPanelProps) {
  return (
    <aside className="card">
      <h3 style={{ marginTop: 0 }}>SEO Panel</h3>
      <div style={{ display: 'grid', gap: 10 }}>
        <label>
          <small>SEO Title ({value.title.length}/60)</small>
          <input
            className="input"
            value={value.title}
            onChange={(event) => onChange({ ...value, title: event.target.value })}
            maxLength={60}
          />
        </label>
        <label>
          <small>Meta Description ({value.description.length}/160)</small>
          <textarea
            className="input"
            rows={4}
            value={value.description}
            onChange={(event) => onChange({ ...value, description: event.target.value })}
            maxLength={160}
          />
        </label>
        <label>
          <small>Canonical URL</small>
          <input
            className="input"
            value={value.canonicalUrl ?? ''}
            onChange={(event) => onChange({ ...value, canonicalUrl: event.target.value })}
          />
        </label>
        <label>
          <small>OG Image URL</small>
          <input
            className="input"
            value={value.ogImageUrl ?? ''}
            onChange={(event) => onChange({ ...value, ogImageUrl: event.target.value })}
          />
        </label>
        <label>
          <small>Indexing</small>
          <select
            className="input"
            value={value.indexing}
            onChange={(event) =>
              onChange({
                ...value,
                indexing: event.target.value as Seo['indexing'],
              })
            }
          >
            <option value="index">index</option>
            <option value="noindex">noindex</option>
            <option value="nofollow">nofollow</option>
          </select>
        </label>
        <label>
          <small>Focus Keyword (helper)</small>
          <input className="input" placeholder="marketing agency for service businesses" />
        </label>
        <button className="btn btn-primary" type="button">
          Request GSC Indexing
        </button>
      </div>
    </aside>
  )
}
