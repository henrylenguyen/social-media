import { Button } from '@social-media/atoms'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

/**
 * Component Card từ shadcn UI dùng để hiển thị thông tin trong một khung có cấu trúc.
 *
 * Card bao gồm các component con để tạo cấu trúc đầy đủ:
 * - `Card`: Container chính bao quanh tất cả các thành phần khác
 * - `CardHeader`: Phần đầu của thẻ, thường chứa tiêu đề và mô tả
 * - `CardTitle`: Tiêu đề của thẻ, thường đặt trong CardHeader
 * - `CardDescription`: Mô tả ngắn gọn, thường đặt trong CardHeader
 * - `CardContent`: Phần thân chính của thẻ chứa nội dung
 * - `CardFooter`: Phần chân của thẻ, thường chứa các nút hành động
 *
 * Các thành phần có thể được sử dụng độc lập hoặc kết hợp để tạo ra các giao diện card phù hợp với nhu cầu.
 */
const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Class CSS tùy chỉnh',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

/**
 * Mặc định - Card cơ bản
 */
export const Default: Story = {
  render: () => (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Tiêu đề thẻ</CardTitle>
        <CardDescription>Mô tả ngắn về nội dung thẻ</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Nội dung thẻ. Đây là phần chính của thẻ thông tin.</p>
      </CardContent>
      <CardFooter>
        <p>Chân thẻ</p>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card thông báo
 */
export const NotificationCard: Story = {
  render: () => (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Thông báo mới</CardTitle>
        <CardDescription>Bạn có 3 thông báo chưa đọc</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex items-start space-x-4 rounded-lg border p-3'>
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium'>
              Bài viết của bạn đã được duyệt
            </p>
            <p className='text-xs text-gray-500'>5 phút trước</p>
          </div>
        </div>
        <div className='flex items-start space-x-4 rounded-lg border p-3'>
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium'>Tin nhắn mới từ Nguyễn Văn A</p>
            <p className='text-xs text-gray-500'>30 phút trước</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant='ghost' size='sm' className='w-full'>
          Xem tất cả thông báo
        </Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card hồ sơ người dùng
 */
export const UserProfileCard: Story = {
  render: () => (
    <Card className='w-[350px] overflow-hidden'>
      <div className='h-24 bg-gradient-to-r from-primary to-primary-light' />
      <div className='relative px-6'>
        <div className='h-20 w-20 rounded-full border-4 border-white bg-white absolute -top-10 overflow-hidden'>
          <img
            src='https://i.pravatar.cc/150?u=a'
            alt='Avatar'
            className='h-full w-full object-cover'
          />
        </div>
      </div>
      <CardHeader className='pt-6 mt-6'>
        <CardTitle>Nguyễn Văn A</CardTitle>
        <CardDescription>Nhà phát triển ứng dụng</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 text-gray-500'
            >
              <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
            </svg>
            <span className='text-sm'>0123 456 789</span>
          </div>
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 text-gray-500'
            >
              <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
              <polyline points='22,6 12,13 2,6' />
            </svg>
            <span className='text-sm'>nguyenvana@example.com</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' size='sm'>
          Nhắn tin
        </Button>
        <Button size='sm'>Xem hồ sơ</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card sản phẩm
 */
export const ProductCard: Story = {
  render: () => (
    <Card className='w-[300px] overflow-hidden'>
      <div className='relative h-48 overflow-hidden'>
        <img
          src='https://images.unsplash.com/photo-1523275335684-37898b6baf30'
          alt='Sản phẩm'
          className='h-full w-full object-cover transition-transform hover:scale-105'
        />
        <span className='absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded'>
          -15%
        </span>
      </div>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg'>Đồng hồ thông minh XYZ</CardTitle>
        <CardDescription>Theo dõi sức khỏe, thông báo</CardDescription>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <span className='font-bold text-lg'>1.190.000₫</span>
            <span className='text-gray-500 line-through text-sm'>
              1.400.000₫
            </span>
          </div>
          <div className='flex items-center text-yellow-400'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
            </svg>
            <span className='ml-1 text-sm'>4.5</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Thêm vào giỏ hàng</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card tin tức
 */
export const NewsCard: Story = {
  render: () => (
    <Card className='w-[350px] overflow-hidden'>
      <div className='h-48 overflow-hidden'>
        <img
          src='https://images.unsplash.com/photo-1523240795612-9a054b0db644'
          alt='Tin tức'
          className='h-full w-full object-cover'
        />
      </div>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg'>
            Công nghệ mới nhất trong năm 2025
          </CardTitle>
        </div>
        <CardDescription className='flex items-center text-xs'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='12'
            height='12'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-1'
          >
            <circle cx='12' cy='12' r='10' />
            <polyline points='12 6 12 12 16 14' />
          </svg>
          18 tháng 5, 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-600'>
          Khám phá những công nghệ mới nhất đang định hình tương lai của ngành
          công nghiệp trong năm 2025...
        </p>
      </CardContent>
      <CardFooter className='flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <div className='h-8 w-8 rounded-full overflow-hidden'>
            <img
              src='https://i.pravatar.cc/150?u=b'
              alt='Tác giả'
              className='h-full w-full object-cover'
            />
          </div>
          <span className='text-xs font-medium'>Trần Văn B</span>
        </div>
        <Button variant='ghost' size='sm'>
          Đọc thêm
        </Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card cài đặt
 */
export const SettingCard: Story = {
  render: () => (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Cài đặt thông báo</CardTitle>
        <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <p className='text-sm font-medium'>Tin nhắn</p>
            <p className='text-xs text-gray-500'>
              Nhận thông báo khi có tin nhắn mới
            </p>
          </div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              value=''
              className='sr-only peer'
              defaultChecked
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <p className='text-sm font-medium'>Lượt thích</p>
            <p className='text-xs text-gray-500'>
              Nhận thông báo khi có người thích bài viết
            </p>
          </div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input type='checkbox' value='' className='sr-only peer' />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <p className='text-sm font-medium'>Bình luận</p>
            <p className='text-xs text-gray-500'>
              Nhận thông báo khi có người bình luận
            </p>
          </div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              value=''
              className='sr-only peer'
              defaultChecked
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Lưu thay đổi</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Tùy chỉnh Card với gradient
 */
export const GradientCard: Story = {
  render: () => (
    <Card className='w-[350px] bg-gradient-to-br from-primary to-primary-light text-white'>
      <CardHeader>
        <CardTitle>Gói Premium</CardTitle>
        <CardDescription className='text-white text-opacity-80'>
          Nâng cấp tài khoản của bạn ngay hôm nay
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='text-3xl font-bold'>
          199.000₫<span className='text-lg font-normal'>/tháng</span>
        </div>
        <ul className='mt-4 space-y-2 text-sm'>
          <li className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2'
            >
              <polyline points='20 6 9 17 4 12' />
            </svg>
            Không giới hạn lượt thích
          </li>
          <li className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2'
            >
              <polyline points='20 6 9 17 4 12' />
            </svg>
            Xem người đã thích bạn
          </li>
          <li className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2'
            >
              <polyline points='20 6 9 17 4 12' />
            </svg>
            Giao diện không quảng cáo
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className='w-full bg-white text-primary hover:bg-white/90'>
          Đăng ký ngay
        </Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card ngang
 */
export const HorizontalCard: Story = {
  render: () => (
    <Card className='flex flex-row overflow-hidden w-[500px]'>
      <div className='w-1/3'>
        <img
          src='https://images.unsplash.com/photo-1541701494587-cb58502866ab'
          alt='Sự kiện'
          className='h-full object-cover'
        />
      </div>
      <div className='w-2/3 flex flex-col'>
        <CardHeader>
          <CardTitle>Sự kiện công nghệ 2025</CardTitle>
          <CardDescription>TP. Hồ Chí Minh, 25/05/2025</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm'>
            Sự kiện trưng bày công nghệ lớn nhất Việt Nam với hơn 100 gian hàng
            từ các doanh nghiệp hàng đầu.
          </p>
        </CardContent>
        <CardFooter className='mt-auto'>
          <Button>Đăng ký tham gia</Button>
        </CardFooter>
      </div>
    </Card>
  ),
}
