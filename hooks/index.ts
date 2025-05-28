// Device Detection Hooks
export {
  useDeviceDetection,
  useDeviceType,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useHasTouch,
  useIsStandalone,
  type DeviceType,
  type DeviceInfo,
  type DeviceBreakpoints,
} from './useDeviceDetection'

// Media Query Hooks
export {
  useMediaQuery,
  useIsMobileScreen,
  useIsTabletScreen,
  useIsDesktopScreen,
  useIsLargeScreen,
  useIsPortrait,
  useIsLandscape,
  usePrefersDarkMode,
  usePrefersReducedMotion,
  usePrefersHighContrast,
  useCanHover,
  useHasCoarsePointer,
  useHasFinePointer,
  useIsStandaloneDisplay,
  useIsFullscreenDisplay,
  useIsRetina,
  useIsPrintMode,
  useResponsive,
  useBreakpoint,
  type ResponsiveState,
  type Breakpoint,
} from './useMediaQuery'
