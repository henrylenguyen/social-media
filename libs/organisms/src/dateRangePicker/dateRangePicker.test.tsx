import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateRangeType } from '../date-picker-common/types'
import { DateRangePicker } from './dateRangePicker'

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
  Calendar: ({ selected, onSelect, mode, ...props }: any) => (
    <div data-testid='calendar' {...props}>
      <button
        onClick={() => onSelect?.({ from: new Date(2024, 0, 15) })}
        data-testid='date-15'
      >
        15
      </button>
      <button
        onClick={() =>
          onSelect?.({ from: new Date(2024, 0, 15), to: new Date(2024, 0, 20) })
        }
        data-testid='date-20'
      >
        20
      </button>
    </div>
  ),
  Popover: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='popover'>{children}</div>
  ),
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='popover-trigger'>{children}</div>
  ),
  PopoverContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='popover-content'>{children}</div>
  ),
}))

jest.mock('lucide-react', () => ({
  CalendarDays: () => <span data-testid='calendar-icon'>📅</span>,
}))

jest.mock('src/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

describe('DateRangePicker', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<DateRangePicker onChange={mockOnChange} />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<DateRangePicker label='Select Date Range' onChange={mockOnChange} />)
      expect(screen.getByText('Select Date Range')).toBeInTheDocument()
    })

    it('renders with placeholder', () => {
      render(
        <DateRangePicker
          placeholder='Pick a date range'
          onChange={mockOnChange}
        />,
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', 'Pick a date range')
    })

    it('renders with error message', () => {
      render(
        <DateRangePicker
          error='Please select a date range'
          onChange={mockOnChange}
        />,
      )
      expect(screen.getByText('Please select a date range')).toBeInTheDocument()
    })

    it('renders as required', () => {
      render(<DateRangePicker required onChange={mockOnChange} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('required')
    })

    it('renders as disabled', () => {
      render(<DateRangePicker disabled onChange={mockOnChange} />)
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })
  })

  describe('Value Display', () => {
    it('displays empty input when no value is provided', () => {
      render(<DateRangePicker onChange={mockOnChange} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('displays formatted date range when value is provided', () => {
      const testRange: DateRangeType = {
        from: new Date('2024-01-15'),
        to: new Date('2024-01-20'),
      }

      render(
        <DateRangePicker
          value={testRange}
          onChange={mockOnChange}
          dateFormat='dd/MM/yyyy'
        />,
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('15/01/2024 - 20/01/2024')
    })

    it('displays partial range when only from date is selected', () => {
      const testRange: DateRangeType = {
        from: new Date('2024-01-15'),
        to: undefined,
      }

      render(
        <DateRangePicker
          value={testRange}
          onChange={mockOnChange}
          dateFormat='dd/MM/yyyy'
        />,
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('15/01/2024')
    })
  })

  describe('Date Format Support', () => {
    const testRange: DateRangeType = {
      from: new Date('2024-01-15'),
      to: new Date('2024-01-20'),
    }

    it('formats dates with dd/MM/yyyy format', () => {
      render(
        <DateRangePicker
          value={testRange}
          onChange={mockOnChange}
          dateFormat='dd/MM/yyyy'
        />,
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('15/01/2024 - 20/01/2024')
    })

    it('formats dates with MM/dd/yyyy format', () => {
      render(
        <DateRangePicker
          value={testRange}
          onChange={mockOnChange}
          dateFormat='MM/dd/yyyy'
        />,
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('01/15/2024 - 01/20/2024')
    })

    it('formats dates with yyyy-MM-dd format', () => {
      render(
        <DateRangePicker
          value={testRange}
          onChange={mockOnChange}
          dateFormat='yyyy-MM-dd'
        />,
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('2024-01-15 - 2024-01-20')
    })
  })

  describe('User Interactions', () => {
    it('opens calendar when input is clicked', async () => {
      const user = userEvent.setup()
      render(<DateRangePicker onChange={mockOnChange} />)

      const input = screen.getByRole('textbox')
      await user.click(input)

      expect(screen.getByTestId('calendar')).toBeInTheDocument()
    })

    it('calls onChange when date range is selected', async () => {
      const user = userEvent.setup()
      render(<DateRangePicker onChange={mockOnChange} />)

      const input = screen.getByRole('textbox')
      await user.click(input)

      const date20Button = screen.getByTestId('date-20')
      await user.click(date20Button)

      expect(mockOnChange).toHaveBeenCalledWith({
        from: new Date(2024, 0, 15),
        to: new Date(2024, 0, 20),
      })
    })
  })

  describe('Props Validation', () => {
    it('validates numberOfMonths prop - accepts 1', () => {
      render(<DateRangePicker numberOfMonths={1} onChange={mockOnChange} />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('validates numberOfMonths prop - accepts 2', () => {
      render(<DateRangePicker numberOfMonths={2} onChange={mockOnChange} />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('handles invalid numberOfMonths gracefully', () => {
      render(
        <DateRangePicker
          numberOfMonths={3 as 1 | 2}
          onChange={mockOnChange}
        />,
      )
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('associates label with input', () => {
      render(<DateRangePicker label='Date Range' onChange={mockOnChange} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAccessibleName('Date Range')
    })
  })

  describe('Edge Cases', () => {
    it('handles null onChange gracefully', () => {
      expect(() => {
        render(<DateRangePicker />)
      }).not.toThrow()
    })

    it('handles invalid date objects gracefully', () => {
      const invalidRange: DateRangeType = {
        from: new Date('invalid'),
        to: new Date('invalid'),
      }

      expect(() => {
        render(<DateRangePicker value={invalidRange} onChange={mockOnChange} />)
      }).not.toThrow()
    })
  })
})
