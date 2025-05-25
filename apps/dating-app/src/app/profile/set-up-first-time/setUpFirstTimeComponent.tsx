'use client'
import { PhoneMockupComponent } from '@social-media/molecules'
import * as React from 'react'

const SetUpFirstTimeComponent: React.FunctionComponent = (props) => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <main>
        <div className='bg-white rounded-xl shadow-lg '>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='flex flex-col items-center p-8 border-r border-gray-100 bg-gray-50'>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Xem trước hồ sơ
              </h3>
              <p className='text-sm text-gray-500 mb-8 text-center'>
                Đây là cách mà hồ sơ của bạn sẽ hiển thị với người khác.
              </p>
              <PhoneMockupComponent />
            </div>

            {/* Cột phải: Form */}
            <div className='col-span-1 md:col-span-2 p-10 flex flex-col gap-6'>
              <h1 className='text-2xl font-bold text-gray-900'>
                Bước 1: Tạo Hồ Sơ Của Bạn
              </h1>
              <p className='text-md text-gray-600'>
                Hãy cung cấp những thông tin cơ bản và hình ảnh để bắt đầu.
              </p>
              {/* Khu vực chứa các trường form */}
              <div className='bg-gray-50 p-6 rounded-lg min-h-[300px] border border-gray-100'>
                <p className='text-gray-400'>
                  [Các trường nhập liệu cho Bước 1 sẽ ở đây]
                </p>
              </div>
              {/* Nút điều hướng */}
              <div className='flex justify-end mt-6'>
                <button className='bg-primary text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105'>
                  Tiếp Tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SetUpFirstTimeComponent
