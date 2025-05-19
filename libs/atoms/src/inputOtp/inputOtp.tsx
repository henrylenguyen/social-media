import { OTPInput, OTPInputContext } from 'input-otp'
import * as React from 'react'
import { cn } from 'src/utils'

// Định nghĩa context để truyền trạng thái error và disabled
interface InputOTPContextType {
  error?: boolean
  disabled?: boolean
}

const InputOTPContext = React.createContext<InputOTPContextType>({})

// Thành phần chính InputOTP
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput> & { error?: boolean }
>(({ className, containerClassName, error, disabled, ...props }, ref) => (
  <InputOTPContext.Provider value={{ error, disabled }}>
    <OTPInput
      ref={ref}
      containerClassName={cn(
        'flex items-center gap-2 has-[:disabled]:opacity-50',
        containerClassName,
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      disabled={disabled}
      {...props}
    />
  </InputOTPContext.Provider>
))
InputOTP.displayName = 'InputOTP'

// Nhóm các slot OTP
const InputOTPGroup = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
))
InputOTPGroup.displayName = 'InputOTPGroup'

// Slot đơn lẻ để nhập ký tự OTP
const InputOTPSlot = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]
  const { error, disabled } = React.useContext(InputOTPContext)

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-12 w-10 items-center justify-center border-solid border border-input text-sm transition-all  rounded-md ',
        isActive && 'z-10 border-primary ring-2 ring-primary/20',
        error && 'border-red-500',
        disabled && 'bg-gray-100 text-gray-400',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = 'InputOTPSlot'

// Dấu phân cách giữa các nhóm slot
const InputOTPSeparator = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ children, ...props }, ref) => (
  <div
    ref={ref}
    role='separator'
    className='flex items-center justify-center w-4 h-12'
    {...props}
  >
    {children || <span className='text-lg text-muted-foreground'>-</span>}
  </div>
))
InputOTPSeparator.displayName = 'InputOTPSeparator'

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
