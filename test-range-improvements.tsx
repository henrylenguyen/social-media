import React, { useState } from 'react'
import { DateRangePicker } from './libs/organisms/src/dateRangePicker'

// Test component để kiểm tra các cải thiện DateRangePicker
export const TestRangeImprovements = () => {
  const [dateRange1, setDateRange1] = useState<{ from?: Date; to?: Date } | undefined>()
  const [dateRange2, setDateRange2] = useState<{ from?: Date; to?: Date } | undefined>({
    from: new Date(2025, 4, 23), // 23/05/2025 (đã chọn)
    to: undefined // Chưa chọn ngày kết thúc
  })

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <h1 className="text-2xl font-bold">Test DateRangePicker Improvements</h1>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-green-800">Các cải thiện đã thực hiện:</h2>
        <ul className="text-green-700 list-disc list-inside space-y-1">
          <li><strong>Disable ngày quá khứ:</strong> Khi đã chọn ngày đầu, các ngày trước đó sẽ bị disable</li>
          <li><strong>Input rộng hơn:</strong> Min-width 280px để hiển thị đủ 2 ngày</li>
          <li><strong>Hover effect liên tục:</strong> Từ khi chọn ngày đầu, hover đến đâu range hiển thị đến đó</li>
          <li><strong>Highlight ngày hover:</strong> Ngày đang hover sẽ được highlight như ngày kết thúc</li>
        </ul>
      </div>

      {/* Test 1: DateRangePicker chưa chọn gì */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">1. DateRangePicker - Chưa chọn ngày nào</h2>
        <p className="text-gray-600">
          <strong>Hướng dẫn test:</strong>
          <br />• Chọn một ngày bất kỳ làm ngày bắt đầu
          <br />• Sau khi chọn, hover vào các ngày khác để thấy range preview
          <br />• Các ngày trước ngày đã chọn phải bị disable (màu xám)
          <br />• Input phải đủ rộng để hiển thị cả 2 ngày
        </p>
        <DateRangePicker
          label="Test từ đầu - chưa chọn ngày nào"
          value={dateRange1}
          onChange={setDateRange1}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 2: DateRangePicker đã chọn ngày đầu */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">2. DateRangePicker - Đã chọn ngày đầu (23/05/2025)</h2>
        <p className="text-gray-600">
          <strong>Trạng thái:</strong> Đã chọn ngày 23/05/2025, chưa chọn ngày kết thúc
          <br />
          <strong>Test:</strong>
          <br />• Mở lịch và hover vào các ngày sau 23/05
          <br />• Phải thấy range preview từ 23/05 đến ngày đang hover
          <br />• Các ngày trước 23/05 phải bị disable
          <br />• Ngày đang hover phải được highlight
        </p>
        <DateRangePicker
          label="Đã chọn ngày đầu - test hover effect"
          value={dateRange2}
          onChange={setDateRange2}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 3: DateRangePicker với useYearNavigation */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">3. DateRangePicker với Year Navigation</h2>
        <p className="text-gray-600">
          Test tất cả tính năng với year navigation enabled
        </p>
        <DateRangePicker
          label="Với Year Navigation"
          value={dateRange2}
          onChange={setDateRange2}
          useYearNavigation={true}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 4: Single month */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">4. DateRangePicker - Single Month</h2>
        <p className="text-gray-600">
          Test với 1 tháng để đảm bảo tất cả tính năng vẫn hoạt động
        </p>
        <DateRangePicker
          label="Single Month với Year Navigation"
          value={dateRange2}
          onChange={setDateRange2}
          numberOfMonths={1}
          useYearNavigation={true}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 5: Input width comparison */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">5. So sánh chiều rộng Input</h2>
        <p className="text-gray-600">
          So sánh với input thông thường để thấy sự khác biệt
        </p>
        <div className="space-y-2">
          <input 
            type="text" 
            placeholder="Input thông thường" 
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <DateRangePicker
            label="DateRangePicker với min-width 280px"
            value={dateRange1}
            onChange={setDateRange1}
            numberOfMonths={1}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* Debug info */}
      <div className="space-y-4 border-t pt-4">
        <h2 className="text-xl font-semibold">Debug Info</h2>
        <div className="bg-gray-50 p-4 rounded space-y-2">
          <p><strong>Range 1 (chưa chọn):</strong> {
            dateRange1?.from && dateRange1?.to 
              ? `${dateRange1.from.toLocaleDateString('vi-VN')} - ${dateRange1.to.toLocaleDateString('vi-VN')}`
              : dateRange1?.from 
                ? `${dateRange1.from.toLocaleDateString('vi-VN')} - (chưa chọn ngày kết thúc)`
                : 'Chưa chọn'
          }</p>
          <p><strong>Range 2 (đã chọn 23/05):</strong> {
            dateRange2?.from && dateRange2?.to 
              ? `${dateRange2.from.toLocaleDateString('vi-VN')} - ${dateRange2.to.toLocaleDateString('vi-VN')}`
              : dateRange2?.from 
                ? `${dateRange2.from.toLocaleDateString('vi-VN')} - (chưa chọn ngày kết thúc)`
                : 'Chưa chọn'
          }</p>
        </div>
      </div>

      {/* Test checklist */}
      <div className="space-y-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-blue-800">Checklist Test:</h2>
        <div className="text-blue-700 space-y-2">
          <div className="space-y-1">
            <p><strong>✅ Disable ngày quá khứ:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm">
              <li>Chọn ngày 23/05/2025 trong Range 2</li>
              <li>Kiểm tra các ngày 1-22/05 có bị disable không</li>
              <li>Kiểm tra các ngày từ 24/05 trở đi có click được không</li>
            </ul>
          </div>
          
          <div className="space-y-1">
            <p><strong>✅ Input width:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm">
              <li>So sánh với input thông thường ở Test 5</li>
              <li>DateRangePicker input phải rộng hơn đáng kể</li>
              <li>Có thể hiển thị đủ "dd/MM/yyyy - dd/MM/yyyy"</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p><strong>✅ Hover effect:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm">
              <li>Mở Range 2 (đã chọn 23/05)</li>
              <li>Hover vào ngày 30/05 → thấy range 23-30/05</li>
              <li>Hover vào ngày 15/06 → thấy range 23/05-15/06</li>
              <li>Ngày đang hover phải có màu như ngày kết thúc</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p><strong>✅ Cross-month:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm">
              <li>Chọn ngày trong tháng 5, hover vào tháng 6</li>
              <li>Range phải hiển thị liên tục qua 2 tháng</li>
              <li>Click vào ngày tháng 6 để hoàn thành range</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestRangeImprovements
