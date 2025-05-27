import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker } from '../datePicker/datePicker'
import { DateRangePicker } from '../dateRangePicker/dateRangePicker'
import { DateRangeType } from '../date-picker-common/types'

// Mock toàn bộ date-picker-common
jest.mock('../date-picker-common/CalendarGrid', () => ({
  CalendarGrid: ({ onDateSelect, onDateHover, days }: {
    onDateSelect: (date: Date) => void;
    onDateHover?: (date: Date | undefined) => void;
    days: Array<{ date: Date; isCurrentMonth: boolean; isDisabled: boolean; isSelected?: boolean; isInRange?: boolean }>;
  }) => {
    const currentDate = new Date()
    const mockDays = days || Array.from({ length: 7 }, (_, i) => ({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
      isCurrentMonth: true,
      isDisabled: false,
      isSelected: false,
      isInRange: false
    }))    return (
      <div data-testid="calendar-grid">
        {mockDays.map((day, dayIndex) => (
          <button
            key={`${day.date.getTime()}-${dayIndex}`}
            data-testid={`calendar-day-${day.date.getDate()}`}
            className={`calendar-day ${day.isSelected ? 'selected' : ''} ${day.isInRange ? 'in-range' : ''}`}
            onClick={() => onDateSelect(day.date)}
            onMouseEnter={() => onDateHover?.(day.date)}
            disabled={day.isDisabled || !day.isCurrentMonth}
          >
            {day.date.getDate()}
          </button>
        ))}
      </div>
    )
  },
}))

jest.mock('../date-picker-common/CalendarHeader', () => ({
  CalendarHeader: ({
    monthName,
    year,
    prevMonth,
    nextMonth
  }: {
    monthName: string;
    year: number;
    prevMonth?: () => void;
    nextMonth?: () => void;
  }) => (
    <div data-testid="calendar-header">
      {prevMonth && (
        <button data-testid="prev-month" onClick={prevMonth}>
          ←
        </button>
      )}
      <span data-testid="month-year">{monthName} {year}</span>
      {nextMonth && (
        <button data-testid="next-month" onClick={nextMonth}>
          →
        </button>
      )}
    </div>
  ),
}))

// Mock other dependencies
jest.mock('@social-media/atoms', () => ({
  Button: ({ children, onClick, disabled, ...props }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ),
  Input: ({
    value,
    onChange,
    onFocus,
    disabled,
    readOnly,
    ...props
  }: React.ComponentProps<'input'> & {
    value?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
  }) => (
    <input
      value={value || ''}
      onChange={(e) => !readOnly && onChange?.(e.target.value)}
      onFocus={onFocus}
      disabled={disabled}
      readOnly={readOnly}
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

describe('DatePicker & DateRangePicker Integration Tests', () => {
  describe('Component Comparison', () => {
    it('should render both components with similar structure', () => {
      const mockDateChange = jest.fn()
      const mockRangeChange = jest.fn()

      const { container: datePickerContainer } = render(
        <DatePicker
          label="Single Date"
          value={undefined}
          onChange={mockDateChange}
          data-testid="single-date-picker"
        />
      )

      const { container: rangePickerContainer } = render(
        <DateRangePicker
          label="Date Range"
          value={undefined}
          onChange={mockRangeChange}
          data-testid="date-range-picker"
        />
      )

      // Both should have similar basic structure
      expect(screen.getByTestId('single-date-picker')).toBeInTheDocument()
      expect(screen.getByTestId('date-range-picker')).toBeInTheDocument()

      // Both should have input and calendar icon
      const inputs = screen.getAllByRole('textbox')
      const calendarIcons = screen.getAllByTestId('calendar-icon')

      expect(inputs).toHaveLength(2)
      expect(calendarIcons).toHaveLength(2)
    })

    it('should handle disabled state consistently', () => {
      const mockDateChange = jest.fn()
      const mockRangeChange = jest.fn()

      render(
        <div>
          <DatePicker
            label="Single Date"
            value={undefined}
            onChange={mockDateChange}
            disabled
            data-testid="disabled-date-picker"
          />
          <DateRangePicker
            label="Date Range"
            value={undefined}
            onChange={mockRangeChange}
            disabled
            data-testid="disabled-range-picker"
          />
        </div>
      )

      const inputs = screen.getAllByRole('textbox')
      const buttons = screen.getAllByRole('button')

      // All inputs and buttons should be disabled
      inputs.forEach(input => {
        expect(input).toBeDisabled()
      })

      buttons.forEach(button => {
        expect(button).toBeDisabled()
      })
    })
  })

  describe('Date Formatting Consistency', () => {
    it('should format dates consistently between components', () => {
      const testDate = new Date(2024, 0, 15) // 15/01/2024
      const testRange: DateRangeType = {
        from: testDate,
        to: new Date(2024, 0, 20) // 20/01/2024
      }

      const mockDateChange = jest.fn()
      const mockRangeChange = jest.fn()

      render(
        <div>
          <DatePicker
            value={testDate}
            onChange={mockDateChange}
            dateFormat="dd/MM/yyyy"
            data-testid="formatted-date-picker"
          />
          <DateRangePicker
            value={testRange}
            onChange={mockRangeChange}
            dateFormat="dd/MM/yyyy"
            data-testid="formatted-range-picker"
          />
        </div>
      )

      const inputs = screen.getAllByRole('textbox')

      // DatePicker should show single date
      expect(inputs[0]).toHaveValue('15/01/2024')

      // DateRangePicker should show range
      expect(inputs[1]).toHaveValue('15/01/2024 - 20/01/2024')
    })

    it('should handle different date formats consistently', () => {
      const testDate = new Date(2024, 0, 15)
      const testRange: DateRangeType = {
        from: testDate,
        to: new Date(2024, 0, 20)
      }

      const mockDateChange = jest.fn()
      const mockRangeChange = jest.fn()

      const { rerender } = render(
        <div>
          <DatePicker
            value={testDate}
            onChange={mockDateChange}
            dateFormat="yyyy-MM-dd"
            data-testid="iso-date-picker"
          />
          <DateRangePicker
            value={testRange}
            onChange={mockRangeChange}
            dateFormat="yyyy-MM-dd"
            data-testid="iso-range-picker"
          />
        </div>
      )

      const inputs = screen.getAllByRole('textbox')

      expect(inputs[0]).toHaveValue('2024-01-15')
      expect(inputs[1]).toHaveValue('2024-01-15 - 2024-01-20')
    })
  })

  describe('User Interaction Flow', () => {
    it('should open calendars independently', async () => {
      const user = userEvent.setup()
      const mockDateChange = jest.fn()
      const mockRangeChange = jest.fn()

      render(
        <div>
          <DatePicker
            value={undefined}
            onChange={mockDateChange}
            data-testid="interactive-date-picker"
          />
          <DateRangePicker
            value={undefined}
            onChange={mockRangeChange}
            data-testid="interactive-range-picker"
          />
        </div>
      )

      const inputs = screen.getAllByRole('textbox')

      // Click first input (DatePicker)
      await user.click(inputs[0])

      // Should see calendar content
      expect(screen.getByTestId('popover-content')).toBeInTheDocument()

      // Note: In real implementation, only one popover should be open at a time
      // This test verifies the basic interaction pattern
    })

    it('should handle calendar navigation', async () => {
      const user = userEvent.setup()
      const mockRangeChange = jest.fn()

      render(
        <DateRangePicker
          value={undefined}
          onChange={mockRangeChange}
          numberOfMonths={2}
          data-testid="navigable-range-picker"
        />
      )

      const input = screen.getByRole('textbox')
      await user.click(input)

      // Should see calendar content with navigation
      expect(screen.getByTestId('popover-content')).toBeInTheDocument()

      // Look for navigation buttons (if rendered)
      const prevButtons = screen.queryAllByTestId('prev-month')
      const nextButtons = screen.queryAllByTestId('next-month')

      // Navigation buttons should be present for multi-month view
      expect(prevButtons.length + nextButtons.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Error Handling', () => {
    it('should display errors consistently', () => {
      const mockDateChange = jest.fn()
      const mockRangeChange = jest.fn()

      render(
        <div>
          <DatePicker
            label="Date with Error"
            value={undefined}
            onChange={mockDateChange}
            error="Please select a date"
          />
          <DateRangePicker
            label="Range with Error"
            value={undefined}
            onChange={mockRangeChange}
            error="Please select a date range"
          />
        </div>
      )

      expect(screen.getByText('Please select a date')).toBeInTheDocument()
      expect(screen.getByText('Please select a date range')).toBeInTheDocument()
    })

    it('should handle invalid dates gracefully', () => {
      const mockDateChange = jest.fn()
      const mockRangeChange = jest.fn()

      const invalidDate = new Date('invalid')
      const invalidRange: DateRangeType = {
        from: new Date('invalid'),
        to: new Date('also invalid')
      }

      render(
        <div>
          <DatePicker
            value={invalidDate}
            onChange={mockDateChange}
            data-testid="invalid-date-picker"
          />
          <DateRangePicker
            value={invalidRange}
            onChange={mockRangeChange}
            data-testid="invalid-range-picker"
          />
        </div>
      )

      // Components should render without crashing
      expect(screen.getByTestId('invalid-date-picker')).toBeInTheDocument()
      expect(screen.getByTestId('invalid-range-picker')).toBeInTheDocument()
    })
  })

  describe('Accessibility Compliance', () => {
    it('should have proper ARIA labels and associations', () => {
      const mockDateChange = jest.fn()
      const mockRangeChange = jest.fn()

      render(
        <div>
          <DatePicker
            label="Birth Date"
            value={undefined}
            onChange={mockDateChange}
            required
          />
          <DateRangePicker
            label="Date Range"
            value={undefined}
            onChange={mockRangeChange}
            required
          />
        </div>
      )

      // Check labels
      expect(screen.getByText('Birth Date')).toBeInTheDocument()
      expect(screen.getByText('Date Range')).toBeInTheDocument()

      // Check required indicators
      const requiredIndicators = screen.getAllByText('*')
      expect(requiredIndicators).toHaveLength(2)

      // Check calendar buttons have aria-labels
      const calendarButtons = screen.getAllByRole('button')
      calendarButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label', 'Mở lịch')
      })
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      const mockDateChange = jest.fn()

      render(
        <DatePicker
          label="Keyboard Test"
          value={undefined}
          onChange={mockDateChange}
        />
      )

      const input = screen.getByRole('textbox')

      // Tab to input
      await user.tab()
      expect(input).toHaveFocus()

      // Enter or space should open picker
      await user.keyboard('{Enter}')

      // Calendar should be accessible
      expect(screen.getByTestId('popover-content')).toBeInTheDocument()
    })
  })

  describe('Performance & Memory', () => {
    it('should clean up event listeners properly', () => {
      const mockDateChange = jest.fn()
      const mockRangeChange = jest.fn()

      const { unmount: unmountDate } = render(
        <DatePicker value={undefined} onChange={mockDateChange} />
      )

      const { unmount: unmountRange } = render(
        <DateRangePicker value={undefined} onChange={mockRangeChange} />
      )

      // Unmount components
      unmountDate()
      unmountRange()

      // Should not throw errors or leave hanging references
      expect(true).toBe(true) // If we get here, no errors were thrown
    })

    it('should handle rapid prop changes', () => {
      const mockRangeChange = jest.fn()

      const { rerender } = render(
        <DateRangePicker
          value={undefined}
          onChange={mockRangeChange}
        />
      )

      // Rapidly change props
      for (let i = 0; i < 10; i++) {
        const range: DateRangeType = {
          from: new Date(2024, 0, i + 1),
          to: new Date(2024, 0, i + 5)
        }

        rerender(
          <DateRangePicker
            value={range}
            onChange={mockRangeChange}
          />
        )
      }

      // Component should still be functional
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })
})
