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
      options: phoneModels.map((model) => model.id),
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

// Mock content for the profile preview
const ProfilePreviewContent = () => (
  <div style={{ width: '100%' }}>
    <div style={{ position: 'relative' }}>
      <div
        style={{
          height: '160px',
          background: 'linear-gradient(to bottom, #a0aec0, #4a5568)',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: '64px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            width: '96px',
            height: '96px',
            backgroundColor: '#d1d5db',
            borderRadius: '50%',
          }}
        ></div>
      </div>
    </div>

    <div style={{ paddingTop: '56px' }}>
      <div
        style={{
          textAlign: 'center',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        Tên của bạn, 25
      </div>

      <div
        style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'white',
          marginBottom: '16px',
        }}
      >
        Công việc
      </div>

      <div style={{ marginTop: '16px' }}>
        <div
          style={{
            fontWeight: '500',
            marginBottom: '4px',
          }}
        >
          Giới thiệu
        </div>

        <div
          style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '16px',
          }}
        >
          Thêm một vài điều về bản thân...
        </div>
      </div>

      <div>
        <div
          style={{
            fontWeight: '500',
            marginBottom: '4px',
          }}
        >
          Sở thích
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '9999px',
              padding: '4px 12px',
              fontSize: '0.75rem',
            }}
          >
            Du lịch
          </div>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '9999px',
              padding: '4px 12px',
              fontSize: '0.75rem',
            }}
          >
            Ẩm thực
          </div>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '9999px',
              padding: '4px 12px',
              fontSize: '0.75rem',
            }}
          >
            Sách
          </div>
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
    children: <ProfilePreviewContent />,
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
    children: <ProfilePreviewContent />,
  },
}

/**
 * iPhone SE
 */
export const iPhoneSE: Story = {
  args: {
    modelId: 'iphone-se',
    phoneColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    showModelSelector: false,
    showColorSelector: false,
    scale: 1,
    children: <ProfilePreviewContent />,
  },
}

/**
 * Galaxy Z Fold
 */
export const GalaxyFold: Story = {
  args: {
    modelId: 'galaxy-z-fold',
    phoneColor: '#1a1a1a',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    showModelSelector: false,
    showColorSelector: false,
    scale: 1,
    children: <ProfilePreviewContent />,
  },
}

/**
 * Hiển thị tất cả các model điện thoại
 */
export const AllPhoneModels: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '2rem',
        padding: '1rem',
      }}
    >
      {phoneModels.map((model) => (
        <div key={model.id} style={{ textAlign: 'center' }}>
          <p
            style={{
              marginBottom: '0.5rem',
              fontWeight: '500',
            }}
          >
            {model.name}
          </p>
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '1rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            marginBottom: '0.5rem',
            fontWeight: '500',
          }}
        >
          Nhỏ (0.7x)
        </p>
        <PhoneMockup
          modelId='iphone-15'
          showModelSelector={false}
          showColorSelector={false}
          scale={0.7}
        >
          <ProfilePreviewContent />
        </PhoneMockup>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            marginBottom: '0.5rem',
            fontWeight: '500',
          }}
        >
          Mặc định (1x)
        </p>
        <PhoneMockup
          modelId='iphone-15'
          showModelSelector={false}
          showColorSelector={false}
          scale={1}
        >
          <ProfilePreviewContent />
        </PhoneMockup>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            marginBottom: '0.5rem',
            fontWeight: '500',
          }}
        >
          Lớn (1.3x)
        </p>
        <PhoneMockup
          modelId='iphone-15'
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
    children: <ProfilePreviewContent />,
  },
}

/**
 * Bố cục tiền xem (Preview) như hình ví dụ
 */
export const PreviewLayout: Story = {
  render: () => (
    <div
      style={{
        width: '100%',
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '1.5rem',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
      }}
    >
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '1rem',
        }}
      >
        Xem trước hồ sơ
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div style={{ flex: '1' }}>
          <h3
            style={{
              fontWeight: '500',
              marginBottom: '0.75rem',
              textAlign: 'center',
            }}
          >
            Thiết bị điện thoại
          </h3>

          <select
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
            defaultValue='galaxy-s23'
          >
            {phoneModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.25rem',
                  textAlign: 'center',
                }}
              >
                Màu điện thoại
              </label>

              <input
                type='color'
                defaultValue='#000000'
                style={{
                  width: '100%',
                  height: '2rem',
                  padding: '0',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.25rem',
                  textAlign: 'center',
                }}
              >
                Màu bóng đổ
              </label>

              <input
                type='color'
                defaultValue='#000000'
                style={{
                  width: '100%',
                  height: '2rem',
                  padding: '0',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>

          <p
            style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              marginTop: '1rem',
              textAlign: 'center',
            }}
          >
            Hồ sơ sẽ cập nhật khi bạn điền thông tin
          </p>
        </div>

        <div
          style={{
            flex: '2',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <PhoneMockup
            modelId='galaxy-s23'
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
