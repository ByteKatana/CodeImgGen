"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useEditorSettings } from "@/hooks/use-editor-settings"

const themes = [
  { value: "abap", label: "Abap" },
  { value: "algol", label: "Algol" },
  { value: "algol_nu", label: "Algol Nu" },
  { value: "arduino", label: "Arduino" },
  { value: "autumn", label: "Autumn" },
  { value: "bw", label: "Bw" },
  { value: "borland", label: "Borland" },
  { value: "coffee", label: "Coffee" },
  { value: "colorful", label: "Colorful" },
  { value: "default", label: "Default" },
  { value: "dracula", label: "Dracula" },
  { value: "emacs", label: "Emacs" },
  { value: "friendly_grayscale", label: "Friendly Grayscale" },
  { value: "friendly", label: "Friendly" },
  { value: "fruity", label: "Fruity" },
  { value: "github-dark", label: "GitHub Dark" },
  { value: "gruvbox-dark", label: "Gruvbox Dark" },
  { value: "gruvbox-light", label: "Gruvbox Light" },
  { value: "igor", label: "Igor" },
  { value: "inkpot", label: "Inkpot" },
  { value: "lightbulb", label: "Lightbulb" },
  { value: "lilypond", label: "Lilypond" },
  { value: "lovelace", label: "Lovelace" },
  { value: "manni", label: "Manni" },
  { value: "material", label: "Material" },
  { value: "monokai", label: "Monokai" },
  { value: "murphy", label: "Murphy" },
  { value: "native", label: "Native" },
  { value: "nord-darker", label: "Nord Darker" },
  { value: "nord", label: "Nord" },
  { value: "one-dark", label: "One Dark" },
  { value: "paraiso-dark", label: "Paraiso Dark" },
  { value: "paraiso-light", label: "Paraiso Light" },
  { value: "pastie", label: "Pastie" },
  { value: "perldoc", label: "Perldoc" },
  { value: "rainbow_dash", label: "Rainbow Dash" },
  { value: "rrt", label: "Rrt" },
  { value: "sas", label: "Sas" },
  { value: "solarized-dark", label: "Solarized Dark" },
  { value: "solarized-light", label: "Solarized Light" },
  { value: "staroffice", label: "Staroffice" },
  { value: "stata-dark", label: "Stata Dark" },
  { value: "stata-light", label: "Stata Light" },
  { value: "tango", label: "Tango" },
  { value: "trac", label: "Trac" },
  { value: "vim", label: "Vim" },
  { value: "vs", label: "Vs" },
  { value: "xcode", label: "Xcode" },
  { value: "zenburn", label: "Zenburn" }
]

export function EditorThemePlugin() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const { codeTheme, setCodeTheme } = useEditorSettings()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {codeTheme ? themes.find((theme) => theme.value === codeTheme)?.label : "Select Theme..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Theme..." className="h-9" />
          <CommandList>
            <CommandEmpty>No theme found.</CommandEmpty>
            <CommandGroup>
              {themes.map((theme) => (
                <CommandItem
                  key={theme.value}
                  value={theme.value}
                  onSelect={(currentValue) => {
                    setCodeTheme(currentValue === codeTheme ? "" : currentValue)
                    setOpen(false)
                  }}>
                  {theme.label}
                  <Check className={cn("ml-auto", codeTheme === theme.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
