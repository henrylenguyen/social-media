import { useState } from 'react'

// Define phone models with their dimensions
export interface PhoneModel {
  id: string
  name: string
  width: number
  height: number
  bezelWidth: number
  cornerRadius: number
  notchHeight?: number
  aspectRatio: number
}

export const phoneModels: PhoneModel[] = [
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    width: 320,
    height: 650,
    bezelWidth: 12,
    cornerRadius: 40,
    notchHeight: 32,
    aspectRatio: 19.5 / 9,
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    width: 300,
    height: 570,
    bezelWidth: 16,
    cornerRadius: 30,
    aspectRatio: 16 / 9,
  },
  {
    id: 'pixel-7',
    name: 'Google Pixel 7',
    width: 330,
    height: 670,
    bezelWidth: 10,
    cornerRadius: 35,
    notchHeight: 24,
    aspectRatio: 20 / 9,
  },
  {
    id: 'galaxy-s23',
    name: 'Samsung Galaxy S23',
    width: 340,
    height: 680,
    bezelWidth: 8,
    cornerRadius: 38,
    notchHeight: 20,
    aspectRatio: 19.3 / 9,
  },
  {
    id: 'xiaomi-13',
    name: 'Xiaomi 13',
    width: 325,
    height: 655,
    bezelWidth: 9,
    cornerRadius: 32,
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
    handleModelChange,
    handlePhoneColorChange,
    handleShadowColorChange,
  }
}
