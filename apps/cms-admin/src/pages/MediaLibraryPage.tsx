const placeholderMedia = [
  { id: '1', name: 'homepage-hero.jpg', alt: 'WebPinnacles hero artwork', usage: 3 },
  { id: '2', name: 'paid-ads-og.jpg', alt: 'Paid Ads service card visual', usage: 2 },
  { id: '3', name: 'case-study-roofing.jpg', alt: 'Roofing campaign chart', usage: 1 },
]

export function MediaLibraryPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Media Library</h1>
      <p style={{ color: 'var(--muted)' }}>
        Drag-and-drop upload and R2 integration are scaffold-ready; this screen includes alt-text and usage placeholders.
      </p>
      <div style={{ display: 'grid', gap: 10 }}>
        {placeholderMedia.map((item) => (
          <article key={item.id} className="card" style={{ display: 'grid', gap: 8 }}>
            <strong>{item.name}</strong>
            <label>
              Alt text
              <input className="input" defaultValue={item.alt} />
            </label>
            <small style={{ color: 'var(--muted)' }}>Used on {item.usage} page(s)</small>
          </article>
        ))}
      </div>
    </div>
  )
}
