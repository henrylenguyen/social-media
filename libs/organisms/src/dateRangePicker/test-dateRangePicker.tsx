import { useState } from 'react'
import { DateRangeType } from '../date-picker-common/types'
import { DateRangePicker } from './dateRangePicker'

/**
 * Test component để kiểm tra DateRangePicker functionality
 * Có thể chạy trong Storybook hoặc standalone
 */
export const TestDateRangePicker = () => {
  const [dateRange, setDateRange] = useState<DateRangeType | undefined>()

  const handleChange = (range: DateRangeType | undefined) => {
    console.log('Date range changed:', range)
    setDateRange(range)
  }

  return (
    <div className='p-8 max-w-md'>
      <h2 className='text-xl font-bold mb-4'>Test DateRangePicker</h2>

      <DateRangePicker
        label='Chọn khoảng thời gian'
        value={dateRange}
        onChange={handleChange}
        placeholder='Chọn ngày bắt đầu - ngày kết thúc'
        dateFormat='dd/MM/yyyy'
        numberOfMonths={2}
      />

      <div className='mt-4 p-4 bg-gray-100 rounded-md'>
        <h3 className='font-semibold mb-2'>Giá trị hiện tại:</h3>
        <div className='text-sm space-y-1'>
          <p>
            <strong>From:</strong>{' '}
            {dateRange?.from?.toLocaleDateString('vi-VN') || 'Chưa chọn'}
          </p>
          <p>
            <strong>To:</strong>{' '}
            {dateRange?.to?.toLocaleDateString('vi-VN') || 'Chưa chọn'}
          </p>
          <p>
            <strong>Raw:</strong>
          </p>
          <pre className='text-xs bg-white p-2 rounded border overflow-auto'>
            {JSON.stringify(dateRange, null, 2)}
          </pre>
        </div>
      </div>

      <div className='mt-4 space-x-2'>
        <button
          onClick={() => setDateRange(undefined)}
          className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm'
        >
          Clear Selection
        </button>
        <button
          onClick={() =>
            setDateRange({
              from: new Date(),
              to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            })
          }
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm'
        >
          Set This Week
        </button>
      </div>

      <div className='mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm'>
        <h4 className='font-semibold text-yellow-800 mb-1'>Hướng dẫn test:</h4>
        <ol className='text-yellow-700 space-y-1 text-xs'>
          <li>1. Click vào input để mở calendar</li>
          <li>2. Click ngày đầu tiên (sẽ thấy ngày được highlight)</li>
          <li>3. Hover qua các ngày khác (sẽ thấy preview range)</li>
          <li>4. Click ngày thứ hai để hoàn thành selection</li>
          <li>5. Calendar sẽ tự động đóng và hiển thị range đã chọn</li>
        </ol>
      </div>
    </div>
  )
}

export default TestDateRangePicker
