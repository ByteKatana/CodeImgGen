import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getRoot, ParagraphNode } from "lexical"
import { $createCodeNode } from "@lexical/code"

export function ParagraphToCodePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Register a listener for editor updates
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot()
        // Get all children (top-level blocks)
        root.getChildren().forEach((node) => {
          if (node instanceof ParagraphNode) {
            // This example transforms all paragraphs to code blocks automatically
            // Adjust condition as needed
            editor.update(() => {
              // Copy paragraph text
              const textContent = node.getTextContent()
              const codeNode = $createCodeNode()
              const textNode = $createTextNode(textContent)
              codeNode.append(textNode) // You may want to append TextNodes
              //codeNode.append(node.getFirstChild()?.clone()) // e.g., copy first child
              node.replace(codeNode)

              //set the default language when you clear the editor
              codeNode.setLanguage("python")
            })
          }
        })
      })
    })
  }, [editor])

  return null
}
