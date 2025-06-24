import { useState } from "react"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin"
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin"
import { ContentEditable } from "@/components/editor/editor-ui/content-editable"
import { ActionsPlugin } from "@/components/editor/plugins/actions/actions-plugin"
import { ClearEditorActionPlugin } from "@/components/editor/plugins/actions/clear-editor-plugin"
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin"
import { CounterCharacterPlugin } from "@/components/editor/plugins/actions/counter-character-plugin"
import { EditModeTogglePlugin } from "@/components/editor/plugins/actions/edit-mode-toggle-plugin"
import { ImportExportPlugin } from "@/components/editor/plugins/actions/import-export-plugin"
//import { FontFamilyToolbarPlugin } from "@/components/editor/plugins/toolbar/font-family-toolbar-plugin"
import { EditorThemePlugin } from "@/components/editor/plugins/toolbar/editor-theme-plugin"
import { Button } from "@/components/ui/button"
import { BiImageAdd } from "react-icons/bi"
import { CodeActionMenuPlugin } from "@/components/editor/plugins/code-action-menu-plugin"
import { CodeHighlightPlugin } from "@/components/editor/plugins/code-highlight-plugin"
import { CodeLanguageToolbarPlugin } from "@/components/editor/plugins/toolbar/code-language-toolbar-plugin"
import { ParagraphToCodePlugin } from "@/components/editor/plugins/paragraph-to-code-plugin.tsx"
export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      {/* toolbar plugins */}
      <ParagraphToCodePlugin />
      <ToolbarPlugin>
        {() => (
          <div className="sticky top-0 z-10 flex flex-col overflow-auto border-b p-1">
            <div className="flex items-center justify-between ">
              <div id="left-plugins" className="flex flex-row ">
                <CodeLanguageToolbarPlugin />
                <EditorThemePlugin />
                {/*<FontFamilyToolbarPlugin />*/}
              </div>
              <div id="right-plugins" className="flex flex-row justify-items-end">
                <Button
                  className="hover:bg-green-400 hover:text-neutral-50 dark:hover:bg-green-600 "
                  variant="outline"
                  size="sm">
                  <BiImageAdd /> Generate
                </Button>
              </div>
            </div>
          </div>
        )}
      </ToolbarPlugin>

      <div className="relative">
        <PlainTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable
                  placeholder={"Start typing..."}
                  className="ContentEditable__root relative block h-72 min-h-full overflow-auto px-8 py-4 focus:outline-none"
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
        <CodeHighlightPlugin />
      </div>
      {/* actions plugins */}
      <ActionsPlugin>
        <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t p-1">
          <div className="flex flex-1 justify-start">{/* left side action buttons */}</div>

          <div>
            <CounterCharacterPlugin charset="UTF-16" />
            {/* center action buttons */}
          </div>
          <div className="flex flex-1 justify-end">
            {/* right side action buttons */}
            <>
              <ClearEditorActionPlugin />
              <ClearEditorPlugin />
              <EditModeTogglePlugin />
              <ImportExportPlugin />
            </>
          </div>
        </div>
      </ActionsPlugin>
    </div>
  )
}
