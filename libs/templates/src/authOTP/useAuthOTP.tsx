import { useCallback, useState } from 'react'

const useAuthOTP = () => {
  // State để theo dõi trạng thái hết hạn của mã OTP chính
  const [isCountdownFinished, setIsCountdownFinished] = useState(false)

  // State để theo dõi trạng thái hết hạn của countdown gửi lại
  const [isResendCountdownFinished, setIsResendCountdownFinished] =
    useState(false)

  // Xử lý việc gửi lại mã OTP
  const handleResendOTP = useCallback(() => {
    // Giả lập gọi API
    console.log('Đang gửi lại mã OTP...')

    // Giả lập quá trình gửi API mất 1 giây
    setTimeout(() => {
      console.log('Đã gửi lại mã OTP thành công!')

      // Reset các trạng thái
      setIsCountdownFinished(false)
      setIsResendCountdownFinished(false)

      // Hiển thị thông báo cho người dùng
      console.log('Mã mới đã được gửi!')
    }, 1000)
  }, [])

  // Xử lý khi mã OTP hết hạn
  const handleCountdownFinish = useCallback(() => {
    console.log('Mã OTP đã hết hạn')
    setIsCountdownFinished(true)
  }, [])

  // Xử lý khi countdown gửi lại kết thúc
  const handleResendCountdownFinish = useCallback(() => {
    console.log('Có thể gửi lại mã OTP')
    setIsResendCountdownFinished(true)
  }, [])

  return {
    isCountdownFinished,
    isResendCountdownFinished,
    handleResendOTP,
    handleCountdownFinish,
    handleResendCountdownFinish,
  }
}

export default useAuthOTP
