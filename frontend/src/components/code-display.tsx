import React, { type FormEvent, useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import type { CodeDisplayProps, ImageResponse } from "@/types.ts"
import { Button } from "@/components/ui/button.tsx"
import { BiDownload, BiImageAdd } from "react-icons/bi"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx"
import { takeScreenshotOfMyCode } from "@/lib/screenshot.ts"

const PygmentsStyles = createGlobalStyle<{ styleDefinitions: string }>`
  ${(props) => props.styleDefinitions}
`

const CodeContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 4px;
  padding: 16px;
  margin: 8px 0;
  overflow-x: auto;
`

const CodeDisplay: React.FC<CodeDisplayProps> = ({ highlightedCode, styleDefinitions, backgroundColor }) => {
  const [imgGenError, setImgGenError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imgUrl, setImgUrl] = useState<string | null>(null)

  const handleScreenshot = async (e: FormEvent) => {
    e.preventDefault()
    const imgUrl = await takeScreenshotOfMyCode()
    if (imgUrl) {
      console.log("Screenshot URL:", imgUrl)
      setImgUrl(imgUrl)
    }
  }

  return (
    <>
      <div
        className={`px-5 py-10 mt-20 ${imgUrl ? "flex flex-col" : "hidden"} transition-opacity duration-500 ease-in-out `}>
        <h1 className="text-3xl font-semibold text-rose-800 mb-2">Generated Image</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Image is Ready 🎉!</CardTitle>
            <CardDescription>You can download your image now...</CardDescription>
            <CardAction>
              <Button
                className="bg-green-500 text-neutral-50 hover:bg-slate-50 hover:text-green-600 border-1 border-background hover:border-green-600"
                variant="link"
                type="button"
                size="lg">
                <BiDownload />
                <a href={imgUrl ?? "http://localhost:5173/error_window.png"} download="screenshot.png">
                  Download!
                </a>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <img src={imgUrl ?? "http://localhost:5173/error_window.png"} alt={`Generated Image`} />
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <div
        className={`px-5 py-10 mt-20 ${imgUrl ? "hidden" : "flex flex-col"} transition-opacity duration-500 ease-in-out `}>
        <h1 className="text-3xl font-semibold text-rose-800 mb-2">Preview</h1>
        <form onSubmit={handleScreenshot}>
          <Button
            className="hover:bg-green-400 hover:text-neutral-50 dark:hover:bg-green-600 "
            variant="outline"
            type="submit"
            size="lg">
            <BiImageAdd />
            Create Image
          </Button>
        </form>
        <div className="my_code">
          <PygmentsStyles styleDefinitions={styleDefinitions} />
          <CodeContainer backgroundColor={backgroundColor} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </div>
      </div>
    </>
  )
}

export default CodeDisplay
