// libs/atoms/src/countdownTimer/index.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import CountdownTimer from './countdownTimer'

/**
 * Component đồng hồ đếm ngược với vòng tròn tiến trình
 */
const meta: Meta<typeof CountdownTimer> = {
  title: 'Atoms/CountdownTimer',
  component: CountdownTimer,
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
    textColor: { control: 'color', description: 'Màu chữ' },
    progressColor: { control: 'color', description: 'Màu vòng tiến trình' },
    bgColor: { control: 'color', description: 'Màu nền vòng tròn' },
    size: {
      control: { type: 'range', min: 40, max: 200, step: 10 },
      description: 'Kích thước đồng hồ',
    },
    strokeWidth: {
      control: { type: 'range', min: 2, max: 20, step: 1 },
      description: 'Độ dày của đường viền vòng tròn',
    },
    timeZoneOffset: {
      control: 'number',
      description: 'Offset múi giờ (ví dụ: 7 cho GMT+7 - Việt Nam)',
    },
  },
}

export default meta
type Story = StoryObj<typeof CountdownTimer>

/**
 * Hàm tạo ngày trong tương lai dựa trên số phút
 * @param minutes Số phút từ thời điểm hiện tại
 * @returns Chuỗi ISO cho thời gian trong tương lai
 */
const getFutureTime = (minutes: number): string => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + minutes)
  return date.toISOString()
}

/**
 * Decorator để đảm bảo đồng hồ đếm ngược sẽ luôn hiển thị đúng thời gian
 */
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
 * Đồng hồ đếm ngược mặc định với 5 phút
 */
export const Default: Story = {
  args: {
    timerEnd: getFutureTime(5),
    size: 100,
    strokeWidth: 6,
  },
  decorators: [
    (Story) => (
      <CountdownWrapper>
        <Story />
      </CountdownWrapper>
    ),
  ],
}

/**
 * Đồng hồ đếm ngược ngắn với 30 giây
 */
export const ShortCountdown: Story = {
  args: {
    timerEnd: getFutureTime(0.5), // 30 giây
    size: 80,
    strokeWidth: 6,
  },
  decorators: [
    (Story) => (
      <CountdownWrapper>
        <Story />
      </CountdownWrapper>
    ),
  ],
}

/**
 * Đồng hồ kích thước lớn với màu tùy chỉnh
 */
export const LargeCustomColors: Story = {
  args: {
    timerEnd: getFutureTime(10),
    size: 140,
    strokeWidth: 10,
    textColor: '#2563EB',
    progressColor: '#2563EB',
    bgColor: '#EFF6FF',
  },
  decorators: [
    (Story) => (
      <CountdownWrapper>
        <Story />
      </CountdownWrapper>
    ),
  ],
}

/**
 * Đồng hồ với thời gian đã kết thúc
 */
export const AlreadyFinished: Story = {
  args: {
    timerEnd: getFutureTime(-5), // 5 phút trước
    size: 80,
    strokeWidth: 6,
  },
}

/**
 * Đồng hồ với định dạng ngày DD/MM/YYYY
 */
export const WithDateFormat: Story = {
  args: {
    // Tạo ngày trong tương lai với định dạng DD/MM/YYYY
    timerEnd: (() => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return `${String(tomorrow.getDate()).padStart(2, '0')}/${String(
        tomorrow.getMonth() + 1,
      ).padStart(2, '0')}/${tomorrow.getFullYear()}`
    })(),
    size: 100,
    strokeWidth: 6,
  },
}

/**
 * Đồng hồ đếm ngược sử dụng múi giờ Việt Nam (GMT+7)
 */
export const WithVietnamTimeZone: Story = {
  args: {
    // Sử dụng thời gian 5 phút trong tương lai nhưng hiển thị ở GMT+7
    timerEnd: getFutureTime(5),
    size: 100,
    strokeWidth: 6,
    textColor: '#FF5A5A',
    progressColor: '#FF5A5A',
    timeZoneOffset: 7, // Múi giờ Việt Nam (GMT+7)
  },
  decorators: [
    (Story) => (
      <CountdownWrapper>
        <Story />
      </CountdownWrapper>
    ),
  ],
}

/**
 * Đồng hồ với tiến trình đã hoàn thành một nửa
 */
export const HalfProgress: Story = {
  render: () => {
    // Tính thời gian ở chính xác phân nửa tiến trình (đồng hồ sẽ hiển thị cung tròn 50%)
    // Tạo thời gian ban đầu 10 phút, và lấy thời điểm sau 5 phút
    const totalMinutes = 10

    const now = new Date()
    const end = new Date(now.getTime() + totalMinutes * 60 * 1000)

    return (
      <div className='flex flex-col items-center space-y-4'>
        <p className='text-sm text-gray-500'>
          Vòng tròn tiến trình sẽ hiển thị đúng 50%:
        </p>
        <CountdownTimer
          timerEnd={end.toISOString()}
          size={120}
          strokeWidth={8}
          textColor='#2563EB'
          progressColor='#2563EB'
          bgColor='#EFF6FF'
        />
        <p className='text-xs text-gray-400'>
          (Trên thực tế, progress sẽ tùy thuộc vào thời điểm render)
        </p>
      </div>
    )
  },
}

/**
 * Nhiều đồng hồ với nhiều kích thước và màu sắc khác nhau
 */
export const MultipleTimers: Story = {
  render: () => {
    return (
      <div className='flex flex-wrap gap-8 justify-center'>
        <CountdownTimer
          timerEnd={getFutureTime(2)}
          size={60}
          strokeWidth={4}
          textColor='#FF5A5A'
          progressColor='#FF5A5A'
          bgColor='#FEF2F2'
        />

        <CountdownTimer
          timerEnd={getFutureTime(5)}
          size={80}
          strokeWidth={5}
          textColor='#2563EB'
          progressColor='#2563EB'
          bgColor='#EFF6FF'
        />

        <CountdownTimer
          timerEnd={getFutureTime(10)}
          size={100}
          strokeWidth={6}
          textColor='#10B981'
          progressColor='#10B981'
          bgColor='#ECFDF5'
        />

        <CountdownTimer
          timerEnd={getFutureTime(15)}
          size={120}
          strokeWidth={8}
          textColor='#7C3AED'
          progressColor='#7C3AED'
          bgColor='#F5F3FF'
        />
      </div>
    )
  },
  decorators: [
    (Story) => (
      <CountdownWrapper>
        <Story />
      </CountdownWrapper>
    ),
  ],
}
