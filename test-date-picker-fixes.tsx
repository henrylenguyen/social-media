import { useState } from 'react'
import { DatePicker } from './libs/organisms/src/datePicker'
import { DateRangePicker } from './libs/organisms/src/dateRangePicker'

// Test component để kiểm tra các sửa đổi
export const TestDatePickerFixes = () => {
  const [singleDate, setSingleDate] = useState<Date | undefined>()
  const [dateRange, setDateRange] = useState<
    { from?: Date; to?: Date } | undefined
  >()

  return (
    <div className='p-8 space-y-8 max-w-4xl'>
      <h1 className='text-2xl font-bold'>Test Date Picker Fixes</h1>

      {/* Test 1: DatePicker với useYearNavigation */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>
          1. DatePicker với useYearNavigation
        </h2>
        <p className='text-gray-600'>
          Kiểm tra:
          <br />• Dropdown tháng hiển thị tên tháng hiện tại thay vì "Tháng"
          <br />• Calendar có chiều rộng 380px thay vì 320px để chứa dropdown
        </p>
        <DatePicker
          label='Chọn ngày (với Year Navigation)'
          value={singleDate}
          onChange={setSingleDate}
          useYearNavigation={true}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      {/* Test 2: DateRangePicker với useYearNavigation */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>
          2. DateRangePicker với useYearNavigation
        </h2>
        <p className='text-gray-600'>
          Kiểm tra: Khi useYearNavigation là true, dropdown tháng phải hiển thị
          tên tháng hiện tại thay vì "Tháng"
        </p>
        <DateRangePicker
          label='Chọn khoảng ngày (với Year Navigation)'
          value={dateRange}
          onChange={setDateRange}
          useYearNavigation={true}
          numberOfMonths={2}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      {/* Test 3: DateRangePicker với numberOfMonths = 1 */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>
          3. DateRangePicker với numberOfMonths = 1
        </h2>
        <p className='text-gray-600'>
          Kiểm tra: numberOfMonths chỉ được phép là 1 hoặc 2
        </p>
        <DateRangePicker
          label='Chọn khoảng ngày (1 tháng)'
          value={dateRange}
          onChange={setDateRange}
          numberOfMonths={1}
          useYearNavigation={true}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      {/* Test 4: DateRangePicker với numberOfMonths = 2 */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>
          4. DateRangePicker với numberOfMonths = 2
        </h2>
        <p className='text-gray-600'>
          Kiểm tra: numberOfMonths = 2 vẫn hoạt động bình thường
        </p>
        <DateRangePicker
          label='Chọn khoảng ngày (2 tháng)'
          value={dateRange}
          onChange={setDateRange}
          numberOfMonths={2}
          useYearNavigation={true}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      {/* Test 5: Kiểm tra TypeScript validation */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>5. TypeScript Validation</h2>
        <p className='text-gray-600'>
          Kiểm tra: numberOfMonths chỉ chấp nhận 1 hoặc 2 (TypeScript sẽ báo lỗi
          nếu dùng giá trị khác)
        </p>
        <code className='block bg-gray-100 p-2 rounded'>
          {`// Hợp lệ: numberOfMonths={1} hoặc numberOfMonths={2}`}
          <br />
          {`// Không hợp lệ: numberOfMonths={3} // TypeScript error`}
        </code>
      </div>

      {/* Debug info */}
      <div className='space-y-4 border-t pt-4'>
        <h2 className='text-xl font-semibold'>Debug Info</h2>
        <div className='bg-gray-50 p-4 rounded'>
          <p>
            <strong>Single Date:</strong>{' '}
            {singleDate?.toLocaleDateString() || 'Chưa chọn'}
          </p>
          <p>
            <strong>Date Range:</strong>{' '}
            {dateRange?.from && dateRange?.to
              ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
              : dateRange?.from
              ? `${dateRange.from.toLocaleDateString()} - ...`
              : 'Chưa chọn'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestDatePickerFixes
