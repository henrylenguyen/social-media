// libs/atoms/src/stepIndicator/stepIndicator.tsx
import { motion } from 'framer-motion'
import * as React from 'react'
import { cn } from 'src/utils/cn'
import './styles.css'
import useStepIndicator from './useStepIndicator'

/**
 * Style tùy chọn cho chỉ báo các bước
 */
export type IndicatorStyleType =
  | 'primary' // màu cam của theme (default) - phù hợp với nền tối
  | 'secondary' // màu xanh dương - phù hợp với nền tối
  | 'success' // màu xanh lá - phù hợp với nền tối
  | 'warning' // màu vàng - phù hợp với nền tối
  | 'white-on-dark' // màu trắng (active) trên nền tối
  | 'dark-on-light' // màu tối (active) trên nền sáng

/**
 * Màu sắc có sẵn trong hệ thống
 */
export type SystemColorType =
  | 'primary'
  | 'primary-light'
  | 'secondary'
  | 'secondary-blue'
  | 'secondary-green'
  | 'secondary-gold'
  | 'secondary-purple'
  | 'success'
  | 'error'
  | 'warning'
  | 'white'

/**
 * Vị trí hiển thị text của các bước
 */
export type TextPositionType = 'above' | 'below'

/**
 * Component hiển thị chuỗi các bước đăng ký với hiệu ứng hiển thị.
 * Bước active sẽ được hiển thị lớn hơn và có màu đậm hơn,
 * các bước còn lại sẽ nhỏ dần và nhạt dần khi càng xa bước active (nếu isGraduallySmaller=true).
 */
export interface IStepIndicatorProps {
  /**
   * Bước hiện tại đang active (bắt đầu từ 1)
   * @default 1
   */
  currentStep?: number

  /**
   * Tổng số bước trong quy trình
   * @default 3
   */
  totalSteps?: number

  /**
   * Các text hiển thị dưới mỗi bước
   * @example ["Tài khoản", "Thông tin", "Xác minh"]
   */
  stepTexts?: string[]

  /**
   * Class CSS tùy chỉnh cho container chính
   */
  containerClassName?: string

  /**
   * Kích thước cho component, có thể truyền vào 'sm', 'md', hoặc 'lg'
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Khoảng cách giữa các bước, sử dụng để điều chỉnh không gian cho text
   * @default 'md'
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Xác định có áp dụng hiệu ứng kích thước giảm dần khi xa khỏi bước active không
   * Nếu true: Các bước càng xa bước active sẽ càng nhỏ dần
   * Nếu false: Tất cả các bước đều có kích thước bằng nhau
   * @default true
   */
  isGraduallySmaller?: boolean

  /**
   * Xác định có cho phép click vào các bước để chuyển đổi không
   * @default false
   */
  isCanClick?: boolean

  /**
   * Callback được gọi khi người dùng click vào một bước khác (chỉ hoạt động khi isCanClick=true)
   * @param step Số bước được click
   */
  onStepChange?: (step: number) => void

  /**
   * Kiểu hiển thị màu sắc cho các chỉ báo bước
   * @default 'primary'
   */
  indicatorStyle?: IndicatorStyleType

  /**
   * Vị trí hiển thị text của các bước
   * @default 'below'
   */
  positionText?: TextPositionType

  /**
   * Màu sắc cho text của các bước
   * Có thể là mã màu CSS hợp lệ ("#FFF", "rgb(255, 255, 255)", v.v.)
   */
  textColor?: string

  /**
   * Màu sắc cho đường line tĩnh giữa các bước
   */
  lineColor?: SystemColorType | string

  /**
   * Màu sắc cho animation chạy trong line
   */
  lineAnimationColor?: SystemColorType | string

  /**
   * Màu sắc cho các bước bị disabled (các bước chưa active)
   */
  disabledStepColor?: SystemColorType | string
  /**
   * Màu sắc cho các bước đã hoàn thành (các bước trước bước active)
   */
  previousStepColor?: SystemColorType | string
  /**
   * Xác định có làm mờ các bước đã hoàn thành không
   * @default false
   */
  noPreviousStepBlur?: boolean
  /**
   * Màu sắc cho các bước (các bước chưa active)
   */
  stepColor?: SystemColorType | string
  
}

/**
 * Component hiển thị tiến trình các bước đăng ký với hiệu ứng thị giác.
 * Bước hiện tại sẽ được làm nổi bật với kích thước lớn hơn và màu sắc đậm hơn.
 * Các bước còn lại có thể giữ nguyên kích thước hoặc nhỏ dần tùy vào cấu hình.
 */
const StepIndicator: React.FunctionComponent<IStepIndicatorProps> = ({
  currentStep = 1,
  totalSteps = 3,
  stepTexts = [],
  containerClassName,
  size = 'md',
  spacing = 'md',
  isGraduallySmaller = true,
  isCanClick = false,
  onStepChange,
  indicatorStyle = 'primary',
  positionText = 'below',
  textColor,
  lineColor,
  lineAnimationColor,
  disabledStepColor,
  stepColor,
  previousStepColor,
  noPreviousStepBlur = false,
}) => {
  const [isClient, setIsClient] = React.useState(false)

  // Sử dụng hook để quản lý logic
  const { handleStepClick, createKeyframes } = useStepIndicator({
    currentStep,
    isCanClick,
    onStepChange,
  })

  // Chỉ chạy ở phía client
  React.useEffect(() => {
    setIsClient(true)

    // Tạo keyframes cho animation
    Array.from({ length: totalSteps }).forEach((_, index) => {
      createKeyframes(index)
    })

    // Dọn dẹp khi unmount
    return () => {
      Array.from({ length: totalSteps }).forEach((_, index) => {
        const animationName = `float-item-${index}`
        const existingStyle = document.querySelector(
          `style[data-animation="${animationName}"]`,
        )
        if (existingStyle) {
          existingStyle.remove()
        }
      })
    }
  }, [totalSteps, createKeyframes])

  // Size mapping
  const sizeMap = {
    sm: {
      active: 22,
      base: 18,
      reduction: 1,
      lineWidth: 30,
      fontSize: 11,
      textSize: 10,
    },
    md: {
      active: 26,
      base: 22,
      reduction: 1.5,
      lineWidth: 45,
      fontSize: 12,
      textSize: 11,
    },
    lg: {
      active: 30,
      base: 25,
      reduction: 2,
      lineWidth: 60,
      fontSize: 14,
      textSize: 12,
    },
  }

  // Spacing adjustments for text width
  const spacingMap = {
    xs: { gapMultiplier: 0.6, textWidth: 60 },
    sm: { gapMultiplier: 1, textWidth: 80 },
    md: { gapMultiplier: 1.5, textWidth: 100 },
    lg: { gapMultiplier: 2, textWidth: 120 },
    xl: { gapMultiplier: 2.5, textWidth: 140 },
  }

  // Style mapping cho các loại indicator
  const styleMap = {
    primary: {
      active: 'bg-primary',
      completed: 'bg-white',
      default: 'bg-white/70',
      text: {
        active: 'text-white',
        default: 'text-gray-600',
      },
      line: 'linear-gradient(to right, rgba(255, 107, 107, 0.9), rgba(255, 107, 107, 0.7))',
      stepText: {
        active: 'text-white font-medium',
        default: 'text-white/80',
      },
      boxShadow: [
        '0 0 0 0 rgba(255, 107, 107, 0.5)',
        '0 0 0 3px rgba(255, 107, 107, 0.2)',
        '0 0 0 0 rgba(255, 107, 107, 0)',
      ],
    },
    secondary: {
      active: 'bg-secondary-blue',
      completed: 'bg-white',
      default: 'bg-white/70',
      text: {
        active: 'text-white',
        default: 'text-gray-600',
      },
      line: 'linear-gradient(to right, rgba(46, 134, 222, 0.9), rgba(84, 160, 255, 0.7))',
      stepText: {
        active: 'text-white font-medium',
        default: 'text-white/80',
      },
      boxShadow: [
        '0 0 0 0 rgba(46, 134, 222, 0.5)',
        '0 0 0 3px rgba(46, 134, 222, 0.2)',
        '0 0 0 0 rgba(46, 134, 222, 0)',
      ],
    },
    success: {
      active: 'bg-success',
      completed: 'bg-white',
      default: 'bg-white/70',
      text: {
        active: 'text-white',
        default: 'text-gray-600',
      },
      line: 'linear-gradient(to right, rgba(27, 228, 161, 0.9), rgba(27, 228, 161, 0.7))',
      stepText: {
        active: 'text-white font-medium',
        default: 'text-white/80',
      },
      boxShadow: [
        '0 0 0 0 rgba(27, 228, 161, 0.5)',
        '0 0 0 3px rgba(27, 228, 161, 0.2)',
        '0 0 0 0 rgba(27, 228, 161, 0)',
      ],
    },
    warning: {
      active: 'bg-warning',
      completed: 'bg-white',
      default: 'bg-white/70',
      text: {
        active: 'text-gray-800',
        default: 'text-gray-600',
      },
      line: 'linear-gradient(to right, rgba(254, 211, 48, 0.9), rgba(254, 211, 48, 0.7))',
      stepText: {
        active: 'text-white font-medium',
        default: 'text-white/80',
      },
      boxShadow: [
        '0 0 0 0 rgba(254, 211, 48, 0.5)',
        '0 0 0 3px rgba(254, 211, 48, 0.2)',
        '0 0 0 0 rgba(254, 211, 48, 0)',
      ],
    },
    'white-on-dark': {
      active: 'bg-white',
      completed: 'bg-white/80',
      default: 'bg-white/50',
      text: {
        active: 'text-gray-800',
        default: 'text-gray-800',
      },
      line: 'linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
      stepText: {
        active: 'text-white font-medium',
        default: 'text-white/80',
      },
      boxShadow: [
        '0 0 0 0 rgba(255, 255, 255, 0.5)',
        '0 0 0 3px rgba(255, 255, 255, 0.2)',
        '0 0 0 0 rgba(255, 255, 255, 0)',
      ],
    },
    'dark-on-light': {
      active: 'bg-gray-800',
      completed: 'bg-gray-600',
      default: 'bg-gray-300',
      text: {
        active: 'text-white',
        default: 'text-gray-800',
      },
      line: 'linear-gradient(to right, rgba(51, 51, 51, 0.9), rgba(51, 51, 51, 0.7))',
      stepText: {
        active: 'text-gray-800 font-medium',
        default: 'text-gray-600',
      },
      boxShadow: [
        '0 0 0 0 rgba(51, 51, 51, 0.5)',
        '0 0 0 3px rgba(51, 51, 51, 0.2)',
        '0 0 0 0 rgba(51, 51, 51, 0)',
      ],
    },
  }

  // Map system colors to their CSS values
  const getSystemColorValue = (color?: SystemColorType | string) => {
    if (!color) return undefined

    // If it's a direct CSS color value, return it as is
    if (
      typeof color === 'string' &&
      (color.startsWith('#') ||
        color.startsWith('rgb') ||
        color.startsWith('hsl'))
    ) {
      return color
    }

    // Otherwise map the system color to a CSS value
    switch (color as SystemColorType) {
      case 'primary':
        return 'rgba(255, 107, 107, 0.9)' // FF6B6B
      case 'primary-light':
        return 'rgba(255, 158, 128, 0.9)' // FF9E80
      case 'secondary-blue':
        return 'rgba(46, 134, 222, 0.9)' // 2E86DE
      case 'secondary-green':
        return 'rgba(32, 191, 107, 0.9)' // 20BF6B
      case 'secondary-gold':
        return 'rgba(254, 211, 48, 0.9)' // FED330
      case 'secondary-purple':
        return 'rgba(156, 39, 176, 0.9)' // 9C27B0
      case 'success':
        return 'rgba(27, 228, 161, 0.9)' // 1BE4A1
      case 'error':
        return 'rgba(255, 59, 92, 0.9)' // FF3B5C
      case 'warning':
        return 'rgba(254, 211, 48, 0.9)' // FED330
      case 'white':
        return 'rgba(255, 255, 255, 0.9)' // FFFFFF
      default:
        return undefined
    }
  }

  // Create gradient for the line using the specified colors
  const getLineGradient = (baseColor?: SystemColorType | string) => {
    const color = getSystemColorValue(baseColor)
    if (!color) return undefined

    // If it's already a full CSS color value
    if (
      color.startsWith('#') ||
      color.startsWith('rgb') ||
      color.startsWith('hsl')
    ) {
      // Create a gradient by adjusting opacity for RGB or HSL
      if (color.startsWith('rgb') || color.startsWith('hsl')) {
        // For rgb/hsl format, adjust the opacity parameter
        return `linear-gradient(to right, ${color.replace(
          /[0-9.]+\)$/,
          '0.9)',
        )}, ${color.replace(/[0-9.]+\)$/, '0.7)')})`
      }
      // For hex colors, convert to rgba and create gradient
      return `linear-gradient(to right, ${color}, ${color})`
    }

    // Create a gradient from more opaque to less opaque
    return `linear-gradient(to right, ${color}, ${color.replace('0.9', '0.7')})`
  }

  const { active, base, reduction, lineWidth, fontSize, textSize } =
    sizeMap[size]
  const { gapMultiplier, textWidth } = spacingMap[spacing]
  const selectedStyle = styleMap[indicatorStyle]

  // Increase line width based on spacing choice
  const adjustedLineWidth = lineWidth * gapMultiplier

  // Custom line gradient if lineColor is specified
  const lineGradient = lineColor ? getLineGradient(lineColor) : undefined

  // Custom animation color if lineAnimationColor is specified
  const animationColor = lineAnimationColor
    ? getSystemColorValue(lineAnimationColor)
    : undefined

  return (
    <div
      className={cn(
        'signup-step-wrapper',
        containerClassName,
        indicatorStyle === 'dark-on-light' && 'dark-line',
      )}
    >
      <div className={cn('signup-step-container', `spacing-${spacing}`)}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const distanceFromCurrent = Math.abs(currentStep - stepNumber)
          const isActive = currentStep === stepNumber
          const isCompleted = stepNumber < currentStep
          const isNext = stepNumber === currentStep + 1

          // Tính toán scale và opacity dựa trên khoảng cách từ bước hiện tại
          const scale = isActive
            ? 1
            : Math.max(0.85, 1 - distanceFromCurrent * 0.05)
          const opacity = isActive
            ? 1
            : Math.max(0.7, 1 - distanceFromCurrent * 0.1)

          // Kích thước của step - tùy thuộc vào isGraduallySmaller
          let circleSize
          if (isGraduallySmaller) {
            // Nếu bật chế độ nhỏ dần, tính kích thước dựa trên khoảng cách từ bước hiện tại
            const sizeReduction = Math.min(distanceFromCurrent * reduction, 6)
            circleSize = isActive ? active : base - sizeReduction
          } else {
            // Nếu không bật chế độ nhỏ dần, chỉ có bước active lớn hơn, còn lại bằng nhau
            circleSize = isActive ? active : base
          }

          // Xác định vị trí của text
          const textPosition =
            positionText === 'above'
              ? { bottom: `${circleSize + 2}px` }
              : { top: `${circleSize + 2}px` }

          return (
            <React.Fragment key={stepNumber}>
              {stepNumber > 1 && (
                <div
                  className={cn(
                    'step-line',
                    indicatorStyle === 'dark-on-light' &&
                      'border-t border-gray-300',
                  )}
                  style={{
                    width: `${adjustedLineWidth}px`,
                    background: lineColor
                      ? getSystemColorValue(lineColor)
                      : undefined,
                    backgroundColor: lineColor
                      ? getSystemColorValue(lineColor)
                      : undefined,
                  }}
                >
                  {stepNumber <= currentStep && (
                    <motion.div
                      className='absolute top-0 bottom-0 left-0 w-full'
                      style={{
                        background: lineAnimationColor
                          ? getLineGradient(lineAnimationColor)
                          : selectedStyle.line,
                      }}
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 2,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        delay: (stepNumber - 1) * 0.5,
                      }}
                    />
                  )}
                </div>
              )}

              <div
                className={cn(
                  'step-circle-container',
                  isCanClick && 'cursor-pointer',
                )}
                style={{ width: `${Math.max(circleSize, 28)}px` }}
                onClick={() => handleStepClick(stepNumber)}
              >
                {/* Text labels above circles if position is 'above' */}
                {positionText === 'above' && stepTexts[index] && (
                  <div className='step-text-container' style={textPosition}>
                    <motion.span
                      className={cn(
                        'block text-center whitespace-normal hyphens-auto leading-tight',
                        isActive
                          ? selectedStyle.stepText.active
                          : selectedStyle.stepText.default,
                      )}
                      style={{
                        fontSize: `${textSize}px`,
                        color: textColor,
                      }}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{
                        opacity: isActive ? 1 : isNext ? 0.8 : 0.6,
                        y: 0,
                        scale: isActive ? 1 : isNext ? 0.95 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {stepTexts[index]}
                    </motion.span>
                  </div>
                )}

                <motion.div
                  className={cn(
                    'rounded-full flex items-center justify-center',
                    // Chỉ áp dụng các lớp style mặc định khi không có màu sắc tùy chỉnh
                    isActive
                      ? selectedStyle.active
                      : isCompleted && !previousStepColor
                      ? selectedStyle.completed
                      : !isActive && !isCompleted && !disabledStepColor
                      ? selectedStyle.default
                      : '',
                  )}
                  style={{
                    width: `${circleSize}px`,
                    height: `${circleSize}px`,
                    margin: '0 auto',
                    backgroundColor:
                      isCompleted && previousStepColor
                        ? getSystemColorValue(previousStepColor)
                        : !isActive && !isCompleted && disabledStepColor
                        ? getSystemColorValue(disabledStepColor)
                        : undefined,
                  }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: isClient
                      ? isCompleted && noPreviousStepBlur
                        ? 1
                        : scale
                      : 1,
                    opacity: isClient
                      ? isCompleted && noPreviousStepBlur
                        ? 1
                        : opacity
                      : 1,
                    // Chỉ áp dụng hiệu ứng boxShadow cho step đang active, không áp dụng cho bất kỳ step nào khác
                    boxShadow: isActive ? selectedStyle.boxShadow : 'none',
                    transition: {
                      duration: 0.3,
                      ease: 'easeOut',
                      boxShadow: {
                        repeat: Infinity,
                        duration: 2,
                      },
                    },
                  }}
                  whileHover={
                    isCanClick
                      ? {
                          scale: scale + 0.05,
                          transition: { duration: 0.2 },
                        }
                      : undefined
                  }
                >
                  <span
                    className={cn(
                      'font-medium',
                      isActive
                        ? selectedStyle.text.active
                        : selectedStyle.text.default,
                    )}
                    style={{
                      fontSize: `${
                        fontSize -
                        Math.min(
                          isGraduallySmaller ? distanceFromCurrent * 0.5 : 0,
                          2,
                        )
                      }px`,
                      color: stepColor
                        ? getSystemColorValue(stepColor)
                        : textColor,
                    }}
                  >
                    {stepNumber}
                  </span>
                </motion.div>

                {/* Text labels below circles if position is 'below' */}
                {positionText === 'below' && stepTexts[index] && (
                  <div className='step-text-container' style={textPosition}>
                    <motion.span
                      className={cn(
                        'block text-center whitespace-normal hyphens-auto leading-tight',
                        isActive
                          ? selectedStyle.stepText.active
                          : selectedStyle.stepText.default,
                      )}
                      style={{
                        fontSize: `${textSize}px`,
                        color: textColor,
                      }}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{
                        opacity: isActive ? 1 : isNext ? 0.8 : 0.6,
                        y: 0,
                        scale: isActive ? 1 : isNext ? 0.95 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {stepTexts[index]}
                    </motion.span>
                  </div>
                )}
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default StepIndicator
