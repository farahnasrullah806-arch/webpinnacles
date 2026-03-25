import type { BlogPost } from '@webpinnacles/contracts'
import type { ReactNode } from 'react'

interface TiptapNode {
  type: string
  attrs?: Record<string, unknown>
  content?: TiptapNode[]
  text?: string
}

function nodeText(node: TiptapNode): string {
  if (node.type === 'text') return node.text ?? ''
  return (node.content ?? []).map(nodeText).join(' ')
}

function toAnchorId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function renderNode(node: TiptapNode, key: string): ReactNode {
  if (node.type === 'text') return node.text

  if (node.type === 'paragraph') {
    return (
      <p key={key} style={{ color: 'var(--ice-muted)', marginTop: 0 }}>
        {node.content?.map((child, idx) => renderNode(child, `${key}-${idx}`))}
      </p>
    )
  }

  if (node.type === 'heading') {
    const level = Number(node.attrs?.level ?? 2)
    const content = node.content?.map((child, idx) => renderNode(child, `${key}-${idx}`))
    const id = toAnchorId(nodeText(node))
    if (level === 2) {
      return (
        <h2 key={key} id={id} style={{ fontFamily: 'var(--font-display)' }}>
          {content}
        </h2>
      )
    }
    return (
      <h3 key={key} id={id} style={{ fontFamily: 'var(--font-display)' }}>
        {content}
      </h3>
    )
  }

  if (node.type === 'bulletList') {
    return (
      <ul key={key} style={{ color: 'var(--ice-muted)' }}>
        {node.content?.map((child, idx) => renderNode(child, `${key}-${idx}`))}
      </ul>
    )
  }

  if (node.type === 'listItem') {
    return <li key={key}>{node.content?.map((child, idx) => renderNode(child, `${key}-${idx}`))}</li>
  }

  return null
}

export function ArticleContent({ post }: { post: BlogPost }) {
  const nodes = (post.content?.content as TiptapNode[]) ?? []
  return <>{nodes.map((node, idx) => renderNode(node, `${post.id}-${idx}`))}</>
}
