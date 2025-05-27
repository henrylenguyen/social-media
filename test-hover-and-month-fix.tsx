import React, { useState } from 'react'
import { DateRangePicker } from './libs/organisms/src/dateRangePicker'

// Test component để kiểm tra hover effect và hiển thị tháng
export const TestHoverAndMonthFix = () => {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>({
    from: new Date(2025, 4, 22), // 22/05/2025 (đã chọn)
    to: undefined // Chưa chọn ngày kết thúc
  })

  const [dateRange2, setDateRange2] = useState<{ from?: Date; to?: Date } | undefined>()

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <h1 className="text-2xl font-bold">Test Hover Effect và Month Display Fix</h1>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-800">Vấn đề cần kiểm tra:</h2>
        <ul className="text-blue-700 list-disc list-inside space-y-1">
          <li><strong>Hover Effect:</strong> Khi đã chọn ngày đầu (22/05), hover vào ngày khác phải hiển thị range preview</li>
          <li><strong>Month Display:</strong> Lịch bên trái hiển thị tháng 5, lịch bên phải phải hiển thị tháng 6</li>
          <li><strong>Cross-month Hover:</strong> Có thể hover vào ngày của tháng sau (như ngày 26/06)</li>
        </ul>
      </div>

      {/* Test 1: DateRangePicker với ngày đầu đã chọn */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">1. DateRangePicker - Test Hover Effect</h2>
        <p className="text-gray-600">
          <strong>Ngày đầu đã chọn:</strong> 22/05/2025
          <br />
          <strong>Hướng dẫn test:</strong>
          <br />• Mở lịch và hover vào các ngày khác nhau
          <br />• Hover vào ngày 26/06 (tháng sau) - phải có hiệu ứng
          <br />• Kiểm tra lịch bên phải có hiển thị "tháng 06" không
        </p>
        <DateRangePicker
          label="Test Hover Effect (đã chọn 22/05/2025)"
          value={dateRange}
          onChange={setDateRange}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 2: DateRangePicker với useYearNavigation */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">2. DateRangePicker với Year Navigation</h2>
        <p className="text-gray-600">
          Kiểm tra dropdown tháng có hiển thị đúng tháng hiện tại của từng lịch không
        </p>
        <DateRangePicker
          label="Với Year Navigation"
          value={dateRange}
          onChange={setDateRange}
          useYearNavigation={true}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 3: DateRangePicker chưa chọn gì */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">3. DateRangePicker - Chưa chọn ngày nào</h2>
        <p className="text-gray-600">
          Test từ đầu: chọn ngày đầu, sau đó hover để test effect
        </p>
        <DateRangePicker
          label="Chưa chọn ngày nào"
          value={dateRange2}
          onChange={setDateRange2}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 4: Single month */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">4. DateRangePicker - Single Month</h2>
        <p className="text-gray-600">
          Test với 1 tháng để đảm bảo không bị lỗi
        </p>
        <DateRangePicker
          label="Single Month"
          value={dateRange}
          onChange={setDateRange}
          numberOfMonths={1}
          useYearNavigation={true}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Debug info */}
      <div className="space-y-4 border-t pt-4">
        <h2 className="text-xl font-semibold">Debug Info</h2>
        <div className="bg-gray-50 p-4 rounded space-y-2">
          <p><strong>Test Range 1:</strong> {
            dateRange?.from && dateRange?.to 
              ? `${dateRange.from.toLocaleDateString('vi-VN')} - ${dateRange.to.toLocaleDateString('vi-VN')}`
              : dateRange?.from 
                ? `${dateRange.from.toLocaleDateString('vi-VN')} - (chưa chọn ngày kết thúc)`
                : 'Chưa chọn'
          }</p>
          <p><strong>Test Range 2:</strong> {
            dateRange2?.from && dateRange2?.to 
              ? `${dateRange2.from.toLocaleDateString('vi-VN')} - ${dateRange2.to.toLocaleDateString('vi-VN')}`
              : dateRange2?.from 
                ? `${dateRange2.from.toLocaleDateString('vi-VN')} - (chưa chọn ngày kết thúc)`
                : 'Chưa chọn'
          }</p>
        </div>
      </div>

      {/* Test instructions */}
      <div className="space-y-4 bg-green-50 border border-green-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-green-800">Hướng dẫn test chi tiết:</h2>
        <div className="text-green-700 space-y-2">
          <p><strong>1. Test Hover Effect:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Mở DateRangePicker đầu tiên (đã chọn 22/05/2025)</li>
            <li>Hover vào các ngày khác nhau trong tháng 5</li>
            <li>Hover vào các ngày trong tháng 6 (lịch bên phải)</li>
            <li>Phải thấy hiệu ứng highlight range từ 22/05 đến ngày đang hover</li>
          </ul>
          
          <p><strong>2. Test Month Display:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Kiểm tra header lịch bên trái hiển thị "tháng 05 2025"</li>
            <li>Kiểm tra header lịch bên phải hiển thị "tháng 06 2025"</li>
            <li>Với useYearNavigation, dropdown phải hiển thị đúng tháng của từng lịch</li>
          </ul>

          <p><strong>3. Test Cross-month Selection:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Chọn ngày trong tháng 5, sau đó chọn ngày trong tháng 6</li>
            <li>Range phải được tạo đúng</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TestHoverAndMonthFix
