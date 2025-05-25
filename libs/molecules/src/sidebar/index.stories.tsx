import type { Meta, StoryObj } from '@storybook/react'
import Sidebar from './sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Molecules/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    // Chỉ cần định nghĩa 'nextRouter' trong parameters
    nextRouter: {
      pathname: '/discovery', // Đường dẫn mặc định
    },
  },
  tags: ['autodocs'],
  decorators: [
    // Chỉ giữ lại decorator layout (nếu cần), bỏ MemoryRouterProvider
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
        <div style={{ flex: 1, padding: '20px', background: '#f9fafb' }}>
          <p>Nội dung trang. Kiểm tra sidebar bên trái để xem active state.</p>
          <p>Active state sẽ được highlight bằng màu primary.</p>
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const DiscoveryActive: Story = {
  name: 'Discovery Active',
  parameters: {
    nextRouter: {
      pathname: '/discovery',
    },
  },
}

export const ChatsActive: Story = {
  name: 'Chats Active',
  parameters: {
    nextRouter: {
      pathname: '/chats',
    },
  },
}

export const EventsActive: Story = {
  name: 'Events Active',
  parameters: {
    nextRouter: {
      pathname: '/events',
    },
  },
}

export const LikesActive: Story = {
  name: 'Likes Active',
  parameters: {
    nextRouter: {
      pathname: '/likes',
    },
  },
}

export const SafetyActive: Story = {
  name: 'Safety Active',
  parameters: {
    nextRouter: {
      pathname: '/safety',
    },
  },
}

