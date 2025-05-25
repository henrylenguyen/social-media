import * as React from 'react'
import { cn } from 'src/utils'

export interface DatePickerProps {
  /**
   * Class CSS tùy chỉnh cho component
   */
  className?: string

  /**
   * Nội dung bên trong component
   */
  children?: React.ReactNode

  /**
   * Các props khác được truyền vào component
   */
  [x: string]: any
}

/**
 * Component DatePicker - Mô tả chức năng của component này
 */
const DatePicker: React.FC<DatePickerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('datePicker-container', className)} {...props}>
      {children || 'DatePicker Component'}
    </div>
  )
}

export default DatePicker
export { DatePicker }
