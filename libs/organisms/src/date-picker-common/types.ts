import { Locale } from 'date-fns'

export type SupportedDateDisplayFormat =
  | 'PPP'
  | 'dd/MM/yyyy'
  | 'MM/dd/yyyy'
  | 'yyyy-MM-dd'
  | 'dd MMM yy'
  | 'd MMMM yyyy'

export interface Day {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isRangeStart?: boolean
  isRangeEnd?: boolean
  isInRange?: boolean
  isDisabled: boolean
}

export interface PickerProps {
  value?: Date | DateRangeType
  onChange?: (date?: Date | DateRangeType) => void
  placeholder?: string
  disabled?: boolean
  className?: string // Wrapper class
  inputClassName?: string
  label?: string
  error?: string
  required?: boolean
  useYearNavigation?: boolean
  locale?: Locale
  dateFormat?: SupportedDateDisplayFormat
  minDate?: Date
  maxDate?: Date
}

export interface DateRangeType {
  from?: Date
  to?: Date
}
