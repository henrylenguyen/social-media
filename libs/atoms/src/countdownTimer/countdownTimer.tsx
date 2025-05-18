import React, { useMemo } from 'react'
import { useCountdown } from './useCountdownTimer'

/**
 * Props cho component đếm ngược
 */
export interface CountdownTimerProps {
  /**
   * Thời gian kết thúc dạng ISO hoặc DD/MM/YYYY
   */
  timerEnd: string

  /**
   * Hàm được gọi khi hết thời gian đếm ngược
   */
  onFinish?: () => void

  /**
   * Class cho container
   */
  className?: string

  /**
   * Màu cho chữ hiển thị thời gian
   */
  textColor?: string

  /**
   * Màu cho vòng tiến trình
   */
  progressColor?: string

  /**
   * Màu nền cho vòng tròn
   */
  bgColor?: string

  /**
   * Kích thước của đồng hồ đếm ngược
   */
  size?: number

  /**
   * Độ dày của đường viền vòng tròn tiến trình
   */
  strokeWidth?: number
}

/**
 * Component đồng hồ đếm ngược dạng vòng tròn
 */
const CountdownTimer: React.FC<CountdownTimerProps> = ({
  timerEnd,
  onFinish,
  className = '',
  textColor = '#FF5A5A',
  progressColor = '#FF5A5A',
  bgColor = '#F6F6F6',
  size = 100,
  strokeWidth = 6,
}) => {
  // Lấy dữ liệu đếm ngược từ hook
  const { hours, minutes, seconds, isFinished, progress } = useCountdown(
    timerEnd,
    onFinish,
  )

  // Định dạng giá trị thời gian luôn có 2 chữ số
  const formattedTime = useMemo(() => {
    if (hours > 0) {
      // Khi có giờ: Hiển thị tổng số giờ (không giới hạn 2 chữ số) + phút + giây
      const totalHours = hours
      const formattedHours = totalHours.toString()
      const formattedMinutes = minutes.toString().padStart(2, '0')
      const formattedSeconds = seconds.toString().padStart(2, '0')
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    } else {
      // Khi không có giờ: Hiển thị phút + giây
      const formattedMinutes = minutes.toString().padStart(2, '0')
      const formattedSeconds = seconds.toString().padStart(2, '0')
      return `${formattedMinutes}:${formattedSeconds}`
    }
  }, [hours, minutes, seconds])

  // Tính toán kích thước vòng tròn
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  // Đảo ngược strokeDashoffset để vòng tròn giảm dần từ đầy đủ
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Vòng tròn nền */}
      <svg width={size} height={size} className='absolute'>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
      </svg>

      {/* Vòng tròn tiến trình */}
      <svg
        width={size}
        height={size}
        className='absolute'
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
        />
      </svg>

      {/* Hiển thị thời gian dạng text */}
      <div
        className='text-center font-medium z-10'
        style={{
          color: textColor,
          fontSize: size * 0.26, // Kích thước chữ tỉ lệ với kích thước component
        }}
      >
        {isFinished ? '00:00' : formattedTime}
      </div>
    </div>
  )
}

export default CountdownTimer
