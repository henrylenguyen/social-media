import { motion } from 'framer-motion'
import * as React from 'react'
import { cn } from 'src/utils'

/**
 * Component hiển thị chuỗi các bước đăng ký với hiệu ứng hiển thị.
 * Bước active sẽ được hiển thị lớn hơn và có màu đậm hơn,
 * các bước còn lại sẽ nhỏ dần và nhạt dần khi càng xa bước active.
 *
 * @example
 * ```tsx
 * <SignUpStep currentStep={2} totalSteps={4} />
 * <SignUpStep currentStep={1} totalSteps={3} className="my-4" />
 * ```
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
   * Chỉ hiển thị text cho step hiện tại và step tiếp theo
   * @default true
   */
  showCurrentAndNextTextOnly?: boolean
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
  showCurrentAndNextTextOnly = true,
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
      lineWidth: 10,
      fontSize: 11,
      textSize: 10,
      gap: 0,
    },
    md: {
      active: 26,
      base: 22,
      reduction: 1.5,
      lineWidth: 15,
      fontSize: 12,
      textSize: 11,
      gap: 0.5,
    },
    lg: {
      active: 30,
      base: 25,
      reduction: 2,
      lineWidth: 20,
      fontSize: 14,
      textSize: 12,
      gap: 1,
    },
  }

  const { active, base, reduction, lineWidth, fontSize, textSize, gap } =
    sizeMap[size]

  return (
    <div className={cn('flex flex-col w-full', className)}>
      {/* Circles and connecting lines */}
      <div className={`flex items-center justify-center gap-${gap}`}>
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

          // Xác định xem có nên hiển thị text hay không
          const shouldShowText =
            stepTexts[index] &&
            (!showCurrentAndNextTextOnly || isActive || isNext || isCompleted)

          return (
            <React.Fragment key={stepNumber}>
              {stepNumber > 1 && (
                <div
                  className='flex-shrink-0'
                  style={{ width: `${lineWidth}px` }}
                >
                  <div className='h-[1.5px] w-full bg-white/70 relative overflow-hidden'>
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
                </div>
              )}
              <div
                className='flex-shrink-0 relative'
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

                {/* Text labels below circles */}
                {shouldShowText && (
                  <motion.div
                    className='absolute left-1/2 transform -translate-x-1/2 mt-1'
                    style={{
                      top: `${circleSize + 2}px`,
                      width:
                        size === 'sm'
                          ? '65px'
                          : size === 'md'
                          ? '75px'
                          : '85px',
                    }}
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
                        opacity: isActive
                          ? 1
                          : isNext
                          ? 0.8
                          : isCompleted
                          ? 0.6
                          : 0,
                        y: 0,
                        scale: isActive ? 1 : isNext ? 0.95 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {stepTexts[index]}
                    </motion.span>
                  </motion.div>
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
