// libs/molecules/src/phoneMockup/usePhoneMockup.ts

import { useCallback, useEffect, useState } from 'react'
import { getPhoneModelById, phoneModels } from './phoneModels'
import {
  DeviceType,
  NetworkType,
  Orientation,
  UsePhoneMockupProps,
  UsePhoneMockupReturn,
} from './types'

export const usePhoneMockup = ({
  initialModelId = 'iphone-15',
  initialPhoneColor = '#000000',
  initialShadowColor = 'rgba(0, 0, 0, 0.5)',
}: UsePhoneMockupProps = {}): UsePhoneMockupReturn => {
  // Core state
  const [selectedModelId, setSelectedModelId] = useState(initialModelId)
  const [phoneColor, setPhoneColor] = useState(initialPhoneColor)
  const [shadowColor, setShadowColor] = useState(initialShadowColor)
  const [currentTime, setCurrentTime] = useState('')
  const [batteryLevel, setBatteryLevel] = useState(75)
  const [isCharging, setIsCharging] = useState(false)
  const [networkType, setNetworkType] = useState<NetworkType>('wifi')
  const [carrierName, setCarrierName] = useState('Viettel')
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile')
  const [orientation, setOrientation] = useState<Orientation>('portrait')
  const [scale, setScale] = useState(0.5) // Default 50%

  const selectedModel = getPhoneModelById(selectedModelId) || phoneModels[0]

  // Device detection and system info
  useEffect(() => {
    let batteryCleanup: (() => void) | undefined
    let networkCleanup: (() => void) | undefined

    const detectDeviceInfo = async () => {
      try {
        // Device type detection
        const userAgent = navigator.userAgent.toLowerCase()
        if (/mobile|android|iphone/.test(userAgent)) {
          setDeviceType('mobile')
        } else if (/tablet|ipad/.test(userAgent)) {
          setDeviceType('tablet')
        } else {
          setDeviceType('desktop')
        }

        // Battery API
        if ('getBattery' in navigator && navigator.getBattery) {
          try {
            const battery = await navigator.getBattery()

            const updateBatteryInfo = () => {
              setBatteryLevel(Math.round(battery.level * 100))
              setIsCharging(battery.charging)
            }

            updateBatteryInfo()
            battery.addEventListener('levelchange', updateBatteryInfo)
            battery.addEventListener('chargingchange', updateBatteryInfo)

            batteryCleanup = () => {
              battery.removeEventListener('levelchange', updateBatteryInfo)
              battery.removeEventListener('chargingchange', updateBatteryInfo)
            }
          } catch (error) {
            console.log('Battery API access denied')
          }
        }

        // Network API
        const connection =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection
        if (connection) {
          const updateNetworkInfo = () => {
            const effectiveType =
              connection.effectiveType || connection.type || 'wifi'
            setNetworkType(effectiveType as NetworkType)

            if (connection.type === 'cellular' || /mobile/i.test(userAgent)) {
              const locale = navigator.language || 'vi-VN'
              if (locale.startsWith('vi')) {
                const carriers = [
                  'Viettel',
                  'Vinaphone',
                  'Mobifone',
                  'Vietnamobile',
                ]
                setCarrierName(
                  carriers[Math.floor(Math.random() * carriers.length)],
                )
              } else if (locale.startsWith('en-US')) {
                const carriers = ['Verizon', 'AT&T', 'T-Mobile', 'Sprint']
                setCarrierName(
                  carriers[Math.floor(Math.random() * carriers.length)],
                )
              } else {
                setCarrierName('Carrier')
              }
            } else {
              setCarrierName('Wi-Fi')
            }
          }

          updateNetworkInfo()
          connection.addEventListener('change', updateNetworkInfo)

          networkCleanup = () => {
            connection.removeEventListener('change', updateNetworkInfo)
          }
        }
      } catch (error) {
        console.error('Error detecting device info:', error)
      }
    }

    detectDeviceInfo()

    return () => {
      if (batteryCleanup) batteryCleanup()
      if (networkCleanup) networkCleanup()
    }
  }, [])

  // Time updates
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
      setCurrentTime(timeString)

      // Simulate battery drain if no real API
      if (!('getBattery' in navigator)) {
        setBatteryLevel((prev) => {
          const newLevel = prev - 0.1
          return newLevel < 10 ? Math.random() * 20 + 80 : newLevel
        })
      }
    }

    updateTime()
    const intervalId = setInterval(updateTime, 60000)
    return () => clearInterval(intervalId)
  }, [])

  // Event handlers
  const handleModelChange = useCallback((modelId: string) => {
    setSelectedModelId(modelId)
  }, [])

  const handlePhoneColorChange = useCallback((color: string) => {
    setPhoneColor(color)
  }, [])

  const handleShadowColorChange = useCallback((color: string) => {
    setShadowColor(color)
  }, [])

  const handleOrientationToggle = useCallback(() => {
    setOrientation((prev) => (prev === 'portrait' ? 'landscape' : 'portrait'))
  }, [])

  const handleScaleChange = useCallback((newScale: number) => {
    setScale(newScale)
  }, [])

  return {
    phoneModels,
    selectedModel,
    phoneColor,
    shadowColor,
    currentTime,
    batteryLevel,
    isCharging,
    networkType,
    carrierName,
    deviceType,
    orientation,
    scale,
    handleModelChange,
    handlePhoneColorChange,
    handleShadowColorChange,
    handleOrientationToggle,
    handleScaleChange,
  }
}
