import type { CodeResponse } from "@/types.ts"
import { createContext, useContext, type useState } from "react"

const EditorContext = createContext<typeof useState<CodeResponse | null> | null>(null)

export const useEditorContext = () => {
  const currentEditorContext = useContext(EditorContext)

  if (!currentEditorContext) {
    throw new Error("useEditorContext must be used within an EditorContextProvider")
  }

  return { ...currentEditorContext }
}

export const EditorContextProvider = ({
  children,
  value
}: {
  children: React.ReactNode
  value: typeof useState<CodeResponse | null>
}) => <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
