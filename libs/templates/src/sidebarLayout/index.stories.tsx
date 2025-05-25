import type { Meta, StoryObj } from '@storybook/react'
import SidebarLayout from './sidebarLayout'

const meta: Meta<typeof SidebarLayout> = {
  title: 'Templates/SidebarLayout',
  component: SidebarLayout,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      pathname: '/discovery',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className='space-y-6'>
        <header>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Trang khám phá
          </h1>
          <p className='text-gray-600'>
            Đây là trang khám phá với sidebar bên trái. Nội dung này sẽ không bị
            che phủ bởi sidebar.
          </p>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'
            >
              <div className='w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-md mb-4'></div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Card {i + 1}
              </h3>
              <p className='text-gray-600 text-sm'>
                Mô tả ngắn gọn cho card này. Lorem ipsum dolor sit amet
                consectetur.
              </p>
            </div>
          ))}
        </div>

        <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
          {' '}
          <h2 className='text-xl font-semibold text-blue-900 mb-3'>
            <span role='img' aria-label='lightbulb'>
              💡
            </span>{' '}
            Thông tin về Layout
          </h2>
          <ul className='text-blue-800 space-y-2'>
            <li>• Sidebar được cố định bên trái với width 256px</li>
            <li>• Content area có margin-left để tránh overlap</li>
            <li>• Responsive và có thể scroll khi nội dung dài</li>
            <li>• Active states của sidebar hoạt động bình thường</li>
          </ul>
        </div>
      </div>
    ),
  },
}

export const WithChatsActive: Story = {
  parameters: {
    nextRouter: {
      pathname: '/chats',
    },
  },
  args: {
    children: (
      <div className='space-y-6'>
        {' '}
        <header>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            <span role='img' aria-label='speech bubble'>
              💬
            </span>{' '}
            Trò chuyện
          </h1>
          <p className='text-gray-600'>
            Trang trò chuyện với sidebar active state ở mục "Trò chuyện".
          </p>
        </header>
        <div className='bg-green-50 border border-green-200 rounded-lg p-6'>
          <h2 className='text-xl font-semibold text-green-900 mb-3'>
            Cuộc trò chuyện
          </h2>
          <div className='space-y-3'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-green-300 rounded-full'></div>
                <div className='flex-1'>
                  <p className='font-medium text-green-900'>
                    Người dùng {i + 1}
                  </p>
                  <p className='text-sm text-green-700'>Tin nhắn mẫu...</p>
                </div>
                <span className='text-xs text-green-600'>
                  5 badge đang active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
}

export const WithEventsActive: Story = {
  parameters: {
    nextRouter: {
      pathname: '/events',
    },
  },
  args: {
    children: (
      <div className='space-y-6'>
        {' '}
        <header>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            <span role='img' aria-label='calendar'>
              📅
            </span>{' '}
            Sự kiện
          </h1>
          <p className='text-gray-600'>
            Trang sự kiện với sidebar active state ở mục "Sự kiện".
          </p>
        </header>
        <div className='bg-purple-50 border border-purple-200 rounded-lg p-6'>
          <h2 className='text-xl font-semibold text-purple-900 mb-3'>
            Sự kiện sắp tới
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className='bg-white rounded-lg p-4 border border-purple-100'
              >
                <h3 className='font-semibold text-purple-900'>
                  Sự kiện {i + 1}
                </h3>
                <p className='text-sm text-purple-700 mt-1'>
                  25/05/2025 - 18:00
                </p>
                <p className='text-xs text-purple-600 mt-2'>Địa điểm: TP.HCM</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
}
