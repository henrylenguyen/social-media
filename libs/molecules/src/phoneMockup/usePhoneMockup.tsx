// libs/molecules/src/phoneMockup/usePhoneMockup.tsx
import { useEffect, useState } from 'react'

// Define phone models with their dimensions
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

export const phoneModels: PhoneModel[] = [
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    width: 425 - 24,
    height: 810 - 30,
    bezelWidth: 12,
    cornerRadius: 40,
    notchHeight: 32,
    contentPadding: 15,
    aspectRatio: 19.5 / 9,
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    width: 410 - 32,
    height: 685 - 40,
    bezelWidth: 16,
    cornerRadius: 30,
    contentPadding: 15,
    aspectRatio: 16 / 9,
  },
  {
    id: 'iphone-xr',
    name: 'iPhone XR',
    width: 415 - 20,
    height: 795 - 25,
    bezelWidth: 14,
    cornerRadius: 38,
    notchHeight: 36,
    contentPadding: 15,
    aspectRatio: 19.5 / 9,
  },
  {
    id: 'iphone-12-pro',
    name: 'iPhone 12 Pro',
    width: 410 - 18,
    height: 800 - 22,
    bezelWidth: 10,
    cornerRadius: 35,
    notchHeight: 30,
    contentPadding: 15,
    aspectRatio: 19.5 / 9,
  },
  {
    id: 'pixel-7',
    name: 'Google Pixel 7',
    width: 420 - 20,
    height: 805 - 25,
    bezelWidth: 10,
    cornerRadius: 35,
    notchHeight: 24,
    contentPadding: 15,
    aspectRatio: 20 / 9,
  },
  {
    id: 'galaxy-s23',
    name: 'Samsung Galaxy S23',
    width: 410 - 16,
    height: 800 - 20,
    bezelWidth: 8,
    cornerRadius: 38,
    notchHeight: 20,
    contentPadding: 15,
    aspectRatio: 19.3 / 9,
  },
  {
    id: 'galaxy-a51',
    name: 'Samsung Galaxy A51',
    width: 425 - 22,
    height: 815 - 28,
    bezelWidth: 11,
    cornerRadius: 32,
    notchHeight: 18, // Teardrop notch is smaller
    contentPadding: 15,
    aspectRatio: 20 / 9,
  },
  {
    id: 'galaxy-z-fold',
    name: 'Samsung Galaxy Z Fold',
    width: 470 - 20,
    height: 865 - 25,
    bezelWidth: 10,
    cornerRadius: 30,
    notchHeight: 20,
    contentPadding: 15,
    isFoldable: true,
    aspectRatio: 22.5 / 9,
  },
  {
    id: 'xiaomi-13',
    name: 'Xiaomi 13',
    width: 420 - 18,
    height: 800 - 22.5,
    bezelWidth: 9,
    cornerRadius: 32,
    contentPadding: 15,
    aspectRatio: 20 / 9,
  },
]

export interface UsePhoneMockupProps {
  initialModelId?: string
  initialPhoneColor?: string
  initialShadowColor?: string
}

export const usePhoneMockup = ({
  initialModelId = 'iphone-15',
  initialPhoneColor = '#000000',
  initialShadowColor = 'rgba(0, 0, 0, 0.5)',
}: UsePhoneMockupProps = {}) => {
  const [selectedModelId, setSelectedModelId] = useState(initialModelId)
  const [phoneColor, setPhoneColor] = useState(initialPhoneColor)
  const [shadowColor, setShadowColor] = useState(initialShadowColor)
  const [currentTime, setCurrentTime] = useState('')
  const [batteryLevel, setBatteryLevel] = useState(75) // Battery percentage

  // Update current time and battery
  useEffect(() => {
    const updateTimeAndBattery = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()

      // Format time based on 24h format
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
      setCurrentTime(timeString)

      // Simulate battery drain (optional - you can remove this)
      setBatteryLevel((prev) => {
        const newLevel = prev - 0.1 // Drain 0.1% every minute
        return newLevel < 10 ? Math.random() * 20 + 80 : newLevel // Reset when too low
      })
    }

    updateTimeAndBattery() // Initial update
    const intervalId = setInterval(updateTimeAndBattery, 60000) // Update every minute

    return () => clearInterval(intervalId)
  }, [])

  const selectedModel =
    phoneModels.find((model) => model.id === selectedModelId) || phoneModels[0]

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId)
  }

  const handlePhoneColorChange = (color: string) => {
    setPhoneColor(color)
  }

  const handleShadowColorChange = (color: string) => {
    setShadowColor(color)
  }

  return {
    phoneModels,
    selectedModel,
    phoneColor,
    shadowColor,
    currentTime,
    batteryLevel,
    handleModelChange,
    handlePhoneColorChange,
    handleShadowColorChange,
  }
}
