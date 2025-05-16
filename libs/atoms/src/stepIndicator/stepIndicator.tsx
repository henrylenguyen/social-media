import { motion } from 'framer-motion'
import * as React from 'react'
import { cn } from 'src/utils/cn'
import './styles.css'
import useStepIndicator from './useStepIndicator'

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
  className?: string

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
  className,
  size = 'md',
  spacing = 'md',
  isGraduallySmaller = true,
  isCanClick = false,
  onStepChange,
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

  const { active, base, reduction, lineWidth, fontSize, textSize } =
    sizeMap[size]
  const { gapMultiplier } = spacingMap[spacing]

  // Increase line width based on spacing choice
  const adjustedLineWidth = lineWidth * gapMultiplier

  return (
    <div className={cn('signup-step-wrapper', className)}>
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

          return (
            <React.Fragment key={stepNumber}>
              {stepNumber > 1 && (
                <div
                  className='step-line'
                  style={{ width: `${adjustedLineWidth}px` }}
                >
                  {stepNumber <= currentStep && (
                    <motion.div
                      className='absolute top-0 bottom-0 left-0 w-full'
                      style={{
                        background:
                          'linear-gradient(to right, rgba(255, 107, 107, 0.9), rgba(255, 107, 107, 0.7))',
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
                <motion.div
                  className={cn(
                    'rounded-full flex items-center justify-center',
                    isActive
                      ? 'bg-primary'
                      : isCompleted
                      ? 'bg-white'
                      : 'bg-white/70',
                  )}
                  style={{
                    width: `${circleSize}px`,
                    height: `${circleSize}px`,
                    margin: '0 auto',
                  }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: isClient ? scale : 1,
                    opacity: isClient ? opacity : 1,
                    boxShadow: isActive
                      ? [
                          '0 0 0 0 rgba(255, 107, 107, 0.5)',
                          '0 0 0 3px rgba(255, 107, 107, 0.2)',
                          '0 0 0 0 rgba(255, 107, 107, 0)',
                        ]
                      : 'none',
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
                      isActive ? 'text-white' : 'text-gray-600',
                    )}
                    style={{
                      fontSize: `${
                        fontSize -
                        Math.min(
                          isGraduallySmaller ? distanceFromCurrent * 0.5 : 0,
                          2,
                        )
                      }px`,
                    }}
                  >
                    {stepNumber}
                  </span>
                </motion.div>

                {/* Text labels below circles - now always shows */}
                {stepTexts[index] && (
                  <div
                    className='step-text-container'
                    style={{ top: `${circleSize + 2}px` }}
                  >
                    <motion.span
                      className={cn(
                        'block text-center whitespace-normal hyphens-auto leading-tight',
                        isActive ? 'text-white font-medium' : 'text-white/80',
                      )}
                      style={{
                        fontSize: `${textSize}px`,
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
