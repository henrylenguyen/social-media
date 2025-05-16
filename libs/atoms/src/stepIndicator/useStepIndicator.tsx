import * as React from 'react'

/**
 * Interface định nghĩa đầu vào cho hook useStepIndicator
 */
interface UseStepIndicatorProps {
  /**
   * Bước hiện tại đang active (bắt đầu từ 1)
   * @default 1
   */
  currentStep: number

  /**
   * Có cho phép click vào các bước để chuyển đổi không
   * @default false
   */
  isCanClick?: boolean

  /**
   * Callback được gọi khi người dùng click vào một bước khác
   * @param step Số bước được click
   */
  onStepChange?: (step: number) => void
}

/**
 * Hook quản lý logic hiển thị và tương tác cho component SignUpStep
 *
 * @param props Các tham số cấu hình cho hook
 * @returns Các trạng thái và hàm xử lý sự kiện
 */
export const useStepIndicator = (props: UseStepIndicatorProps) => {
  const { currentStep, isCanClick = false, onStepChange } = props

  /**
   * Xử lý sự kiện khi người dùng click vào một bước
   *
   * @param stepNumber Số thứ tự của bước được click
   */
  const handleStepClick = React.useCallback(
    (stepNumber: number) => {
      if (isCanClick && onStepChange && stepNumber !== currentStep) {
        onStepChange(stepNumber)
      }
    },
    [isCanClick, onStepChange, currentStep],
  )

  /**
   * Tạo keyframes cho animation của từng bước
   *
   * @param index Chỉ số của bước (từ 0)
   */
  const createKeyframes = React.useCallback((index: number) => {
    // Create semi-random but deterministic values based on index
    const seed = (index * 17) % 100

    // Create a unique path for this item
    // We use 3-4 control points for a more natural movement
    const path = [
      { x: 0, y: 0, rotation: 0 },
      { x: 50 + (seed % 80), y: -30 - (seed % 40), rotation: 5 },
      { x: 100 + (seed % 100), y: 20 + (seed % 30), rotation: -3 },
      { x: 50 - (seed % 50), y: 40 + (seed % 30), rotation: 2 },
      { x: 0, y: 0, rotation: 0 },
    ]

    // Create a unique animation name for this item
    const animationName = `float-item-${index}`

    // Add the keyframes to the document if it doesn't exist yet
    const existingStyle = document.querySelector(
      `style[data-animation="${animationName}"]`,
    )
    if (!existingStyle) {
      const keyframes = `
        @keyframes ${animationName} {
          0% { transform: translate(${path[0].x}px, ${path[0].y}px) rotate(${path[0].rotation}deg); }
          25% { transform: translate(${path[1].x}px, ${path[1].y}px) rotate(${path[1].rotation}deg); }
          50% { transform: translate(${path[2].x}px, ${path[2].y}px) rotate(${path[2].rotation}deg); }
          75% { transform: translate(${path[3].x}px, ${path[3].y}px) rotate(${path[3].rotation}deg); }
          100% { transform: translate(${path[4].x}px, ${path[4].y}px) rotate(${path[4].rotation}deg); }
        }
      `

      const styleElement = document.createElement('style')
      styleElement.setAttribute('data-animation', animationName)
      styleElement.textContent = keyframes
      document.head.appendChild(styleElement)
    }
  }, [])

  return {
    handleStepClick,
    createKeyframes,
  }
}

export default useStepIndicator
