import React, { useState } from 'react'
import { DatePicker } from './libs/organisms/src/datePicker'
import { DateRangePicker } from './libs/organisms/src/dateRangePicker'

// Test component để kiểm tra việc sửa ngày trong tuần
export const TestWeekdayFix = () => {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date(2025, 4, 27)) // 27/05/2025
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>({
    from: new Date(2025, 4, 27), // 27/05/2025
    to: new Date(2025, 4, 30)    // 30/05/2025
  })

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <h1 className="text-2xl font-bold">Test Weekday Fix</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-yellow-800">Vấn đề cần kiểm tra:</h2>
        <p className="text-yellow-700">
          Ngày 27/05/2025 phải là <strong>Thứ 3 (Tuesday)</strong>, không phải Thứ 2.
          <br />
          Lịch phải hiển thị đúng thứ tự: T2, T3, T4, T5, T6, T7, CN
        </p>
      </div>

      {/* Test 1: DatePicker với ngày 27/05/2025 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">1. DatePicker - Kiểm tra ngày 27/05/2025</h2>
        <p className="text-gray-600">
          Mở lịch và kiểm tra:
          <br />• Ngày 27 có nằm đúng cột Thứ 3 không?
          <br />• Header lịch có hiển thị đúng T2, T3, T4, T5, T6, T7, CN không?
        </p>
        <DatePicker
          label="Chọn ngày 27/05/2025 (phải là Thứ 3)"
          value={singleDate}
          onChange={setSingleDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 2: DatePicker với useYearNavigation */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">2. DatePicker với Year Navigation</h2>
        <p className="text-gray-600">
          Kiểm tra cả ngày trong tuần và dropdown tháng/năm
        </p>
        <DatePicker
          label="Với Year Navigation"
          value={singleDate}
          onChange={setSingleDate}
          useYearNavigation={true}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 3: DateRangePicker */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">3. DateRangePicker - Kiểm tra khoảng ngày</h2>
        <p className="text-gray-600">
          Khoảng từ 27/05/2025 (T3) đến 30/05/2025 (T6)
        </p>
        <DateRangePicker
          label="Chọn khoảng ngày"
          value={dateRange}
          onChange={setDateRange}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 4: DateRangePicker với useYearNavigation */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">4. DateRangePicker với Year Navigation</h2>
        <DateRangePicker
          label="Với Year Navigation"
          value={dateRange}
          onChange={setDateRange}
          useYearNavigation={true}
          numberOfMonths={1}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Debug info */}
      <div className="space-y-4 border-t pt-4">
        <h2 className="text-xl font-semibold">Debug Info</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p><strong>Ngày hiện tại:</strong> {new Date().toLocaleDateString('vi-VN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <p><strong>27/05/2025:</strong> {new Date(2025, 4, 27).toLocaleDateString('vi-VN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <p><strong>Single Date:</strong> {singleDate?.toLocaleDateString('vi-VN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) || 'Chưa chọn'}</p>
          <p><strong>Date Range:</strong> {
            dateRange?.from && dateRange?.to 
              ? `${dateRange.from.toLocaleDateString('vi-VN')} - ${dateRange.to.toLocaleDateString('vi-VN')}`
              : dateRange?.from 
                ? `${dateRange.from.toLocaleDateString('vi-VN')} - ...`
                : 'Chưa chọn'
          }</p>
        </div>
      </div>

      {/* Verification table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Bảng kiểm tra ngày trong tuần tháng 5/2025</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Ngày</th>
                <th className="border border-gray-300 px-4 py-2">Thứ trong tuần</th>
                <th className="border border-gray-300 px-4 py-2">JavaScript getDay()</th>
                <th className="border border-gray-300 px-4 py-2">Converted Index</th>
              </tr>
            </thead>
            <tbody>
              {[26, 27, 28, 29, 30, 31].map(day => {
                const date = new Date(2025, 4, day)
                const jsDay = date.getDay()
                const convertedIndex = (jsDay + 6) % 7
                const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
                return (
                  <tr key={day} className={day === 27 ? 'bg-yellow-100' : ''}>
                    <td className="border border-gray-300 px-4 py-2">{day}/05/2025</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {date.toLocaleDateString('vi-VN', { weekday: 'long' })}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{jsDay}</td>
                    <td className="border border-gray-300 px-4 py-2">{convertedIndex} ({weekdays[convertedIndex]})</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TestWeekdayFix
