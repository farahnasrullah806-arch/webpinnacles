import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { useEffect } from 'react'

interface TiptapEditorProps {
  value: string
  onChange: (html: string) => void
}

export function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: value,
    editorProps: {
      attributes: {
        class: 'input',
        style:
          'min-height: 260px; background: var(--panel-2); border: 1px solid var(--border); border-radius: 8px; padding: 12px;',
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    const handleUpdate = () => {
      onChange(editor.getHTML())
    }
    editor.on('update', handleUpdate)
    return () => {
      editor.off('update', handleUpdate)
    }
  }, [editor, onChange])

  if (!editor) return null

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Rich Text Editor (TipTap)</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        <button className="btn" type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button className="btn" type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button className="btn" type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet
        </button>
        <button className="btn" type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          Numbered
        </button>
        <button className="btn" type="button" onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}>
          H2
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
