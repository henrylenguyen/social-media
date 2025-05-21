// libs/molecules/src/phoneMockup/index.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import PhoneMockup from './phoneMockup'
import { phoneModels } from './usePhoneMockup'

const meta: Meta<typeof PhoneMockup> = {
  title: 'Molecules/PhoneMockup',
  component: PhoneMockup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modelId: {
      control: 'select',
      options: phoneModels.map(model => model.id),
      description: 'Model điện thoại',
    },
    phoneColor: {
      control: 'color',
      description: 'Màu của điện thoại',
    },
    shadowColor: {
      control: 'color',
      description: 'Màu bóng đổ',
    },
    showModelSelector: {
      control: 'boolean',
      description: 'Hiển thị select chọn model điện thoại',
    },
    showColorSelector: {
      control: 'boolean',
      description: 'Hiển thị bộ chọn màu sắc',
    },
    scale: {
      control: { type: 'range', min: 0.6, max: 1.4, step: 0.1 },
      description: 'Tỷ lệ kích thước điện thoại',
    },
  },
}

export default meta
type Story = StoryObj<typeof PhoneMockup>

// Mock content for the profile preview like the image shows
const ProfilePreviewContent = () => (
  <div className="bg-gray-200 h-full">
    <div className="relative">
      <div className="h-40 bg-gradient-to-b from-gray-400 to-gray-600"></div>
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
      </div>
    </div>
    <div className="pt-14 px-4">
      <div className="text-center text-xl font-bold text-white">Tên của bạn, 25</div>
      <div className="text-center text-sm text-white mb-4">Công việc</div>

      <div className="mt-4">
        <div className="font-medium mb-1">Giới thiệu</div>
        <div className="text-sm text-gray-600 mb-4">Thêm một vài điều về bản thân...</div>
      </div>

      <div>
        <div className="font-medium mb-1">Sở thích</div>
        <div className="flex gap-2">
          <div className="bg-white rounded-full px-3 py-1 text-xs">Du lịch</div>
          <div className="bg-white rounded-full px-3 py-1 text-xs">Ẩm thực</div>
          <div className="bg-white rounded-full px-3 py-1 text-xs">Sách</div>
        </div>
      </div>
    </div>
  </div>
)

/**
 * Mặc định với iPhone 15 màu đen
 */
export const Default: Story = {
  args: {
    modelId: 'iphone-15',
    phoneColor: '#000000',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    showModelSelector: true,
    showColorSelector: true,
    scale: 1,
    children: <ProfilePreviewContent />
  },
}

/**
 * Điện thoại màu hồng với bóng đổ phù hợp
 */
export const PinkPhone: Story = {
  args: {
    modelId: 'iphone-15',
    phoneColor: '#ff5a5a',
    shadowColor: 'rgba(255, 90, 90, 0.5)',
    showModelSelector: true,
    showColorSelector: true,
    scale: 1,
    children: <ProfilePreviewContent />
  },
}

/**
 * Hiển thị tất cả các model điện thoại
 */
export const AllPhoneModels: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {phoneModels.map(model => (
        <div key={model.id} className="text-center">
          <p className="mb-2 font-medium">{model.name}</p>
          <PhoneMockup
            modelId={model.id}
            showModelSelector={false}
            showColorSelector={false}
            scale={0.8}
          >
            <ProfilePreviewContent />
          </PhoneMockup>
        </div>
      ))}
    </div>
  ),
}

/**
 * Kích thước khác nhau
 */
export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <div className="text-center">
        <p className="mb-2 font-medium">Nhỏ (0.7x)</p>
        <PhoneMockup
          modelId="iphone-15"
          showModelSelector={false}
          showColorSelector={false}
          scale={0.7}
        >
          <ProfilePreviewContent />
        </PhoneMockup>
      </div>
      <div className="text-center">
        <p className="mb-2 font-medium">Mặc định (1x)</p>
        <PhoneMockup
          modelId="iphone-15"
          showModelSelector={false}
          showColorSelector={false}
          scale={1}
        >
          <ProfilePreviewContent />
        </PhoneMockup>
      </div>
      <div className="text-center">
        <p className="mb-2 font-medium">Lớn (1.3x)</p>
        <PhoneMockup
          modelId="iphone-15"
          showModelSelector={false}
          showColorSelector={false}
          scale={1.3}
        >
          <ProfilePreviewContent />
        </PhoneMockup>
      </div>
    </div>
  ),
}

/**
 * Samsung Galaxy S23 blue edition
 */
export const SamsungBlue: Story = {
  args: {
    modelId: 'galaxy-s23',
    phoneColor: '#2563eb',
    shadowColor: 'rgba(37, 99, 235, 0.5)',
    showModelSelector: false,
    showColorSelector: false,
    scale: 1,
    children: <ProfilePreviewContent />
  },
}

/**
 * Bố cục tiền xem (Preview) như hình ví dụ
 */
export const PreviewLayout: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Xem trước hồ sơ</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h3 className="font-medium mb-3">Thiết bị điện thoại</h3>
          <select
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            defaultValue="iphone-15"
          >
            {phoneModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Màu điện thoại
            </label>
            <input
              type="color"
              defaultValue="#000000"
              className="w-full h-8 p-0 border border-gray-300 rounded cursor-pointer"
            />
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Hồ sơ sẽ cập nhật khi bạn điền thông tin
          </p>
        </div>

        <div className="md:w-2/3 flex justify-center">
          <PhoneMockup
            modelId="iphone-15"
            showModelSelector={false}
            showColorSelector={false}
          >
            <ProfilePreviewContent />
          </PhoneMockup>
        </div>
      </div>
    </div>
  ),
}
