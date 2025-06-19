"use client"

import { useState } from "react"
import type { SerializedEditorState } from "lexical"

import { Editor } from "../components/blocks/editor-00/editor.tsx"

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Hello World 🚀",
            type: "text",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1
      }
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1
  }
} as unknown as SerializedEditorState

export default function EditorDemo() {
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue)

  return (
    <div className="flex flex-col min-w-full p-5">
      <Editor editorSerializedState={editorState} onSerializedChange={(value) => setEditorState(value)} />
    </div>
  )
}
