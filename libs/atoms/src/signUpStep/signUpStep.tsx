import { motion } from 'framer-motion'
import * as React from 'react'
import { cn } from 'src/utils'
import './styles.css'

/**
 * Component hiển thị chuỗi các bước đăng ký với hiệu ứng hiển thị.
 * Bước active sẽ được hiển thị lớn hơn và có màu đậm hơn,
 * các bước còn lại sẽ nhỏ dần và nhạt dần khi càng xa bước active.
 */
export interface ISignUpStepProps {
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
}

/**
 * Component hiển thị tiến trình các bước đăng ký với hiệu ứng thị giác.
 * Bước hiện tại sẽ được làm nổi bật với kích thước lớn hơn và màu sắc đậm hơn.
 * Các bước càng xa bước hiện tại sẽ càng nhỏ và nhạt màu hơn.
 */
const SignUpStep: React.FunctionComponent<ISignUpStepProps> = ({
  currentStep = 1,
  totalSteps = 3,
  stepTexts = [],
  className,
  size = 'md',
  spacing = 'md',
}) => {
  // Tạo ref để lưu trữ thời gian animation cho hiệu ứng chạy liên tục
  const animatingStep = React.useRef<number>(1)

  // Sử dụng effect để cập nhật animating step
  React.useEffect(() => {
    const interval = setInterval(() => {
      animatingStep.current =
        animatingStep.current < currentStep ? animatingStep.current + 1 : 1
    }, 2000) // Thời gian để chuyển từ step này sang step tiếp theo
    return () => clearInterval(interval)
  }, [currentStep])

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
  const { gapMultiplier, textWidth } = spacingMap[spacing]

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

          // Kích thước của step
          const sizeReduction = Math.min(distanceFromCurrent * reduction, 6)
          const circleSize = isActive ? active : base - sizeReduction

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
                className='step-circle-container'
                style={{ width: `${Math.max(circleSize, 28)}px` }}
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
                    scale,
                    opacity,
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
                  whileHover={{
                    scale: scale + 0.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  <span
                    className={cn(
                      'font-medium',
                      isActive ? 'text-white' : 'text-gray-600',
                    )}
                    style={{
                      fontSize: `${
                        fontSize - Math.min(distanceFromCurrent * 0.5, 2)
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

export default SignUpStep
