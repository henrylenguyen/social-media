// libs/molecules/src/phoneMockup/types.ts

import { ReactNode } from 'react'

export type DeviceType = 'mobile' | 'desktop' | 'tablet'
export type NetworkType = 'wifi' | 'cellular' | '4g' | '3g' | '2g' | 'slow-2g'
export type Orientation = 'portrait' | 'landscape'

export interface PhoneModel {
  id: string
  name: string
  width: number
  height: number
  bezelWidth: number
  cornerRadius: number
  notchHeight?: number
  contentPadding: number
  isFoldable?: boolean
  aspectRatio: number
}

export interface PhoneMockupProps {
  children?: ReactNode
  modelId?: string
  phoneColor?: string
  shadowColor?: string
  className?: string
  showModelSelector?: boolean
  showColorSelector?: boolean
  showScaleSelector?: boolean
  phoneContainerClassName?: string
  showOrientationToggle?: boolean
}

export interface UsePhoneMockupProps {
  initialModelId?: string
  initialPhoneColor?: string
  initialShadowColor?: string
}

export interface UsePhoneMockupReturn {
  phoneModels: PhoneModel[]
  selectedModel: PhoneModel
  phoneColor: string
  shadowColor: string
  currentTime: string
  batteryLevel: number
  isCharging: boolean
  networkType: NetworkType
  carrierName: string
  deviceType: DeviceType
  orientation: Orientation
  scale: number
  handleModelChange: (modelId: string) => void
  handlePhoneColorChange: (color: string) => void
  handleShadowColorChange: (color: string) => void
  handleOrientationToggle: () => void
  handleScaleChange: (scale: number) => void
}

// Browser API extensions
interface BatteryManager extends EventTarget {
  level: number
  charging: boolean
}

interface NetworkInformation extends EventTarget {
  effectiveType?: string
  type?: string
}

declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryManager>
    connection?: NetworkInformation
    mozConnection?: NetworkInformation
    webkitConnection?: NetworkInformation
  }
}
