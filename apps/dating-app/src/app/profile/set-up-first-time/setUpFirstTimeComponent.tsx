'use client'
import { Progress } from '@social-media/atoms'

import { PhoneMockupComponent } from '@social-media/molecules'
import {
  DatePicker,
  DateRangePicker,
  type DateRangeType,
} from '@social-media/organisms'
import * as React from 'react'
import Step1 from './step1'

const SetUpFirstTimeComponent: React.FunctionComponent = () => {
  const [dateRange, setDateRange] = React.useState<DateRangeType | undefined>(
    undefined,
  )
  console.log('dateRange:', dateRange)
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(
    undefined,
  )
  console.log('singleDate:', singleDate)
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

            <div className='col-span-1 md:col-span-2 p-10 flex flex-col gap-6'>
              <Progress value={10} />
              <Step1 />
              {/* Khu vực chứa các trường form */}
              <div className='bg-gray-50 p-6 rounded-lg min-h-[300px] border border-gray-100'>
                <div className='space-y-4'>
                  <DatePicker
                    label='Chọn ngày đơn (Test Fix)'
                    value={singleDate}
                    onChange={(value) => {
                      console.log('Single date changed in app:', value)
                      setSingleDate(value as Date)
                    }}
                    placeholder='dd/MM/yyyy'
                    dateFormat='dd/MM/yyyy'
                  />

                  <DateRangePicker
                    label='Chọn khoảng ngày'
                    value={dateRange}
                    onChange={(value) => {
                      console.log('Date range changed in app:', value)
                      setDateRange(value)
                    }}
                    placeholder='dd/MM/yyyy - dd/MM/yyyy'
                    numberOfMonths={2}
                    dateFormat='dd/MM/yyyy'
                  />
                </div>

                {/* Debug info */}
                <div className='mt-4 p-4 bg-white rounded border'>
                  <h3 className='font-semibold text-sm mb-2'>Debug Info:</h3>
                  <div className='space-y-2'>
                    <div>
                      <p className='text-sm'>
                        <strong>Single Date:</strong>{' '}
                        {singleDate
                          ? singleDate.toLocaleDateString('vi-VN')
                          : 'Not selected'}
                      </p>
                      <p className='text-xs text-gray-500'>
                        ISO: {singleDate ? singleDate.toISOString() : 'None'}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm'>
                        <strong>Range From:</strong>{' '}
                        {dateRange?.from
                          ? dateRange.from.toLocaleDateString('vi-VN')
                          : 'Not selected'}
                      </p>
                      <p className='text-sm'>
                        <strong>Range To:</strong>{' '}
                        {dateRange?.to
                          ? dateRange.to.toLocaleDateString('vi-VN')
                          : 'Not selected'}
                      </p>
                    </div>
                  </div>
                </div>
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
