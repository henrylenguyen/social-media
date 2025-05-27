import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { vi } from 'date-fns/locale'
import { SupportedDateDisplayFormat } from '../date-picker-common/types'
import { DateRangePicker } from './dateRangePicker'

/**
 * DateRangePicker là một component chọn khoảng ngày với giao diện lịch hiện đại.
 *
 * ## Tính năng chính:
 * - **Chọn khoảng ngày**: Chọn ngày bắt đầu và ngày kết thúc
 * - **Hiển thị 2 tháng**: Dễ dàng chọn khoảng ngày qua nhiều tháng
 * - **Định dạng linh hoạt**: Hỗ trợ nhiều định dạng ngày khác nhau
 * - **Validation**: Hỗ trợ minDate, maxDate để giới hạn ngày chọn
 * - **Localization**: Hỗ trợ đa ngôn ngữ thông qua date-fns locale
 * - **Read-only input**: Input chỉ đọc, tránh validation phức tạp
 * - **Hover effect**: Hiển thị preview khoảng ngày khi hover
 * - **Responsive**: Tương thích với mobile và desktop
 *
 * ## Cách sử dụng:
 * ```tsx
 * <DateRangePicker
 *   label="Khoảng thời gian"
 *   value={{ from: startDate, to: endDate }}
 *   onChange={(range) => setDateRange(range)}
 *   dateFormat="dd/MM/yyyy"
 *   numberOfMonths={2}
 * />
 * ```
 */
const meta: Meta<typeof DateRangePicker> = {
  title: 'Organisms/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DateRangePicker component cung cấp một giao diện trực quan để chọn khoảng ngày tháng. Component hiển thị hai tháng cạnh nhau để dễ dàng chọn ngày bắt đầu và kết thúc.

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
      description: 'Số tháng hiển thị cạnh nhau (mặc định là 2)',
      control: { type: 'number', min: 1, max: 3 },
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
    useYearNavigation: {
      description: 'Hiển thị dropdown chọn năm/tháng thay vì chỉ hiển thị tên',
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Ví dụ cơ bản với tất cả các tính năng mặc định
 */
export const Default: Story = {
  args: {
    label: 'Chọn khoảng ngày',
    placeholder: 'dd/MM/yyyy - dd/MM/yyyy',
    onChange: action('date-range-changed'),
  },
}

/**
 * DateRangePicker với giá trị mặc định
 */
export const WithDefaultValue: Story = {
  args: {
    label: 'Kỳ nghỉ',
    value: {
      from: new Date('2023-04-15'),
      to: new Date('2023-04-29'),
    },
    dateFormat: 'dd/MM/yyyy',
    onChange: action('vacation-range-changed'),
  },
}

/**
 * DateRangePicker với các định dạng ngày khác nhau
 */
export const DifferentFormats: Story = {
  render: () => (
    <div className='space-y-6 w-full max-w-4xl'>
      <DateRangePicker
        label='Định dạng PPP'
        dateFormat='PPP'
        value={{
          from: new Date('2023-04-15'),
          to: new Date('2023-04-29'),
        }}
        onChange={action('ppp-changed')}
      />
      <DateRangePicker
        label='Định dạng dd/MM/yyyy'
        dateFormat='dd/MM/yyyy'
        value={{
          from: new Date('2023-04-15'),
          to: new Date('2023-04-29'),
        }}
        onChange={action('ddmmyyyy-changed')}
      />
      <DateRangePicker
        label='Định dạng yyyy-MM-dd'
        dateFormat='yyyy-MM-dd'
        value={{
          from: new Date('2023-04-15'),
          to: new Date('2023-04-29'),
        }}
        onChange={action('iso-changed')}
      />
      <DateRangePicker
        label='Định dạng dd MMM yy'
        dateFormat='dd MMM yy'
        value={{
          from: new Date('2023-04-15'),
          to: new Date('2023-04-29'),
        }}
        onChange={action('short-changed')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Hiển thị các định dạng ngày khác nhau được hỗ trợ bởi component.',
      },
    },
  },
}

/**
 * DateRangePicker hiển thị 1 tháng
 */
export const SingleMonth: Story = {
  args: {
    label: 'Chọn khoảng ngày (1 tháng)',
    numberOfMonths: 1,
    dateFormat: 'dd/MM/yyyy',
    onChange: action('single-month-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DateRangePicker hiển thị chỉ một tháng, phù hợp cho màn hình nhỏ hoặc không gian hạn chế.',
      },
    },
  },
}

/**
 * DateRangePicker với giới hạn ngày
 */
export const WithDateLimits: Story = {
  args: {
    label: 'Chọn khoảng ngày (3 tháng tới)',
    minDate: new Date(),
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    dateFormat: 'dd/MM/yyyy',
    onChange: action('limited-range-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DateRangePicker với giới hạn ngày. Chỉ có thể chọn ngày trong vòng 3 tháng tới.',
      },
    },
  },
}

/**
 * DateRangePicker bắt buộc với validation
 */
export const Required: Story = {
  args: {
    label: 'Khoảng ngày bắt buộc',
    required: true,
    error: 'Vui lòng chọn khoảng ngày',
    dateFormat: 'dd/MM/yyyy',
    onChange: action('required-range-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DateRangePicker với trường bắt buộc và hiển thị lỗi validation.',
      },
    },
  },
}

/**
 * DateRangePicker bị vô hiệu hóa
 */
export const Disabled: Story = {
  args: {
    label: 'Khoảng ngày không thể chỉnh sửa',
    value: {
      from: new Date('2023-04-15'),
      to: new Date('2023-04-29'),
    },
    disabled: true,
    dateFormat: 'dd/MM/yyyy',
    onChange: action('disabled-range-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DateRangePicker trong trạng thái disabled. Người dùng không thể tương tác.',
      },
    },
  },
}

/**
 * DateRangePicker với navigation năm/tháng
 */
export const WithYearNavigation: Story = {
  args: {
    label: 'Với dropdown năm/tháng',
    useYearNavigation: true,
    dateFormat: 'dd/MM/yyyy',
    onChange: action('year-nav-range-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DateRangePicker với dropdown để chọn năm và tháng, hữu ích khi cần chọn ngày xa.',
      },
    },
  },
}

/**
 * DateRangePicker với locale tiếng Việt
 */
export const VietnameseLocale: Story = {
  args: {
    label: 'Lịch tiếng Việt',
    locale: vi,
    dateFormat: 'd MMMM yyyy',
    value: {
      from: new Date('2023-04-15'),
      to: new Date('2023-04-29'),
    },
    onChange: action('vietnamese-range-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DateRangePicker sử dụng locale tiếng Việt với tên tháng và ngày trong tuần bằng tiếng Việt.',
      },
    },
  },
}

/**
 * Use case thực tế: Booking khách sạn
 */
export const HotelBooking: Story = {
  args: {
    label: 'Chọn ngày nhận phòng và trả phòng',
    placeholder: 'Ngày nhận phòng - Ngày trả phòng',
    minDate: new Date(),
    dateFormat: 'dd/MM/yyyy',
    onChange: action('hotel-booking-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ví dụ sử dụng thực tế cho booking khách sạn với giới hạn không thể chọn ngày trong quá khứ.',
      },
    },
  },
}

/**
 * Use case thực tế: Báo cáo thống kê
 */
export const ReportPeriod: Story = {
  args: {
    label: 'Chọn kỳ báo cáo',
    placeholder: 'Từ ngày - Đến ngày',
    value: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
    maxDate: new Date(),
    dateFormat: 'dd/MM/yyyy',
    useYearNavigation: true,
    onChange: action('report-period-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ví dụ sử dụng cho chọn kỳ báo cáo thống kê với giá trị mặc định 30 ngày gần nhất.',
      },
    },
  },
}

