import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { vi } from 'date-fns/locale'
import { SupportedDateDisplayFormat } from '../date-picker-common/types'
import { DatePicker } from './datePicker'

/**
 * DatePicker là một component chọn ngày đơn với giao diện lịch hiện đại.
 *
 * ## Tính năng chính:
 * - **Chọn ngày đơn**: Chọn một ngày cụ thể
 * - **Định dạng linh hoạt**: Hỗ trợ nhiều định dạng ngày khác nhau
 * - **Validation**: Hỗ trợ minDate, maxDate để giới hạn ngày chọn
 * - **Localization**: Hỗ trợ đa ngôn ngữ thông qua date-fns locale
 * - **Read-only input**: Input chỉ đọc, tránh validation phức tạp
 * - **Responsive**: Tương thích với mobile và desktop
 *
 * ## Cách sử dụng:
 * ```tsx
 * <DatePicker
 *   label="Ngày sinh"
 *   value={selectedDate}
 *   onChange={(date) => setSelectedDate(date)}
 *   dateFormat="dd/MM/yyyy"
 *   required
 * />
 * ```
 */
const meta: Meta<typeof DatePicker> = {
  title: 'Organisms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DatePicker component cung cấp một giao diện trực quan để chọn ngày tháng. Component sử dụng Popover để hiển thị lịch và hỗ trợ nhiều định dạng ngày khác nhau.

### Các định dạng ngày được hỗ trợ:
- \`PPP\`: Định dạng đầy đủ (ví dụ: "April 29th, 2023")
- \`dd/MM/yyyy\`: Định dạng Việt Nam (ví dụ: "29/04/2023")
- \`MM/dd/yyyy\`: Định dạng Mỹ (ví dụ: "04/29/2023")
- \`yyyy-MM-dd\`: Định dạng ISO (ví dụ: "2023-04-29")
- \`dd MMM yy\`: Định dạng ngắn (ví dụ: "29 Apr 23")
- \`d MMMM yyyy\`: Định dạng dài (ví dụ: "29 April 2023")

### Accessibility:
- Hỗ trợ keyboard navigation
- ARIA labels đầy đủ
- Focus management tốt
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Giá trị ngày được chọn',
      control: { type: 'date' },
    },
    onChange: {
      description: 'Callback được gọi khi ngày được chọn thay đổi',
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
    label: 'Chọn ngày',
    placeholder: 'dd/MM/yyyy',
    onChange: action('date-changed'),
  },
}

/**
 * DatePicker với giá trị mặc định và định dạng Việt Nam
 */
export const WithDefaultValue: Story = {
  args: {
    label: 'Ngày sinh',
    value: new Date('2023-04-29'),
    dateFormat: 'dd/MM/yyyy',
    onChange: action('date-changed'),
  },
}

/**
 * DatePicker với các định dạng ngày khác nhau
 */
export const DifferentFormats: Story = {
  render: () => (
    <div className='space-y-4 w-80'>
      <DatePicker
        label='Định dạng PPP'
        dateFormat='PPP'
        value={new Date('2023-04-29')}
        onChange={action('ppp-changed')}
      />
      <DatePicker
        label='Định dạng dd/MM/yyyy'
        dateFormat='dd/MM/yyyy'
        value={new Date('2023-04-29')}
        onChange={action('ddmmyyyy-changed')}
      />
      <DatePicker
        label='Định dạng MM/dd/yyyy'
        dateFormat='MM/dd/yyyy'
        value={new Date('2023-04-29')}
        onChange={action('mmddyyyy-changed')}
      />
      <DatePicker
        label='Định dạng yyyy-MM-dd'
        dateFormat='yyyy-MM-dd'
        value={new Date('2023-04-29')}
        onChange={action('iso-changed')}
      />
      <DatePicker
        label='Định dạng dd MMM yy'
        dateFormat='dd MMM yy'
        value={new Date('2023-04-29')}
        onChange={action('short-changed')}
      />
      <DatePicker
        label='Định dạng d MMMM yyyy'
        dateFormat='d MMMM yyyy'
        value={new Date('2023-04-29')}
        onChange={action('long-changed')}
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
 * DatePicker với giới hạn ngày (minDate và maxDate)
 */
export const WithDateLimits: Story = {
  args: {
    label: 'Chọn ngày (chỉ tháng hiện tại)',
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    dateFormat: 'dd/MM/yyyy',
    onChange: action('limited-date-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DatePicker với giới hạn ngày. Chỉ có thể chọn ngày trong tháng hiện tại.',
      },
    },
  },
}

/**
 * DatePicker bắt buộc với validation
 */
export const Required: Story = {
  args: {
    label: 'Ngày bắt buộc',
    required: true,
    error: 'Vui lòng chọn ngày',
    dateFormat: 'dd/MM/yyyy',
    onChange: action('required-date-changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker với trường bắt buộc và hiển thị lỗi validation.',
      },
    },
  },
}

/**
 * DatePicker bị vô hiệu hóa
 */
export const Disabled: Story = {
  args: {
    label: 'Ngày không thể chỉnh sửa',
    value: new Date('2023-04-29'),
    disabled: true,
    dateFormat: 'dd/MM/yyyy',
    onChange: action('disabled-date-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DatePicker trong trạng thái disabled. Người dùng không thể tương tác.',
      },
    },
  },
}

/**
 * DatePicker với navigation năm/tháng
 */
export const WithYearNavigation: Story = {
  args: {
    label: 'Với dropdown năm/tháng',
    useYearNavigation: true,
    dateFormat: 'dd/MM/yyyy',
    onChange: action('year-nav-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DatePicker với dropdown để chọn năm và tháng, hữu ích khi cần chọn ngày xa.',
      },
    },
  },
}

/**
 * DatePicker với locale tiếng Việt
 */
export const VietnameseLocale: Story = {
  args: {
    label: 'Lịch tiếng Việt',
    locale: vi,
    dateFormat: 'd MMMM yyyy',
    value: new Date('2023-04-29'),
    onChange: action('vietnamese-date-changed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'DatePicker sử dụng locale tiếng Việt với tên tháng và ngày trong tuần bằng tiếng Việt.',
      },
    },
  },
}
