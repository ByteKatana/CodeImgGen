import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { generateCode } from "@/api.ts"
import { $getRoot } from "lexical"
import { BiImageAdd } from "react-icons/bi"
import { Button } from "@/components/ui/button.tsx"
import { useEditorContext } from "@/hooks/use-editor-context.tsx"
import type { FormEvent } from "react"
import { useEditorSettings } from "@/hooks/use-editor-settings.tsx"

export function GenerateButtonPlugin() {
  const [editor] = useLexicalComposerContext()
  const { context, setContext, contextError, setContextError, isLoading, setIsLoading } = useEditorContext()
  const { codeLanguage, codeTheme } = useEditorSettings()

  const handleSubmit = async (e: FormEvent) => {
    // Get the plaintext (or use editorState.read/serialize for rich text, JSON, or HTML)
    e.preventDefault()
    editor.update(() => {
      const root = $getRoot()
      const textContent = root.getTextContent() // Plain text

      // Or for rich content:
      // const json = editor.getEditorState().toJSON();

      setIsLoading(true)

      // Submit to API
      generateCode(textContent, codeLanguage, codeTheme)
        .then((res) => {
          // handle success
          setContext(res)
        })
        .catch((err: unknown) => {
          // handle error
          setContextError(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button
        className="hover:bg-green-400 hover:text-neutral-50 dark:hover:bg-green-600 "
        variant="outline"
        type="submit"
        size="sm">
        <BiImageAdd />
        {isLoading ? "Generating..." : "Generate"}
      </Button>
    </form>
  )
}
