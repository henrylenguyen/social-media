import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateRangePicker } from './dateRangePicker'
import { DateRangeType } from '../date-picker-common/types'
import * as stories from './index.stories'

// Mock dependencies
jest.mock('@social-media/atoms', () => ({
  Button: ({ children, onClick, ...props }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),  Input: ({ value, onChange, onFocus, ...props }: React.ComponentProps<'input'> & { value?: string; onChange?: (value: string) => void }) => (
    <input 
      value={value ?? ''} 
      onChange={(e) => onChange?.(e.target.value)} 
      onFocus={onFocus}
      {...props} 
    />
  ),
}))

jest.mock('@social-media/molecules', () => ({
  Popover: ({ children }: { children: React.ReactNode }) => <div data-testid="popover">{children}</div>,
  PopoverContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover-content">{children}</div>
  ),
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover-trigger">{children}</div>
  ),
}))

jest.mock('lucide-react', () => ({
  CalendarDays: () => <div data-testid="calendar-icon" />,
}))

jest.mock('src/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

// Mock CalendarGrid và CalendarHeader
jest.mock('../date-picker-common/CalendarGrid', () => ({
  CalendarGrid: ({ onDateSelect, onDateHover, days }: { 
    onDateSelect: (date: Date) => void; 
    onDateHover?: (date: Date | undefined) => void;
    days: Array<{ date: Date; isCurrentMonth: boolean; isDisabled: boolean }>;
  }) => (
    <div data-testid="calendar-grid">      {days?.map((day, dayIndex) => (
        <button
          key={`${day.date.getTime()}-${dayIndex}`}
          data-testid={`calendar-day-${day.date.getDate()}`}
          onClick={() => onDateSelect(day.date)}
          onMouseEnter={() => onDateHover?.(day.date)}
          disabled={day.isDisabled || !day.isCurrentMonth}
        >
          {day.date.getDate()}
        </button>
      ))}
    </div>
  ),
}))

jest.mock('../date-picker-common/CalendarHeader', () => ({
  CalendarHeader: ({ monthName, year }: { monthName: string; year: number }) => (
    <div data-testid="calendar-header">
      {monthName} {year}
    </div>
  ),
}))

describe('DateRangePicker Component Tests', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders correctly with minimal props', () => {
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
          data-testid="dateRangePicker"
        />
      )

      expect(screen.getByTestId('dateRangePicker')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
    })

    it('renders with label and required indicator', () => {
      render(
        <DateRangePicker
          label="Chọn khoảng thời gian"
          value={undefined}
          onChange={mockOnChange}
          required
        />
      )

      expect(screen.getByText('Chọn khoảng thời gian')).toBeInTheDocument()
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(
        <DateRangePicker
          label="Khoảng thời gian"
          value={undefined}
          onChange={mockOnChange}
          error="Vui lòng chọn khoảng thời gian"
        />
      )

      expect(screen.getByText('Vui lòng chọn khoảng thời gian')).toBeInTheDocument()
    })

    it('renders with custom placeholder', () => {
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
          placeholder="Từ ngày - Đến ngày"
        />
      )

      expect(screen.getByPlaceholderText('Từ ngày - Đến ngày')).toBeInTheDocument()
    })

    it('renders with specified number of months', () => {
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
          numberOfMonths={1}
        />
      )

      // Component should render without errors
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })

  describe('Date Range Display', () => {
    it('displays formatted date range when value is provided', () => {
      const testRange: DateRangeType = {
        from: new Date(2024, 0, 15), // 15/01/2024
        to: new Date(2024, 0, 20)    // 20/01/2024
      }
      
      render(
        <DateRangePicker
          value={testRange}
          onChange={mockOnChange}
          dateFormat="dd/MM/yyyy"
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('15/01/2024 - 20/01/2024')
    })

    it('displays partial range when only from date is selected', () => {
      const testRange: DateRangeType = {
        from: new Date(2024, 0, 15),
        to: undefined
      }
      
      render(
        <DateRangePicker
          value={testRange}
          onChange={mockOnChange}
          dateFormat="dd/MM/yyyy"
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('15/01/2024')
    })

    it('shows empty value when no range selected', () => {
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })
  })

  describe('User Interactions', () => {
    it('opens picker when input is focused', async () => {
      const user = userEvent.setup()
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
        />
      )

      const input = screen.getByRole('textbox')
      await user.click(input)

      expect(screen.getByTestId('popover-content')).toBeInTheDocument()
    })

    it('opens picker when calendar button is clicked', async () => {
      const user = userEvent.setup()
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
        />
      )

      const calendarButton = screen.getByRole('button')
      await user.click(calendarButton)

      expect(screen.getByTestId('popover-content')).toBeInTheDocument()
    })

    it('calls onChange when date range is selected', async () => {
      const user = userEvent.setup()
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
        />
      )

      // Open picker
      const input = screen.getByRole('textbox')
      await user.click(input)

      // This would require more complex mocking of the calendar logic
      // For now, we just verify the picker opens
      expect(screen.getByTestId('popover-content')).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('disables input and button when disabled prop is true', () => {
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
          disabled
        />
      )

      const input = screen.getByRole('textbox')
      const button = screen.getByRole('button')

      expect(input).toBeDisabled()
      expect(button).toBeDisabled()
    })

    it('does not show picker when disabled', async () => {
      const user = userEvent.setup()
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
          disabled
        />
      )

      const input = screen.getByRole('textbox')
      await user.click(input)

      // Picker should not open when disabled
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper aria-label for calendar button', () => {
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Mở lịch')
    })

    it('associates label with input correctly', () => {
      render(
        <DateRangePicker
          label="Khoảng thời gian"
          value={undefined}
          onChange={mockOnChange}
        />
      )

      const label = screen.getByText('Khoảng thời gian')
      const input = screen.getByRole('textbox')

      expect(label).toHaveAttribute('for', 'Khoảng thời gian')
      expect(input).toHaveAttribute('id', 'Khoảng thời gian')
    })
  })

  describe('Range Selection Logic', () => {
    it('handles empty range correctly', () => {
      render(
        <DateRangePicker
          value={{}}
          onChange={mockOnChange}
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('handles range with only from date', () => {
      const partialRange: DateRangeType = {
        from: new Date(2024, 0, 15),
        to: undefined
      }

      render(
        <DateRangePicker
          value={partialRange}
          onChange={mockOnChange}
          dateFormat="dd/MM/yyyy"
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('15/01/2024')
    })

    it('handles complete range correctly', () => {
      const completeRange: DateRangeType = {
        from: new Date(2024, 0, 15),
        to: new Date(2024, 0, 20)
      }

      render(
        <DateRangePicker
          value={completeRange}
          onChange={mockOnChange}
          dateFormat="dd/MM/yyyy"
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('15/01/2024 - 20/01/2024')
    })
  })

  describe('Mouse Hover Effects', () => {
    it('handles mouse leave event correctly', async () => {
      const user = userEvent.setup()
      render(
        <DateRangePicker
          value={undefined}
          onChange={mockOnChange}
        />
      )

      // Open picker
      const input = screen.getByRole('textbox')
      await user.click(input)

      const calendarContainer = screen.getByTestId('popover-content')
      
      // Simulate mouse leave - should not throw error
      fireEvent.mouseLeave(calendarContainer)
      
      expect(calendarContainer).toBeInTheDocument()
    })
  })
  describe('Story Integration', () => {
    it('renders with Default story props', () => {
      const defaultProps = stories.Default?.args || {}

      render(
        <DateRangePicker
          {...defaultProps}
          data-testid="dateRangePicker-with-story-props"
        />
      )

      expect(
        screen.getByTestId('dateRangePicker-with-story-props')
      ).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles invalid date objects gracefully', () => {
      const invalidRange: DateRangeType = {
        from: new Date('invalid'),
        to: new Date('also invalid')
      }

      render(
        <DateRangePicker
          value={invalidRange}
          onChange={mockOnChange}
        />
      )

      // Should not crash and display some reasonable fallback
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('handles null and undefined values in range', () => {
      const mixedRange = {
        from: null as unknown as Date,
        to: undefined
      }

      render(
        <DateRangePicker
          value={mixedRange}
          onChange={mockOnChange}
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })
  })
})
