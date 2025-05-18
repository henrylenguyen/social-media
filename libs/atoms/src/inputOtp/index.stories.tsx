import { Label } from '@social-media/atoms'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

/**
 * Mẫu hiển thị InputOTP UI.
 *
 * Component này thường được dùng để nhập mã OTP, mã xác thực hoặc mã bảo mật.
 *
 * InputOTP bao gồm các component con:
 * - `InputOTP`: Container chính cho toàn bộ component
 * - `InputOTPGroup`: Nhóm các ô input để tạo thành một field OTP hoàn chỉnh
 * - `InputOTPSlot`: Một ô input đơn lẻ để nhập một ký tự của mã OTP
 * - `InputOTPSeparator`: Phân cách giữa các nhóm ô input
 *
 * Do InputOTP có thể sử dụng context và logic phức tạp, chúng tôi hiển thị
 * một mẫu UI đơn giản để tham khảo.
 */
const meta: Meta = {
  title: 'Atoms/InputOTP',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

// Component giả lập OTP slot để tránh lỗi
const OTPSlot = ({ value, focus }: { value?: string; focus?: boolean }) => (
  <div
    className={`w-10 h-12 border ${
      focus ? 'border-primary ring-2 ring-primary/20' : 'border-input'
    } rounded-md flex items-center justify-center text-center`}
  >
    <span className='text-lg font-medium'>{value}</span>
  </div>
)

const OTPSeparator = ({ children }: { children?: React.ReactNode }) => (
  <div className='flex items-center justify-center w-4 h-12'>
    {children || <span className='text-lg text-muted-foreground'>-</span>}
  </div>
)

/**
 * Mặc định - InputOTP với 6 chữ số
 */
export const Default: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <OTPSlot value='1' />
        <OTPSlot value='2' />
        <OTPSlot value='3' />
        <OTPSlot value='' focus={true} />
        <OTPSlot />
        <OTPSlot />
      </div>
      <p className='text-xs text-gray-500 text-center'>
        Nhập mã xác thực 6 chữ số
      </p>
    </div>
  ),
}

/**
 * InputOTP với dấu phân cách
 */
export const WithSeparator: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <OTPSlot value='1' />
        <OTPSlot value='2' />
        <OTPSlot value='3' />
        <OTPSeparator />
        <OTPSlot value='' focus={true} />
        <OTPSlot />
        <OTPSlot />
      </div>
      <p className='text-xs text-gray-500 text-center'>Nhập mã xác thực</p>
    </div>
  ),
}

/**
 * InputOTP với 4 chữ số
 */
export const FourDigits: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <OTPSlot value='4' />
        <OTPSlot value='2' />
        <OTPSlot value='' focus={true} />
        <OTPSlot />
      </div>
      <p className='text-xs text-gray-500 text-center'>Nhập mã PIN 4 chữ số</p>
    </div>
  ),
}

/**
 * InputOTP bị vô hiệu hóa
 */
export const Disabled: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <div className='w-10 h-12 border border-input rounded-md flex items-center justify-center text-center bg-gray-100 text-gray-400'>
          <span className='text-lg font-medium'>1</span>
        </div>
        <div className='w-10 h-12 border border-input rounded-md flex items-center justify-center text-center bg-gray-100 text-gray-400'>
          <span className='text-lg font-medium'>2</span>
        </div>
        <div className='w-10 h-12 border border-input rounded-md flex items-center justify-center text-center bg-gray-100 text-gray-400'>
          <span className='text-lg font-medium'>3</span>
        </div>
        <OTPSeparator />
        <div className='w-10 h-12 border border-input rounded-md flex items-center justify-center text-center bg-gray-100 text-gray-400'>
          <span className='text-lg font-medium'>4</span>
        </div>
        <div className='w-10 h-12 border border-input rounded-md flex items-center justify-center text-center bg-gray-100 text-gray-400'>
          <span className='text-lg font-medium'>5</span>
        </div>
        <div className='w-10 h-12 border border-input rounded-md flex items-center justify-center text-center bg-gray-100 text-gray-400'>
          <span className='text-lg font-medium'>6</span>
        </div>
      </div>
      <p className='text-xs text-gray-500 text-center'>
        Mã xác thực (đã vô hiệu hóa)
      </p>
    </div>
  ),
}

/**
 * InputOTP với kiểu dáng tùy chỉnh
 */
export const CustomStyle: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <div className='w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>5</span>
        </div>
        <div className='w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>9</span>
        </div>
        <div className='w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>3</span>
        </div>
        <div className='w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>0</span>
        </div>
        <div className='w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>7</span>
        </div>
        <div className='w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center text-center'>
          <span className='text-lg font-medium text-primary'>2</span>
        </div>
      </div>
      <p className='text-xs text-gray-500 text-center'>
        Kiểu dáng tùy chỉnh với viền tròn
      </p>
    </div>
  ),
}

/**
 * InputOTP với kích thước lớn hơn
 */
export const LargerSize: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <div className='w-14 h-14 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-2xl font-medium'>2</span>
        </div>
        <div className='w-14 h-14 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-2xl font-medium'>7</span>
        </div>
        <div className='w-14 h-14 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-2xl font-medium'>5</span>
        </div>
        <div className='w-14 h-14 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-2xl font-medium'>9</span>
        </div>
      </div>
      <p className='text-xs text-gray-500 text-center'>Kích thước lớn</p>
    </div>
  ),
}

/**
 * InputOTP trong ví dụ giao diện xác thực
 */
export const VerificationExample: Story = {
  render: () => (
    <div className='space-y-6 w-[350px] p-6 border rounded-lg shadow-sm'>
      <div className='space-y-2 text-center'>
        <h2 className='text-xl font-bold'>Xác thực tài khoản</h2>
        <p className='text-sm text-gray-500'>
          Vui lòng nhập mã xác thực đã được gửi đến số điện thoại của bạn
        </p>
      </div>

      <div className='py-4'>
        <div className='flex justify-center gap-2'>
          <OTPSlot value='1' />
          <OTPSlot value='9' />
          <OTPSlot value='3' />
          <OTPSeparator />
          <OTPSlot value='' focus={true} />
          <OTPSlot />
          <OTPSlot />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <button className='w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90'>
          Xác nhận
        </button>
        <div className='text-center text-sm text-gray-500 pt-2'>
          <p>
            Không nhận được mã?{' '}
            <a href='#' className='text-primary font-medium'>
              Gửi lại
            </a>
          </p>
          <p className='mt-1 text-xs'>Mã mới có thể được gửi sau 60 giây</p>
        </div>
      </div>
    </div>
  ),
}

/**
 * InputOTP có trạng thái lỗi
 */
export const WithError: Story = {
  render: () => (
    <div className='space-y-2 w-[350px]'>
      <Label className='text-sm font-medium'>Mã xác thực</Label>
      <div className='flex gap-2'>
        <div className='w-10 h-12 border border-red-500 rounded-md flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>1</span>
        </div>
        <div className='w-10 h-12 border border-red-500 rounded-md flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>2</span>
        </div>
        <div className='w-10 h-12 border border-red-500 rounded-md flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>3</span>
        </div>
        <div className='w-10 h-12 border border-red-500 rounded-md flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>4</span>
        </div>
        <div className='w-10 h-12 border border-red-500 rounded-md flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>5</span>
        </div>
        <div className='w-10 h-12 border border-red-500 rounded-md flex items-center justify-center text-center'>
          <span className='text-lg font-medium'>6</span>
        </div>
      </div>
      <p className='text-sm text-red-500'>Mã xác thực không hợp lệ</p>
    </div>
  ),
}

/**
 * InputOTP cho mã tài khoản
 */
export const AccountCodeFormat: Story = {
  render: () => (
    <div className='space-y-2 w-[350px]'>
      <Label className='text-sm font-medium'>Mã tài khoản</Label>
      <div className='flex gap-1'>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>A</span>
        </div>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>B</span>
        </div>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>C</span>
        </div>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>D</span>
        </div>
        <OTPSeparator>-</OTPSeparator>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>1</span>
        </div>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>2</span>
        </div>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>3</span>
        </div>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>4</span>
        </div>
        <OTPSeparator>-</OTPSeparator>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>X</span>
        </div>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>Y</span>
        </div>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center'>
          <span className='text-sm font-medium'>Z</span>
        </div>
        <div className='w-8 h-10 border border-input rounded-md flex items-center justify-center text-center bg-gray-50'>
          <span className='text-sm font-medium'></span>
        </div>
      </div>
      <p className='text-xs text-gray-500'>
        Nhập mã tài khoản theo định dạng XXXX-XXXX-XXXX
      </p>
    </div>
  ),
}
