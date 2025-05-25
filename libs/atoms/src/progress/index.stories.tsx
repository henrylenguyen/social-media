import type { Meta, StoryObj } from '@storybook/react'
import Progress from './progress'

const meta: Meta<typeof Progress> = {
  title: 'Atoms/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Giá trị tiến trình (0-100).',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Kích thước thanh tiến trình.',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        '#9c27b0',
      ],
      description: 'Màu sắc hoặc mã màu CSS.',
    },
    showValue: {
      control: 'boolean',
      description: 'Hiển thị giá trị %.',
    },
    striped: {
      control: 'boolean',
      description: 'Hiển thị sọc.',
    },
    animated: {
      control: 'boolean',
      description: 'Chuyển động sọc (cần striped=true).',
    },
    className: {
      control: 'text',
      description: 'Class CSS tùy chỉnh.',
    },
    valueLabel: {
      control: 'text',
      description: 'Nhãn cho giá trị.',
    },
  },
  args: {
    value: 50,
    size: 'md',
    color: 'primary',
    showValue: false,
    striped: false,
    animated: false,
    valueLabel: '%',
  },
  decorators: [
    // Thêm decorator để cung cấp chiều rộng cho container
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 65,
  },
}

export const WithValue: Story = {
  args: {
    value: 75,
    showValue: true,
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className='w-full flex flex-col gap-6'>
      {' '}
      {/* Tăng gap */}
      <Progress {...args} size='sm' value={30} showValue />
      <Progress {...args} size='md' value={50} showValue />
      <Progress {...args} size='lg' value={70} showValue />
    </div>
  ),
  args: {
    showValue: true,
  },
}

export const Colors: Story = {
  render: (args) => (
    <div className='w-full flex flex-col gap-4'>
      <Progress {...args} color='primary' value={20} />
      <Progress {...args} color='secondary' value={35} />
      <Progress {...args} color='success' value={50} />
      <Progress {...args} color='warning' value={65} />
      <Progress {...args} color='error' value={80} />
      <Progress {...args} color='info' value={90} />
      <Progress {...args} color='#9c27b0' value={95} /> {/* Custom Purple */}
    </div>
  ),
}

export const Striped: Story = {
  args: {
    value: 60,
    striped: true,
    color: 'success',
  },
}

export const AnimatedStriped: Story = {
  args: {
    value: 85,
    striped: true,
    animated: true,
    color: 'info',
  },
}

export const ZeroValue: Story = {
  args: {
    value: 0,
    showValue: true,
  },
}

export const FullValue: Story = {
  args: {
    value: 100,
    showValue: true,
    color: 'success',
  },
}
