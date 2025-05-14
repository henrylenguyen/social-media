import * as React from 'react'
import { cn } from 'src/utils/cn'

interface INumberStepProps {
  children?: React.ReactNode
  className?: string,
  textClassName?: string
}
/**
 * Component NumberStep là một component hiển thị số bước.
 * @param children là nội dung hiển thị bên trong component
 * @param className là className của component
 * @param textClassName là className của text hiển thị bên trong component
 * @returns {JSX.Element} Component NumberStep
 * @example <NumberStep>1</NumberStep>
 * @example <NumberStep className="bg-red-500">2</NumberStep>
 */
const NumberStep: React.FunctionComponent<INumberStepProps> = ({
  children,
  className,
  textClassName,
}) => {
  return (
    <div className={cn('w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center text-2xl', className)}>
      <span className={cn('text-primary', textClassName)}>{children || 1}</span>
    </div>
  )
}

export default NumberStep
