// Type declarations for Storybook
declare global {
  interface Window {
    __setPathname?: (pathname: string) => void
  }
}

export {}
