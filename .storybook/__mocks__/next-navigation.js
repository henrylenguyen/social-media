// Mock for next/navigation module in Storybook
// This will be overridden by the decorator in preview.tsx
let currentPathname = '/'

export const usePathname = () => {
  console.log('usePathname called, returning:', currentPathname)
  return currentPathname
}

// Function to update pathname (called by Storybook decorator)
export const __setPathname = (pathname) => {
  console.log('Setting pathname to:', pathname)
  currentPathname = pathname
}

// Expose to window object for Storybook decorator
if (typeof window !== 'undefined') {
  window.__setPathname = __setPathname
}

export const useRouter = () => ({
  push: (url) => {
    console.log('Router push:', url)
  },
  replace: (url) => {
    console.log('Router replace:', url)
  },
  back: () => {
    console.log('Router back')
  },
  forward: () => {
    console.log('Router forward')
  },
  prefetch: (url) => {
    console.log('Router prefetch:', url)
    return Promise.resolve()
  },
  refresh: () => {
    console.log('Router refresh')
  },
})

export const useSearchParams = () => {
  return new URLSearchParams()
}

export const redirect = (url) => {
  console.log('Redirect to:', url)
}

export const notFound = () => {
  console.log('Not found called')
}
