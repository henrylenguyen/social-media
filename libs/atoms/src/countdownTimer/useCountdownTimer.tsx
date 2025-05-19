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
  progress: number // Tiến độ từ 0 đến 1
}

/**
 * Hook tùy chỉnh để quản lý logic đếm ngược thời gian
 * @param timerEnd - Thời gian kết thúc dạng ISO hoặc định dạng DD/MM/YYYY
 * @param onFinish - Hàm callback được gọi khi hết thời gian
 * @param timeZoneOffset - Offset múi giờ (ví dụ: 7 cho GMT+7). Mặc định sử dụng múi giờ local
 * @returns Đối tượng CountdownData chứa các giá trị thời gian và tiến độ
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
    progress: 0,
  })

  // Lưu thời gian ban đầu để tính toán tiến độ
  const originalDurationRef = useRef<number | null>(null)
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

    // Chuyển đổi thời gian kết thúc
    const endTime = parseEndTime(timerEnd)
    const currentTime = new Date()

    // Tính toán thời gian ban đầu tính bằng mili giây
    const duration = endTime.getTime() - currentTime.getTime()

    // Lưu thời gian ban đầu để tính tiến độ
    if (!originalDurationRef.current && duration > 0) {
      originalDurationRef.current = duration
    }

    // Nếu đã hết thời gian
    if (duration <= 0) {
      setCountdown({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isFinished: true,
        progress: 1,
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
          progress: 1,
        })

        // Gọi callback onFinish nếu có và chưa được gọi
        if (onFinish && !onFinishCalledRef.current) {
          onFinish()
          onFinishCalledRef.current = true
        }
        return
      }

      // Tính toán các thành phần thời gian còn lại
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
      )
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

      // Tính toán tiến độ (còn lại/ban đầu) - ngược lại để vòng tròn giảm dần
      const progress = originalDurationRef.current
        ? remainingTime / originalDurationRef.current
        : 0

      // Cập nhật state
      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isFinished: false,
        progress,
      })
    }, 1000)

    // Tính toán ban đầu
    const days = Math.floor(duration / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((duration % (1000 * 60)) / 1000)

    // Cập nhật giá trị ban đầu
    setCountdown({
      days,
      hours,
      minutes,
      seconds,
      isFinished: false,
      progress: 0,
    })

    // Xóa interval khi component unmount
    return () => clearInterval(timer)
  }, [timerEnd, onFinish, timeZoneOffset])

  return countdown
}
