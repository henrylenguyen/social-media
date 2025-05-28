import { useState, useEffect } from 'react'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export interface DeviceInfo {
  deviceType: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  screenHeight: number
  orientation: 'portrait' | 'landscape'
  hasTouch: boolean
  isStandalone: boolean
  userAgent: string
}

export interface DeviceBreakpoints {
  mobile: number
  tablet: number
  desktop: number
}

const DEFAULT_BREAKPOINTS: DeviceBreakpoints = {
  mobile: 768,   // 0 - 767px
  tablet: 1024,  // 768 - 1023px  
  desktop: 1024, // 1024px+
}

/**
 * Hook để detect device type và thông tin thiết bị
 * 
 * @param customBreakpoints - Custom breakpoints cho mobile/tablet/desktop
 * @returns DeviceInfo object với thông tin chi tiết về thiết bị
 * 
 * @example
 * ```tsx
 * const { deviceType, isMobile, isTablet, isDesktop } = useDeviceDetection()
 * 
 * // Custom breakpoints
 * const device = useDeviceDetection({
 *   mobile: 640,
 *   tablet: 1280,
 *   desktop: 1280
 * })
 * ```
 */
export const useDeviceDetection = (
  customBreakpoints?: Partial<DeviceBreakpoints>
): DeviceInfo => {
  const breakpoints = { ...DEFAULT_BREAKPOINTS, ...customBreakpoints }

  const getDeviceInfo = (): DeviceInfo => {
    // Server-side rendering safety
    if (typeof window === 'undefined') {
      return {
        deviceType: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        screenWidth: 1920,
        screenHeight: 1080,
        orientation: 'landscape',
        hasTouch: false,
        isStandalone: false,
        userAgent: '',
      }
    }

    const width = window.innerWidth
    const height = window.innerHeight
    const userAgent = navigator.userAgent.toLowerCase()

    // Device type detection based on screen width
    let deviceType: DeviceType = 'desktop'
    if (width < breakpoints.mobile) {
      deviceType = 'mobile'
    } else if (width < breakpoints.tablet) {
      deviceType = 'tablet'
    }

    // Enhanced mobile detection using user agent
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
    const tabletRegex = /ipad|android(?!.*mobile)|tablet/i
    
    if (mobileRegex.test(userAgent)) {
      if (tabletRegex.test(userAgent)) {
        deviceType = 'tablet'
      } else {
        deviceType = 'mobile'
      }
    }

    // Touch detection
    const hasTouch = 'ontouchstart' in window || 
                     navigator.maxTouchPoints > 0 ||
                     // @ts-ignore - for older browsers
                     navigator.msMaxTouchPoints > 0

    // PWA standalone detection
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        // @ts-ignore - for iOS Safari
                        window.navigator.standalone === true

    // Orientation detection
    const orientation = width > height ? 'landscape' : 'portrait'

    return {
      deviceType,
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet', 
      isDesktop: deviceType === 'desktop',
      screenWidth: width,
      screenHeight: height,
      orientation,
      hasTouch,
      isStandalone,
      userAgent,
    }
  }

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(getDeviceInfo)

  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo())
    }

    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated
      setTimeout(() => {
        setDeviceInfo(getDeviceInfo())
      }, 100)
    }

    // Listen for resize events
    window.addEventListener('resize', handleResize)
    
    // Listen for orientation changes
    window.addEventListener('orientationchange', handleOrientationChange)
    
    // Initial detection
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [breakpoints.mobile, breakpoints.tablet, breakpoints.desktop])

  return deviceInfo
}

/**
 * Simplified hook chỉ trả về device type
 */
export const useDeviceType = (
  customBreakpoints?: Partial<DeviceBreakpoints>
): DeviceType => {
  const { deviceType } = useDeviceDetection(customBreakpoints)
  return deviceType
}

/**
 * Hook để check specific device type
 */
export const useIsMobile = (customBreakpoints?: Partial<DeviceBreakpoints>): boolean => {
  const { isMobile } = useDeviceDetection(customBreakpoints)
  return isMobile
}

export const useIsTablet = (customBreakpoints?: Partial<DeviceBreakpoints>): boolean => {
  const { isTablet } = useDeviceDetection(customBreakpoints)
  return isTablet
}

export const useIsDesktop = (customBreakpoints?: Partial<DeviceBreakpoints>): boolean => {
  const { isDesktop } = useDeviceDetection(customBreakpoints)
  return isDesktop
}

/**
 * Hook để detect touch capability
 */
export const useHasTouch = (): boolean => {
  const { hasTouch } = useDeviceDetection()
  return hasTouch
}

/**
 * Hook để detect PWA standalone mode
 */
export const useIsStandalone = (): boolean => {
  const { isStandalone } = useDeviceDetection()
  return isStandalone
}
