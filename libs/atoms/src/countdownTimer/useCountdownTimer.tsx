import moment from 'moment-timezone'
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
 * Hook tùy chỉnh để quản lý logic đếm ngược thời gian với vòng tròn tiến trình
 * Sử dụng thư viện moment.js để xử lý thời gian chính xác
 *
 * @param timerEnd - Thời gian kết thúc dạng ISO, DD/MM/YYYY, hoặc bất kỳ định dạng nào moment.js hỗ trợ
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
    /**
     * Phân tích và chuẩn hóa thời gian kết thúc
     * Xử lý mọi định dạng và áp dụng múi giờ khi cần
     */
    const parseEndTime = (): moment.Moment => {
      try {
        let endTime: moment.Moment

        // Xử lý định dạng DD/MM/YYYY
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(timerEnd)) {
          endTime = moment(timerEnd, 'DD/MM/YYYY')
        } else {
          // Xử lý các định dạng khác - moment.js tự động xử lý nhiều định dạng
          endTime = moment(timerEnd)
        }

        // Kiểm tra tính hợp lệ của thời gian
        if (!endTime.isValid()) {
          console.warn(
            'Định dạng thời gian không hợp lệ, sử dụng thời gian mặc định',
          )
          // Thời gian mặc định: hiện tại + 5 phút
          return moment().add(5, 'minutes')
        }

        // Xử lý múi giờ nếu được cung cấp
        if (timeZoneOffset !== undefined) {
          // Nếu timerEnd là UTC (có 'Z' ở cuối) và timeZoneOffset được chỉ định
          if (timerEnd.endsWith('Z')) {
            // Parse từ chuỗi UTC, sau đó áp dụng múi giờ mới
            const utcTime = moment.utc(timerEnd)

            // Tạo múi giờ từ offset
            const timeZoneName =
              timeZoneOffset >= 0
                ? `Etc/GMT-${timeZoneOffset}`
                : `Etc/GMT+${Math.abs(timeZoneOffset)}`

            // Chuyển đổi sang múi giờ chỉ định
            return utcTime.tz(timeZoneName)
          } else {
            // Nếu không có Z, áp dụng timeZoneOffset trực tiếp
            // Tính toán offset giữa múi giờ hiện tại và múi giờ được yêu cầu
            const currentOffset = -moment().utcOffset() / 60 // convert từ phút sang giờ
            const offsetDiff = timeZoneOffset - currentOffset

            // Áp dụng sự chênh lệch múi giờ
            return endTime.add(offsetDiff, 'hours')
          }
        }

        return endTime
      } catch (error) {
        console.error('Lỗi khi phân tích thời gian:', error)
        // Thời gian mặc định nếu có lỗi
        return moment().add(5, 'minutes')
      }
    }

    // Lấy thời gian kết thúc đã xử lý
    const endTime = parseEndTime()
    const currentTime = moment()

    // Log trong môi trường development
    if (process.env.NODE_ENV === 'development') {
      console.log('Thời gian kết thúc:', endTime.format())
      console.log('Thời gian hiện tại:', currentTime.format())
      console.log('Thời gian còn lại (mili giây):', endTime.diff(currentTime))
    }

    // Tính toán thời gian ban đầu tính bằng mili giây
    const duration = endTime.diff(currentTime)

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
      const now = moment()
      const remainingTime = endTime.diff(now)

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
      const durationObj = moment.duration(remainingTime)
      const days = Math.floor(durationObj.asDays())
      const hours = durationObj.hours()
      const minutes = durationObj.minutes()
      const seconds = durationObj.seconds()

      // Tính toán tiến độ (1 - còn lại/ban đầu) - vòng tròn tăng dần
      const progress = originalDurationRef.current
        ? 1 - remainingTime / originalDurationRef.current
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
    const durationObj = moment.duration(duration)
    const days = Math.floor(durationObj.asDays())
    const hours = durationObj.hours()
    const minutes = durationObj.minutes()
    const seconds = durationObj.seconds()

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
