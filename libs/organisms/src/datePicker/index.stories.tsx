import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'
import { DatePicker } from './datePicker'
import { SupportedDateDisplayFormat } from 'src/type'

const meta: Meta<typeof DatePicker> = {
  title: 'Organisms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    selectedDate: {
      control: 'date',
      description: 'Ngày được chọn. Có thể được kiểm soát từ bên ngoài.',
    },
    onDateSelected: {
      action: 'onDateSelected',
      description: 'Callback được gọi khi một ngày được chọn.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder cho input khi chưa có ngày nào được chọn.',
    },
    className: {
      control: 'text',
      description:
        'ClassName tùy chỉnh cho container của DatePicker (Button trigger).',
    },
    popoverContentClassName: {
      control: 'text',
      description: 'ClassName tùy chỉnh cho PopoverContent.',
    },
    allowClear: {
      control: 'boolean',
      description: 'Hiển thị nút xóa ngày đã chọn.',
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
      description: `Định dạng ngày hiển thị trên button:
        - PPP: (Mặc định) Định dạng local (ví dụ: "15 tháng 1, 2024")
        - dd/MM/yyyy: (ví dụ: "15/01/2024")
        - MM/dd/yyyy: (ví dụ: "01/15/2024")
        - yyyy-MM-dd: (ví dụ: "2024-01-15")
        - dd MMM yy: (ví dụ: "15 Th01 24")
        - d MMMM yyyy: (ví dụ: "15 tháng 1 năm 2024")`,
    },
    useYearNavigation: {
      control: 'boolean',
      description:
        'Sử dụng giao diện chọn năm và tháng bằng dropdown (DatePicker sẽ quản lý captionLayout, fromYear, toYear). Nếu true, fromYear và toYear của DatePicker nên được cung cấp.',
    },
    fromYear: {
      control: 'number',
      description:
        'Năm bắt đầu cho dropdown chọn năm (chỉ áp dụng khi useYearNavigation là true).',
      if: { arg: 'useYearNavigation', eq: true },
    },
    toYear: {
      control: 'number',
      description:
        'Năm kết thúc cho dropdown chọn năm (chỉ áp dụng khi useYearNavigation là true).',
      if: { arg: 'useYearNavigation', eq: true },
    },
    calendarProps: {
      control: 'object',
      description:
        "Props tùy chỉnh cho component Calendar nội bộ. Lưu ý: 'mode', 'selected', 'onSelect', 'initialFocus', 'locale' được DatePicker quản lý. Nếu 'useYearNavigation' là true, 'captionLayout', 'fromYear', 'toYear' cũng sẽ do DatePicker quản lý và ghi đè các giá trị tương ứng trong calendarProps.",
    },
  },
  args: {
    onDateSelected: fn(),
    placeholder: 'Chọn ngày sinh',
    displayFormat: 'PPP',
    useYearNavigation: false,
    allowClear: false,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Component DatePicker cho phép người dùng chọn một ngày từ lịch. Tích hợp Popover và Calendar.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DatePicker>

const RenderDatePickerWithState = (args: Story['args']) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [date, setDate] = React.useState<Date | undefined>(
    args?.selectedDate instanceof Date ? args.selectedDate : undefined,
  )

  // Cập nhật state nếu selectedDate từ args thay đổi (ví dụ khi control trong Storybook thay đổi)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (args?.selectedDate instanceof Date) {
      setDate(args.selectedDate)
    } else if (
      args?.selectedDate === null ||
      args?.selectedDate === undefined
    ) {
      // Cho phép reset từ control của storybook
      setDate(undefined)
    }
  }, [args?.selectedDate])

  return (
    <div style={{ width: '300px' }}>
      <DatePicker
        {...args}
        selectedDate={date}
        onDateSelected={(newDate) => {
          setDate(newDate)
          args?.onDateSelected?.(newDate) // Gọi action của Storybook
        }}
      />
      <div className='mt-4 p-2 border rounded-md bg-gray-50 text-sm'>
        <p>Selected (State): {date ? date.toString() : 'Chưa chọn'}</p>
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

export const Default: Story = {
  name: '1. Mặc định',
  args: {
    placeholder: 'Chọn một ngày',
  },
  render: RenderDatePickerWithState,
}

export const WithInitialDate: Story = {
  name: '2. Có ngày chọn sẵn',
  args: {
    selectedDate: new Date(2024, 0, 15), // 15 tháng 1 năm 2024
    placeholder: 'Chọn một ngày',
  },
  render: RenderDatePickerWithState,
}

export const AllowClearDate: Story = {
  name: '3. Cho phép xóa ngày',
  args: {
    selectedDate: new Date(),
    allowClear: true,
    clearButtonLabel: 'Xóa lựa chọn',
  },
  render: RenderDatePickerWithState,
}

const currentYear = new Date().getFullYear()

export const DatePickerControlledYearNav: Story = {
  name: '4.1. Chọn Năm/Tháng (DatePicker Controlled)',
  args: {
    placeholder: 'Chọn ngày (DP Nav)',
    useYearNavigation: true,
    fromYear: currentYear - 5,
    toYear: currentYear + 5,
    selectedDate: new Date(currentYear, 5, 10), // Ngày 10 tháng 6 năm hiện tại
  },
  render: RenderDatePickerWithState,
}

export const CalendarPropsYearNav: Story = {
  name: '4.2. Chọn Năm/Tháng (CalendarProps Controlled)',
  args: {
    placeholder: 'Chọn ngày (CP Nav)',
    useYearNavigation: false, // DatePicker không kiểm soát
    calendarProps: {
      captionLayout: 'dropdown-buttons',
      fromYear: currentYear - 3,
      toYear: currentYear + 3,
    },
    selectedDate: new Date(currentYear, 7, 12),
  },
  render: RenderDatePickerWithState,
}

export const DatePickerOverridesCalendarPropsNav: Story = {
  name: '4.3. DP Nav Ghi đè CP Nav',
  args: {
    placeholder: 'Chọn ngày (DP overrides CP)',
    useYearNavigation: true, // DatePicker kiểm soát
    fromYear: currentYear - 7, // Sẽ được dùng
    toYear: currentYear + 2, // Sẽ được dùng
    calendarProps: {
      // Các giá trị này sẽ bị ghi đè bởi DatePicker
      captionLayout: 'buttons', // Sẽ bị đổi thành dropdown-buttons
      fromYear: currentYear - 1,
      toYear: currentYear + 1,
    },
    selectedDate: new Date(currentYear, 2, 22),
  },
  render: RenderDatePickerWithState,
}

export const Format_dd_MM_yyyy: Story = {
  name: '5.1. Định dạng dd/MM/yyyy',
  args: {
    selectedDate: new Date(2024, 4, 20),
    displayFormat: 'dd/MM/yyyy',
    placeholder: 'Chọn ngày (dd/MM/yyyy)',
  },
  render: RenderDatePickerWithState,
}

export const Format_yyyy_MM_dd: Story = {
  name: '5.2. Định dạng yyyy-MM-dd',
  args: {
    selectedDate: new Date(2024, 7, 5),
    displayFormat: 'yyyy-MM-dd',
    placeholder: 'Chọn ngày (yyyy-MM-dd)',
  },
  render: RenderDatePickerWithState,
}

export const Format_d_MMMM_yyyy: Story = {
  name: '5.3. Định dạng d MMMM yyyy',
  args: {
    selectedDate: new Date(2025, 0, 1),
    displayFormat: 'd MMMM yyyy',
    placeholder: 'Chọn ngày (d MMMM yyyy)',
  },
  render: RenderDatePickerWithState,
}

export const DisabledPastDates: Story = {
  name: '6. Vô hiệu hóa ngày quá khứ',
  args: {
    placeholder: 'Chọn ngày (không chọn quá khứ)',
    calendarProps: {
      disabled: (date) => date < new Date(new Date().setHours(0, 0, 0, 0)),
    },
    selectedDate: new Date(),
  },
  render: RenderDatePickerWithState,
}

export const YearNavWithAgeLimit: Story = {
  name: '7. Chọn Năm/Tháng + Giới hạn tuổi (>=18)',
  args: {
    placeholder: 'Chọn ngày sinh (ít nhất 18 tuổi)',
    useYearNavigation: true,
    fromYear: 1950,
    toYear: currentYear - 18,
    calendarProps: {
      disabled: (date) =>
        date > new Date(new Date().setFullYear(currentYear - 18)),
      // defaultMonth nên là một ngày trong khoảng fromYear và toYear
      defaultMonth: new Date(currentYear - 25, 0, 1), // Ví dụ: tháng 1 của 25 năm trước
    },
    // selectedDate nên là một ngày hợp lệ theo disabled và toYear
    selectedDate: new Date(currentYear - 20, 5, 15), // Ví dụ: 20 tuổi
  },
  render: RenderDatePickerWithState,
}

export const CustomCalendarStyling: Story = {
  name: '8. Tùy chỉnh style Calendar (qua calendarProps)',
  args: {
    placeholder: 'Chọn ngày (Calendar tùy chỉnh)',
    calendarProps: {
      // Ví dụ: thêm class cho ngày được chọn
      classNames: {
        day_selected: 'bg-green-500 text-white rounded-full',
        caption_label: 'text-lg text-blue-700 font-bold',
      },
      styles: {
        // Ví dụ: style inline cho caption
        caption: {
          color: 'purple',
          borderBottom: '2px solid purple',
          paddingBottom: '8px',
        },
      },
    },
    selectedDate: new Date(),
  },
  render: RenderDatePickerWithState,
}
