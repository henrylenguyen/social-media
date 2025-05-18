import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@social-media/atoms'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form/form'
import PasswordInput from './passwordInput'

const meta: Meta<typeof PasswordInput> = {
  title: 'Organisms/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showStrengthIndicator: {
      control: 'boolean',
      description: 'Hiển thị chỉ báo độ mạnh của mật khẩu',
    },
    indicatorLabel: {
      control: 'text',
      description: 'Nhãn cho chỉ báo độ mạnh',
    },
    requirementLabels: {
      control: 'object',
      description: 'Nhãn tùy chỉnh cho từng yêu cầu',
    },
  },
}

export default meta
type Story = StoryObj<typeof PasswordInput>

/**
 * Ví dụ cơ bản về trường nhập mật khẩu với chỉ báo độ mạnh
 */
export const Default: Story = {
  args: {
    placeholder: 'Nhập mật khẩu của bạn',
    showStrengthIndicator: true,
  },
}

/**
 * Ví dụ về trường nhập mật khẩu không có chỉ báo độ mạnh
 */
export const WithoutStrengthIndicator: Story = {
  args: {
    placeholder: 'Nhập mật khẩu của bạn',
    showStrengthIndicator: false,
  },
}

/**
 * Ví dụ với yêu cầu mật khẩu tùy chỉnh
 */
export const CustomRequirements: Story = {
  args: {
    placeholder: 'Nhập mật khẩu của bạn',
    showStrengthIndicator: true,
    requirements: {
      minLength: 6,
    },
    requirementLabels: [
      'Ít nhất 6 ký tự',
      'Ít nhất 1 chữ cái viết hoa',
      'Ít nhất 1 chữ cái viết thường',
      'Ít nhất 1 số',
      'Ít nhất 1 ký tự đặc biệt',
    ],
  },
}

/**
 * Tích hợp với React Hook Form
 */
const WithReactHookForm = () => {
  // Định nghĩa schema validation
  const schema = z
    .object({
      password: z
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ cái viết hoa')
        .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ cái viết thường')
        .regex(/\d/, 'Mật khẩu phải có ít nhất 1 số')
        .regex(
          /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?\\~`]/,
          'Mật khẩu phải có ít nhất 1 ký tự đặc biệt',
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Mật khẩu không khớp',
      path: ['confirmPassword'],
    })

  // Khởi tạo form
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  // Xử lý submit
  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values)
    alert('Mật khẩu hợp lệ!')
  }

  return (
    <div className='w-full max-w-md p-6 border rounded-lg shadow-sm bg-white'>
      <h2 className='text-xl font-semibold mb-4'>Đặt mật khẩu mới</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput {...field} showStrengthIndicator={false} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            Xác nhận
          </Button>
        </form>
      </Form>
    </div>
  )
}

export const WithFormValidation: Story = {
  render: () => <WithReactHookForm />,
}
