import type { Meta, StoryObj } from '@storybook/react'
import GridLayout from './gridLayout'

const meta: Meta<typeof GridLayout> = {
  title: 'Organisms/GridLayout',
  component: GridLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'primary',
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Nội dung hiển thị ở phần bên phải của grid',
    },
    leftChildren: {
      control: 'text',
      description: 'Nội dung hiển thị ở phần bên trái của grid',
    },
    rightClassName: {
      control: 'text',
      description: 'Class CSS tùy chỉnh cho phần bên phải',
    },
    leftClassName: {
      control: 'text',
      description: 'Class CSS tùy chỉnh cho phần bên trái',
    },
    showDefaultLeftContent: {
      control: 'boolean',
      description: 'Có hiển thị nội dung mặc định ở cột trái không',
    },
  },
}

export default meta
type Story = StoryObj<typeof GridLayout>

/**
 * Ví dụ cơ bản với nội dung mặc định bên trái và form đăng nhập bên phải
 */
export const Default: Story = {
  args: {
    children: (
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Đăng nhập
        </h2>
        <form className='space-y-4'>
          <div>
            <label className='block text-gray-700 mb-2'>Email</label>
            <input
              type='email'
              className='w-full px-4 py-2 border rounded-md'
              placeholder='your@email.com'
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-2'>Mật khẩu</label>
            <input
              type='password'
              className='w-full px-4 py-2 border rounded-md'
              placeholder='********'
            />
          </div>
          <button
            type='button'
            className='w-full bg-primary text-white py-2 rounded-md mt-6'
          >
            Đăng nhập
          </button>
        </form>
      </div>
    ),
  },
}

/**
 * Ví dụ với form đăng ký và nội dung tùy chỉnh bên trái
 */
export const CustomLeftContent: Story = {
  args: {
    showDefaultLeftContent: false,
    leftChildren: (
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='rounded-full bg-white/10 p-6 mb-6'>
          <svg
            width='80'
            height='80'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
              fill='white'
            />
          </svg>
        </div>
        <h2 className='text-3xl font-bold text-white mb-3'>
          Kết nối ngay hôm nay
        </h2>
        <p className='text-white/80 text-center max-w-md'>
          Ứng dụng hẹn hò tiên tiến nhất, kết nối bạn với những người phù hợp
          trong khu vực của bạn.
        </p>
      </div>
    ),
    children: (
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Đăng ký tài khoản
        </h2>
        <form className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700 mb-2'>Họ</label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-md'
                placeholder='Nguyễn'
              />
            </div>
            <div>
              <label className='block text-gray-700 mb-2'>Tên</label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-md'
                placeholder='Văn A'
              />
            </div>
          </div>
          <div>
            <label className='block text-gray-700 mb-2'>Email</label>
            <input
              type='email'
              className='w-full px-4 py-2 border rounded-md'
              placeholder='your@email.com'
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-2'>Mật khẩu</label>
            <input
              type='password'
              className='w-full px-4 py-2 border rounded-md'
              placeholder='********'
            />
          </div>
          <button
            type='button'
            className='w-full bg-primary text-white py-2 rounded-md mt-6'
          >
            Tạo tài khoản
          </button>
        </form>
      </div>
    ),
  },
}

/**
 * Ví dụ với bước xác minh danh tính và kiểu dáng tùy chỉnh
 */
export const VerificationStep: Story = {
  args: {
    leftClassName: 'relative bg-opacity-70',
    rightClassName: 'bg-gray-50',
    children: (
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Xác minh danh tính
        </h2>
        <div className='flex justify-center mb-6'>
          <div className='rounded-full bg-blue-100 p-4'>
            <svg
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z'
                fill='#4285F4'
              />
            </svg>
          </div>
        </div>
        <p className='text-gray-600 text-center mb-6'>
          Để đảm bảo tính xác thực và an toàn cho cộng đồng, chúng tôi cần xác
          minh danh tính của bạn.
        </p>
        <div className='space-y-4'>
          <div className='border rounded-md p-4 cursor-pointer hover:bg-gray-50'>
            <div className='flex items-center'>
              <div className='rounded-full bg-gray-100 p-2 mr-3'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M2 6H22V18H2V6Z' stroke='#666' strokeWidth='2' />
                  <path
                    d='M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z'
                    fill='#666'
                  />
                </svg>
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>
                  Xác minh qua chứng minh nhân dân / CCCD
                </h3>
                <p className='text-sm text-gray-500'>
                  Cách nhanh nhất để xác minh danh tính của bạn
                </p>
              </div>
            </div>
          </div>
          <div className='border rounded-md p-4 cursor-pointer hover:bg-gray-50'>
            <div className='flex items-center'>
              <div className='rounded-full bg-gray-100 p-2 mr-3'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z'
                    stroke='#666'
                    strokeWidth='2'
                  />
                  <path
                    d='M12 18H12.01'
                    stroke='#666'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>
                  Xác minh qua số điện thoại
                </h3>
                <p className='text-sm text-gray-500'>
                  Nhận mã xác minh qua tin nhắn SMS
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex mt-6'>
          <button
            type='button'
            className='flex-1 py-2 border border-gray-300 rounded-md mr-2 hover:bg-gray-50'
          >
            Bỏ qua
          </button>
          <button
            type='button'
            className='flex-1 bg-primary text-white py-2 rounded-md ml-2'
          >
            Tiếp tục
          </button>
        </div>
      </div>
    ),
  },
}

/**
 * Ví dụ với thiết kế rỗng để người dùng tự thêm nội dung
 */
export const EmptyLayout: Story = {
  args: {
    showDefaultLeftContent: false,
    leftChildren: (
      <div className='flex items-center justify-center h-full'>
        <p className='text-white text-lg'>
          Phần nội dung bên trái - Tùy chỉnh theo ý của bạn
        </p>
      </div>
    ),
    children: (
      <div className='flex items-center justify-center h-full'>
        <p className='text-gray-700 text-lg'>
          Phần nội dung bên phải - Tùy chỉnh theo ý của bạn
        </p>
      </div>
    ),
  },
}
