import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

/**
 * Component Avatar từ shadcn UI, sử dụng Radix UI Avatar làm cơ sở.
 *
 * Avatar bao gồm các component con:
 * - `Avatar`: Container chính hiển thị avatar
 * - `AvatarImage`: Hiển thị hình ảnh bên trong avatar
 * - `AvatarFallback`: Hiển thị nội dung dự phòng khi không có hình ảnh hoặc hình ảnh đang tải
 */
const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Class CSS tùy chỉnh',
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

/**
 * Mặc định - Avatar với hình ảnh
 */
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src='https://i.pravatar.cc/150?u=1' alt='Avatar' />
      <AvatarFallback>NA</AvatarFallback>
    </Avatar>
  ),
}

/**
 * Avatar với các kích thước khác nhau
 */
export const Sizes: Story = {
  render: () => (
    <div className='flex items-center space-x-4'>
      <Avatar className='h-6 w-6'>
        <AvatarImage src='https://i.pravatar.cc/150?u=2' alt='Avatar nhỏ' />
        <AvatarFallback>S</AvatarFallback>
      </Avatar>

      <Avatar className='h-10 w-10'>
        <AvatarImage
          src='https://i.pravatar.cc/150?u=3'
          alt='Avatar trung bình'
        />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>

      <Avatar className='h-16 w-16'>
        <AvatarImage src='https://i.pravatar.cc/150?u=4' alt='Avatar lớn' />
        <AvatarFallback>L</AvatarFallback>
      </Avatar>

      <Avatar className='h-24 w-24'>
        <AvatarImage src='https://i.pravatar.cc/150?u=5' alt='Avatar rất lớn' />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
}

/**
 * Avatar với các hình dạng khác nhau
 */
export const Shapes: Story = {
  render: () => (
    <div className='flex items-center space-x-4'>
      <Avatar className='h-12 w-12 rounded-full'>
        <AvatarImage src='https://i.pravatar.cc/150?u=6' alt='Avatar tròn' />
        <AvatarFallback>C</AvatarFallback>
      </Avatar>

      <Avatar className='h-12 w-12 rounded-md'>
        <AvatarImage src='https://i.pravatar.cc/150?u=7' alt='Avatar bo cong' />
        <AvatarFallback>R</AvatarFallback>
      </Avatar>

      <Avatar className='h-12 w-12 rounded-none'>
        <AvatarImage src='https://i.pravatar.cc/150?u=8' alt='Avatar vuông' />
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
    </div>
  ),
}

/**
 * Avatar với fallback (khi không có hình ảnh)
 */
export const Fallback: Story = {
  render: () => (
    <div className='flex items-center space-x-4'>
      <Avatar className='h-12 w-12'>
        <AvatarFallback>NT</AvatarFallback>
      </Avatar>

      <Avatar className='h-12 w-12'>
        <AvatarFallback className='bg-primary text-white'>BT</AvatarFallback>
      </Avatar>

      <Avatar className='h-12 w-12'>
        <AvatarFallback className='bg-blue-500 text-white'>AK</AvatarFallback>
      </Avatar>
    </div>
  ),
}

/**
 * Avatar với chỉ báo trạng thái
 */
export const WithStatus: Story = {
  render: () => (
    <div className='flex items-center space-x-6'>
      <div className='relative'>
        <Avatar className='h-12 w-12'>
          <AvatarImage
            src='https://i.pravatar.cc/150?u=9'
            alt='Avatar với trạng thái online'
          />
          <AvatarFallback>ON</AvatarFallback>
        </Avatar>
        <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500'></div>
      </div>

      <div className='relative'>
        <Avatar className='h-12 w-12'>
          <AvatarImage
            src='https://i.pravatar.cc/150?u=10'
            alt='Avatar với trạng thái offline'
          />
          <AvatarFallback>OF</AvatarFallback>
        </Avatar>
        <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-gray-400'></div>
      </div>

      <div className='relative'>
        <Avatar className='h-12 w-12'>
          <AvatarImage
            src='https://i.pravatar.cc/150?u=11'
            alt='Avatar với trạng thái away'
          />
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-yellow-500'></div>
      </div>

      <div className='relative'>
        <Avatar className='h-12 w-12'>
          <AvatarImage
            src='https://i.pravatar.cc/150?u=12'
            alt='Avatar với trạng thái do not disturb'
          />
          <AvatarFallback>DND</AvatarFallback>
        </Avatar>
        <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-red-500'></div>
      </div>
    </div>
  ),
}

/**
 * Nhóm Avatar
 */
export const AvatarGroup: Story = {
  render: () => (
    <div className='flex -space-x-2'>
      <Avatar className='h-10 w-10 border-2 border-white'>
        <AvatarImage src='https://i.pravatar.cc/150?u=13' alt='Avatar 1' />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>
      <Avatar className='h-10 w-10 border-2 border-white'>
        <AvatarImage src='https://i.pravatar.cc/150?u=14' alt='Avatar 2' />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>
      <Avatar className='h-10 w-10 border-2 border-white'>
        <AvatarImage src='https://i.pravatar.cc/150?u=15' alt='Avatar 3' />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
      <Avatar className='h-10 w-10 border-2 border-white'>
        <AvatarImage src='https://i.pravatar.cc/150?u=16' alt='Avatar 4' />
        <AvatarFallback>A4</AvatarFallback>
      </Avatar>
      <Avatar className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-200'>
        <span className='text-xs font-medium text-gray-600'>+3</span>
      </Avatar>
    </div>
  ),
}

/**
 * Avatar với hiệu ứng hover
 */
export const WithHoverEffect: Story = {
  render: () => (
    <Avatar className='h-12 w-12 cursor-pointer transition-transform hover:scale-110'>
      <AvatarImage
        src='https://i.pravatar.cc/150?u=17'
        alt='Avatar with hover effect'
      />
      <AvatarFallback>HE</AvatarFallback>
    </Avatar>
  ),
}

/**
 * Avatar với border
 */
export const WithBorder: Story = {
  render: () => (
    <div className='flex items-center space-x-4'>
      <Avatar className='h-12 w-12 border-2 border-primary'>
        <AvatarImage
          src='https://i.pravatar.cc/150?u=18'
          alt='Avatar with primary border'
        />
        <AvatarFallback>PB</AvatarFallback>
      </Avatar>

      <Avatar className='h-12 w-12 border-4 border-blue-500'>
        <AvatarImage
          src='https://i.pravatar.cc/150?u=19'
          alt='Avatar with thick blue border'
        />
        <AvatarFallback>BB</AvatarFallback>
      </Avatar>

      <Avatar className='h-12 w-12 border-2 border-dashed border-gray-400'>
        <AvatarImage
          src='https://i.pravatar.cc/150?u=20'
          alt='Avatar with dashed border'
        />
        <AvatarFallback>DB</AvatarFallback>
      </Avatar>
    </div>
  ),
}

/**
 * Avatar với hiệu ứng đổ bóng
 */
export const WithShadow: Story = {
  render: () => (
    <Avatar className='h-16 w-16 shadow-lg'>
      <AvatarImage
        src='https://i.pravatar.cc/150?u=21'
        alt='Avatar with shadow'
      />
      <AvatarFallback>SH</AvatarFallback>
    </Avatar>
  ),
}

/**
 * Avatar kết hợp với thông tin người dùng
 */
export const WithUserInfo: Story = {
  render: () => (
    <div className='flex items-center space-x-4 rounded-lg border p-4'>
      <div className='relative'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src='https://i.pravatar.cc/150?u=22' alt='User avatar' />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
        <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500'></div>
      </div>

      <div>
        <div className='font-medium'>Nguyễn Thành An</div>
        <div className='text-sm text-gray-500'>Trực tuyến</div>
      </div>
    </div>
  ),
}

/**
 * Avatar sử dụng trong comment
 */
export const InComment: Story = {
  render: () => (
    <div className='max-w-md space-y-4 rounded-lg border p-4'>
      <h3 className='font-medium'>Bình luận gần đây</h3>

      <div className='flex space-x-3'>
        <Avatar className='h-8 w-8 flex-shrink-0'>
          <AvatarImage
            src='https://i.pravatar.cc/150?u=23'
            alt='Comment avatar'
          />
          <AvatarFallback>TN</AvatarFallback>
        </Avatar>

        <div className='flex-1'>
          <div className='rounded-lg bg-gray-100 p-3'>
            <div className='text-sm font-medium'>Trần Bích Ngọc</div>
            <div className='text-sm'>Rất hữu ích, cảm ơn bạn đã chia sẻ!</div>
          </div>
          <div className='mt-1 flex items-center text-xs text-gray-500'>
            <span>2 giờ trước</span>
            <span className='mx-2'>•</span>
            <button className='hover:text-gray-700'>Thích</button>
            <span className='mx-2'>•</span>
            <button className='hover:text-gray-700'>Phản hồi</button>
          </div>
        </div>
      </div>

      <div className='flex space-x-3'>
        <Avatar className='h-8 w-8 flex-shrink-0'>
          <AvatarImage
            src='https://i.pravatar.cc/150?u=24'
            alt='Comment avatar'
          />
          <AvatarFallback>LĐ</AvatarFallback>
        </Avatar>

        <div className='flex-1'>
          <div className='rounded-lg bg-gray-100 p-3'>
            <div className='text-sm font-medium'>Lê Văn Dũng</div>
            <div className='text-sm'>
              Tôi cũng đồng ý với ý kiến này. Chúng ta nên tiếp tục thảo luận
              thêm về vấn đề này.
            </div>
          </div>
          <div className='mt-1 flex items-center text-xs text-gray-500'>
            <span>5 giờ trước</span>
            <span className='mx-2'>•</span>
            <button className='hover:text-gray-700'>Thích</button>
            <span className='mx-2'>•</span>
            <button className='hover:text-gray-700'>Phản hồi</button>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Danh sách người dùng với avatar
 */
export const UserList: Story = {
  render: () => (
    <div className='w-[300px] divide-y rounded-md border'>
      {[1, 2, 3, 4].map((id) => (
        <div
          key={id}
          className='flex items-center space-x-3 p-3 hover:bg-gray-50'
        >
          <div className='relative'>
            <Avatar className='h-10 w-10'>
              <AvatarImage
                src={`https://i.pravatar.cc/150?u=${20 + id}`}
                alt={`User ${id}`}
              />
              <AvatarFallback>U{id}</AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                id % 3 === 0
                  ? 'bg-gray-400'
                  : id % 3 === 1
                  ? 'bg-green-500'
                  : 'bg-yellow-500'
              }`}
            ></div>
          </div>

          <div className='flex-1'>
            <div className='text-sm font-medium'>Người dùng {id}</div>
            <div className='text-xs text-gray-500'>
              {id % 3 === 0
                ? 'Offline • 2 giờ trước'
                : id % 3 === 1
                ? 'Online'
                : 'Xa bàn phím'}
            </div>
          </div>

          <button className='text-xs font-medium text-primary'>Kết nối</button>
        </div>
      ))}
    </div>
  ),
}
