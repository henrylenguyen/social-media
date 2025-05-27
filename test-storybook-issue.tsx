import React, { useState } from 'react'
import { DateRangePicker } from './libs/organisms/src/dateRangePicker'

// Test component để debug vấn đề Storybook
export const TestStorybookIssue = () => {
  const [range1, setRange1] = useState<{ from?: Date; to?: Date } | undefined>({
    from: new Date(2025, 3, 10), // 10/04/2025
    to: new Date(2025, 4, 27),   // 27/05/2025
  })

  const [range2, setRange2] = useState<{ from?: Date; to?: Date } | undefined>()

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <h1 className="text-2xl font-bold">Debug Storybook Issue</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-yellow-800">Vấn đề cần debug:</h2>
        <ul className="text-yellow-700 list-disc list-inside space-y-1">
          <li><strong>Storybook:</strong> Giá trị mặc định hiển thị range đúng, nhưng khi chọn mới thì mất range visual</li>
          <li><strong>Nguyên nhân:</strong> Storybook controls không sync với component state</li>
          <li><strong>Test:</strong> Component standalone có hoạt động đúng không?</li>
        </ul>
      </div>

      {/* Test 1: Component với giá trị mặc định */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">1. Component với giá trị mặc định (giống Storybook)</h2>
        <p className="text-gray-600">
          <strong>Giá trị ban đầu:</strong> 10/04/2025 - 27/05/2025
          <br />
          <strong>Test:</strong> Mở lịch và kiểm tra range có hiển thị đúng không
          <br />
          <strong>Sau đó:</strong> Chọn ngày mới và xem range có bị mất không
        </p>
        <DateRangePicker
          label="Với giá trị mặc định"
          value={range1}
          onChange={setRange1}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
        <div className="text-sm bg-blue-50 p-3 rounded">
          <strong>Current state:</strong> {
            range1?.from && range1?.to 
              ? `${range1.from.toLocaleDateString('vi-VN')} - ${range1.to.toLocaleDateString('vi-VN')}`
              : range1?.from 
                ? `${range1.from.toLocaleDateString('vi-VN')} - (chưa chọn ngày kết thúc)`
                : 'Chưa chọn'
          }
        </div>
      </div>

      {/* Test 2: Component không có giá trị mặc định */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">2. Component không có giá trị mặc định</h2>
        <p className="text-gray-600">
          <strong>Test:</strong> Chọn range từ đầu và xem có hoạt động đúng không
        </p>
        <DateRangePicker
          label="Không có giá trị mặc định"
          value={range2}
          onChange={setRange2}
          numberOfMonths={2}
          dateFormat="dd/MM/yyyy"
        />
        <div className="text-sm bg-blue-50 p-3 rounded">
          <strong>Current state:</strong> {
            range2?.from && range2?.to 
              ? `${range2.from.toLocaleDateString('vi-VN')} - ${range2.to.toLocaleDateString('vi-VN')}`
              : range2?.from 
                ? `${range2.from.toLocaleDateString('vi-VN')} - (chưa chọn ngày kết thúc)`
                : 'Chưa chọn'
          }
        </div>
      </div>

      {/* Test 3: Reset button */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">3. Reset Test</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => setRange1({
              from: new Date(2025, 3, 10),
              to: new Date(2025, 4, 27)
            })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset Range 1 to Default
          </button>
          <button 
            onClick={() => setRange1(undefined)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Range 1
          </button>
          <button 
            onClick={() => setRange2(undefined)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Range 2
          </button>
        </div>
      </div>

      {/* Debug info */}
      <div className="space-y-4 border-t pt-4">
        <h2 className="text-xl font-semibold">Debug Info</h2>
        <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
          <p><strong>Range 1 (with default):</strong></p>
          <pre className="bg-white p-2 rounded border text-xs">
            {JSON.stringify(range1, null, 2)}
          </pre>
          
          <p><strong>Range 2 (no default):</strong></p>
          <pre className="bg-white p-2 rounded border text-xs">
            {JSON.stringify(range2, null, 2)}
          </pre>
        </div>
      </div>

      {/* Test checklist */}
      <div className="space-y-4 bg-green-50 border border-green-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-green-800">Test Checklist:</h2>
        <div className="text-green-700 space-y-2">
          
          <div className="space-y-1">
            <p><strong>✅ Test Range 1 (có default):</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
              <li>Mở lịch → phải thấy range từ 10/04 đến 27/05 được highlight</li>
              <li>Chọn ngày mới (ví dụ: 15/04) → range cũ phải bị reset</li>
              <li>Input phải hiển thị "15/04/2025 - "</li>
              <li>Hover vào ngày khác → phải thấy range preview</li>
              <li>Chọn ngày kết thúc → range hoàn chỉnh</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p><strong>✅ Test Range 2 (không có default):</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
              <li>Chọn ngày đầu → input hiển thị "XX/XX/XXXX - "</li>
              <li>Hover vào ngày khác → range preview</li>
              <li>Chọn ngày kết thúc → range hoàn chỉnh</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p><strong>✅ So sánh với Storybook:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
              <li>Nếu component standalone hoạt động đúng → vấn đề là Storybook controls</li>
              <li>Nếu component standalone cũng bị lỗi → vấn đề là logic component</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Expected behavior */}
      <div className="space-y-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-blue-800">Expected Behavior:</h2>
        <div className="text-blue-700 space-y-2">
          <p><strong>1. Khi có giá trị mặc định:</strong></p>
          <ul className="list-disc list-inside ml-4 text-sm">
            <li>Lịch phải hiển thị range được highlight</li>
            <li>Input hiển thị "10/04/2025 - 27/05/2025"</li>
            <li>Khi chọn ngày mới, range cũ bị reset và bắt đầu range mới</li>
          </ul>

          <p><strong>2. Khi chọn range mới:</strong></p>
          <ul className="list-disc list-inside ml-4 text-sm">
            <li>Chọn ngày đầu → input hiển thị "XX/XX/XXXX - "</li>
            <li>Hover → range preview</li>
            <li>Chọn ngày kết thúc → input hiển thị "XX/XX/XXXX - YY/YY/YYYY"</li>
            <li>Lịch hiển thị range được highlight</li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default TestStorybookIssue
