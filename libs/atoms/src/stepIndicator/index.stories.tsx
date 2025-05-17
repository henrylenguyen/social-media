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
    containerClassName: {
      control: 'text',
      description: 'CSS class để tùy chỉnh container chính',
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
    indicatorStyle: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'success',
          'warning',
          'white-on-dark',
          'dark-on-light',
        ],
      },
      description: 'Kiểu hiển thị màu sắc cho các chỉ báo bước',
    },
    positionText: {
      control: { type: 'select', options: ['above', 'below'] },
      description: 'Vị trí hiển thị text của các bước',
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
 * Các kiểu màu khác nhau của chỉ báo
 */
const IndicatorStyleDemo = () => {
  const steps = ['Bắt đầu', 'Thông tin', 'Xác minh', 'Hoàn tất']

  return (
    <div className='flex flex-col gap-8 p-6 min-w-[600px]'>
      <div className='p-6 rounded-lg bg-secondary-purple-dark'>
        <h3 className='font-semibold mb-2 text-white'>Primary (Mặc định)</h3>
        <StepIndicator
          currentStep={2}
          totalSteps={4}
          stepTexts={steps}
          indicatorStyle='primary'
        />
      </div>

      <div className='p-6 rounded-lg bg-secondary-purple-dark'>
        <h3 className='font-semibold mb-2 text-white'>Secondary</h3>
        <StepIndicator
          currentStep={2}
          totalSteps={4}
          stepTexts={steps}
          indicatorStyle='secondary'
        />
      </div>

      <div className='p-6 rounded-lg bg-secondary-purple-dark'>
        <h3 className='font-semibold mb-2 text-white'>Success</h3>
        <StepIndicator
          currentStep={2}
          totalSteps={4}
          stepTexts={steps}
          indicatorStyle='success'
        />
      </div>

      <div className='p-6 rounded-lg bg-secondary-purple-dark'>
        <h3 className='font-semibold mb-2 text-white'>Warning</h3>
        <StepIndicator
          currentStep={2}
          totalSteps={4}
          stepTexts={steps}
          indicatorStyle='warning'
        />
      </div>

      <div className='p-6 rounded-lg bg-secondary-purple-dark'>
        <h3 className='font-semibold mb-2 text-white'>White on Dark</h3>
        <StepIndicator
          currentStep={2}
          totalSteps={4}
          stepTexts={steps}
          indicatorStyle='white-on-dark'
        />
      </div>

      <div className='p-6 rounded-lg bg-gray-100'>
        <h3 className='font-semibold mb-2 text-gray-800'>Dark on Light</h3>
        <StepIndicator
          currentStep={2}
          totalSteps={4}
          stepTexts={steps}
          indicatorStyle='dark-on-light'
        />
      </div>
    </div>
  )
}

export const IndicatorStyles: Story = {
  render: () => <IndicatorStyleDemo />,
}

/**
 * Vị trí text khác nhau (trên và dưới)
 */
const TextPositionDemo = () => {
  const steps = ['Bước 1', 'Bước 2', 'Bước 3', 'Bước 4']

  return (
    <div className='flex flex-col gap-8 p-6'>
      <div className='p-6 rounded-lg bg-secondary-purple-dark'>
        <h3 className='font-semibold mb-2 text-white'>
          Text Bên Dưới (Mặc định)
        </h3>
        <StepIndicator
          currentStep={2}
          totalSteps={4}
          stepTexts={steps}
          positionText='below'
        />
      </div>

      <div className='p-6 rounded-lg bg-secondary-purple-dark'>
        <h3 className='font-semibold mb-4 text-white'>Text Bên Trên</h3>
        <StepIndicator
          currentStep={2}
          totalSteps={4}
          stepTexts={steps}
          positionText='above'
        />
      </div>
    </div>
  )
}

export const TextPosition: Story = {
  render: () => <TextPositionDemo />,
}

/**
 * Ví dụ kết hợp nhiều tùy chọn
 */
const CombinedOptionsDemo = () => {
  const [active, setActive] = React.useState(1)

  // Xử lý thay đổi bước
  const handleStepChange = (step: number) => {
    setActive(step)
  }

  return (
    <div className='flex flex-col gap-8 p-6'>
      <div className='p-6 rounded-lg bg-gray-100'>
        <h3 className='font-semibold mb-4 text-gray-800'>
          Dark on Light + Text Phía Trên + Có Thể Click
        </h3>
        <StepIndicator
          currentStep={active}
          totalSteps={4}
          stepTexts={[
            'Tài khoản',
            'Thông tin cá nhân',
            'Xác minh email',
            'Hoàn tất',
          ]}
          indicatorStyle='dark-on-light'
          positionText='above'
          isCanClick={true}
          onStepChange={handleStepChange}
          isGraduallySmaller={false}
        />
        <p className='mt-4 text-center text-gray-600'>
          Bước hiện tại: {active} - Click vào các bước để chuyển đổi
        </p>
      </div>

      <div className='p-6 rounded-lg bg-secondary-purple-dark'>
        <h3 className='font-semibold mb-2 text-white'>
          Success + Text Phía Dưới + Size Lớn
        </h3>
        <StepIndicator
          currentStep={2}
          totalSteps={4}
          stepTexts={['Bắt đầu', 'Thông tin', 'Xác minh', 'Hoàn tất']}
          indicatorStyle='success'
          positionText='below'
          size='lg'
          spacing='xl'
        />
      </div>
    </div>
  )
}

export const CombinedOptions: Story = {
  render: () => <CombinedOptionsDemo />,
}

/**
 * Ví dụ trong các ngữ cảnh sử dụng thực tế
 */
const RealWorldExample = () => {
  return (
    <div className='flex flex-col gap-8 p-6 max-w-4xl'>
      {/* Biểu mẫu đặt hàng */}
      <div className='border rounded-lg overflow-hidden'>
        <div className='bg-gray-100 p-6 border-b'>
          <h3 className='font-medium text-lg'>Quy trình đặt hàng</h3>
        </div>
        <div className='p-6'>
          <StepIndicator
            currentStep={2}
            totalSteps={5}
            stepTexts={[
              'Giỏ hàng',
              'Thông tin giao hàng',
              'Phương thức thanh toán',
              'Xác nhận',
              'Hoàn tất',
            ]}
            indicatorStyle='secondary'
            positionText='below'
            spacing='md'
          />

          <div className='mt-12 p-6 border rounded bg-gray-50'>
            <h4 className='font-medium mb-2'>Thông tin giao hàng</h4>
            <p className='text-sm text-gray-500 mb-4'>
              Vui lòng điền thông tin giao hàng của bạn
            </p>
            {/* Form fields would go here */}
            <div className='mt-6 flex justify-between'>
              <button className='px-4 py-2 border rounded hover:bg-gray-100'>
                Quay lại
              </button>
              <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trang đăng ký */}
      <div className='bg-secondary-purple-gradient rounded-lg p-6'>
        <div className='max-w-xl mx-auto'>
          <h2 className='text-white text-xl font-bold mb-6 text-center'>
            Tạo tài khoản mới
          </h2>

          <StepIndicator
            currentStep={1}
            totalSteps={3}
            stepTexts={[
              'Thông tin tài khoản',
              'Thông tin cá nhân',
              'Xác nhận email',
            ]}
            indicatorStyle='white-on-dark'
            positionText='below'
            spacing='lg'
          />

          <div className='mt-8 bg-white p-6 rounded-lg shadow-lg'>
            <h3 className='font-medium mb-4'>Thông tin tài khoản</h3>
            {/* Form would go here */}
            <div className='mt-6 flex justify-end'>
              <button className='px-6 py-2 bg-primary text-white rounded-full hover:bg-red-500'>
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const RealWorldExamples: Story = {
  render: () => <RealWorldExample />,
}

/**
 * Ví dụ trên nền trắng (Light Backgrounds)
 */
export const OnLightBackground: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    stepTexts: ['Bắt đầu', 'Thông tin', 'Xác nhận', 'Hoàn tất'],
    indicatorStyle: 'dark-on-light',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
}
