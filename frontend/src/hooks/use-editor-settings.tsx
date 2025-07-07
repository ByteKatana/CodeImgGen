import type { EditorSettingsContext } from "@/types.ts"
import { createContext, useContext, type useState } from "react"

const EditorSettings = createContext<typeof useState<EditorSettingsContext | ""> | "">("")

export const useEditorSettings = () => {
  const currentEditorSettings = useContext(EditorSettings)

  if (!currentEditorSettings) {
    throw new Error("useEditorSettings must be used within an EditorSettingsProvider")
  }

  return { ...currentEditorSettings }
}

export const EditorSettingsProvider = ({
  children,
  value
}: {
  children: React.ReactNode
  value: typeof useState<EditorSettingsContext | "">
}) => <EditorSettings.Provider value={value}>{children}</EditorSettings.Provider>
