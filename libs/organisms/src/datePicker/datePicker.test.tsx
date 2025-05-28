import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker } from './datePicker'

// Mock dependencies
jest.mock('@social-media/atoms', () => ({
  Button: ({ children, onClick, ...props }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Input: ({
    value,
    onChange,
    onFocus,
    ...props
  }: React.ComponentProps<'input'> & {
    value?: string
    onChange?: (value: string) => void
  }) => (
    <input
      value={value ?? ''}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={onFocus}
      {...props}
    />
  ),
}))

jest.mock('@social-media/molecules', () => ({
  Popover: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='popover'>{children}</div>
  ),
  PopoverContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='popover-content'>{children}</div>
  ),
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='popover-trigger'>{children}</div>
  ),
}))

jest.mock('lucide-react', () => ({
  CalendarDays: () => <span data-testid='calendar-icon'>📅</span>,
}))

jest.mock('src/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

// Mock CalendarGrid và CalendarHeader
jest.mock('../date-picker-common/CalendarGrid', () => ({
  CalendarGrid: ({
    onDateSelect,
    days,
  }: {
    onDateSelect: (date: Date) => void
    days: Array<{ date: Date; isCurrentMonth: boolean; isDisabled: boolean }>
  }) => (
    <div data-testid='calendar-grid'>
      {days?.map((day, dayIndex) => (
        <button
          key={`${day.date.getTime()}-${dayIndex}`}
          data-testid={`calendar-day-${day.date.getDate()}`}
          onClick={() => onDateSelect(day.date)}
          disabled={day.isDisabled || !day.isCurrentMonth}
        >
          {day.date.getDate()}
        </button>
      ))}
    </div>
  ),
}))

jest.mock('../date-picker-common/CalendarHeader', () => ({
  CalendarHeader: ({
    monthName,
    year,
  }: {
    monthName: string
    year: number
  }) => (
    <div data-testid='calendar-header'>
      {monthName} {year}
    </div>
  ),
}))

describe('DatePicker', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<DatePicker onChange={mockOnChange} />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<DatePicker label='Select Date' onChange={mockOnChange} />)
      expect(screen.getByText('Select Date')).toBeInTheDocument()
    })

    it('renders with placeholder', () => {
      render(
        <DatePicker placeholder='Pick a date' onChange={mockOnChange} />,
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', 'Pick a date')
    })

    it('renders with error message', () => {
      render(
        <DatePicker error='Please select a date' onChange={mockOnChange} />,
      )
      expect(screen.getByText('Please select a date')).toBeInTheDocument()
    })

    it('renders as required', () => {
      render(<DatePicker required onChange={mockOnChange} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('required')
    })

    it('renders as disabled', () => {
      render(<DatePicker disabled onChange={mockOnChange} />)
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })
  })

  describe('Value Display', () => {
    it('displays empty input when no value is provided', () => {
      render(<DatePicker onChange={mockOnChange} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('displays formatted date when value is provided', () => {
      const testDate = new Date('2024-01-15')

      render(
        <DatePicker
          value={testDate}
          onChange={mockOnChange}
          dateFormat='dd/MM/yyyy'
        />,
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('15/01/2024')
    })
  })

  describe('Date Format Support', () => {
    const testDate = new Date('2024-01-15')

    it('formats dates with dd/MM/yyyy format', () => {
      render(
        <DatePicker
          value={testDate}
          onChange={mockOnChange}
          dateFormat='dd/MM/yyyy'
        />,
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('15/01/2024')
    })

    it('formats dates with MM/dd/yyyy format', () => {
      render(
        <DatePicker
          value={testDate}
          onChange={mockOnChange}
          dateFormat='MM/dd/yyyy'
        />,
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('01/15/2024')
    })

    it('formats dates with yyyy-MM-dd format', () => {
      render(
        <DatePicker
          value={testDate}
          onChange={mockOnChange}
          dateFormat='yyyy-MM-dd'
        />,
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('2024-01-15')
    })
  })

  describe('User Interactions', () => {
    it('opens calendar when input is clicked', async () => {
      const user = userEvent.setup()
      render(<DatePicker onChange={mockOnChange} />)

      const input = screen.getByRole('textbox')
      await user.click(input)

      expect(screen.getByTestId('popover-content')).toBeInTheDocument()
    })

    it('opens calendar when calendar icon is clicked', async () => {
      const user = userEvent.setup()
      render(<DatePicker onChange={mockOnChange} />)

      const calendarIcon = screen.getByTestId('calendar-icon')
      await user.click(calendarIcon)

      expect(screen.getByTestId('popover-content')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('associates label with input', () => {
      render(<DatePicker label='Date' onChange={mockOnChange} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAccessibleName('Date')
    })
  })

  describe('Edge Cases', () => {
    it('handles null onChange gracefully', () => {
      expect(() => {
        render(<DatePicker />)
      }).not.toThrow()
    })

    it('handles invalid date objects gracefully', () => {
      const invalidDate = new Date('invalid')

      expect(() => {
        render(<DatePicker value={invalidDate} onChange={mockOnChange} />)
      }).not.toThrow()
    })
  })
})
