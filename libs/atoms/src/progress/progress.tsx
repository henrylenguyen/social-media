import * as React from 'react'
import { cn } from 'src/utils/cn' // Đảm bảo đường dẫn này chính xác
import './styles.css' // Import file CSS cho hiệu ứng sọc

/**
 * Các loại màu sắc có sẵn cho Progress bar.
 */
export type ProgressColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'

/**
 * Props cho Progress component.
 */
export interface IProgressProps {
  /**
   * Giá trị hiện tại của thanh tiến trình (từ 0 đến 100).
   * @default 0
   */
  value?: number

  /**
   * Kích thước của thanh tiến trình.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Màu sắc chủ đạo của thanh tiến trình.
   * Có thể là một màu trong theme hoặc một mã màu CSS bất kỳ.
   * @default 'primary'
   */
  color?: ProgressColorType | string

  /**
   * Có hiển thị giá trị phần trăm dưới dạng văn bản hay không.
   * @default false
   */
  showValue?: boolean

  /**
   * Class CSS tùy chỉnh cho container bên ngoài.
   */
  className?: string

  /**
   * Class CSS tùy chỉnh cho thanh chỉ báo tiến trình.
   */
  indicatorClassName?: string

  /**
   * Có thêm hiệu ứng sọc mờ hay không.
   * @default false
   */
  striped?: boolean

  /**
   * Có tạo hiệu ứng chuyển động cho sọc hay không (chỉ hoạt động khi `striped` là true).
   * @default false
   */
  animated?: boolean

  /**
   * Text label hiển thị bên cạnh giá trị (nếu `showValue` là true).
   */
  valueLabel?: string
}

/**
 * Component Progress hiển thị một thanh tiến trình tuyến tính.
 * Nó cung cấp các tùy chọn về kích thước, màu sắc, và có thể hiển thị giá trị hiện tại.
 */
const Progress: React.FunctionComponent<IProgressProps> = ({
  value = 0,
  size = 'md',
  color = 'primary',
  showValue = false,
  className,
  indicatorClassName,
  striped = false,
  animated = false,
  valueLabel = '%',
}) => {
  // Đảm bảo giá trị nằm trong khoảng 0-100
  const progressValue = Math.max(0, Math.min(100, value))

  // Mapping kích thước sang class Tailwind
  const sizeMap = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  // Mapping màu sắc theme sang class Tailwind
  const colorMap: Record<ProgressColorType, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary-blue',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-blue-500', // Màu info mẫu
  }

  // Kiểm tra xem có phải màu tùy chỉnh không
  const isCustomColor = !Object.keys(colorMap).includes(color)
  const indicatorColorClass = isCustomColor
    ? ''
    : colorMap[color as ProgressColorType]

  return (
    <div className={cn('w-full flex items-center gap-3', className)}>
      {/* Thanh nền */}
      <div
        className={cn(
          'w-full bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden',
          sizeMap[size],
        )}
      >
        {/* Thanh chỉ báo tiến trình */}
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out text-center text-white text-xs font-medium',
            sizeMap[size],
            indicatorColorClass,
            striped && 'progress-striped',
            animated && striped && 'progress-striped-animated', // Chỉ animate khi có striped
            indicatorClassName,
          )}
          style={{
            width: `${progressValue}%`,
            // Áp dụng màu tùy chỉnh nếu có
            backgroundColor: isCustomColor ? color : undefined,
          }}
        ></div>
      </div>
      {/* Hiển thị giá trị phần trăm (nếu được bật) */}
      {showValue && (
        <span
          className={cn(
            'text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right',
          )}
        >
          {progressValue}
          {valueLabel}
        </span>
      )}
    </div>
  )
}

export default Progress
