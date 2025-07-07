"use client"
import { useRef } from "react"
import { ModeToggle } from "@/components/mode-toggle.tsx"
import { BiLogoGithub } from "react-icons/bi"

function Navbar() {
  const mobileMenuRef = useRef({} as HTMLElement)
  return (
    <>
      <nav id="full-menu" className="w-full sticky top-0 z-10 xl:px-28 pt-4">
        <div id="content" className="flex flex-1 flex-row justify-between p-3 gap-24">
          <img src="vite.svg" alt="website logo" id="logo" />
          <ul className="hidden xl:flex flex-row w-full justify-start items-center gap-8 text-neutral-600 text-base font-medium">
            <li className="p-0.5  hover:text-rose-800 dark:hover:text-rose-50 focus:border focus:bg-rose-50 rounded">
              <a href="/">Home</a>
            </li>
          </ul>
          <div id="buttons-left" className="flex flex-row min-w-fit gap-4 items-center">
            <ModeToggle />
            <a
              href="https://github.com/ByteKatana/CodeImgGen"
              className="href"
              target="_blank"
              rel="noreferrer"
              aria-label="Github">
              <button className="hidden xl:flex px-4 py-2.5 items-center gap-x-1 cursor-pointer bg-rose-700 hover:bg-rose-800 text-white drop-shadow rounded">
                <BiLogoGithub size="24px" /> Github
              </button>
            </a>
            <button
              aria-label="Open mobile menu"
              id="mobile-menu-button"
              onClick={() => {
                mobileMenuRef.current.classList.toggle("translate-x-[-100%]")
                mobileMenuRef.current.classList.toggle("translate-x-0")
              }}
              className="xl:hidden flex">
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </nav>
      <nav
        id="mobile-menu"
        ref={mobileMenuRef}
        className="flex flex-col fixed top-0 z-10 w-[359px] min-h-full bg-white translate-x-[-100%] transition-all ease-in-out duration-300">
        <div id="content" className="flex flex-1 flex-col place-content-between px-4 pt-8 pb-4">
          <div className="flex flex-col gap-6">
            <div id="logo" className="flex flex-row justify-between">
              <img src="vite.svg" alt="website logo" id="logo" />
              <button
                id="close-btn"
                onClick={() => {
                  mobileMenuRef.current.classList.toggle("translate-x-[-100%]")
                  mobileMenuRef.current.classList.toggle("translate-x-0")
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
                </svg>
              </button>
            </div>
            <ul className="flex flex-col w-full gap-2 text-neutral-600 text-sm font-medium">
              <li className="px-3 py-2 hover:text-neutral-900 focus:border focus:bg-rose-50 rounded">
                <a href="#">Home</a>
              </li>
              <li className="px-3 py-2 hover:text-neutral-900 focus:border focus:bg-rose-50 rounded">
                <a href="#">Features</a>
              </li>
              <li className="px-3 py-2 hover:text-neutral-900 focus:border focus:bg-rose-50 rounded">
                <a href="#">Pricing</a>
              </li>
              <li className="px-3 py-2 hover:text-neutral-900 focus:border focus:bg-rose-50 rounded">
                <a href="#">About Us</a>
              </li>
              <li className="px-3 py-2 hover:text-neutral-900 focus:border focus:border-rose-50 rounded">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div id="buttons-bottom" className="flex flex-col min-w-fit gap-4">
            <button className="px-4 py-2.5 bg-white hover:bg-zinc-50 font-medium text-base text-neutral-900 drop-shadow rounded">
              Learn More
            </button>
            <button className="px-4 py-2.5 bg-rose-700 hover:bg-rose-800 font-medium text-base text-white drop-shadow rounded">
              Try it out
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
