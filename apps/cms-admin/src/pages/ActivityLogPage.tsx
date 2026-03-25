import type { CSSProperties } from 'react'

const entries = [
  { when: '2026-03-24 10:10', actor: 'Admin User', action: 'Published /services/paid-ads/' },
  { when: '2026-03-24 09:45', actor: 'Editor User', action: 'Updated homepage FAQ order' },
  { when: '2026-03-24 08:30', actor: 'Admin User', action: 'Uploaded media asset case-study-roofing.jpg' },
]

export function ActivityLogPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Activity Log</h1>
      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Timestamp</th>
              <th style={thStyle}>Actor</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={`${entry.when}-${entry.action}`}>
                <td style={tdStyle}>{entry.when}</td>
                <td style={tdStyle}>{entry.actor}</td>
                <td style={tdStyle}>{entry.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  borderBottom: '1px solid var(--border)',
  padding: '10px 8px',
  fontSize: 12,
  color: 'var(--muted)',
}

const tdStyle: CSSProperties = {
  borderBottom: '1px solid var(--border)',
  padding: '10px 8px',
  fontSize: 14,
}
