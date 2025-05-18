import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

/**
 * Component Button từ shadcn UI với nhiều biến thể khác nhau
 */
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      description: 'Biến thể của button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Kích thước của button',
    },
    disabled: {
      control: 'boolean',
      description: 'Trạng thái vô hiệu hóa',
    },
    asChild: {
      control: 'boolean',
      description: 'Sử dụng component con thay thế',
    },
    className: {
      control: 'text',
      description: 'Class CSS tùy chỉnh',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Mặc định - Phiên bản cơ bản của Button
 */
export const Default: Story = {
  args: {
    children: 'Nút mặc định',
  },
}

/**
 * Biến thể Destructive - Thường dùng cho các hành động nguy hiểm
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Xóa',
  },
}

/**
 * Biến thể Outline - Nút viền ngoài
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Nút viền',
  },
}

/**
 * Biến thể Secondary - Nút thứ cấp
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Nút thứ cấp',
  },
}

/**
 * Biến thể Ghost - Nút trong suốt
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Nút trong suốt',
  },
}

/**
 * Biến thể Link - Nút trông giống liên kết
 */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Liên kết',
  },
}

/**
 * Kích thước nhỏ (Small)
 */
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Nút nhỏ',
  },
}

/**
 * Kích thước lớn (Large)
 */
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Nút lớn',
  },
}

/**
 * Nút biểu tượng - Thường dùng với icon
 */
export const Icon: Story = {
  args: {
    size: 'icon',
    children: '✕',
  },
}

/**
 * Nút vô hiệu hóa
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Không khả dụng',
  },
}

/**
 * Ví dụ các nút với nhiều biến thể kết hợp
 */
export const ButtonCombinations: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button>Mặc định</Button>
      <Button variant='destructive'>Xóa</Button>
      <Button variant='outline'>Viền</Button>
      <Button variant='secondary'>Thứ cấp</Button>
      <Button variant='ghost'>Trong suốt</Button>
      <Button variant='link'>Liên kết</Button>
    </div>
  ),
}

/**
 * Ví dụ nút với các kích thước khác nhau
 */
export const ButtonSizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-4'>
      <Button size='sm'>Nhỏ</Button>
      <Button>Mặc định</Button>
      <Button size='lg'>Lớn</Button>
      <Button size='icon'>✕</Button>
    </div>
  ),
}

/**
 * Nút với màu sắc tùy chỉnh
 */
export const CustomColorButton: Story = {
  args: {
    className: 'bg-primary hover:bg-primary/90 text-white',
    children: 'Nút màu chính',
  },
}
