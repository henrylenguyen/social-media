import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { addDays, subDays } from 'date-fns'
import React from 'react'
import { DateRange } from 'react-day-picker'
import { DateRangePicker } from './dateRangePicker'
import { SupportedDateDisplayFormat } from 'src/type'


const meta: Meta<typeof DateRangePicker> = {
  title: 'Organisms/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  argTypes: {
    selectedRange: {
      control: 'object',
      description: 'Khoảng ngày được chọn.',
    },
    onRangeSelected: {
      action: 'onRangeSelected',
      description: 'Callback được gọi khi một khoảng ngày được chọn.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder cho input.',
    },
    className: {
      control: 'text',
      description: 'ClassName tùy chỉnh cho container (Button trigger).',
    },
    popoverContentClassName: {
      control: 'text',
      description: 'ClassName tùy chỉnh cho PopoverContent.',
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Số tháng hiển thị trong calendar.',
    },
    allowClear: {
      control: 'boolean',
      description: 'Hiển thị nút xóa khoảng ngày đã chọn.',
    },
    clearButtonLabel: {
      control: 'text',
      description: 'Nhãn cho nút xóa.',
    },
    displayFormat: {
      control: {
        type: 'select',
      },
      options: [
        'PPP',
        'dd/MM/yyyy',
        'MM/dd/yyyy',
        'yyyy-MM-dd',
        'dd MMM yy',
        'd MMMM yyyy',
      ] as SupportedDateDisplayFormat[],
      description: `Định dạng ngày hiển thị trên button.`,
    },
    useYearNavigation: {
      control: 'boolean',
      description:
        'Sử dụng giao diện chọn năm và tháng bằng dropdown. Nếu true, fromYear và toYear của DateRangePicker nên được cung cấp.',
    },
    fromYear: {
      control: 'number',
      description:
        'Năm bắt đầu cho dropdown (chỉ áp dụng khi useYearNavigation là true).',
      if: { arg: 'useYearNavigation', eq: true },
    },
    toYear: {
      control: 'number',
      description:
        'Năm kết thúc cho dropdown (chỉ áp dụng khi useYearNavigation là true).',
      if: { arg: 'useYearNavigation', eq: true },
    },
    calendarProps: {
      control: 'object',
      description:
        "Props tùy chỉnh cho Calendar. 'mode', 'selected', 'onSelect', 'locale', 'numberOfMonths', 'initialFocus' được DateRangePicker quản lý. Nếu 'useYearNavigation' là true, 'captionLayout', 'fromYear', 'toYear' cũng sẽ do DateRangePicker quản lý.",
    },
  },
  args: {
    onRangeSelected: fn(),
    placeholder: 'Chọn khoảng thời gian',
    numberOfMonths: 2,
    displayFormat: 'PPP',
    useYearNavigation: false,
    allowClear: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Component DateRangePicker cho phép người dùng chọn một khoảng ngày. Tích hợp Popover và Calendar (thường là 2 tháng).',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DateRangePicker>

const RenderDateRangePickerWithState = (args: Story['args']) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [range, setRange] = React.useState<DateRange | undefined>(
    args?.selectedRange,
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    // Allow Storybook control to update the state
    setRange(args?.selectedRange)
  }, [args?.selectedRange])

  return (
    <div style={{ width: '350px' }}>
      <DateRangePicker
        {...args}
        selectedRange={range}
        onRangeSelected={(newRange) => {
          setRange(newRange)
          args?.onRangeSelected?.(newRange)
        }}
      />
      <div className='mt-4 p-2 border rounded-md bg-gray-50 text-sm'>
        <p>
          Selected Range (State):{' '}
          {range?.from
            ? `${range.from.toLocaleDateString()} - ${
                range.to ? range.to.toLocaleDateString() : '...'
              }`
            : 'Chưa chọn'}
        </p>
        <p>Display Format: {args?.displayFormat}</p>
        <p>
          Use Year Nav (Picker): {args?.useYearNavigation ? 'True' : 'False'}
        </p>
        {args?.useYearNavigation && <p>Picker From Year: {args?.fromYear}</p>}
        {args?.useYearNavigation && <p>Picker To Year: {args?.toYear}</p>}
        <p>CalendarProps: {JSON.stringify(args?.calendarProps)}</p>
      </div>
    </div>
  )
}

const today = new Date()
const currentYear = today.getFullYear()

export const DefaultRange: Story = {
  name: '1. Mặc định (2 tháng)',
  args: {},
  render: RenderDateRangePickerWithState,
}

export const WithInitialRange: Story = {
  name: '2. Có khoảng ngày chọn sẵn',
  args: {
    selectedRange: {
      from: subDays(today, 10),
      to: addDays(today, 5),
    },
  },
  render: RenderDateRangePickerWithState,
}

export const AllowClearRange: Story = {
  name: '3. Cho phép xóa khoảng ngày',
  args: {
    selectedRange: {
      from: subDays(today, 7),
      to: today,
    },
    allowClear: true,
    clearButtonLabel: 'Xóa tất cả',
  },
  render: RenderDateRangePickerWithState,
}

export const SingleMonthDisplay: Story = {
  name: '4. Hiển thị 1 tháng',
  args: {
    numberOfMonths: 1,
    placeholder: 'Chọn khoảng ngày (1 tháng)',
    selectedRange: {
      from: new Date(currentYear, today.getMonth(), 5),
      to: new Date(currentYear, today.getMonth(), 15),
    },
  },
  render: RenderDateRangePickerWithState,
}

export const RangePickerControlledYearNav: Story = {
  name: '5.1. Chọn Năm/Tháng (RangePicker Controlled)',
  args: {
    placeholder: 'Chọn khoảng (RP Nav)',
    useYearNavigation: true,
    fromYear: currentYear - 2,
    toYear: currentYear + 2,
    selectedRange: {
      from: new Date(currentYear, 0, 10), // 10 Jan
      to: new Date(currentYear, 1, 20), // 20 Feb
    },
  },
  render: RenderDateRangePickerWithState,
}

export const RangeCalendarPropsYearNav: Story = {
  name: '5.2. Chọn Năm/Tháng (CalendarProps Controlled)',
  args: {
    placeholder: 'Chọn khoảng (CP Nav)',
    useYearNavigation: false,
    calendarProps: {
      captionLayout: 'dropdown-buttons',
      fromYear: currentYear - 1,
      toYear: currentYear + 1,
    },
    selectedRange: {
      from: new Date(currentYear, 3, 1), // 1 Apr
      to: new Date(currentYear, 3, 15), // 15 Apr
    },
  },
  render: RenderDateRangePickerWithState,
}

export const RangePickerOverridesCalendarPropsNav: Story = {
  name: '5.3. RP Nav Ghi đè CP Nav',
  args: {
    placeholder: 'Chọn khoảng (RP overrides CP)',
    useYearNavigation: true,
    fromYear: currentYear - 4,
    toYear: currentYear,
    calendarProps: {
      captionLayout: 'buttons', // Sẽ bị ghi đè
      fromYear: currentYear - 1, // Sẽ bị ghi đè
      toYear: currentYear + 1, // Sẽ bị ghi đè
    },
    selectedRange: {
      from: new Date(currentYear - 1, 11, 20), // 20 Dec năm trước
      to: new Date(currentYear, 0, 5), // 5 Jan năm nay
    },
  },
  render: RenderDateRangePickerWithState,
}

export const Format_dd_MM_yyyy_Range: Story = {
  name: '6.1. Định dạng dd/MM/yyyy',
  args: {
    selectedRange: {
      from: new Date(2024, 4, 10),
      to: new Date(2024, 4, 25),
    },
    displayFormat: 'dd/MM/yyyy',
    placeholder: 'Chọn khoảng (dd/MM/yyyy)',
  },
  render: RenderDateRangePickerWithState,
}

export const Format_d_MMMM_yyyy_Range: Story = {
  name: '6.2. Định dạng d MMMM yyyy',
  args: {
    selectedRange: {
      from: new Date(2025, 0, 1),
      to: new Date(2025, 0, 15),
    },
    displayFormat: 'd MMMM yyyy',
    placeholder: 'Chọn khoảng (d MMMM yyyy)',
  },
  render: RenderDateRangePickerWithState,
}

export const DisabledPastDatesInRange: Story = {
  name: '7. Vô hiệu hóa ngày quá khứ',
  args: {
    placeholder: 'Chọn khoảng (không chọn quá khứ)',
    calendarProps: {
      disabled: (date) => date < new Date(new Date().setHours(0, 0, 0, 0)),
    },
    selectedRange: {
      from: today,
      to: addDays(today, 7),
    },
  },
  render: RenderDateRangePickerWithState,
}

export const YearNavWithMaxRange: Story = {
  name: '8. Chọn Năm/Tháng + Giới hạn khoảng (ví dụ: max 30 ngày)',
  args: {
    placeholder: 'Chọn khoảng (tối đa 30 ngày)',
    useYearNavigation: true,
    fromYear: currentYear - 1,
    toYear: currentYear + 1,
    // Logic giới hạn khoảng ngày sẽ cần xử lý trong onRangeSelected hoặc state của component cha
    // Story này chỉ minh họa UI, không enforce logic giới hạn
    calendarProps: {
      // disabled: (date, { from }) => { // Ví dụ logic disable nếu chọn quá 30 ngày
      //     if (from && date > addDays(from, 30)) return true;
      //     return false;
      // }
    },
    selectedRange: {
      from: new Date(currentYear, today.getMonth(), 1),
      to: new Date(currentYear, today.getMonth(), 15),
    },
  },
  render: RenderDateRangePickerWithState,
  parameters: {
    docs: {
      description: {
        story:
          'Lưu ý: Logic giới hạn khoảng ngày (ví dụ: tối đa 30 ngày) cần được xử lý trong logic của ứng dụng (ví dụ: trong hàm `onRangeSelected` hoặc state của component cha). Story này chỉ minh họa cấu hình UI.',
      },
    },
  },
}
