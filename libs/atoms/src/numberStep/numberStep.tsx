import * as React from 'react'
import { cn } from 'src/utils/cn'

/**
 * Component hiển thị một số bước trong quy trình đa bước.
 * Thường được sử dụng như một phần của quy trình wizard hoặc stepper.
 *
 * @example
 * ```tsx
 * <NumberStep>1</NumberStep>
 * <NumberStep className="bg-blue-500 text-white">2</NumberStep>
 * ```
 */
export interface INumberStepProps {
  /**
   * Nội dung hiển thị bên trong vòng tròn số bước.
   * Thường là số hoặc biểu tượng thể hiện bước hiện tại.
   *
   * @default 1
   */
  children?: React.ReactNode

  /**
   * Class CSS tùy chỉnh cho container chính.
   * Dùng để thay đổi kiểu dáng của vòng tròn số bước.
   */
  className?: string

  /**
   * Class CSS tùy chỉnh cho phần văn bản số.
   * Dùng để tùy chỉnh kiểu dáng riêng cho con số bên trong.
   */
  textClassName?: string
}

/**
 * Component hiển thị một số bước trong vòng tròn.
 * Có thể kết hợp với các component khác để tạo stepper hoặc hiển thị quy trình.
 */
const NumberStep: React.FunctionComponent<INumberStepProps> = ({
  children,
  className,
  textClassName,
}) => {
  return (
    <div
      className={cn(
        'w-[50px] h-[50px] rounded-full bg-primary-gradient-to-right flex items-center justify-center text-2xl',
        className,
      )}
    >
      <span className={cn('text-white', textClassName)}>{children || 1}</span>
    </div>
  )
}

export default NumberStep
