import React, { useState } from 'react'
import { DateRangePicker } from './libs/organisms/src/dateRangePicker'

// Test component để kiểm tra các sửa đổi cuối cùng
export const TestFinalDateRangeFix = () => {
  const [dateRange1, setDateRange1] = useState<{ from?: Date; to?: Date } | undefined>()
  const [dateRange2, setDateRange2] = useState<{ from?: Date; to?: Date } | undefined>()

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <h1 className="text-2xl font-bold">Test Final DateRangePicker Fix</h1>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-red-800">Vấn đề đã sửa:</h2>
        <ul className="text-red-700 list-disc list-inside space-y-1">
          <li><strong>Input hiển thị dấu gạch ngang:</strong> Khi chọn ngày 22, input phải hiển thị "22/05/2025 - "</li>
          <li><strong>Disable hoạt động đúng:</strong> Các ngày trước ngày đã chọn phải bị disable (kể cả ngày tháng trước)</li>
          <li><strong>Click để kết thúc range:</strong> Click lại vào ngày đã chọn hoặc ngày khác để hoàn thành range</li>
        </ul>
      </div>

      {/* Test 1: DateRangePicker test từ đầu */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">1. Test từ đầu - Chưa chọn ngày nào</h2>
        <p className="text-gray-600">
          <strong>Bước test:</strong>
          <br />1. Click chọn ngày 22/05/2025
          <br />2. Kiểm tra input hiển thị "22/05/2025 - " (có dấu gạch ngang)
          <br />3. Kiểm tra các ngày 1-21/05 bị disable (màu xám, không click được)
          <br />4. Hover vào ngày 30/05 để thấy range preview
          <br />5. Click ngày 30/05 để hoàn thành range
        </p>
        <DateRangePicker
          label="Test Input Format và Disable"
          value={dateRange1}
          onChange={setDateRange1}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 2: DateRangePicker với tháng khác */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">2. Test Cross-Month Disable</h2>
        <p className="text-gray-600">
          <strong>Bước test:</strong>
          <br />1. Chọn ngày cuối tháng 5 (ví dụ: 28/05/2025)
          <br />2. Kiểm tra các ngày tháng 4 (hiển thị ở lịch trái) có bị disable không
          <br />3. Kiểm tra các ngày đầu tháng 5 có bị disable không
          <br />4. Chọn ngày trong tháng 6 để hoàn thành range
        </p>
        <DateRangePicker
          label="Test Cross-Month Disable"
          value={dateRange2}
          onChange={setDateRange2}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Test 3: Single month */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">3. Test Single Month</h2>
        <p className="text-gray-600">
          Test với 1 tháng để đảm bảo tất cả tính năng vẫn hoạt động
        </p>
        <DateRangePicker
          label="Single Month Test"
          value={dateRange1}
          onChange={setDateRange1}
          numberOfMonths={1}
          useYearNavigation={true}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Debug info */}
      <div className="space-y-4 border-t pt-4">
        <h2 className="text-xl font-semibold">Debug Info</h2>
        <div className="bg-gray-50 p-4 rounded space-y-2">
          <p><strong>Range 1:</strong> {
            dateRange1?.from && dateRange1?.to 
              ? `${dateRange1.from.toLocaleDateString('vi-VN')} - ${dateRange1.to.toLocaleDateString('vi-VN')}`
              : dateRange1?.from 
                ? `${dateRange1.from.toLocaleDateString('vi-VN')} - (chưa chọn ngày kết thúc)`
                : 'Chưa chọn'
          }</p>
          <p><strong>Range 2:</strong> {
            dateRange2?.from && dateRange2?.to 
              ? `${dateRange2.from.toLocaleDateString('vi-VN')} - ${dateRange2.to.toLocaleDateString('vi-VN')}`
              : dateRange2?.from 
                ? `${dateRange2.from.toLocaleDateString('vi-VN')} - (chưa chọn ngày kết thúc)`
                : 'Chưa chọn'
          }</p>
        </div>
      </div>

      {/* Test checklist */}
      <div className="space-y-4 bg-green-50 border border-green-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-green-800">Checklist Test Chi Tiết:</h2>
        <div className="text-green-700 space-y-3">
          
          <div className="space-y-1">
            <p><strong>✅ Test Input Format:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
              <li>Chọn ngày 22/05/2025 trong Range 1</li>
              <li>Input phải hiển thị: "22/05/2025 - " (có dấu gạch ngang và khoảng trắng)</li>
              <li>KHÔNG được hiển thị chỉ "22/05/2025" như trước</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p><strong>✅ Test Disable Current Month:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
              <li>Sau khi chọn 22/05, các ngày 1-21/05 phải màu xám</li>
              <li>Click vào ngày 15/05 → không được phép (disabled)</li>
              <li>Các ngày từ 23/05 trở đi phải click được bình thường</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p><strong>✅ Test Disable Previous Month:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
              <li>Chọn ngày 28/05 trong Range 2</li>
              <li>Tất cả ngày tháng 4 (hiển thị ở góc trái lịch) phải bị disable</li>
              <li>Các ngày 1-27/05 phải bị disable</li>
              <li>Click vào bất kỳ ngày nào tháng 4 → không được phép</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p><strong>✅ Test Hover Effect:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
              <li>Sau khi chọn ngày đầu, hover vào ngày khác</li>
              <li>Phải thấy range preview từ ngày đã chọn đến ngày hover</li>
              <li>Ngày hover phải được highlight như ngày kết thúc</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p><strong>✅ Test Complete Range:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
              <li>Click vào ngày sau ngày đã chọn để hoàn thành range</li>
              <li>Input phải hiển thị: "22/05/2025 - 30/05/2025"</li>
              <li>Lịch phải đóng lại</li>
              <li>Cả 2 ngày phải được highlight trong lịch</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p><strong>✅ Test Reset Range:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
              <li>Khi đã có range hoàn chỉnh, click vào ngày mới</li>
              <li>Range cũ phải bị reset</li>
              <li>Bắt đầu chọn range mới từ ngày vừa click</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Expected vs Actual */}
      <div className="space-y-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-blue-800">Expected vs Actual:</h2>
        <div className="text-blue-700 space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">❌ Trước khi sửa:</p>
              <ul className="text-sm space-y-1">
                <li>• Input: "22/05/2025" (không có dấu gạch ngang)</li>
                <li>• Disable không hoạt động</li>
                <li>• Có thể click ngày trong quá khứ</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">✅ Sau khi sửa:</p>
              <ul className="text-sm space-y-1">
                <li>• Input: "22/05/2025 - " (có dấu gạch ngang)</li>
                <li>• Disable hoạt động đúng</li>
                <li>• Không thể click ngày trong quá khứ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TestFinalDateRangeFix
