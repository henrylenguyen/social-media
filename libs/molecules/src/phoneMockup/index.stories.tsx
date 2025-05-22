// libs/molecules/src/phoneMockup/PhoneMockup.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { PhoneMockupComponent } from './phoneMockup'
import { phoneModels } from './phoneModels'

const meta: Meta<typeof PhoneMockupComponent> = {
  title: 'Molecules/PhoneMockup',
  component: PhoneMockupComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `


Component mockup điện thoại thực tế với kích thước CSS chính xác và tính năng tương tác.

## ✨ Tính năng chính:
- 🔋 **Pin thật**: Hiển thị mức pin thực từ thiết bị
- 📶 **Mạng tự động**: Tự động nhận diện WiFi/4G/Cellular
- 🔄 **Xoay màn hình**: Chuyển đổi portrait/landscape mượt mà
- 📏 **Điều chỉnh kích thước**: Scale giống browser DevTools
- 📱 **13 thiết bị**: Tất cả flagship phones + foldables
- ⚡ **Trạng thái sạc**: Animation khi đang sạc pin
- 🌍 **Nhà mạng tự động**: Tự động nhận diện theo vùng

## 📱 Thiết bị được hỗ trợ:
**iPhone**: 15, SE (2022), XR, 12 Pro | **Samsung**: Galaxy S23, A51, Z Fold 5, Z Flip 5 | **Google**: Pixel 7 | **Xiaomi**: 13

## 🎯 Ứng dụng thực tế:
- Preview ứng dụng và demo sản phẩm
- Test responsive design
- Thuyết trình cho khách hàng
- Tài liệu marketing
- Design system documentation
        `,
      },
    },
  },
  argTypes: {
    modelId: {
      control: 'select',
      options: phoneModels.map((model) => model.id),
      description: 'Model điện thoại cần hiển thị',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'iphone-15' },
      },
    },
    phoneColor: {
      control: 'color',
      description: 'Màu sắc của điện thoại',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#000000' },
      },
    },
    shadowColor: {
      control: 'color',
      description: 'Màu sắc bóng đổ',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'rgba(0, 0, 0, 0.5)' },
      },
    },
    showModelSelector: {
      control: 'boolean',
      description: 'Hiển thị dropdown chọn model điện thoại',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showColorSelector: {
      control: 'boolean',
      description: 'Hiển thị bộ chọn màu sắc',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showScaleSelector: {
      control: 'boolean',
      description: 'Hiển thị dropdown điều chỉnh kích thước',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showOrientationToggle: {
      control: 'boolean',
      description: 'Hiển thị nút xoay màn hình',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PhoneMockupComponent>

// Nội dung mẫu cho các demo
const NoiDungProfile = () => (
  <div style={{ width: '100%', height: '100%', backgroundColor: '#f8f9fa' }}>
    {/* Header với gradient */}
    <div
      style={{
        height: '200px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
        }}
      >
        👤
      </div>
    </div>

    {/* Thông tin profile */}
    <div style={{ padding: '20px' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }}>
        Nguyễn Văn A, 25
      </h2>
      <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
        📍 Hà Nội • Kỹ sư phần mềm
      </p>

      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}
        >
          Giới thiệu bản thân
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#333' }}>
          Đam mê công nghệ và du lịch. Thích khám phá những điều mới lạ và chia
          sẻ kinh nghiệm với mọi người.
        </p>
      </div>

      <div>
        <h3
          style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}
        >
          Sở thích cá nhân
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['🎵 Âm nhạc', '📚 Đọc sách', '🏃‍♂️ Chạy bộ', '📷 Nhiếp ảnh'].map(
            (hobby) => (
              <span
                key={hobby}
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '16px',
                  fontSize: '12px',
                  color: '#1976d2',
                }}
              >
                {hobby}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  </div>
)

const NoiDungChat = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Header chat */}
    <div
      style={{
        padding: '16px',
        backgroundColor: '#2196f3',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.2)',
        }}
      />
      <div>
        <div style={{ fontWeight: 'bold' }}>Trần Thị B</div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>Đang hoạt động</div>
      </div>
    </div>

    {/* Tin nhắn */}
    <div
      style={{
        flex: 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ alignSelf: 'flex-start' }}>
        <div
          style={{
            backgroundColor: 'white',
            padding: '8px 12px',
            borderRadius: '18px',
            fontSize: '14px',
            maxWidth: '70%',
          }}
        >
          Chào bạn! Bạn có khỏe không?
        </div>
        <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
          14:30
        </div>
      </div>

      <div style={{ alignSelf: 'flex-end' }}>
        <div
          style={{
            backgroundColor: '#2196f3',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '18px',
            fontSize: '14px',
            maxWidth: '70%',
          }}
        >
          Mình khỏe, cảm ơn bạn! Hôm nay trời đẹp nhỉ?
        </div>
        <div
          style={{
            fontSize: '10px',
            color: '#666',
            marginTop: '4px',
            textAlign: 'right',
          }}
        >
          14:32
        </div>
      </div>

      <div style={{ alignSelf: 'flex-start' }}>
        <div
          style={{
            backgroundColor: 'white',
            padding: '8px 12px',
            borderRadius: '18px',
            fontSize: '14px',
            maxWidth: '70%',
          }}
        >
          Ừa, có muốn đi café không?
        </div>
        <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
          14:33
        </div>
      </div>
    </div>

    {/* Ô nhập tin nhắn */}
    <div
      style={{
        padding: '16px',
        backgroundColor: 'white',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        gap: '8px',
      }}
    >
      <div
        style={{
          flex: 1,
          padding: '8px 12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '20px',
          fontSize: '14px',
        }}
      >
        Nhập tin nhắn...
      </div>
      <button
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#2196f3',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        ➤
      </button>
    </div>
  </div>
)

const NoiDungDashboard = () => (
  <div style={{ width: '100%', height: '100%', backgroundColor: '#f8f9fa' }}>
    {/* Header dashboard */}
    <div
      style={{
        padding: '20px 16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
        Bảng điều khiển
      </h1>
      <p style={{ margin: '4px 0 0 0', opacity: 0.9 }}>
        Xin chào, Nguyễn Văn A!
      </p>
    </div>

    {/* Thống kê */}
    <div style={{ padding: '16px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        {[
          { label: 'Doanh thu', value: '₫2.4M', icon: '💰' },
          { label: 'Đơn hàng', value: '143', icon: '📦' },
          { label: 'Khách hàng', value: '89', icon: '👥' },
          { label: 'Tăng trưởng', value: '+12%', icon: '📈' },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              {stat.icon}
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '4px',
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Hoạt động gần đây */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>
          Hoạt động gần đây
        </h3>
        {[
          '🛒 Đơn hàng mới từ Trần Văn B',
          '💳 Thanh toán 500K đã hoàn tất',
          '📊 Báo cáo tháng đã sẵn sàng',
          '👤 Khách hàng mới đăng ký',
        ].map((activity, i) => (
          <div
            key={i}
            style={{
              padding: '8px 0',
              borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none',
              fontSize: '14px',
            }}
          >
            {activity}
          </div>
        ))}
      </div>
    </div>
  </div>
)

/**
 * Mặc định - Playground với tất cả tính năng
 *
 * Hiển thị component với đầy đủ controls để test các tính năng.
 * Scale mặc định 50% để phù hợp với màn hình.
 */
export const MacDinh: Story = {
  args: {
    modelId: 'iphone-15',
    phoneColor: '#000000',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    showModelSelector: true,
    showColorSelector: true,
    showScaleSelector: true,
    showOrientationToggle: true,
    children: <NoiDungProfile />,
  },
}

/**
 * iPhone 15 - Flagship mới nhất của Apple
 *
 * Điện thoại cao cấp với Dynamic Island và thiết kế hiện đại.
 * Kích thước: 590×1278px (CSS logical pixels).
 */
export const iPhone15: Story = {
  args: {
    modelId: 'iphone-15',
    phoneColor: '#000000',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    showModelSelector: false,
    showColorSelector: false,
    showScaleSelector: true,
    showOrientationToggle: true,
    children: <NoiDungProfile />,
  },
}

/**
 * iPhone SE - Thiết kế cổ điển với nút Home
 *
 * iPhone compact với Touch ID và thiết kế truyền thống.
 * Kích thước: 375×667px (CSS logical pixels).
 */
export const iPhoneSE: Story = {
  args: {
    modelId: 'iphone-se',
    phoneColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    showModelSelector: false,
    showColorSelector: false,
    showScaleSelector: true,
    showOrientationToggle: true,
    children: <NoiDungChat />,
  },
}

/**
 * Samsung Galaxy S23 - Flagship Android nhỏ gọn
 *
 * Điện thoại Android cao cấp với kích thước nhỏ gọn, dễ cầm nắm.
 * Kích thước: 360×780px (CSS logical pixels).
 */
export const GalaxyS23: Story = {
  args: {
    modelId: 'galaxy-s23',
    phoneColor: '#6366f1',
    shadowColor: 'rgba(99, 102, 241, 0.5)',
    showModelSelector: false,
    showColorSelector: false,
    showScaleSelector: true,
    showOrientationToggle: true,
    children: <NoiDungDashboard />,
  },
}

/**
 * Galaxy Z Fold 5 - Màn hình chính (chế độ tablet)
 *
 * Điện thoại gập với màn hình lớn, có thể sử dụng như tablet.
 * Kích thước: 906×1088px (CSS logical pixels).
 */
export const GalaxyZFoldMain: Story = {
  args: {
    modelId: 'galaxy-z-fold-main',
    phoneColor: '#1a1a1a',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    showModelSelector: false,
    showColorSelector: false,
    showScaleSelector: true,
    showOrientationToggle: true,
    children: (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          padding: '20px',
          height: '100%',
        }}
      >
        <NoiDungProfile />
        <NoiDungChat />
      </div>
    ),
  },
}

/**
 * Galaxy Z Flip 5 - Màn hình ngoài nhỏ
 *
 * Màn hình cover nhỏ của điện thoại gập dọc Galaxy Z Flip.
 * Kích thước: 360×374px (CSS logical pixels).
 */
export const ZFlipCover: Story = {
  args: {
    modelId: 'galaxy-z-flip-cover',
    phoneColor: '#8b5cf6',
    shadowColor: 'rgba(139, 92, 246, 0.5)',
    showModelSelector: false,
    showColorSelector: false,
    showScaleSelector: false,
    showOrientationToggle: false,
    children: (
      <div
        style={{
          padding: '12px',
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          color: 'white',
        }}
      >
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏰</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>14:30</div>
        <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>
          Thứ 6, 22/5
        </div>
        <div style={{ marginTop: '12px', fontSize: '14px' }}>
          📱 3 tin nhắn mới
        </div>
      </div>
    ),
  },
}

/**
 * Tất cả thiết bị - Lưới 2 cột để so sánh
 *
 * Hiển thị tất cả 13 model điện thoại trong grid 2 cột để dễ so sánh kích thước.
 * Mỗi thiết bị hiển thị với scale tự động phù hợp.
 */
export const AllDevice: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '3rem',
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      {phoneModels.map((model) => (
        <div key={model.id} style={{ textAlign: 'center' }}>
          <h3
            style={{
              marginBottom: '1rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#374151',
              minHeight: '24px',
            }}
          >
            {model.name}
          </h3>
          <PhoneMockupComponent
            modelId={model.id}
            showModelSelector={false}
            showColorSelector={false}
            showScaleSelector={false}
            showOrientationToggle={false}
            phoneColor={
              model.id.includes('iphone')
                ? '#000000'
                : model.id.includes('galaxy')
                ? '#1a1a1a'
                : model.id.includes('pixel')
                ? '#374151'
                : '#f59e0b'
            }
          >
            <div
              style={{
                padding: '16px',
                textAlign: 'center',
                backgroundColor: '#f8f9fa',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>
                {model.id.includes('iphone')
                  ? '🍎'
                  : model.id.includes('galaxy')
                  ? '📱'
                  : model.id.includes('pixel')
                  ? '🤖'
                  : '⚡'}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
              >
                {model.name}
              </div>
              <div style={{ fontSize: '10px', color: '#666' }}>
                {model.width} × {model.height}px
              </div>
              {model.isFoldable && (
                <div
                  style={{
                    fontSize: '9px',
                    color: '#8b5cf6',
                    marginTop: '4px',
                    fontWeight: '500',
                  }}
                >
                  📱 Có thể gập
                </div>
              )}
            </div>
          </PhoneMockupComponent>
        </div>
      ))}
    </div>
  ),
}

/**
 * So sánh kích thước - 5 thiết bị phổ biến
 *
 * So sánh trực quan kích thước của 5 model phổ biến nhất.
 * Tất cả hiển thị cùng scale để thấy rõ sự khác biệt.
 */
export const SoSanhKichThuoc: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: '2rem',
        padding: '2rem',
        flexWrap: 'wrap',
      }}
    >
      {[
        { id: 'iphone-se', name: 'iPhone SE', color: '#ffffff' },
        { id: 'galaxy-s23', name: 'Galaxy S23', color: '#6366f1' },
        { id: 'iphone-15', name: 'iPhone 15', color: '#000000' },
        { id: 'pixel-7', name: 'Pixel 7', color: '#374151' },
        { id: 'galaxy-z-fold-main', name: 'Z Fold Main', color: '#1a1a1a' },
      ].map((device) => (
        <div key={device.id} style={{ textAlign: 'center' }}>
          <PhoneMockupComponent
            modelId={device.id}
            showModelSelector={false}
            showColorSelector={false}
            showScaleSelector={false}
            showOrientationToggle={false}
            phoneColor={device.color}
          >
            <div
              style={{
                padding: '12px',
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
              {device.name}
            </div>
          </PhoneMockupComponent>
          <p
            style={{
              marginTop: '8px',
              fontSize: '12px',
              color: '#666',
              fontWeight: '500',
            }}
          ></p>
        </div>
      ))}
    </div>
  ),
}

/**
 * Demo xoay màn hình - Tính năng rotation
 *
 * Thử nghiệm tính năng xoay màn hình từ portrait sang landscape.
 * Click nút rotation để xem hiệu ứng chuyển đổi mượt mà.
 */
export const DemoXoayManHinh: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h3
          style={{
            marginBottom: '1rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
          }}
        >
          Demo Xoay Màn Hình
        </h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '1rem' }}>
          Click nút xoay để chuyển đổi giữa chế độ dọc và ngang
        </p>
        <div
          style={{
            backgroundColor: '#f3f4f6',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '14px',
            marginBottom: '1rem',
          }}
        >
          <strong>💡 Hướng dẫn:</strong> Nhấn vào biểu tượng xoay trong controls
          để thay đổi orientation
        </div>
      </div>

      <PhoneMockupComponent
        modelId='iphone-15'
        showModelSelector={true}
        showColorSelector={false}
        showScaleSelector={true}
        showOrientationToggle={true}
        phoneColor='#6366f1'
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            Rotation Demo
          </h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
            Thử xoay màn hình để xem layout responsive
          </p>
          <div
            style={{
              backgroundColor: '#e3f2fd',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#1976d2',
            }}
          >
            Portrait ↔ Landscape
          </div>
        </div>
      </PhoneMockupComponent>
    </div>
  ),
}

/**
 * Demo điều chỉnh kích thước - Scale như browser DevTools
 *
 * Thể hiện cách scale hoạt động giống như chế độ responsive của browser.
 * Device giữ kích thước cố định, content scale theo tỷ lệ.
 */
export const DemoScale: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h3
          style={{
            marginBottom: '1rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
          }}
        >
          Demo Điều Chỉnh Kích Thước - Kiểu Browser DevTools
        </h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '1rem' }}>
          Scale hoạt động giống như chế độ responsive của trình duyệt
        </p>
        <div
          style={{
            backgroundColor: '#f3f4f6',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '14px',
            textAlign: 'left',
            maxWidth: '500px',
          }}
        >
          <strong>💡 Cách hoạt động:</strong>
          <br />• <strong>Outer container:</strong> Kích thước cố định
          <br />• <strong>Content:</strong> Scale theo tỷ lệ được chọn
          <br />• <strong>Giống DevTools:</strong> Responsive mode trong Chrome
          <br />• <strong>Mượt mà:</strong> Transform với CSS transition
        </div>
      </div>

      <PhoneMockupComponent
        modelId='iphone-15'
        showModelSelector={true}
        showColorSelector={false}
        showScaleSelector={true}
        showOrientationToggle={true}
        phoneColor='#6366f1'
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📏</div>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            Browser DevTools Style
          </h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
            Device cố định, content scale theo tỷ lệ
          </p>
          <div
            style={{
              backgroundColor: '#e3f2fd',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#1976d2',
            }}
          >
            Thử thay đổi scale từ 20% → 100%!
          </div>
        </div>
      </PhoneMockupComponent>
    </div>
  ),
}

/**
 * Biến thể màu sắc - 8 màu phổ biến
 *
 * Hiển thị iPhone 15 với 8 màu sắc khác nhau để thấy tính linh hoạt.
 * Mỗi màu có tên riêng và shadow color phù hợp.
 */
export const BienTheMauSac: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      {[
        { color: '#000000', name: 'Space Black' },
        { color: '#ffffff', name: 'Silver' },
        { color: '#ff6b6b', name: 'Product Red' },
        { color: '#4ecdc4', name: 'Mint Green' },
        { color: '#45b7d1', name: 'Sky Blue' },
        { color: '#f9ca24', name: 'Sunflower' },
        { color: '#6c5ce7', name: 'Purple' },
        { color: '#fd79a8', name: 'Pink' },
      ].map((variant) => (
        <div key={variant.color} style={{ textAlign: 'center' }}>
          <PhoneMockupComponent
            modelId='iphone-15'
            phoneColor={variant.color}
            shadowColor={`${variant.color}40`}
            showModelSelector={false}
            showColorSelector={false}
            showScaleSelector={false}
            showOrientationToggle={false}
          >
            <NoiDungProfile />
          </PhoneMockupComponent>
          <p
            style={{
              marginTop: '8px',
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151',
            }}
          >
          </p>
        </div>
      ))}
    </div>
  ),
}
