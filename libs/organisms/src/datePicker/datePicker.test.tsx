import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker } from './datePicker'
import * as stories from './index.stories'

// Mock dependencies
jest.mock('@social-media/atoms', () => ({
  Button: ({ children, onClick, ...props }: React.ComponentProps<'button'>) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Input: ({ value, onChange, onFocus, ...props }: React.ComponentProps<'input'> & { value?: string; onChange?: (value: string) => void }) => (
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

describe('DatePicker Component Tests', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders correctly with minimal props', () => {
      render(
        <DatePicker
          value={undefined}
          onChange={mockOnChange}
          data-testid="datePicker"
        />
      )

      expect(screen.getByTestId('datePicker')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
    })

    it('renders with label and required indicator', () => {
      render(
        <DatePicker
          label="Chọn ngày sinh"
          value={undefined}
          onChange={mockOnChange}
          required
        />
      )

      expect(screen.getByText('Chọn ngày sinh')).toBeInTheDocument()
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(
        <DatePicker
          label="Ngày sinh"
          value={undefined}
          onChange={mockOnChange}
          error="Vui lòng chọn ngày sinh"
        />
      )

      expect(screen.getByText('Vui lòng chọn ngày sinh')).toBeInTheDocument()
    })

    it('renders with placeholder', () => {
      render(
        <DatePicker
          value={undefined}
          onChange={mockOnChange}
          placeholder="dd/mm/yyyy"
        />
      )

      expect(screen.getByPlaceholderText('dd/mm/yyyy')).toBeInTheDocument()
    })
  })

  describe('Date Display', () => {
    it('displays formatted date when value is provided', () => {
      const testDate = new Date(2024, 0, 15) // 15/01/2024
      render(
        <DatePicker
          value={testDate}
          onChange={mockOnChange}
          dateFormat="dd/MM/yyyy"
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('15/01/2024')
    })

    it('shows empty value when no date selected', () => {
      render(
        <DatePicker
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
        <DatePicker
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
        <DatePicker
          value={undefined}
          onChange={mockOnChange}
        />
      )

      const calendarButton = screen.getByRole('button')
      await user.click(calendarButton)

      expect(screen.getByTestId('popover-content')).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('disables input and button when disabled prop is true', () => {
      render(
        <DatePicker
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
  })

  describe('Accessibility', () => {
    it('has proper aria-label for calendar button', () => {
      render(
        <DatePicker
          value={undefined}
          onChange={mockOnChange}
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Mở lịch')
    })

    it('associates label with input correctly', () => {
      render(
        <DatePicker
          label="Ngày sinh"
          value={undefined}
          onChange={mockOnChange}
        />
      )

      const label = screen.getByText('Ngày sinh')
      const input = screen.getByRole('textbox')

      expect(label).toHaveAttribute('for', 'Ngày sinh')
      expect(input).toHaveAttribute('id', 'Ngày sinh')
    })
  })

  describe('Story Integration', () => {
    it('renders with Default story props', () => {
      const defaultProps = stories.Default?.args || {}

      render(
        <DatePicker
          {...defaultProps}
          data-testid="datePicker-with-story-props"
        />
      )

      expect(
        screen.getByTestId('datePicker-with-story-props')
      ).toBeInTheDocument()
    })
  })
})
