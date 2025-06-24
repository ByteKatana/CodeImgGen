"use client"

import { useState } from "react"
import type { SerializedEditorState } from "lexical"

import { Editor } from "../components/blocks/editor-00/editor.tsx"

const initialValue = {
  root: {
    children: [
      {
        direction: "ltr",
        format: "",
        indent: 0,
        type: "code",
        version: 1
      }
    ],
    direction: "ltr",
    format: "code",
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
