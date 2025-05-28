import { useState, useEffect } from 'react'

/**
 * Hook để sử dụng CSS media queries trong React
 * 
 * @param query - CSS media query string
 * @returns boolean - true nếu media query match
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
 * const isLandscape = useMediaQuery('(orientation: landscape)')
 * ```
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    // Server-side rendering safety
    if (typeof window === 'undefined') {
      return false
    }
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    // Server-side rendering safety
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Create event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      // @ts-ignore
      mediaQuery.addListener(handleChange)
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        // Fallback for older browsers
        // @ts-ignore
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [query])

  return matches
}

/**
 * Predefined media query hooks for common breakpoints
 */

// Screen size breakpoints
export const useIsMobileScreen = () => useMediaQuery('(max-width: 767px)')
export const useIsTabletScreen = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
export const useIsDesktopScreen = () => useMediaQuery('(min-width: 1024px)')
export const useIsLargeScreen = () => useMediaQuery('(min-width: 1440px)')

// Orientation
export const useIsPortrait = () => useMediaQuery('(orientation: portrait)')
export const useIsLandscape = () => useMediaQuery('(orientation: landscape)')

// System preferences
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const usePrefersHighContrast = () => useMediaQuery('(prefers-contrast: high)')

// Device capabilities
export const useCanHover = () => useMediaQuery('(hover: hover)')
export const useHasCoarsePointer = () => useMediaQuery('(pointer: coarse)')
export const useHasFinePointer = () => useMediaQuery('(pointer: fine)')

// Display modes (PWA)
export const useIsStandaloneDisplay = () => useMediaQuery('(display-mode: standalone)')
export const useIsFullscreenDisplay = () => useMediaQuery('(display-mode: fullscreen)')

/**
 * Hook để detect retina/high-DPI displays
 */
export const useIsRetina = () => {
  return useMediaQuery('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)')
}

/**
 * Hook để detect print mode
 */
export const useIsPrintMode = () => useMediaQuery('print')

/**
 * Composite hook for responsive design
 */
export interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLarge: boolean
  isPortrait: boolean
  isLandscape: boolean
  canHover: boolean
  hasCoarsePointer: boolean
  prefersDarkMode: boolean
  prefersReducedMotion: boolean
}

export const useResponsive = (): ResponsiveState => {
  const isMobile = useIsMobileScreen()
  const isTablet = useIsTabletScreen()
  const isDesktop = useIsDesktopScreen()
  const isLarge = useIsLargeScreen()
  const isPortrait = useIsPortrait()
  const isLandscape = useIsLandscape()
  const canHover = useCanHover()
  const hasCoarsePointer = useHasCoarsePointer()
  const prefersDarkMode = usePrefersDarkMode()
  const prefersReducedMotion = usePrefersReducedMotion()

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    isPortrait,
    isLandscape,
    canHover,
    hasCoarsePointer,
    prefersDarkMode,
    prefersReducedMotion,
  }
}

/**
 * Hook để detect breakpoint changes
 */
export const useBreakpoint = () => {
  const isMobile = useIsMobileScreen()
  const isTablet = useIsTabletScreen()
  const isDesktop = useIsDesktopScreen()
  const isLarge = useIsLargeScreen()

  if (isLarge) return 'xl'
  if (isDesktop) return 'lg'
  if (isTablet) return 'md'
  if (isMobile) return 'sm'
  return 'xs'
}

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
