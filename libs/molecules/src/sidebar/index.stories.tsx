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
    // Layout để nội dung không chồng lên sidebar
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
        <div
          style={{
            flex: 1,
            marginLeft: '256px', // Width của sidebar (w-64 = 16rem = 256px)
            padding: '20px',
            background: '#f9fafb',
            overflow: 'auto',
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#1f2937',
            }}
          >
            Demo Content
          </h1>
          <p style={{ marginBottom: '12px', color: '#6b7280' }}>
            Nội dung trang. Kiểm tra sidebar bên trái để xem active state.
          </p>
          <p style={{ marginBottom: '12px', color: '#6b7280' }}>
            Active state sẽ được highlight bằng màu primary với border trái và
            gradient background.
          </p>
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
              marginTop: '20px',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#374151',
              }}
            >
              Card Example
            </h2>
            <p style={{ color: '#6b7280' }}>
              Đây là một ví dụ về nội dung trang. Sidebar được cố định bên trái
              và nội dung này sẽ không bị che phủ bởi sidebar.
            </p>
          </div>
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
