import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

/**
 * Component Input từ shadcn UI cho việc nhập dữ liệu
 */
const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'password',
        'email',
        'number',
        'tel',
        'url',
        'search',
        'date',
      ],
      description: 'Loại input',
    },
    placeholder: {
      control: 'text',
      description: 'Nội dung placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'Trạng thái vô hiệu hóa',
    },
    readOnly: {
      control: 'boolean',
      description: 'Trạng thái chỉ đọc',
    },
    className: {
      control: 'text',
      description: 'Class CSS tùy chỉnh',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

/**
 * Mặc định - Trường nhập văn bản cơ bản
 */
export const Default: Story = {
  args: {
    placeholder: 'Nhập văn bản...',
  },
}

/**
 * Trường nhập email
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
}

/**
 * Trường nhập mật khẩu
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '••••••••',
  },
}

/**
 * Trường nhập số
 */
export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
}

/**
 * Trường nhập bị vô hiệu hóa
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Không khả dụng',
    value: 'Không thể chỉnh sửa',
  },
}

/**
 * Trường nhập chỉ đọc
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    placeholder: 'Chỉ đọc',
    value: 'Nội dung chỉ đọc',
  },
}

/**
 * Trường nhập với label (sử dụng kết hợp)
 */
export const WithLabel: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <label htmlFor='email' className='text-sm font-medium'>
        Email
      </label>
      <Input type='email' id='email' placeholder='Email của bạn' />
      <p className='text-sm text-gray-500'>Nhập email để đăng nhập.</p>
    </div>
  ),
}

/**
 * Trường nhập tìm kiếm
 */
export const Search: Story = {
  render: () => (
    <div className='relative w-full max-w-sm'>
      <Input type='search' placeholder='Tìm kiếm...' className='pr-10' />
      <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
        <svg
          width='15'
          height='15'
          viewBox='0 0 15 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='text-gray-400'
        >
          <path
            d='M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z'
            fill='currentColor'
            fillRule='evenodd'
            clipRule='evenodd'
          ></path>
        </svg>
      </div>
    </div>
  ),
}

/**
 * Trường nhập với kích thước tùy chỉnh
 */
export const CustomSizes: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <Input placeholder='Input nhỏ' className='h-8 text-xs' />
      <Input placeholder='Input mặc định' />
      <Input placeholder='Input lớn' className='h-12 text-lg' />
    </div>
  ),
}

/**
 * Trường nhập với màu tùy chỉnh
 */
export const CustomStyles: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <Input
        placeholder='Border đỏ'
        className='border-red-500 focus:ring-red-500'
      />
      <Input
        placeholder='Border xanh'
        className='border-blue-500 focus:ring-blue-500'
      />
      <Input placeholder='Nền xám' className='bg-gray-100' />
      <Input
        placeholder='Văn bản màu xanh'
        className='text-blue-600 placeholder:text-blue-400'
      />
    </div>
  ),
}

/**
 * Trường nhập file
 */
export const FileInput: Story = {
  args: {
    type: 'file',
    className: 'cursor-pointer',
  },
}

/**
 * Trường nhập tích hợp phức tạp
 */
export const IntegratedExample: Story = {
  render: () => (
    <div className='grid gap-4 py-4'>
      <div className='grid grid-cols-4 items-center gap-4'>
        <label htmlFor='name' className='text-right text-sm font-medium'>
          Họ tên
        </label>
        <Input id='name' defaultValue='Nguyễn Văn A' className='col-span-3' />
      </div>
      <div className='grid grid-cols-4 items-center gap-4'>
        <label htmlFor='username' className='text-right text-sm font-medium'>
          Tên đăng nhập
        </label>
        <Input id='username' defaultValue='nguyenvana' className='col-span-3' />
      </div>
    </div>
  ),
}
