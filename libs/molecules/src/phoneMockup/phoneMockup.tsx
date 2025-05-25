// libs/molecules/src/phoneMockup/PhoneMockupComponent.tsx

import React from 'react'
import './phoneMockup.scss'
import { deviceTypeHelpers } from './phoneModels'
import { PhoneMockupProps } from './types'
import { usePhoneMockup } from './usePhoneMockup'

const DEFAULT_CONTENT = (
  <div className='phone-default-content'>
    <div className='phone-default-icon'>📱</div>
    <div className='phone-default-title'>Phone Content</div>
    <div className='phone-default-subtitle'>Add your content here</div>
  </div>
)

const PhoneMockupComponent: React.FC<PhoneMockupProps> = ({
  children = DEFAULT_CONTENT,
  modelId = 'iphone-15',
  phoneColor = '#000000',
  shadowColor = 'rgba(0, 0, 0, 0.5)',
  className = '',
  phoneContainerClassName = '',
  showModelSelector = false,
  showColorSelector = false,
  showScaleSelector = false,
  showOrientationToggle = false,
}) => {
  const {
    phoneModels,
    selectedModel,
    phoneColor: statePhoneColor,
    shadowColor: stateShadowColor,
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
  } = usePhoneMockup({
    initialModelId: modelId,
    initialPhoneColor: phoneColor,
    initialShadowColor: shadowColor,
  })

  const baseWidth =
    orientation === 'landscape' ? selectedModel.height : selectedModel.width
  const baseHeight =
    orientation === 'landscape' ? selectedModel.width : selectedModel.height

  const outerWidth = baseWidth + selectedModel.bezelWidth * 2
  const outerHeight = baseHeight + selectedModel.bezelWidth * 2.5

  const innerWidth = baseWidth
  const innerHeight = baseHeight

  const scaledBezel = selectedModel.bezelWidth
  const scaledPadding = selectedModel.contentPadding
  const scaledCornerRadius = selectedModel.cornerRadius

  const isIOSDevice = deviceTypeHelpers.isIOSDevice(selectedModel.id)
  const hasNotch = deviceTypeHelpers.hasNotch(selectedModel.id)
  const hasTeardropNotch = deviceTypeHelpers.hasTeardropNotch(selectedModel.id)
  const hasCameraCutout = deviceTypeHelpers.hasCameraCutout(selectedModel.id)
  const hasiPhoneHomeButton = deviceTypeHelpers.hasiPhoneHomeButton(
    selectedModel.id,
  )
  const hasiOSHomeIndicator = deviceTypeHelpers.hasiOSHomeIndicator(
    selectedModel.id,
  )
  const isFoldable = deviceTypeHelpers.isFoldable(selectedModel.id)
  const isZFlipCover = deviceTypeHelpers.isZFlipCover(selectedModel.id)
  const hasAndroidNavBar = deviceTypeHelpers.hasAndroidNavBar(selectedModel.id)

  const containerClass = `phone-mockup-container ${className}`
  const phoneClass = `phone-mockup-outer-container phone-model-${
    selectedModel.id
  } orientation-${orientation} ${phoneContainerClassName} ${
    isFoldable ? 'phone-foldable' : ''
  } ${isZFlipCover ? 'phone-small-cover' : ''}`

  return (
    <div className={containerClass}>
      {/* Controls */}
      <div className='phone-mockup-controls'>
        {showModelSelector && (
          <div className='control-group'>
            <label htmlFor='model-select' className='control-label'>
              Chọn thiết bị
            </label>
            <select
              id='model-select'
              value={selectedModel.id}
              onChange={(e) => handleModelChange(e.target.value)}
              className='control-select'
            >
              {phoneModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {showScaleSelector && (
          <div className='control-group'>
            <label htmlFor='scale-select' className='control-label'>
              Kích thước hiển thị
            </label>
            <select
              id='scale-select'
              value={scale}
              onChange={(e) => handleScaleChange(Number(e.target.value))}
              className='control-select'
            >
              <option value={0.2}>20% - Rất nhỏ</option>
              <option value={0.3}>30% - Nhỏ</option>
              <option value={0.4}>40% - Nhỏ vừa</option>
              <option value={0.5}>50% - Vừa (Mặc định)</option>
              <option value={0.6}>60% - Vừa lớn</option>
              <option value={0.7}>70% - Lớn</option>
              <option value={0.8}>80% - Lớn hơn</option>
              <option value={0.9}>90% - Rất lớn</option>
              <option value={1.0}>100% - Kích thước gốc</option>
            </select>
          </div>
        )}

        {showColorSelector && (
          <div className='control-group control-group-colors'>
            <div className='control-color-item'>
              <label htmlFor='phone-color' className='control-label'>
                Màu điện thoại
              </label>
              <input
                id='phone-color'
                type='color'
                value={statePhoneColor}
                onChange={(e) => handlePhoneColorChange(e.target.value)}
                className='control-color'
              />
            </div>
            <div className='control-color-item'>
              <label htmlFor='shadow-color' className='control-label'>
                Màu bóng đổ
              </label>
              <input
                id='shadow-color'
                type='color'
                value={
                  stateShadowColor.startsWith('rgba')
                    ? '#000000'
                    : stateShadowColor
                }
                onChange={(e) => handleShadowColorChange(e.target.value)}
                className='control-color'
              />
            </div>
          </div>
        )}

        {showOrientationToggle && !isZFlipCover && (
          <div className='control-group'>
            <button
              onClick={handleOrientationToggle}
              className='control-orientation-button'
              type='button'
              title={`Rotate to ${
                orientation === 'portrait' ? 'landscape' : 'portrait'
              }`}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='currentColor'
                className={`control-rotation-icon ${orientation}`}
              >
                <path d='M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32z' />
              </svg>
              <span>
                {orientation === 'portrait' ? 'Portrait' : 'Landscape'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Phone Device - Wrapper with scaled dimensions */}
      <div
        className='phone-mockup-wrapper'
        style={{
          width: `${outerWidth * scale}px`,
          height: `${outerHeight * scale}px`,
        }}
      >
        {/* Outer container with original dimensions and scale transform */}
        <div
          className={phoneClass}
          style={{
            width: `${outerWidth}px`,
            height: `${outerHeight}px`,
            backgroundColor: statePhoneColor,
            boxShadow: `0 25px 50px -12px ${stateShadowColor}`,
            borderRadius: `${scaledCornerRadius}px`,
            transform: `scale(${scale})`,
            transformOrigin: '0 0', // Changed to top-left for predictable layout
          }}
        >
          {/* Fold crease for foldables */}
          {isFoldable && (
            <div
              className='phone-mockup-fold-crease'
              style={{
                height: `${innerHeight}px`,
                top: `${scaledBezel}px`,
              }}
            />
          )}

          {/* Side buttons */}
          <div
            className='phone-mockup-side-button power-button'
            style={{
              top: `80px`,
              height: `50px`,
              width: `3px`,
              right: `-2px`,
              borderRadius: `2px`,
            }}
          />
          <div
            className='phone-mockup-side-button volume-up'
            style={{
              top: `80px`,
              height: `30px`,
              width: `3px`,
              left: `-2px`,
              borderRadius: `2px`,
            }}
          />
          <div
            className='phone-mockup-side-button volume-down'
            style={{
              top: `120px`,
              height: `30px`,
              width: `3px`,
              left: `-2px`,
              borderRadius: `2px`,
            }}
          />

          {/* Inner screen container */}
          <div
            className='phone-mockup-inner-container'
            style={{
              top: `${scaledBezel}px`,
              left: `${scaledBezel}px`,
              width: `${innerWidth}px`,
              height: `${innerHeight}px`,
              borderRadius: `${scaledCornerRadius - 2}px`,
            }}
          >
            {/* Camera/Speaker Elements */}
            {hasNotch && (
              <div
                className='phone-mockup-notch'
                style={{
                  height: `${selectedModel.notchHeight || 0}px`,
                  width: `100px`,
                  borderBottomLeftRadius: `12px`,
                  borderBottomRightRadius: `12px`,
                }}
              >
                <div className='speaker' />
                <div className='camera' />
              </div>
            )}

            {hasTeardropNotch && (
              <div
                className='phone-mockup-teardrop-notch'
                style={{
                  width: `18px`,
                  height: `18px`,
                  top: `12px`,
                }}
              >
                <div className='camera' />
              </div>
            )}

            {hasCameraCutout && (
              <div
                className='phone-mockup-camera-cutout'
                style={{
                  width: `50px`,
                  height: `12px`,
                }}
              >
                <div className='camera' />
                <div className='flash' />
              </div>
            )}

            {/* Status Bar */}
            <div
              className='phone-mockup-status-bar'
              style={{
                height: `24px`,
                padding: `4px 12px`,
                paddingTop:
                  hasCameraCutout || hasTeardropNotch ? `15px` : `4px`,
              }}
            >
              <div className='status-left'>
                <div className='time' style={{ fontSize: `12px` }}>
                  {currentTime}
                </div>
              </div>

              <div className='status-right' style={{ gap: `4px` }}>
                {isIOSDevice ? (
                  <div className='carrier' style={{ fontSize: `11px` }}>
                    {deviceType === 'desktop' ? 'Wi-Fi' : carrierName}
                  </div>
                ) : (
                  <div className='signal-bars' style={{ gap: `1px` }}>
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`bar bar-${bar} ${
                          networkType === 'wifi' || bar <= 2 ? 'strong' : ''
                        }`}
                        style={{
                          width: `2px`,
                          height: `${bar * 2 + 1}px`,
                          borderRadius: `0.5px`,
                        }}
                      />
                    ))}
                  </div>
                )}

                <div
                  className={`wifi-icon ${
                    networkType === 'wifi' ? 'connected' : 'cellular'
                  }`}
                  style={{
                    width: `12px`,
                    height: `8px`,
                  }}
                >
                  {networkType === 'wifi' ? (
                    <svg viewBox='0 0 24 16' fill='currentColor'>
                      <path d='M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3-3 3 3-3 3-3-3zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.86 9.14 5 13z' />
                    </svg>
                  ) : (
                    <div className='cellular-bars'>
                      {[1, 2, 3, 4].map((bar) => (
                        <div key={bar} className='cellular-bar' />
                      ))}
                    </div>
                  )}
                </div>

                {!isIOSDevice && (
                  <div
                    className='battery-percentage'
                    style={{ fontSize: `10px` }}
                  >
                    {Math.round(batteryLevel)}%
                  </div>
                )}

                <div
                  className={`battery ${isCharging ? 'charging' : ''}`}
                  style={{
                    width: `18px`,
                    height: `9px`,
                    borderRadius: `1px`,
                    borderWidth: `0.5px`,
                  }}
                >
                  <div
                    className={`battery-level ${
                      batteryLevel <= 20
                        ? 'low'
                        : batteryLevel <= 50
                        ? 'medium'
                        : batteryLevel <= 90
                        ? 'high'
                        : 'full'
                    }`}
                    style={{
                      width: `${Math.max(batteryLevel, 5)}%`,
                      borderRadius: `0.5px`,
                    }}
                  />
                  {isCharging && (
                    <div
                      className='charging-indicator'
                      style={{ fontSize: `6px` }}
                    >
                      ⚡
                    </div>
                  )}
                  <div
                    className='battery-tip'
                    style={{
                      width: `1px`,
                      height: `4px`,
                      right: `-1.5px`,
                      borderRadius: `0 0.5px 0.5px 0`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className='phone-mockup-content-outer-container'>
              <div
                className='phone-mockup-content-container'
                style={{ width: `${innerWidth}px` }}
              >
                {isFoldable && <div className='phone-mockup-folded-area' />}

                <div
                  className='phone-mockup-content-width-limiter'
                  style={{
                    width: `${innerWidth - scaledPadding * 2}px`,
                    padding: `0 ${scaledPadding}px`,
                  }}
                >
                  <div className='phone-mockup-content-wrapper'>{children}</div>
                </div>
              </div>
            </div>

            {/* Bottom UI Elements */}
            {hasiPhoneHomeButton && (
              <div
                className='phone-mockup-home-button'
                style={{
                  width: `40px`,
                  height: `40px`,
                  bottom: `10px`,
                  borderWidth: `2px`,
                }}
              />
            )}

            {hasiOSHomeIndicator && (
              <div
                className='phone-mockup-ios-home-indicator'
                style={{
                  width: `134px`,
                  height: `5px`,
                  bottom: `8px`,
                  borderRadius: `3px`,
                }}
              />
            )}

            {hasAndroidNavBar && (
              <div
                className='phone-mockup-navigation-bar'
                style={{
                  height: `20px`,
                  padding: `5px`,
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
    </div>
  )
}

export default PhoneMockupComponent
