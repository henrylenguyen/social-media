import type { Meta, StoryObj } from '@storybook/react'
import Header from './header'

/**
 * Header component hiển thị tiêu đề và các nút điều hướng.
 */
const meta: Meta<typeof Header> = {
  title: 'molecules/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light-dark',
    },
  },
  argTypes: {
    children: {
      description: 'Nội dung ở giữa của header (thường là navigation)',
    },
    rightChildren: {
      description:
        'Nội dung bên phải của header (thường là nút đăng nhập, đăng xuất)',
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {
    children: <div className='text-2xl font-bold'>Header</div>,
    rightChildren: <div className='text-xl font-bold'>Right Header</div>,
  },
}

export const WithNavigation: Story = {
  render: () => (
    <Header
      className='bg-gray-800 text-white'
      rightChildren={<div className='text-lg font-bold'>Logout</div>}
    >
      <nav className='flex items-center gap-4'>
        <div className='text-lg font-bold'>Home</div>
        <div className='text-lg font-bold'>Profile</div>
        <div className='text-lg font-bold'>Settings</div>
      </nav>
    </Header>
  ),
}
