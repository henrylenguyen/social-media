import type { Meta, StoryObj } from '@storybook/react'
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
  },
}

export default meta
type Story = StoryObj<typeof CountdownTimer>

// Hàm hỗ trợ tạo ngày trong tương lai
const getFutureDate = (minutes: number): string => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + minutes)
  return date.toISOString()
}

/**
 * Đồng hồ đếm ngược mặc định với 5 phút
 */
export const Default: Story = {
  args: {
    timerEnd: getFutureDate(5),
    size: 100,
    strokeWidth: 6,
  },
}

/**
 * Đồng hồ đếm ngược ngắn với 30 giây
 */
export const ShortCountdown: Story = {
  args: {
    timerEnd: getFutureDate(0.5), // 30 giây
    size: 80,
    strokeWidth: 6,
  },
}

/**
 * Đồng hồ kích thước lớn với màu tùy chỉnh
 */
export const LargeCustomColors: Story = {
  args: {
    timerEnd: getFutureDate(10),
    size: 140,
    strokeWidth: 10,
    textColor: '#2563EB',
    progressColor: '#2563EB',
    bgColor: '#EFF6FF',
  },
}

/**
 * Đồng hồ với thời gian đã kết thúc
 */
export const AlreadyFinished: Story = {
  args: {
    timerEnd: '2021-01-01',
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
    timerEnd: '19/05/2025',
    size: 100,
    strokeWidth: 6,
  },
}
