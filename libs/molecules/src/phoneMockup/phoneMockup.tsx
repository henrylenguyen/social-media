// libs/molecules/src/phoneMockup/phoneMockup.tsx
import * as React from 'react'
import './phoneMockup.scss'
import { usePhoneMockup } from './usePhoneMockup'

export interface PhoneMockupProps {
  /**
   * Nội dung hiển thị trong mockup điện thoại
   */
  children: React.ReactNode

  /**
   * ID của model điện thoại
   * @default 'iphone-15'
   */
  modelId?: string

  /**
   * Màu của điện thoại
   * @default '#000000'
   */
  phoneColor?: string

  /**
   * Màu bóng đổ
   * @default 'rgba(0, 0, 0, 0.5)'
   */
  shadowColor?: string

  /**
   * Class CSS tùy chỉnh
   */
  className?: string

  /**
   * Hiển thị select chọn mẫu điện thoại
   * @default true
   */
  showModelSelector?: boolean

  /**
   * Hiển thị chọn màu điện thoại
   * @default true
   */
  showColorSelector?: boolean

  /**
   * Class CSS tùy chỉnh cho container của điện thoại
   */
  phoneContainerClassName?: string

  /**
   * Kích thước tỷ lệ của điện thoại
   * @default 1
   */
  scale?: number
}

const PhoneMockup: React.FunctionComponent<PhoneMockupProps> = ({
  children,
  modelId = 'iphone-15',
  phoneColor = '#000000',
  shadowColor = 'rgba(0, 0, 0, 0.5)',
  className = '',
  phoneContainerClassName = '',
  showModelSelector = true,
  showColorSelector = true,
  scale = 1,
}) => {
  const {
    phoneModels,
    selectedModel,
    phoneColor: statePhoneColor,
    shadowColor: stateShadowColor,
    currentTime,
    handleModelChange,
    handlePhoneColorChange,
    handleShadowColorChange,
  } = usePhoneMockup({
    initialModelId: modelId,
    initialPhoneColor: phoneColor,
    initialShadowColor: shadowColor,
  })

  // Responsive width calculation based on scale factor
  const getResponsiveWidth = () => {
    return selectedModel.width * scale
  }

  // Responsive height calculation based on aspect ratio
  const getResponsiveHeight = () => {
    return selectedModel.height * scale
  }

  // Calculating bezel width based on model
  const bezelWidth = selectedModel.bezelWidth * scale

  // Content padding
  const contentPadding = selectedModel.contentPadding * scale

  // Calculate content width (screen width - padding * 2)
  const contentWidth = getResponsiveWidth() - contentPadding * 2

  // Only display notch if model has one
  const hasNotch = !!selectedModel.notchHeight

  // Determine if the model is iPhone SE (has home button)
  const hasiPhoneHomeButton = selectedModel.id === 'iphone-se'

  // Determine if model has camera cutout (e.g., Pixel or Samsung)
  const hasCameraCutout = ['pixel-7', 'galaxy-s23', 'xiaomi-13'].includes(
    selectedModel.id,
  )

  // Determine if model is foldable
  const isFoldable = selectedModel.isFoldable

  // Prepare classes
  const containerClass = `phone-mockup-container ${className || ''}`
  const phoneModelClass = `phone-model-${selectedModel.id}`
  const phoneClass = `phone-mockup-outer-container ${phoneModelClass} ${
    phoneContainerClassName || ''
  } ${isFoldable ? 'phone-foldable' : ''}`

  return (
    <div className={containerClass}>
      <div className='phone-mockup-controls'>
        {showModelSelector && (
          <div className='model-selector'>
            <select
              value={selectedModel.id}
              onChange={(e) => handleModelChange(e.target.value)}
            >
              {phoneModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {showColorSelector && (
          <div className='color-selector'>
            <div className='color-selector-item'>
              <label className='label'>Màu điện thoại</label>
              <input
                type='color'
                value={statePhoneColor}
                onChange={(e) => handlePhoneColorChange(e.target.value)}
              />
            </div>
            <div className='color-selector-item'>
              <label className='label'>Màu bóng đổ</label>
              <input
                type='color'
                value={
                  stateShadowColor.startsWith('rgba')
                    ? '#000000'
                    : stateShadowColor
                }
                onChange={(e) => handleShadowColorChange(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Outer device container */}
      <div
        className={phoneClass}
        style={{
          width: `${getResponsiveWidth() + bezelWidth * 2}px`,
          height: `${getResponsiveHeight() + bezelWidth * 2.5}px`,
          backgroundColor: statePhoneColor,
          boxShadow: `0 25px 50px -12px ${stateShadowColor}`,
        }}
      >
        {/* Fold crease for foldable phones */}
        {isFoldable && (
          <div
            className='phone-mockup-fold-crease'
            style={{
              height: `${getResponsiveHeight()}px`,
              top: `${bezelWidth}px`,
            }}
          />
        )}

        {/* Side buttons */}
        <div
          className='phone-mockup-side-button power-button'
          style={{
            top: `${80 * scale}px`,
            height: `${50 * scale}px`,
            width: `${3 * scale}px`,
            borderRadius: `${2 * scale}px`,
          }}
        />

        <div
          className='phone-mockup-side-button volume-up'
          style={{
            top: `${80 * scale}px`,
            height: `${30 * scale}px`,
            width: `${3 * scale}px`,
            borderRadius: `${2 * scale}px`,
          }}
        />

        <div
          className='phone-mockup-side-button volume-down'
          style={{
            top: `${120 * scale}px`,
            height: `${30 * scale}px`,
            width: `${3 * scale}px`,
            borderRadius: `${2 * scale}px`,
          }}
        />

        {/* Inner screen container */}
        <div
          className='phone-mockup-inner-container'
          style={{
            top: `${bezelWidth}px`,
            left: `${bezelWidth}px`,
            width: `${getResponsiveWidth()}px`,
            height: `${getResponsiveHeight()}px`,
            borderRadius: `${(selectedModel.cornerRadius - 2) * scale}px`,
          }}
        >
          {/* Camera/speaker elements */}
          {hasNotch && (
            <div
              className='phone-mockup-notch'
              style={{
                height: `${(selectedModel.notchHeight || 0) * scale}px`,
                width: `${100 * scale}px`,
                borderBottomLeftRadius: `${12 * scale}px`,
                borderBottomRightRadius: `${12 * scale}px`,
              }}
            >
              <div className='speaker' />
              <div className='camera' />
            </div>
          )}

          {hasCameraCutout && (
            <div
              className='phone-mockup-camera-cutout'
              style={{
                width: `${50 * scale}px`,
                height: `${12 * scale}px`,
              }}
            >
              <div className='camera' />
              <div className='flash' />
            </div>
          )}

          {/* Status bar */}
          <div
            className='phone-mockup-status-bar'
            style={{
              height: `${24 * scale}px`,
              paddingTop: hasCameraCutout ? `${15 * scale}px` : '0',
            }}
          >
            <div className='time' style={{ fontSize: `${12 * scale}px` }}>
              {currentTime}
            </div>
          </div>

          {/* Main content area with strictly controlled width */}
          <div className='phone-mockup-content-outer-container'>
            <div
              className='phone-mockup-content-container'
              style={{
                width: `${getResponsiveWidth()}px`,
              }}
            >
              {/* Folded area effect for foldable phones */}
              {isFoldable && <div className='phone-mockup-folded-area'></div>}

              {/* Actual content with padding applied internally */}
              <div
                className='phone-mockup-content-width-limiter'
                style={{
                  width: `${contentWidth}px`,
                  maxWidth: `${contentWidth}px`,
                  padding: `0 ${contentPadding}px`,
                }}
              >
                <div className='phone-mockup-content-wrapper'>{children}</div>
              </div>
            </div>
          </div>

          {/* Home button (iPhone SE) */}
          {hasiPhoneHomeButton && (
            <div
              className='phone-mockup-home-button'
              style={{
                width: `${40 * scale}px`,
                height: `${40 * scale}px`,
                bottom: `${10 * scale}px`,
                borderWidth: `${2 * scale}px`,
              }}
            />
          )}

          {/* Navigation bar (Android) */}
          {['pixel-7', 'galaxy-s23', 'xiaomi-13', 'galaxy-z-fold'].includes(
            selectedModel.id,
          ) && (
            <div
              className='phone-mockup-navigation-bar'
              style={{
                height: `${20 * scale}px`,
                padding: `${5 * scale}px`,
              }}
            >
              <div className='nav-buttons'>
                <div className='back' />
                <div className='home' />
                <div className='recent' />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PhoneMockup
export { PhoneMockup }
