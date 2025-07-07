"use client"

import { useCallback, useState } from "react"
import { $isCodeNode, CODE_LANGUAGE_FRIENDLY_NAME_MAP, CODE_LANGUAGE_MAP, getLanguageFriendlyName } from "@lexical/code"
import { $isListNode } from "@lexical/list"
import { $findMatchingParent } from "@lexical/utils"
import { $getNodeByKey, $isRangeSelection, $isRootOrShadowRoot, type BaseSelection } from "lexical"

import { useToolbarContext } from "@/components/editor/context/toolbar-context"
import { useUpdateToolbarHandler } from "@/components/editor/editor-hooks/use-update-toolbar"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components//ui/select"
import { useEditorSettings } from "@/hooks/use-editor-settings.tsx"
import * as React from "react"

function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [
    // **Most popular and commonly grouped by ecosystem/similarity**
    ["js", "JavaScript"],
    ["ts", "TypeScript"],
    ["jsx", "React JSX"],
    ["tsx", "React TSX"],

    ["py", "Python"],
    ["java", "Java"],
    ["kotlin", "Kotlin"],
    ["scala", "Scala"],
    ["groovy", "Groovy"],
    ["c", "C"],
    ["cpp", "C++"],
    ["d", "D"],
    ["cs", "C#"],
    ["vbnet", "VB.NET"],
    ["fsharp", "F#"],
    ["swift", "Swift"],
    ["objc", "Objective-C"],
    ["ocaml", "OCaml"],

    ["go", "Go"],
    ["rust", "Rust"],
    ["dart", "Dart"],
    ["crystal", "Crystal"],

    ["php", "PHP"],
    ["ruby", "Ruby"],
    ["perl", "Perl"],
    ["wasm", "WebAssembly"],

    ["elixir", "Elixir"],
    ["elm", "Elm"],
    ["lua", "Lua"],
    ["julia", "Julia"],

    ["vb", "Visual Basic"],
    ["basic", "BASIC"],
    ["pascal", "Pascal"],
    ["ada", "Ada"],
    ["fortran", "Fortran"],
    ["cobol", "COBOL"],

    // **Markups, configs, tooling and data**
    ["html", "HTML"],
    ["xml", "XML"],
    ["css", "CSS"],
    ["scss", "SCSS"],
    ["sass", "SASS"],
    ["less", "LESS"],

    ["json", "JSON"],
    ["yaml", "YAML"],
    ["toml", "TOML"],
    ["docker", "Docker"],
    ["gherkin", "Gherkin"],

    // **Scripts and CLI**
    ["shell", "Shell"],
    ["bash", "Bash"],
    ["powershell", "PowerShell"],
    ["cmake", "CMake"],
    ["awk", "AWK"],

    // **Other ecosystems**
    ["arduino", "Arduino"],
    ["coffeescript", "CoffeeScript"],

    // **Data & query**
    ["sql", "SQL"],
    ["graphql", "GraphQL"],
    ["r", "R"],

    // **Less common languages**
    ["haskell", "Haskell"],
    ["zig", "Zig"]
  ]

  /*for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push([lang, friendlyName])
  }*/

  return options
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions()

export function CodeLanguageToolbarPlugin() {
  const { activeEditor } = useToolbarContext()
  const [open, setOpen] = React.useState(false)
  //const [codeLanguage, setCodeLanguage] = useState<string>("")
  const { codeLanguage, setCodeLanguage } = useEditorSettings()
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(null)

  const $updateToolbar = (selection: BaseSelection) => {
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent()
              return parent !== null && $isRootOrShadowRoot(parent)
            })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      const elementDOM = activeEditor.getElementByKey(elementKey)

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)

        if (!$isListNode(element) && $isCodeNode(element)) {
          const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP
          setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : "")
          return
        }
      }
    }
  }

  useUpdateToolbarHandler($updateToolbar)

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey)
          if ($isCodeNode(node)) {
            node.setLanguage(value)
          }
        }
      })
    },
    [activeEditor, selectedElementKey]
  )

  return (
    <Select>
      <SelectTrigger className="!h-8 w-min gap-1">
        <span>{getLanguageFriendlyName(codeLanguage)}</span>
      </SelectTrigger>
      <SelectContent>
        {CODE_LANGUAGE_OPTIONS.map(([value, label]) => (
          <SelectItem
            key={value}
            value={value}
            onPointerUp={() => {
              onCodeLanguageSelect(value)
            }}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
