// File: libs/organisms/src/dateRangePicker/index.stories.tsx
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import type { DateRangeType } from '../date-picker-common/types'
import { SupportedDateDisplayFormat } from '../date-picker-common/types'
import { DateRangePicker } from './dateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Organisms/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DateRangePicker component cung cấp một giao diện trực quan để chọn khoảng ngày tháng. Component hiển thị hai tháng cạnh nhau để dễ dàng chọn ngày bắt đầu và kết thúc.

### ✨ Tính năng mới - Tối ưu UI:
- **Month/Year Navigation mặc định**: Dropdown chọn tháng/năm giúp navigate nhanh đến thời điểm mong muốn
- **UX tốt cho range xa**: Dễ dàng chọn range từ 2025 đến 2030 mà không cần click nhiều lần
- **Popup thông minh**: Không đóng sau khi chọn, cho phép user tiếp tục điều chỉnh

### Các định dạng ngày được hỗ trợ:
- \`PPP\`: Định dạng đầy đủ (ví dụ: "April 29th, 2023")
- \`dd/MM/yyyy\`: Định dạng Việt Nam (ví dụ: "29/04/2023")
- \`MM/dd/yyyy\`: Định dạng Mỹ (ví dụ: "04/29/2023")
- \`yyyy-MM-dd\`: Định dạng ISO (ví dụ: "2023-04-29")
- \`dd MMM yy\`: Định dạng ngắn (ví dụ: "29 Apr 23")
- \`d MMMM yyyy\`: Định dạng dài (ví dụ: "29 April 2023")

### Cách chọn ngày:
1. Click vào ngày đầu tiên để chọn ngày bắt đầu
2. Click vào ngày thứ hai để chọn ngày kết thúc
3. Hover trên các ngày để xem preview khoảng thời gian

### Accessibility:
- Hỗ trợ keyboard navigation
- ARIA labels đầy đủ
- Focus management tốt
- Screen reader friendly
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Giá trị khoảng ngày được chọn (object với from và to)',
      control: { type: 'object' },
    },
    onChange: {
      description: 'Callback được gọi khi khoảng ngày được chọn thay đổi',
      action: 'onChange',
    },
    label: {
      description: 'Label hiển thị phía trên input',
      control: { type: 'text' },
    },
    placeholder: {
      description: 'Placeholder text cho input',
      control: { type: 'text' },
    },
    dateFormat: {
      description: 'Định dạng hiển thị ngày',
      control: { type: 'select' },
      options: [
        'PPP',
        'dd/MM/yyyy',
        'MM/dd/yyyy',
        'yyyy-MM-dd',
        'dd MMM yy',
        'd MMMM yyyy',
      ] as SupportedDateDisplayFormat[],
    },
    numberOfMonths: {
      description: 'Số tháng hiển thị cạnh nhau (chỉ được phép 1 hoặc 2)',
      control: { type: 'select' },
      options: [1, 2],
    },
    disabled: {
      description: 'Vô hiệu hóa component',
      control: { type: 'boolean' },
    },
    required: {
      description: 'Đánh dấu trường bắt buộc',
      control: { type: 'boolean' },
    },
    error: {
      description: 'Thông báo lỗi',
      control: { type: 'text' },
    },
    minDate: {
      description: 'Ngày tối thiểu có thể chọn',
      control: { type: 'date' },
    },
    maxDate: {
      description: 'Ngày tối đa có thể chọn',
      control: { type: 'date' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default component with state management
const DefaultComponent = () => {
  const [value, setValue] = React.useState<DateRangeType | undefined>(undefined)

  return (
    <DateRangePicker
      label='Chọn khoảng ngày'
      placeholder='dd/MM/yyyy - dd/MM/yyyy'
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
        action('date-range-changed')(newValue)
      }}
      dateFormat='dd/MM/yyyy'
    />
  )
}

/**
 * Ví dụ cơ bản với tất cả các tính năng mặc định
 */
export const Default: Story = {
  render: () => <DefaultComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'DateRangePicker với month/year navigation mặc định. Dễ dàng navigate đến tháng/năm xa mà không cần click nhiều lần.',
      },
    },
  },
}

// WithDefaultValue component with state management
const WithDefaultValueComponent = () => {
  const [value, setValue] = React.useState<DateRangeType | undefined>({
    from: new Date('2025-05-15'),
    to: new Date('2025-05-29'),
  })

  return (
    <DateRangePicker
      label='Kỳ nghỉ'
      value={value}
      dateFormat='dd/MM/yyyy'
      onChange={(newValue) => {
        setValue(newValue)
        action('vacation-range-changed')(newValue)
      }}
    />
  )
}

/**
 * DateRangePicker với giá trị mặc định
 */
export const WithDefaultValue: Story = {
  render: () => <WithDefaultValueComponent />,
}

// WithYearNavigation component with state management
const WithYearNavigationComponent = () => {
  const [value, setValue] = React.useState<DateRangeType | undefined>(undefined)

  return (
    <DateRangePicker
      label='Với dropdown năm/tháng (mặc định)'
      dateFormat='dd/MM/yyyy'
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
        action('year-nav-range-changed')(newValue)
      }}
    />
  )
}

/**
 * DateRangePicker với dropdown năm/tháng
 */
export const WithYearNavigation: Story = {
  render: () => <WithYearNavigationComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'DateRangePicker với dropdown để chọn năm và tháng, hữu ích khi cần chọn ngày xa.',
      },
    },
  },
}

// SingleMonth component with state management
const SingleMonthComponent = () => {
  const [value, setValue] = React.useState<DateRangeType | undefined>(undefined)

  return (
    <DateRangePicker
      label='Chọn khoảng ngày (1 tháng)'
      numberOfMonths={1}
      dateFormat='dd/MM/yyyy'
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
        action('single-month-changed')(newValue)
      }}
    />
  )
}

/**
 * DateRangePicker hiển thị 1 tháng
 */
export const SingleMonth: Story = {
  render: () => <SingleMonthComponent />,
}

// WithDateLimits component with state management
const WithDateLimitsComponent = () => {
  const [value, setValue] = React.useState<DateRangeType | undefined>(undefined)

  return (
    <DateRangePicker
      label='Chọn khoảng ngày (3 tháng tới)'
      minDate={new Date()}
      maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
      dateFormat='dd/MM/yyyy'
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
        action('limited-range-changed')(newValue)
      }}
    />
  )
}

/**
 * DateRangePicker với giới hạn ngày
 */
export const WithDateLimits: Story = {
  render: () => <WithDateLimitsComponent />,
}

// Required component with state management
const RequiredComponent = () => {
  const [value, setValue] = React.useState<DateRangeType | undefined>(undefined)

  return (
    <DateRangePicker
      label='Khoảng ngày bắt buộc'
      required={true}
      error={!value ? 'Vui lòng chọn khoảng ngày' : undefined}
      dateFormat='dd/MM/yyyy'
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
        action('required-range-changed')(newValue)
      }}
    />
  )
}

/**
 * DateRangePicker bắt buộc với validation
 */
export const Required: Story = {
  render: () => <RequiredComponent />,
}

// Disabled component with state management
const DisabledComponent = () => {
  const [value] = React.useState<DateRangeType | undefined>({
    from: new Date('2025-05-15'),
    to: new Date('2025-05-29'),
  })

  return (
    <DateRangePicker
      label='Khoảng ngày không thể chỉnh sửa'
      value={value}
      disabled={true}
      dateFormat='dd/MM/yyyy'
      onChange={action('disabled-range-changed')}
    />
  )
}

/**
 * DateRangePicker bị vô hiệu hóa
 */
export const Disabled: Story = {
  render: () => <DisabledComponent />,
}

// Interactive component for testing
const InteractiveComponent = () => {
  const [value, setValue] = React.useState<DateRangeType | undefined>(undefined)

  return (
    <div className='w-full max-w-xl space-y-4'>
      <DateRangePicker
        label='Test Interactive Selection'
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          action('interactive-changed')(newValue)
        }}
        dateFormat='dd/MM/yyyy'
        numberOfMonths={2}
      />

      <div className='p-4 bg-gray-50 rounded-lg space-y-2'>
        <h3 className='font-semibold text-sm'>Current Value:</h3>
        <p className='text-sm'>
          <strong>From:</strong>{' '}
          {value?.from
            ? value.from.toLocaleDateString('vi-VN')
            : 'Not selected'}
        </p>
        <p className='text-sm'>
          <strong>To:</strong>{' '}
          {value?.to ? value.to.toLocaleDateString('vi-VN') : 'Not selected'}
        </p>
      </div>

      <div className='flex gap-2'>
        <button
          onClick={() => setValue(undefined)}
          className='px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600'
        >
          Clear
        </button>
        <button
          onClick={() => {
            const today = new Date()
            const nextWeek = new Date()
            nextWeek.setDate(today.getDate() + 7)
            setValue({ from: today, to: nextWeek })
          }}
          className='px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600'
        >
          Next 7 Days
        </button>
      </div>
    </div>
  )
}

/**
 * Interactive test với state management
 */
export const Interactive: Story = {
  render: () => <InteractiveComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example với state management để test chức năng chọn range.',
      },
    },
  },
}

// Clean test component without initial value
const CleanTestComponent = () => {
  const [value, setValue] = React.useState<DateRangeType | undefined>(undefined)

  return (
    <div className='w-full max-w-xl space-y-4'>
      <DateRangePicker
        label='Clean Test (No Initial Value)'
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          action('clean-test-changed')(newValue)
        }}
        dateFormat='dd/MM/yyyy'
        numberOfMonths={2}
      />

      <div className='p-4 bg-gray-50 rounded-lg space-y-2'>
        <h3 className='font-semibold text-sm'>Current Value:</h3>
        <p className='text-sm'>
          <strong>From:</strong>{' '}
          {value?.from
            ? value.from.toLocaleDateString('vi-VN')
            : 'Not selected'}
        </p>
        <p className='text-sm'>
          <strong>To:</strong>{' '}
          {value?.to ? value.to.toLocaleDateString('vi-VN') : 'Not selected'}
        </p>
      </div>
    </div>
  )
}

/**
 * Clean test without initial value
 */
export const CleanTest: Story = {
  render: () => <CleanTestComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Clean test component starting with no initial value.',
      },
    },
  },
}

// Test component for range selection behavior
const RangeSelectionTestComponent = () => {
  const [value, setValue] = React.useState<DateRangeType | undefined>(undefined)

  return (
    <div className='w-full max-w-xl space-y-4'>
      <DateRangePicker
        label='Test Range Selection Behavior'
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          action('range-selection-test')(newValue)
        }}
        dateFormat='dd/MM/yyyy'
        numberOfMonths={2}
      />

      <div className='p-4 bg-blue-50 rounded-lg space-y-2'>
        <h3 className='font-semibold text-sm text-blue-800'>Instructions:</h3>
        <ol className='text-sm text-blue-700 space-y-1'>
          <li>1. Click on a start date</li>
          <li>2. Notice that dates before the start date are now disabled</li>
          <li>3. Hover over future dates to see range preview</li>
          <li>4. Click on an end date to complete the selection</li>
        </ol>
      </div>

      <div className='p-4 bg-gray-50 rounded-lg space-y-2'>
        <h3 className='font-semibold text-sm'>Current Value:</h3>
        <p className='text-sm'>
          <strong>From:</strong>{' '}
          {value?.from
            ? value.from.toLocaleDateString('vi-VN')
            : 'Not selected'}
        </p>
        <p className='text-sm'>
          <strong>To:</strong>{' '}
          {value?.to ? value.to.toLocaleDateString('vi-VN') : 'Not selected'}
        </p>
      </div>
    </div>
  )
}

/**
 * Test range selection behavior
 */
export const RangeSelectionTest: Story = {
  render: () => <RangeSelectionTestComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Test component để kiểm tra behavior của range selection với disabled dates.',
      },
    },
  },
}

// Long Range Selection component
const LongRangeSelectionComponent = () => {
  const [value, setValue] = React.useState<DateRangeType | undefined>({
    from: new Date('2025-05-01'),
    to: new Date('2030-12-31'),
  })

  return (
    <div className='w-full max-w-xl space-y-4'>
      <DateRangePicker
        label='Long Range Selection (2025-2030)'
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          action('long-range-changed')(newValue)
        }}
        dateFormat='dd/MM/yyyy'
        numberOfMonths={2}
        placeholder='dd/MM/yyyy - dd/MM/yyyy'
      />

      <div className='p-4 bg-green-50 rounded-lg space-y-2'>
        <h3 className='font-semibold text-sm text-green-800'>
          Tối ưu cho Range xa:
        </h3>
        <ul className='text-sm text-green-700 space-y-1'>
          <li>✅ Dropdown tháng/năm giúp navigate nhanh</li>
          <li>✅ Không cần click nhiều lần để đến năm xa</li>
          <li>✅ UX tốt hơn cho việc chọn range dài hạn</li>
          <li>✅ Popup không đóng sau khi chọn - tiếp tục chọn được</li>
        </ul>
      </div>

      <div className='p-4 bg-gray-50 rounded-lg space-y-2'>
        <h3 className='font-semibold text-sm'>Current Value:</h3>
        <p className='text-sm'>
          <strong>From:</strong>{' '}
          {value?.from
            ? value.from.toLocaleDateString('vi-VN')
            : 'Not selected'}
        </p>
        <p className='text-sm'>
          <strong>To:</strong>{' '}
          {value?.to ? value.to.toLocaleDateString('vi-VN') : 'Not selected'}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Duration:</strong>{' '}
          {value?.from && value?.to
            ? `${Math.ceil(
                (value.to.getTime() - value.from.getTime()) /
                  (1000 * 60 * 60 * 24),
              )} ngày`
            : 'N/A'}
        </p>
      </div>
    </div>
  )
}

/**
 * Long Range Selection - Tối ưu cho việc chọn range xa
 */
export const LongRangeSelection: Story = {
  render: () => <LongRangeSelectionComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Demo việc chọn range xa (2025-2030) với month/year navigation để UX tốt hơn.',
      },
    },
  },
}
