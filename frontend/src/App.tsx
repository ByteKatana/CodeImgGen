import Navbar from "@/components/Navbar.tsx"
import EditorWrapper from "@/components/editor-wrapper.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { type ChangeEvent, useCallback, useState } from "react"
import type { CodeResponse } from "@/types.ts"
import { EditorContextProvider } from "@/hooks/use-editor-context.tsx"
import CodeDisplay from "./components/code-display"
import { EditorSettingsProvider } from "@/hooks/use-editor-settings.tsx"
import debounce from "@/lib/debounce.ts"

function App() {
  const [context, setContext] = useState<CodeResponse | null>(null)
  const [contextError, setContextError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [codeLanguage, setCodeLanguage] = useState<string>("py")
  const [codeTheme, setCodeTheme] = useState<string>("dracula")
  const [fileName, setFileName] = useState<string>("")

  const debouncedFileName = useCallback(
    debounce((fileNameVal: string) => setFileName(fileNameVal), 250),
    []
  )

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: fileNameVal } = e.target
    debouncedFileName(fileNameVal)
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <Navbar />
        <div id="container" className="flex min-h-screen items-center justify-center p-5">
          <div className="flex flex-col md:w-[50%] lg:w-[w-[75%] gap-4 rounded-md ">
            <EditorSettingsProvider
              value={{ codeLanguage, setCodeLanguage, codeTheme, setCodeTheme, fileName, setFileName }}>
              <EditorContextProvider
                value={{ context, setContext, contextError, setContextError, isLoading, setIsLoading }}>
                {isLoading && <div className="flex justify-center">Loading...</div>}
                {contextError && (
                  <div className="flex justify-center">
                    <b>Error:</b> {contextError}
                  </div>
                )}
                {context && (
                  <CodeDisplay
                    highlightedCode={context.data?.code ?? ""}
                    styleDefinitions={context.data?.style_definitions ?? ""}
                    backgroundColor={context.data?.style_bg_color ?? ""}
                  />
                )}
                <div className={`${context ? "hidden" : "flex flex-col"}`}>
                  <input
                    type="text"
                    placeholder="Name your file"
                    onChange={(e) => handleFileNameChange(e)}
                    className=" text-3xl font-light ml-5 mr-5 p-10 border-b-2 text-neutral-300 border-neutral-300 placeholder-netural-300 cursor-text focus:outline-none focus:border-rose-600 hover:border-rose-600 transition-colors duration-500 ease-in-out animate-slowBlink"
                  />

                  <EditorWrapper />
                </div>
              </EditorContextProvider>
            </EditorSettingsProvider>
          </div>
        </div>
      </>
    </ThemeProvider>
  )
}

export default App
