import { ForgotPasswordIllustration } from '@social-media/assets'
import * as React from 'react'

const ForgotLeftLayout: React.FunctionComponent = (props) => {
  return (
    <>
      <div className='flex flex-col items-center gap-4 justify-center h-full'>
        <h1 className='text-center text-3xl font-bold text-white'>HeartLink</h1>
        <h4 className='text-center text-md font-semibold text-white'>
          Kết nối trái tim, tìm kiếm tình yêu
        </h4>
        <ForgotPasswordIllustration width={240} height={240} className='mb-6' />
        <p className='text-white text-opacity-80 text-center max-w-lg  leading-8'>
          Đừng lo lắng! Những kí ức đẹp với HeartLink vẫn còn đó. Chúng tôi sẽ
          gửi hướng dẫn đặt lại mật khẩu vào email của bạn.
        </p>
      </div>
    </>
  )
}

export default ForgotLeftLayout
