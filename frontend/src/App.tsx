import Navbar from "@/components/Navbar.tsx"
import EditorWrapper from "@/components/editor-wrapper.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <Navbar />
        <div id="container" className="flex min-h-screen items-center justify-center p-5">
          <div className="flex flex-col w-full gap-4 bg-background rounded-md shadow-md dark:bg-background-dark">
            <input
              type="text"
              placeholder="Name your file"
              className=" text-3xl font-light ml-5 mr-5 p-10 border-b-2 border-neutral-300 cursor-text focus:outline-none focus:border-rose-600 hover:border-rose-600 transition-colors duration-500 ease-in-out animate-slowBlink"
            />
            <EditorWrapper />
          </div>
        </div>
      </>
    </ThemeProvider>
  )
}

export default App
