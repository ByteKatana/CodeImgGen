import html2canvas from "html2canvas-pro"

/**
 * Captures a screenshot of `.my_code` element as a PNG data URL,
 * and optionally triggers a download.
 *
 * @returns Promise<string> resolving to the image data URL
 */
export async function takeScreenshotOfMyCode(): Promise<string | null> {
  const element = document.querySelector(".my_code") as HTMLElement | null
  if (!element) {
    console.error("Element with class '.my_code' not found.")
    return null
  }

  const canvas = await html2canvas(element, {
    scale: window.devicePixelRatio || 1,
    logging: true
  })

  // Get image as PNG data URL
  const imgDataUrl = canvas.toDataURL("image/png")

  return imgDataUrl
}
