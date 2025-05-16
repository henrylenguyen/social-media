import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import StepIndicator from './stepIndicator'

const meta: Meta<typeof StepIndicator> = {
  component: StepIndicator,
  title: 'Atoms/StepIndicator',
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
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
      description: 'Kích thước của component',
    },
    spacing: {
      control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      description: 'Khoảng cách giữa các bước',
    },
    isGraduallySmaller: {
      control: 'boolean',
      description: 'Có áp dụng hiệu ứng nhỏ dần khi xa khỏi bước active không',
    },
    isCanClick: {
      control: 'boolean',
      description: 'Có cho phép click vào các bước để chuyển đổi không',
    },
  },
}

export default meta
type Story = StoryObj<typeof StepIndicator>

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
    spacing: 'md',
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
    spacing: 'xs',
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
    spacing: 'xl',
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
    className: 'p-8 bg-green-800 rounded-lg',

  },
}

/**
 * Component sử dụng đúng quy tắc hook cho story có tính năng click
 */
const ClickableStepDemo = () => {
  const [active, setActive] = React.useState(1)

  // Xử lý thay đổi bước
  const handleStepChange = (step: number) => {
    setActive(step)
  }

  return (
    <div className='p-6 rounded-md'>
      <h3 className='text-white font-semibold mb-3'>
        Click vào các bước để chuyển đổi
      </h3>
      <p className='text-white/80 mb-4'>Bước hiện tại: {active}</p>

      <StepIndicator
        currentStep={active}
        totalSteps={5}
        stepTexts={[
          'Tài khoản',
          'Thông tin',
          'Sở thích',
          'Xác minh',
          'Hoàn tất',
        ]}
        isCanClick={true}
        onStepChange={handleStepChange}
        spacing='md'
      />
    </div>
  )
}

/**
 * Ví dụ có thể click vào các bước để chuyển đổi
 */
export const Clickable: Story = {
  render: () => <ClickableStepDemo />,
}

/**
 * Component với cả hai tính năng
 */
const WithoutGraduallySmallerDemo = () => {
  return (
    <div className='flex flex-col gap-8 p-4'>
      <div>
        <h3 className='text-white font-semibold mb-3'>
          Có hiệu ứng nhỏ dần (isGraduallySmaller=true)
        </h3>
        <StepIndicator
          currentStep={3}
          totalSteps={5}
          stepTexts={[
            'Bắt đầu',
            'Tài khoản',
            'Thông tin',
            'Xác minh',
            'Hoàn tất',
          ]}
          isGraduallySmaller={true}
        />
      </div>

      <div>
        <h3 className='text-white font-semibold mb-3'>
          Không có hiệu ứng nhỏ dần (isGraduallySmaller=false)
        </h3>
        <StepIndicator
          currentStep={3}
          totalSteps={5}
          stepTexts={[
            'Bắt đầu',
            'Tài khoản',
            'Thông tin',
            'Xác minh',
            'Hoàn tất',
          ]}
          isGraduallySmaller={false}
        />
      </div>
    </div>
  )
}

/**
 * Ví dụ so sánh giữa có và không có hiệu ứng nhỏ dần
 */
export const WithAndWithoutGraduallySmaller: Story = {
  render: () => <WithoutGraduallySmallerDemo />,
}

/**
 * Component kết hợp tính năng
 */
const ClickableWithoutGraduallySmallerDemo = () => {
  const [active, setActive] = React.useState(1)

  return (
    <div className='p-6 rounded-md'>
      <h3 className='text-white font-semibold mb-3'>
        Có thể click và không nhỏ dần
      </h3>
      <p className='text-white/80 mb-4'>Bước hiện tại: {active}</p>

      <StepIndicator
        currentStep={active}
        totalSteps={5}
        stepTexts={[
          'Tài khoản',
          'Thông tin',
          'Sở thích',
          'Xác minh',
          'Hoàn tất',
        ]}
        isCanClick={true}
        onStepChange={setActive}
        isGraduallySmaller={false}
        spacing='md'
      />
    </div>
  )
}

/**
 * Ví dụ kết hợp cả hai tính năng (có thể click và không nhỏ dần)
 */
export const ClickableWithoutGraduallySmaller: Story = {
  render: () => <ClickableWithoutGraduallySmallerDemo />,
}

/**
 * Component hiển thị tiến trình
 */
const ProgressDemo = () => {
  const steps = [
    'Tài khoản',
    'Thông tin cá nhân',
    'Sở thích',
    'Xác minh',
    'Hoàn tất',
  ]

  return (
    <div className='flex flex-col gap-8 p-4'>
      <div className='p-4 rounded-lg'>
        <h3 className='font-semibold mb-3 text-white'>Bước 1/5</h3>
        <StepIndicator
          currentStep={1}
          totalSteps={5}
          stepTexts={steps}
          spacing='lg'
        />
      </div>

      <div className='p-4 rounded-lg'>
        <h3 className='font-semibold mb-3 text-white'>Bước 2/5</h3>
        <StepIndicator
          currentStep={2}
          totalSteps={5}
          stepTexts={steps}
          spacing='lg'
        />
      </div>

      <div className='p-4 rounded-lg'>
        <h3 className='font-semibold mb-3 text-white'>Bước 3/5</h3>
        <StepIndicator
          currentStep={3}
          totalSteps={5}
          stepTexts={steps}
          spacing='lg'
        />
      </div>

      <div className='p-4 rounded-lg'>
        <h3 className='font-semibold mb-3 text-white'>Bước 4/5</h3>
        <StepIndicator
          currentStep={4}
          totalSteps={5}
          stepTexts={steps}
          spacing='lg'
        />
      </div>

      <div className='p-4 rounded-lg'>
        <h3 className='font-semibold mb-3 text-white'>Bước 5/5</h3>
        <StepIndicator
          currentStep={5}
          totalSteps={5}
          stepTexts={steps}
          spacing='lg'
        />
      </div>
    </div>
  )
}

/**
 * Trang đăng ký thực tế thường có nhiều bước
 * Ví dụ dạng tiến trình
 */
export const Progress: Story = {
  render: () => <ProgressDemo />,
}
