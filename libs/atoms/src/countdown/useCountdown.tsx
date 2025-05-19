// hooks/useCountdown.ts
import { useEffect, useRef, useState } from 'react'

/**
 * Interface cho dữ liệu đếm ngược
 */
interface CountdownData {
  days: number // Số ngày còn lại
  hours: number // Số giờ còn lại
  minutes: number // Số phút còn lại
  seconds: number // Số giây còn lại
  isFinished: boolean // Trạng thái đã kết thúc
  totalSeconds: number // Tổng số giây còn lại (dùng để kiểm tra 10 giây cuối)
}

/**
 * Hook tùy chỉnh để quản lý logic đếm ngược thời gian
 * @param timerEnd - Thời gian kết thúc dạng ISO hoặc định dạng DD/MM/YYYY
 * @param onFinish - Hàm callback được gọi khi hết thời gian
 * @returns Đối tượng CountdownData chứa các giá trị thời gian
 */
export const useCountdown = (
  timerEnd: string,
  onFinish?: () => void,
): CountdownData => {
  // State lưu trữ giá trị đếm ngược
  const [countdown, setCountdown] = useState<CountdownData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
    totalSeconds: 0,
  })

  // Đánh dấu đã gọi callback onFinish hay chưa
  const onFinishCalledRef = useRef(false)

  /**
   * Phân tích chuỗi thời gian kết thúc thành đối tượng Date
   * Hỗ trợ định dạng ISO và DD/MM/YYYY
   */
  const parseEndTime = (timeString: string): Date => {
    // Kiểm tra nếu là định dạng ISO
    const isoDate = new Date(timeString)

    // Nếu là định dạng ISO hợp lệ
    if (!isNaN(isoDate.getTime())) {
      return isoDate
    }

    // Kiểm tra nếu là định dạng DD/MM/YYYY
    const ddmmyyyyRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const match = timeString.match(ddmmyyyyRegex)

    if (match) {
      const [_, day, month, year] = match
      // Tháng trong JavaScript Date bắt đầu từ 0
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }

    // Mặc định 5 phút từ hiện tại nếu định dạng không hợp lệ
    console.warn(
      'Định dạng ngày không hợp lệ. Sử dụng mặc định 5 phút từ bây giờ.',
    )
    const defaultDate = new Date()
    defaultDate.setMinutes(defaultDate.getMinutes() + 5)
    return defaultDate
  }
  // Effect xử lý đếm ngược
  useEffect(() => {
    // Chuyển đổi thời gian kết thúc
    const endTime = parseEndTime(timerEnd)
    const currentTime = new Date()

    // Tính toán thời gian ban đầu tính bằng mili giây
    const duration = endTime.getTime() - currentTime.getTime()

    // Reset trạng thái gọi callback khi timerEnd thay đổi
    onFinishCalledRef.current = false

    // Nếu đã hết thời gian
    if (duration <= 0) {
      setCountdown({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isFinished: true,
        totalSeconds: 0,
      })

      // Gọi callback onFinish nếu có và chưa được gọi
      if (onFinish && !onFinishCalledRef.current) {
        onFinish()
        onFinishCalledRef.current = true
      }
      return
    }

    // Cập nhật đếm ngược mỗi giây
    const timer = setInterval(() => {
      const now = new Date()
      const remainingTime = endTime.getTime() - now.getTime()

      // Khi hết thời gian
      if (remainingTime <= 0) {
        clearInterval(timer)
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isFinished: true,
          totalSeconds: 0,
        })

        // Gọi callback onFinish nếu có và chưa được gọi
        if (onFinish && !onFinishCalledRef.current) {
          onFinish()
          onFinishCalledRef.current = true
        }
        return
      }

      // Tính toán các thành phần thời gian còn lại
      const totalSeconds = Math.floor(remainingTime / 1000)
      const days = Math.floor(totalSeconds / (60 * 60 * 24))
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
      const seconds = Math.floor(totalSeconds % 60)

      // Cập nhật state
      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isFinished: false,
        totalSeconds,
      })
    }, 1000)

    // Tính toán ban đầu
    const totalSeconds = Math.floor(duration / 1000)
    const days = Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = Math.floor(totalSeconds % 60)

    // Cập nhật giá trị ban đầu
    setCountdown({
      days,
      hours,
      minutes,
      seconds,
      isFinished: false,
      totalSeconds,
    })

    // Xóa interval khi component unmount
    return () => clearInterval(timer)
  }, [timerEnd, onFinish])

  return countdown
}
