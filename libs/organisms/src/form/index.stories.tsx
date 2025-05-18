import { Button, Checkbox, Input, Label } from '@social-media/atoms'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

/**
 * Mẫu hiển thị Form UI từ shadcn UI.
 *
 * Do Form component phụ thuộc vào React Hook Form, chúng tôi chỉ hiển thị giao diện tham khảo
 * để tránh lỗi với FormContext khi dùng trong Storybook.
 *
 * Khi triển khai thực tế, sử dụng Form với các thành phần:
 * - `Form`: Container chính kết hợp với React Hook Form
 * - `FormField`: Liên kết trường form với React Hook Form controller
 * - `FormItem`: Container cho một trường input và các thành phần liên quan
 * - `FormLabel`: Nhãn cho trường input
 * - `FormControl`: Wrapper cho phần tử điều khiển (input, select, v.v.)
 * - `FormDescription`: Văn bản mô tả thêm cho trường
 * - `FormMessage`: Hiển thị thông báo lỗi cho trường
 */
const meta: Meta = {
  title: 'Organisms/Form',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

/**
 * Form đăng nhập cơ bản
 */
export const LoginForm: Story = {
  render: () => (
    <div className='w-full max-w-sm space-y-6 p-6 border rounded-lg shadow-sm'>
      <div className='space-y-2 text-center'>
        <h1 className='text-2xl font-bold'>Đăng nhập</h1>
        <p className='text-sm text-gray-500'>
          Nhập thông tin đăng nhập của bạn
        </p>
      </div>

      <form className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' placeholder='example@email.com' />
          <p className='text-sm text-red-500 hidden'>Email không hợp lệ.</p>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='password'>Mật khẩu</Label>
            <a href='#' className='text-xs text-primary'>
              Quên mật khẩu?
            </a>
          </div>
          <Input id='password' type='password' />
        </div>

        <div className='flex items-center space-x-2'>
          <Checkbox id='remember' />
          <Label htmlFor='remember'>Ghi nhớ đăng nhập</Label>
        </div>

        <Button type='submit' className='w-full'>
          Đăng nhập
        </Button>
      </form>

      <div className='text-center text-sm'>
        Chưa có tài khoản?{' '}
        <a href='#' className='text-primary font-medium'>
          Đăng ký
        </a>
      </div>
    </div>
  ),
}

/**
 * Form đăng ký
 */
export const RegisterForm: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-6 p-6 border rounded-lg shadow-sm'>
      <div className='space-y-2 text-center'>
        <h1 className='text-2xl font-bold'>Tạo tài khoản</h1>
        <p className='text-sm text-gray-500'>
          Nhập thông tin để đăng ký tài khoản mới
        </p>
      </div>

      <form className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Họ tên</Label>
          <Input id='name' placeholder='Nguyễn Văn A' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' placeholder='example@email.com' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Mật khẩu</Label>
          <Input id='password' type='password' />
          <p className='text-xs text-gray-500'>
            Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='confirm-password'>Xác nhận mật khẩu</Label>
          <Input id='confirm-password' type='password' />
        </div>

        <div className='flex items-center space-x-2'>
          <Checkbox id='terms' />
          <Label htmlFor='terms' className='text-sm'>
            Tôi đồng ý với{' '}
            <a href='#' className='text-primary'>
              Điều khoản dịch vụ
            </a>{' '}
            và{' '}
            <a href='#' className='text-primary'>
              Chính sách bảo mật
            </a>
          </Label>
        </div>

        <Button type='submit' className='w-full'>
          Đăng ký
        </Button>
      </form>

      <div className='text-center text-sm'>
        Đã có tài khoản?{' '}
        <a href='#' className='text-primary font-medium'>
          Đăng nhập
        </a>
      </div>
    </div>
  ),
}

/**
 * Form liên hệ
 */
export const ContactForm: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-6 p-6 border rounded-lg shadow-sm'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold'>Liên hệ với chúng tôi</h1>
        <p className='text-sm text-gray-500'>
          Hãy điền thông tin bên dưới và chúng tôi sẽ phản hồi trong thời gian
          sớm nhất.
        </p>
      </div>

      <form className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='contact-name'>Họ tên</Label>
          <Input id='contact-name' placeholder='Nguyễn Văn A' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='contact-email'>Email</Label>
          <Input id='contact-email' placeholder='example@email.com' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='subject'>Tiêu đề</Label>
          <Input id='subject' placeholder='Chủ đề liên hệ' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='message'>Tin nhắn</Label>
          <textarea
            id='message'
            className='flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='Nhập nội dung tin nhắn...'
          />
        </div>

        <Button type='submit' className='w-full'>
          Gửi tin nhắn
        </Button>
      </form>
    </div>
  ),
}

/**
 * Form nhiều bước (Multi-step form)
 */
export const MultiStepForm: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-6 p-6 border rounded-lg shadow-sm'>
      <div className='space-y-2 text-center'>
        <h1 className='text-2xl font-bold'>Đăng ký thành viên</h1>

        {/* Hiển thị indicator bước */}
        <div className='flex justify-center items-center my-4'>
          {[1, 2, 3].map((step, index) => (
            <React.Fragment key={step}>
              {index > 0 && (
                <div
                  className={`h-1 w-10 ${
                    step < 2 ? 'bg-gray-200' : 'bg-primary'
                  }`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step === 1
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            </React.Fragment>
          ))}
        </div>

        <p className='text-sm text-gray-500'>Bước 1: Thông tin cá nhân</p>
      </div>

      <form className='space-y-4'>
        {/* Hiển thị Form bước 1 */}
        <div className='space-y-2'>
          <Label htmlFor='fullname'>Họ tên</Label>
          <Input id='fullname' placeholder='Nguyễn Văn A' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email-step'>Email</Label>
          <Input id='email-step' placeholder='example@email.com' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone'>Số điện thoại</Label>
          <Input id='phone' placeholder='0912345678' />
        </div>

        {/* Điều hướng */}
        <div className='flex justify-end pt-4'>
          <Button className='w-full'>Tiếp tục</Button>
        </div>
      </form>
    </div>
  ),
}

/**
 * Các kiểu trường form
 */
export const FormFields: Story = {
  render: () => (
    <div className='w-full max-w-md space-y-6 p-6 border rounded-lg shadow-sm'>
      <h2 className='text-xl font-bold'>Các thành phần Form</h2>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='text-field'>Trường văn bản</Label>
          <Input id='text-field' placeholder='Nhập văn bản' />
          <p className='text-xs text-gray-500'>
            Đây là mô tả giúp người dùng hiểu về mục đích của trường này.
          </p>
          <p className='text-sm text-red-500'>
            Đây là thông báo lỗi khi trường không hợp lệ.
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='textarea-field'>Trường văn bản dài</Label>
          <textarea
            id='textarea-field'
            className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='Nhập nội dung dài'
          />
        </div>

        <div className='flex items-start space-x-3'>
          <Checkbox id='checkbox-field' />
          <div className='space-y-1 leading-none'>
            <Label htmlFor='checkbox-field'>Lựa chọn</Label>
            <p className='text-xs text-gray-500'>
              Đây là mô tả cho trường checkbox.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='field-one'>Trường thứ nhất</Label>
            <Input id='field-one' placeholder='Nhập dữ liệu' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='field-two'>Trường thứ hai</Label>
            <Input id='field-two' placeholder='Nhập dữ liệu' />
          </div>
        </div>
      </div>
    </div>
  ),
}
