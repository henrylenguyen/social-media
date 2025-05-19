// hooks/useCountdown.ts
import { isValid, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
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
 * @param timeZoneOffset - Offset múi giờ (ví dụ: 7 cho GMT+7). Mặc định sử dụng múi giờ local
 * @returns Đối tượng CountdownData chứa các giá trị thời gian
 */
export const useCountdown = (
  timerEnd: string,
  onFinish?: () => void,
  timeZoneOffset?: number,
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

  // Effect xử lý đếm ngược
  useEffect(() => {
    // Định nghĩa lại hàm parseEndTime trong useEffect để tránh warning
    const parseEndTime = (timeString: string): Date => {
      const ddmmyyyyRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
      const match = timeString.match(ddmmyyyyRegex)
      if (match) {
        const [, day, month, year] = match
        if (timeZoneOffset !== undefined) {
          let tz = ''
          if (timeZoneOffset > 0) tz = `Etc/GMT-${timeZoneOffset}`
          else if (timeZoneOffset < 0)
            tz = `Etc/GMT+${Math.abs(timeZoneOffset)}`
          else tz = 'Etc/GMT'
          const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(
            2,
            '0',
          )}T00:00:00.000+00:00`
          return toZonedTime(isoString, tz)
        }
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      }
      let date: Date
      if (timeString.endsWith('Z') || /[+-]\d{2}:?\d{2}$/.test(timeString)) {
        date = parseISO(timeString)
        if (timeZoneOffset !== undefined) {
          let tz = ''
          if (timeZoneOffset > 0) tz = `Etc/GMT-${timeZoneOffset}`
          else if (timeZoneOffset < 0)
            tz = `Etc/GMT+${Math.abs(timeZoneOffset)}`
          else tz = 'Etc/GMT'
          return toZonedTime(date, tz)
        }
        return date
      }
      date = new Date(timeString)
      if (isValid(date)) return date
      const defaultDate = new Date()
      defaultDate.setMinutes(defaultDate.getMinutes() + 5)
      return defaultDate
    }

    const endTime = parseEndTime(timerEnd)

    // Hàm tính toán thời gian còn lại với hỗ trợ múi giờ
    const calculateRemainingTime = () => {
      const now = new Date()
      return endTime.getTime() - now.getTime()
    }

    // Tính toán thời gian ban đầu
    const duration = calculateRemainingTime()

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

      // Gọi callback onFinish
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
  }, [timerEnd, onFinish, timeZoneOffset])

  return countdown
}
