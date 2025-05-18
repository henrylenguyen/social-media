import { Input } from '@social-media/atoms'
import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from 'src/utils'

// SVG Icons as components to avoid repetition
const CheckIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='10'
    height='10'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='20 6 9 17 4 12'></polyline>
  </svg>
)

const XIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='8'
    height='8'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='18' y1='6' x2='6' y2='18'></line>
    <line x1='6' y1='6' x2='18' y2='18'></line>
  </svg>
)

/**
 * Interface định nghĩa cấu trúc của đối tượng trạng thái độ mạnh của mật khẩu
 */
export interface PasswordStrength {
  /** Kiểm tra độ dài tối thiểu */
  length: boolean
  /** Kiểm tra có chữ in hoa không */
  uppercase: boolean
  /** Kiểm tra có chữ thường không */
  lowercase: boolean
  /** Kiểm tra có số không */
  number: boolean
  /** Kiểm tra có ký tự đặc biệt không */
  specialChar: boolean
  /** Có hiển thị chỉ báo hay không */
  showIndicator: boolean
}

/**
 * Interface định nghĩa các yêu cầu cụ thể cho mật khẩu
 */
export interface PasswordRequirements {
  /** Độ dài tối thiểu của mật khẩu */
  minLength: number
  /** Regex kiểm tra chữ in hoa */
  hasUppercase: RegExp
  /** Regex kiểm tra chữ thường */
  hasLowercase: RegExp
  /** Regex kiểm tra số */
  hasNumber: RegExp
  /** Regex kiểm tra ký tự đặc biệt */
  hasSpecialChar: RegExp
}

/**
 * Interface chứa các props của component PasswordInput
 */
export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Hiển thị chỉ báo độ mạnh của mật khẩu
   * @default true
   */
  showStrengthIndicator?: boolean

  /**
   * Class tùy chỉnh cho container
   */
  containerClassName?: string

  /**
   * Các yêu cầu tùy chỉnh cho mật khẩu
   * Nếu không cung cấp, sẽ sử dụng yêu cầu mặc định
   */
  requirements?: Partial<PasswordRequirements>

  /**
   * Định dạng chuỗi hiển thị cho chỉ báo độ mạnh
   * @default "Mật khẩu phải có:"
   */
  indicatorLabel?: string

  /**
   * Mảng chuỗi tùy chỉnh cho từng yêu cầu, theo thứ tự:
   * [độ dài, chữ hoa, chữ thường, số, ký tự đặc biệt]
   */
  requirementLabels?: [string, string, string, string, string]

  /**
   * Callback được gọi khi độ mạnh của mật khẩu thay đổi
   * @param strength Đối tượng chứa trạng thái độ mạnh của mật khẩu
   */
  onStrengthChange?: (strength: PasswordStrength) => void
}

/**
 * Component nhập mật khẩu với chỉ báo độ mạnh.
 * Hiển thị các yêu cầu về mật khẩu và cập nhật trạng thái đáp ứng.
 * Tích hợp hoàn toàn với React Hook Form.
 *
 * @example Cách sử dụng cơ bản
 * ```tsx
 * <PasswordInput placeholder="Nhập mật khẩu" />
 * ```
 *
 * @example Sử dụng với React Hook Form
 * ```tsx
 * <FormField
 *   control={form.control}
 *   name="password"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Mật khẩu</FormLabel>
 *       <FormControl>
 *         <PasswordInput {...field} />
 *       </FormControl>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      showStrengthIndicator = true,
      containerClassName,
      requirements,
      indicatorLabel = 'Mật khẩu phải có:',
      requirementLabels = [
        'Ít nhất 8 ký tự',
        'Ít nhất 1 chữ cái viết hoa',
        'Ít nhất 1 chữ cái viết thường',
        'Ít nhất 1 số',
        'Ít nhất 1 ký tự đặc biệt',
      ],
      className,
      onChange,
      onStrengthChange,
      value,
      name,
      ...props
    },
    ref,
  ) => {
    // Kiểm tra xem component có được sử dụng trong React Hook Form không
    const formContext = useFormContext()
    const inFormContext = formContext && name ? true : false

    // Định nghĩa trạng thái mặc định cho độ mạnh
    const [passwordStrength, setPasswordStrength] =
      React.useState<PasswordStrength>({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
        showIndicator: false,
      })

    // State cho việc hiển thị/ẩn mật khẩu
    const [showPassword, setShowPassword] = React.useState(false)

    // State để lưu trữ giá trị mật khẩu khi không sử dụng trong form context
    const [localValue, setLocalValue] = React.useState(value || '')

    // Yêu cầu mặc định cho mật khẩu
    const defaultRequirements: PasswordRequirements = {
      minLength: 8,
      hasUppercase: /[A-Z]/,
      hasLowercase: /[a-z]/,
      hasNumber: /\d/,
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?\\~`]/,
    }

    // Kết hợp yêu cầu mặc định với yêu cầu tùy chỉnh
    const passwordRequirements: PasswordRequirements = {
      ...defaultRequirements,
      ...requirements,
    }

    // Cập nhật mật khẩu từ form nếu nó thay đổi
    React.useEffect(() => {
      if (value !== undefined && value !== localValue) {
        setLocalValue(value as string)
        updatePasswordStrength(value as string)
      }
    }, [value])

    // Hàm để cập nhật trạng thái độ mạnh mật khẩu
    const updatePasswordStrength = (password: string) => {
      // Chỉ cập nhật nếu người dùng đã nhập ít nhất 1 ký tự
      const shouldShowIndicator = password.length > 0

      // Kiểm tra độ mạnh mật khẩu
      const strength: PasswordStrength = {
        length: password.length >= passwordRequirements.minLength,
        uppercase: passwordRequirements.hasUppercase.test(password),
        lowercase: passwordRequirements.hasLowercase.test(password),
        number: passwordRequirements.hasNumber.test(password),
        specialChar: passwordRequirements.hasSpecialChar.test(password),
        showIndicator: shouldShowIndicator,
      }

      // Cập nhật state
      setPasswordStrength(strength)

      // Gọi callback nếu được cung cấp
      if (onStrengthChange) {
        onStrengthChange(strength)
      }
    }

    // Xử lý sự kiện khi giá trị input thay đổi
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value

      // Cập nhật giá trị local nếu không sử dụng trong form context
      if (!inFormContext) {
        setLocalValue(newValue)
      }

      // Cập nhật độ mạnh mật khẩu
      updatePasswordStrength(newValue)

      // Gọi onChange từ props nếu được cung cấp
      if (onChange) {
        onChange(e)
      }
    }

    // Xử lý việc hiển thị/ẩn mật khẩu
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    // Lấy giá trị hiện tại của mật khẩu
    const currentValue =
      inFormContext && name ? formContext.getValues(name) || '' : localValue

    return (
      <div className={cn('space-y-2', containerClassName)}>
        <div className='relative'>
          <Input
            type={showPassword ? 'text' : 'password'}
            className={cn('pr-10', className)}
            onChange={handleChange}
            ref={ref}
            value={inFormContext && name ? undefined : localValue}
            name={name}
            {...props}
          />
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500'
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className='h-5 w-5' />
            ) : (
              <Eye className='h-5 w-5' />
            )}
          </button>
        </div>

        {/* Chỉ báo độ mạnh mật khẩu - hiển thị khi người dùng đã nhập mật khẩu */}
        {showStrengthIndicator && passwordStrength.showIndicator && (
          <div className='mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md'>
            <p className='text-xs font-medium text-gray-700 mb-2'>
              {indicatorLabel}
            </p>
            <ul className='space-y-1'>
              <li className='flex items-center text-xs'>
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full ${
                    passwordStrength.length
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-white'
                  }`}
                >
                  {passwordStrength.length ? <CheckIcon /> : <XIcon />}
                </span>
                <span
                  className={
                    passwordStrength.length
                      ? 'text-green-600 font-bold'
                      : 'text-gray-600'
                  }
                >
                  {passwordRequirements.minLength
                    ? `Ít nhất ${passwordRequirements.minLength} ký tự`
                    : requirementLabels[0]}
                </span>
              </li>
              <li className='flex items-center text-xs'>
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full ${
                    passwordStrength.uppercase
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-white'
                  }`}
                >
                  {passwordStrength.uppercase ? <CheckIcon /> : <XIcon />}
                </span>
                <span
                  className={
                    passwordStrength.uppercase
                      ? 'text-green-600 font-bold'
                      : 'text-gray-600'
                  }
                >
                  {requirementLabels[1]}
                </span>
              </li>
              <li className='flex items-center text-xs'>
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full ${
                    passwordStrength.lowercase
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-white'
                  }`}
                >
                  {passwordStrength.lowercase ? <CheckIcon /> : <XIcon />}
                </span>
                <span
                  className={
                    passwordStrength.lowercase
                      ? 'text-green-600 font-bold'
                      : 'text-gray-600'
                  }
                >
                  {requirementLabels[2]}
                </span>
              </li>
              <li className='flex items-center text-xs'>
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full ${
                    passwordStrength.number
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-white'
                  }`}
                >
                  {passwordStrength.number ? <CheckIcon /> : <XIcon />}
                </span>
                <span
                  className={
                    passwordStrength.number
                      ? 'text-green-600 font-bold'
                      : 'text-gray-600'
                  }
                >
                  {requirementLabels[3]}
                </span>
              </li>
              <li className='flex items-center text-xs'>
                <span
                  className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded-full ${
                    passwordStrength.specialChar
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-white'
                  }`}
                >
                  {passwordStrength.specialChar ? <CheckIcon /> : <XIcon />}
                </span>
                <span
                  className={
                    passwordStrength.specialChar
                      ? 'text-green-600 font-bold'
                      : 'text-gray-600'
                  }
                >
                  {requirementLabels[4]}
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
export { PasswordInput }
