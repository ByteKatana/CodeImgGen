import { useState } from "react"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ContentEditable } from "@/components/editor/editor-ui/content-editable"
import { ActionsPlugin } from "@/components/editor/plugins/actions/actions-plugin"
import { ClearEditorActionPlugin } from "@/components/editor/plugins/actions/clear-editor-plugin"
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin"
import { FontSizeToolbarPlugin } from "@/components/editor/plugins/toolbar/font-size-toolbar-plugin"
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin"
import { CounterCharacterPlugin } from "@/components/editor/plugins/actions/counter-character-plugin"
import { EditModeTogglePlugin } from "@/components/editor/plugins/actions/edit-mode-toggle-plugin"
import { ImportExportPlugin } from "@/components/editor/plugins/actions/import-export-plugin"
import { FontFamilyToolbarPlugin } from "@/components/editor/plugins/toolbar/font-family-toolbar-plugin.tsx"
import { ProgrammingLangPlugin } from "@/components/editor/plugins/toolbar/programming-lang-plugin.tsx"
import { EditorThemePlugin } from "@/components/editor/plugins/toolbar/editor-theme-plugin.tsx"
import { Button } from "@/components/ui/button"
import { BiImageAdd } from "react-icons/bi"

export function Plugins() {
  const [_, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      {/* toolbar plugins */}

      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="sticky top-0 z-10 flex flex-col overflow-auto border-b p-1">
            <div className="flex items-center justify-between">
              <div id="left-plugins" className="flex flex-row ">
                <ProgrammingLangPlugin />
                <EditorThemePlugin />
                <FontFamilyToolbarPlugin />
                <FontSizeToolbarPlugin />
                <HistoryToolbarPlugin />
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
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable className="min-h-[56vh] min-w-[100vw] p-3" placeholder={"Start typing ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
        <HistoryPlugin />
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
