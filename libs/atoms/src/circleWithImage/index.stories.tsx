import type { Meta, StoryObj } from '@storybook/react';
import CircleWithImage from './circleWithImage';
import { HeartIcon } from '@social-media/assets';

/**
 * Component CircleWithImage để hiển thị hình ảnh hoặc biểu tượng trong hình tròn
 */
const meta: Meta<typeof CircleWithImage> = {
  title: 'Atoms/CircleWithImage',
  component: CircleWithImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  argTypes: {
    imageUrl: {
      control: 'text',
      description: 'Đường dẫn hình ảnh hoặc React Node',
    },
    className: {
      control: 'text',
      description: 'Class CSS tùy chỉnh',
    },
    alt: {
      control: 'text',
      description: 'Alt text cho hình ảnh',
    },
    useNextImage: {
      control: 'boolean',
      description: 'Sử dụng Next.js Image component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CircleWithImage>;

/**
 * Mặc định - Hình tròn với hình ảnh bên trong
 */
export const Default: Story = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?u=3',
  },
};

/**
 * Hình tròn với biểu tượng SVG
 */
export const WithSVGIcon: Story = {
  args: {
    imageUrl: <HeartIcon width={60} height={60} />,
  },
};

/**
 * Kích thước nhỏ
 */
export const Small: Story = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?u=2',
    className: 'w-[50px] h-[50px]',
  },
};

/**
 * Kích thước lớn
 */
export const Large: Story = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?u=1',
    className: 'w-[150px] h-[150px]',
  },
};

/**
 * Với hiệu ứng hover
 */
export const WithHoverEffect: Story = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?u=4',
    className: 'transition-transform hover:scale-110 cursor-pointer',
  },
};

/**
 * Với viền
 */
export const WithBorder: Story = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?u=5',
    className: 'border-4 border-primary',
  },
};

/**
 * Với hiệu ứng đổ bóng
 */
export const WithShadow: Story = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?u=6',
    className: 'shadow-lg',
  },
};

/**
 * Với nền gradient
 */
export const WithGradientBackground: Story = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?u=7',
    className: 'bg-gradient-to-r from-primary to-primary-light p-1',
  },
};

/**
 * Sử dụng nhiều CircleWithImage với bố cục khác nhau
 */
export const CircleGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <CircleWithImage
        imageUrl="https://i.pravatar.cc/150?u=1"
        className="w-[70px] h-[70px]"
      />
      <CircleWithImage
        imageUrl="https://i.pravatar.cc/150?u=2"
        className="w-[70px] h-[70px]"
      />
      <CircleWithImage
        imageUrl="https://i.pravatar.cc/150?u=3"
        className="w-[70px] h-[70px]"
      />
      <CircleWithImage
        imageUrl={<HeartIcon width={40} height={40} />}
        className="w-[70px] h-[70px] bg-primary/10"
      />
      <CircleWithImage
        imageUrl="https://i.pravatar.cc/150?u=4"
        className="w-[70px] h-[70px]"
      />
      <CircleWithImage
        imageUrl="https://i.pravatar.cc/150?u=5"
        className="w-[70px] h-[70px]"
      />
    </div>
  ),
};

/**
 * Sử dụng trong danh sách người dùng
 */
export const UserList: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg p-4 bg-white">
      <h3 className="font-medium text-lg mb-4">Người dùng hoạt động</h3>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="flex items-center gap-3">
            <CircleWithImage
              imageUrl={`https://i.pravatar.cc/150?u=${id}`}
              className="w-[40px] h-[40px]"
            />
            <div>
              <p className="font-medium text-sm">Người dùng {id}</p>
              <p className="text-xs text-gray-500">Trực tuyến</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * Sử dụng trong giao diện hồ sơ
 */
export const ProfileHeader: Story = {
  render: () => (
    <div className="w-[400px] border rounded-lg overflow-hidden bg-white">
      <div className="h-32 bg-primary-light" />
      <div className="px-6 pb-4">
        <div className="relative flex justify-between">
          <CircleWithImage
            imageUrl="https://i.pravatar.cc/150?u=8"
            className="w-[100px] h-[100px] border-4 border-white absolute -top-12"
          />
          <div />
          <button className="mt-2 px-3 py-1 bg-primary text-white text-sm rounded-full">
            Theo dõi
          </button>
        </div>
        <div className="mt-14">
          <h2 className="font-bold text-xl">Nguyễn Văn A</h2>
          <p className="text-sm text-gray-500">Hà Nội, Việt Nam</p>
          <p className="mt-2 text-sm">
            Yêu thích âm nhạc, thể thao và du lịch. Luôn tìm kiếm những trải nghiệm mới.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="font-bold">245</p>
              <p className="text-xs text-gray-500">Bạn bè</p>
            </div>
            <div className="text-center">
              <p className="font-bold">12k</p>
              <p className="text-xs text-gray-500">Người theo dõi</p>
            </div>
            <div className="text-center">
              <p className="font-bold">254</p>
              <p className="text-xs text-gray-500">Đang theo dõi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Sắp xếp với các kích thước khác nhau
 */
export const DifferentSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CircleWithImage
        imageUrl="https://i.pravatar.cc/150?u=1"
        className="w-[40px] h-[40px]"
      />
      <CircleWithImage
        imageUrl="https://i.pravatar.cc/150?u=2"
        className="w-[60px] h-[60px]"
      />
      <CircleWithImage
        imageUrl="https://i.pravatar.cc/150?u=3"
        className="w-[80px] h-[80px]"
      />
      <CircleWithImage
        imageUrl="https://i.pravatar.cc/150?u=4"
        className="w-[100px] h-[100px]"
      />
      <CircleWithImage
        imageUrl="https://i.pravatar.cc/150?u=5"
        className="w-[120px] h-[120px]"
      />
    </div>
  ),
};

/**
 * Sử dụng với hình ảnh trong trường hợp hẹn hò
 */
export const DatingMatches: Story = {
  render: () => (
    <div className="w-[400px] p-4 border rounded-lg bg-white">
      <h3 className="font-medium text-lg mb-4">Những người phù hợp với bạn</h3>
      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
          <div key={id} className="text-center">
            <CircleWithImage
              imageUrl={`https://i.pravatar.cc/150?u=${10 + id}`}
              className="w-[70px] h-[70px] border-2 border-white shadow-md hover:scale-105 transition-transform cursor-pointer"
            />
            <p className="text-xs mt-1 font-medium">Người dùng {id}</p>
            <p className="text-[10px] text-gray-500">95% phù hợp</p>
          </div>
        ))}
      </div>
    </div>
  ),
};
