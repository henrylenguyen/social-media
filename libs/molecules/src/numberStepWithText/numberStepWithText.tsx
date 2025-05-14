import { NumberStep } from '@social-media/atoms'
import * as React from 'react'
import { cn } from 'src/utils/cn'

/**
 * Component hiển thị một số bước (number step) kèm theo văn bản.
 * Thường được sử dụng trong quy trình đa bước hoặc wizard để dẫn dắt người dùng.
 *
 * @example
 * ```tsx
 * <NumberStepWithText step={1}>
 *   Vui lòng điền thông tin cá nhân
 * </NumberStepWithText>
 * ```
 */
export interface NumberStepWithTextProps {
  /**
   * Nội dung văn bản hiển thị bên cạnh số bước.
   * Thường là hướng dẫn cho người dùng ở bước hiện tại.
   */
  children?: React.ReactNode

  /**
   * Class CSS tùy chỉnh cho container chính.
   * Dùng để thay đổi kiểu dáng của toàn bộ component.
   */
  className?: string

  /**
   * Số hiển thị trong vòng tròn step.
   * Có thể là số hoặc chuỗi (nếu muốn hiển thị ký tự đặc biệt).
   *
   * @default 1
   */
  step?: number | string

  /**
   * Class CSS tùy chỉnh cho phần văn bản.
   * Dùng để tùy chỉnh kiểu dáng riêng cho phần text.
   */
  textClassName?: string
}

/**
 * Component kết hợp giữa số bước (NumberStep) và văn bản hướng dẫn.
 * Hữu ích cho các quy trình từng bước như đăng ký, thanh toán, v.v.
 */
const NumberStepWithText: React.FC<NumberStepWithTextProps> = ({
  children,
  className,
  step = 1,
  textClassName,
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <NumberStep className='flex-shrink-0'>{step}</NumberStep>
      <p className={cn('text-2xl font-bold text-white', textClassName)}>
        {children}
      </p>
    </div>
  )
}

export default NumberStepWithText
