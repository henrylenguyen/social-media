import * as React from 'react'
import { cn } from 'src/utils'

export interface PhoneMockupProps {
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
 * Component PhoneMockup - Mô tả chức năng của component này
 */
const PhoneMockup: React.FC<PhoneMockupProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('phoneMockup-container', className)} {...props}>
      {children || 'PhoneMockup Component'}
    </div>
  )
}

export default PhoneMockup
export { PhoneMockup }
