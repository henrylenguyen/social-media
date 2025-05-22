// libs/molecules/src/phoneMockup/phoneModels.ts

import { PhoneModel } from './types'

export const phoneModels: PhoneModel[] = [
  // iPhone Models
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    width: 590,
    height: 1278,
    bezelWidth: 12,
    cornerRadius: 40,
    notchHeight: 32,
    contentPadding: 15,
    aspectRatio: 590 / 1278,
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE (2022)',
    width: 375,
    height: 667,
    bezelWidth: 16,
    cornerRadius: 30,
    contentPadding: 15,
    aspectRatio: 375 / 667,
  },
  {
    id: 'iphone-xr',
    name: 'iPhone XR',
    width: 414,
    height: 896,
    bezelWidth: 14,
    cornerRadius: 38,
    notchHeight: 36,
    contentPadding: 15,
    aspectRatio: 414 / 896,
  },
  {
    id: 'iphone-12-pro',
    name: 'iPhone 12 Pro',
    width: 585,
    height: 1266,
    bezelWidth: 10,
    cornerRadius: 35,
    notchHeight: 30,
    contentPadding: 15,
    aspectRatio: 585 / 1266,
  },
  // Google Pixel
  {
    id: 'pixel-7',
    name: 'Google Pixel 7',
    width: 432,
    height: 960,
    bezelWidth: 10,
    cornerRadius: 35,
    notchHeight: 24,
    contentPadding: 15,
    aspectRatio: 432 / 960,
  },
  // Samsung Galaxy
  {
    id: 'galaxy-s23',
    name: 'Samsung Galaxy S23',
    width: 360,
    height: 780,
    bezelWidth: 8,
    cornerRadius: 38,
    notchHeight: 20,
    contentPadding: 15,
    aspectRatio: 360 / 780,
  },
  {
    id: 'galaxy-a51',
    name: 'Samsung Galaxy A51',
    width: 360,
    height: 800,
    bezelWidth: 11,
    cornerRadius: 32,
    notchHeight: 18,
    contentPadding: 15,
    aspectRatio: 360 / 800,
  },
  // Samsung Foldables
  {
    id: 'galaxy-z-fold-main',
    name: 'Galaxy Z Fold 5 (Main)',
    width: 906,
    height: 1088,
    bezelWidth: 10,
    cornerRadius: 30,
    notchHeight: 20,
    contentPadding: 15,
    isFoldable: true,
    aspectRatio: 906 / 1088,
  },
  {
    id: 'galaxy-z-fold-cover',
    name: 'Galaxy Z Fold 5 (Cover)',
    width: 452,
    height: 1158,
    bezelWidth: 12,
    cornerRadius: 25,
    notchHeight: 18,
    contentPadding: 15,
    aspectRatio: 452 / 1158,
  },
  {
    id: 'galaxy-z-flip-main',
    name: 'Galaxy Z Flip 5 (Main)',
    width: 540,
    height: 1320,
    bezelWidth: 8,
    cornerRadius: 35,
    notchHeight: 22,
    contentPadding: 15,
    isFoldable: true,
    aspectRatio: 540 / 1320,
  },
  {
    id: 'galaxy-z-flip-cover',
    name: 'Galaxy Z Flip 5 (Cover)',
    width: 360,
    height: 374,
    bezelWidth: 6,
    cornerRadius: 20,
    contentPadding: 10,
    aspectRatio: 360 / 374,
  },
  // Xiaomi
  {
    id: 'xiaomi-13',
    name: 'Xiaomi 13',
    width: 480,
    height: 1068,
    bezelWidth: 9,
    cornerRadius: 32,
    contentPadding: 15,
    aspectRatio: 480 / 1068,
  },
]

export const getPhoneModelById = (id: string): PhoneModel | undefined => {
  return phoneModels.find((model) => model.id === id)
}

export const deviceTypeHelpers = {
  isIOSDevice: (modelId: string): boolean =>
    ['iphone-15', 'iphone-se', 'iphone-xr', 'iphone-12-pro'].includes(modelId),

  hasiPhoneHomeButton: (modelId: string): boolean => modelId === 'iphone-se',

  hasiOSHomeIndicator: (modelId: string): boolean =>
    ['iphone-15', 'iphone-xr', 'iphone-12-pro'].includes(modelId),

  hasNotch: (modelId: string): boolean => {
    const model = getPhoneModelById(modelId)
    return !!model?.notchHeight && modelId !== 'galaxy-a51'
  },

  hasTeardropNotch: (modelId: string): boolean => modelId === 'galaxy-a51',

  hasCameraCutout: (modelId: string): boolean =>
    ['pixel-7', 'galaxy-s23', 'xiaomi-13'].includes(modelId),

  isFoldable: (modelId: string): boolean => {
    const model = getPhoneModelById(modelId)
    return !!model?.isFoldable
  },

  isZFlipCover: (modelId: string): boolean => modelId === 'galaxy-z-flip-cover',

  hasAndroidNavBar: (modelId: string): boolean =>
    [
      'pixel-7',
      'galaxy-s23',
      'xiaomi-13',
      'galaxy-z-fold-main',
      'galaxy-z-fold-cover',
      'galaxy-a51',
      'galaxy-z-flip-main',
    ].includes(modelId),
}
