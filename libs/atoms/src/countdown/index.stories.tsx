import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import Countdown from './countdown'

/**
 * Component đồng hồ đếm ngược không có vòng tròn tiến trình,
 * có tính năng chớp nháy trong 10 giây cuối
 */
const meta: Meta<typeof Countdown> = {
  title: 'Atoms/Countdown',
  component: Countdown,
  tags: ['autodocs'],
  argTypes: {
    timerEnd: {
      control: 'text',
      description: 'Thời gian kết thúc dạng ISO hoặc DD/MM/YYYY',
    },
    onFinish: {
      action: 'Hết giờ!',
      description: 'Hàm được gọi khi hết thời gian',
    },
    textColor: {
      control: 'color',
      description: 'Màu chữ mặc định',
    },
    fontSize: {
      control: 'text',
      description: 'Kích thước chữ (px, rem hoặc em)',
    },
    animationTimerEnd: {
      control: 'boolean',
      description: 'Bật/tắt hiệu ứng chớp nháy trong 10 giây cuối',
    },
    animationColor: {
      control: 'color',
      description: 'Màu chữ khi nhấp nháy trong 10 giây cuối',
    },
    timeZoneOffset: {
      control: 'number',
      description: 'Offset múi giờ (ví dụ: 7 cho GMT+7 - Việt Nam)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Countdown>

// Hàm hỗ trợ tạo ngày trong tương lai
const getFutureDate = (minutes: number): string => {
  const date = new Date()
  // Thêm một chút thời gian dự phòng để đảm bảo component có thể hiển thị đúng
  // khi storybook load xong
  date.setTime(date.getTime() + Math.round(minutes * 60 * 1000) + 2000) // Thêm 2s dự phòng
  return date.toISOString()
}

/**
 * Đồng hồ đếm ngược mặc định với 5 phút
 */
export const Default: Story = {
  args: {
    timerEnd: getFutureDate(5),
    fontSize: '1.5rem',
    textColor: '#333333',
  },
}

// Decorator để đảm bảo đồng hồ đếm ngược sẽ luôn hiển thị đúng thời gian
const CountdownWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [key, setKey] = React.useState(Date.now())

  // Force re-render khi component được mount
  React.useEffect(() => {
    // Tạo key mới để re-render countdown
    setKey(Date.now())
  }, [])

  return <div key={key}>{children}</div>
}

/**
 * Đồng hồ đếm ngược với hiệu ứng chớp nháy trong 10 giây cuối
 */
export const WithBlinkingAnimation: Story = {
  args: {
    // Thời gian là 20 giây từ hiện tại - đảm bảo có đủ thời gian để thấy đếm ngược
    timerEnd: (() => {
      const date = new Date()
      date.setSeconds(date.getSeconds() + 20) // 20 giây từ hiện tại
      return date.toISOString()
    })(),
    fontSize: '1.5rem',
    textColor: '#333333',
    animationTimerEnd: true,
    animationColor: '#FF5A5A',
  },
  // Sử dụng decorator để đảm bảo countdown luôn được khởi tạo lại khi xem
  decorators: [
    (Story) => (
      <CountdownWrapper>
        <Story />
      </CountdownWrapper>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

/**
 * Đồng hồ đếm ngược với kích thước chữ lớn
 */
export const LargeSize: Story = {
  args: {
    timerEnd: getFutureDate(10),
    fontSize: '2.5rem',
    textColor: '#2563EB',
    animationTimerEnd: true,
    animationColor: '#FF0000',
  },
}

/**
 * Đồng hồ với thời gian đã kết thúc
 */
export const AlreadyFinished: Story = {
  args: {
    timerEnd: '2021-01-01',
    fontSize: '1.5rem',
    textColor: '#888888',
  },
}

/**
 * Đồng hồ với định dạng ngày DD/MM/YYYY
 */
export const WithDateFormat: Story = {
  args: {
    // Tạo ngày trong tương lai với định dạng DD/MM/YYYY
    timerEnd: '19/05/2025',
    fontSize: '1.5rem',
    textColor: '#333333',
    animationTimerEnd: true,
  },
}

/**
 * Đồng hồ đếm ngược với màu sắc tùy chỉnh
 */
export const CustomColors: Story = {
  args: {
    timerEnd: getFutureDate(3),
    fontSize: '2rem',
    textColor: '#6D28D9',
    animationTimerEnd: true,
    animationColor: '#DC2626',
  },
}

/**
 * Đồng hồ đếm ngược ở chính xác 10 giây (ngưỡng bắt đầu hiệu ứng)
 */
export const ExactlyTenSeconds: Story = {
  args: {
    // Set to exactly 10 seconds from now (minus a tiny bit to account for load time)
    timerEnd: (() => {
      const date = new Date()
      date.setSeconds(date.getSeconds() + 10)
      // Trừ một chút để đảm bảo hiển thị đúng 10s khi story load xong
      date.setMilliseconds(date.getMilliseconds() - 300)
      return date.toISOString()
    })(),
    fontSize: '2rem',
    textColor: '#333333',
    animationTimerEnd: true,
    animationColor: '#FF0000',
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

/**
 * Đồng hồ đếm ngược sử dụng múi giờ Việt Nam (GMT+7)
 */
export const WithVietnamTimeZone: Story = {
  args: {
    // Sử dụng thời gian UTC
    timerEnd: '2025-05-19T20:40:00Z', // 13:30 UTC = 20:30 GMT+7
    fontSize: '1.5rem',
    textColor: '#333333',
    timeZoneOffset: 7, // Múi giờ Việt Nam (GMT+7)
    animationTimerEnd: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
