export type CredentialsMode = "same-origin" | "include" | "omit"

export interface CodeResponse {
  success: boolean
  data?: {
    code: string
    style_definitions: string
    style_bg_color: string
  }
  error?: string
}

export interface CodeDisplayProps {
  highlightedCode: string
  styleDefinitions: string
  backgroundColor: string
}

export interface EditorSettingsContext {
  codeLanguage: string
  setCodeLanguage: (codeLanguage: string) => void
  codeTheme: string
  setCodeTheme: (codeTheme: string) => void
  fileName: string
  setFileName: (fileName: string) => void
}
