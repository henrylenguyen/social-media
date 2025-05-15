import type { Meta, StoryObj } from '@storybook/react'
import SignUpStep from './signUpStep'

const meta: Meta<typeof SignUpStep> = {
  component: SignUpStep,
  title: 'Atoms/SignUpStep',
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark-light',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Bước hiện tại đang active',
    },
    totalSteps: {
      control: { type: 'number', min: 2, max: 10 },
      description: 'Tổng số bước trong quy trình',
    },
    stepTexts: {
      control: { type: 'object' },
      description: 'Mảng text hiển thị bên dưới mỗi bước',
    },
    className: {
      control: 'text',
      description: 'CSS class để tùy chỉnh component',
    },
  },
}

export default meta
type Story = StoryObj<typeof SignUpStep>

/**
 * Ví dụ mặc định với 3 bước, bước hiện tại là 1
 */
export const Default: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
}

/**
 * Ví dụ với text hiển thị dưới mỗi bước và có chiều dài khác nhau để kiểm thử layout
 */
export const WithStepText: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
    stepTexts: ['Tài khoản', 'Thông tin cá nhân', 'Xác minh'],
  },
}

/**
 * Ví dụ với 5 bước, bước hiện tại là 3 (ở giữa)
 */
export const FiveSteps: Story = {
  args: {
    currentStep: 3,
    totalSteps: 5,
    stepTexts: ['Bắt đầu', 'Tài khoản', 'Thông tin', 'Xác minh', 'Hoàn tất'],
  },
}

/**
 * Ví dụ với bước cuối cùng đang active
 */
export const LastStepActive: Story = {
  args: {
    currentStep: 4,
    totalSteps: 4,
    stepTexts: ['Bắt đầu', 'Thông tin', 'Xác nhận', 'Hoàn tất'],
  },
}

/**
 * Ví dụ với nhiều bước (7 bước)
 */
export const ManySteps: Story = {
  args: {
    currentStep: 2,
    totalSteps: 7,
    stepTexts: [
      'Bắt đầu',
      'Tài khoản',
      'Thông tin',
      'Sở thích',
      'Xác nhận',
      'Liên kết',
      'Hoàn tất',
    ],
  },
}

/**
 * Ví dụ với văn bản dài hơn để kiểm tra hiển thị
 */
export const LongTextLabels: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    stepTexts: [
      'Thông tin tài khoản',
      'Chi tiết cá nhân',
      'Xác nhận email và SĐT',
      'Hoàn tất đăng ký',
    ],
  },
}

/**
 * Ví dụ với lớp tùy chỉnh thêm rộng và có background
 */
export const CustomClass: Story = {
  args: {
    currentStep: 2,
    totalSteps: 3,
    stepTexts: ['Bắt đầu', 'Nhập thông tin', 'Hoàn thành'],
    className: 'py-4 px-8 bg-gray-100 rounded-lg',
  },
}

/**
 * Trang đăng ký thực tế thường có nhiều bước
 * Ví dụ dạng tiến trình
 */
export const Progress: Story = {
  render: () => {
    const steps = [
      'Tài khoản',
      'Thông tin cá nhân',
      'Sở thích',
      'Xác minh',
      'Hoàn tất',
    ]

    return (
      <div className='flex flex-col gap-8 p-4'>
        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-3 text-white'>Bước 1/5</h3>
          <SignUpStep
            currentStep={1}
            totalSteps={5}
            stepTexts={steps}
            className='w-[300px]'
          />
        </div>

        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-3 text-white'>Bước 2/5</h3>
          <SignUpStep
            currentStep={2}
            totalSteps={5}
            stepTexts={steps}
            className='w-[300px]'
          />
        </div>

        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-3 text-white'>Bước 3/5</h3>
          <SignUpStep
            currentStep={3}
            totalSteps={5}
            stepTexts={steps}
            className='w-[300px]'
          />
        </div>

        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-3 text-white'>Bước 4/5</h3>
          <SignUpStep
            currentStep={4}
            totalSteps={5}
            stepTexts={steps}
            className='w-[300px]'
          />
        </div>

        <div className='p-4 border rounded-lg'>
          <h3 className='font-semibold mb-3 text-white'>Bước 5/5</h3>
          <SignUpStep
            currentStep={5}
            totalSteps={5}
            stepTexts={steps}
            className='w-[300px]'
          />
        </div>
      </div>
    )
  },
}
