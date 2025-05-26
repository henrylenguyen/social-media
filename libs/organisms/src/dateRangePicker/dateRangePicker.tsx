'use client'

import { Button } from '@social-media/atoms'
import {
  Calendar,
  CalendarProps,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@social-media/molecules'
import { format, isValid as isValidDate } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker' // Import DayPickerProps
import { cn } from 'src/utils'

export type SupportedDateDisplayFormat =
  | 'PPP'
  | 'dd/MM/yyyy'
  | 'MM/dd/yyyy'
  | 'yyyy-MM-dd'
  | 'dd MMM yy'
  | 'd MMMM yyyy'

export interface DateRangePickerProps {
  selectedRange?: DateRange
  onRangeSelected: (range: DateRange | undefined) => void
  placeholder?: string
  className?: string
  popoverContentClassName?: string
  buttonProps?: React.ComponentProps<typeof Button>
  /**
   * Props để truyền vào component Calendar.
   * Các props 'mode', 'selected', 'onSelect', 'initialFocus', 'locale', 'numberOfMonths' sẽ được DateRangePicker quản lý.
   * Nếu 'useYearNavigation' là true, 'captionLayout', 'fromYear', 'toYear' cũng sẽ được DateRangePicker quản lý.
   */
  calendarProps?: Omit<
    CalendarProps,
    | 'mode'
    | 'selected'
    | 'onSelect'
    | 'initialFocus'
    | 'locale'
    | 'numberOfMonths'
  >
  numberOfMonths?: number
  allowClear?: boolean
  clearButtonLabel?: string
  displayFormat?: SupportedDateDisplayFormat
  useYearNavigation?: boolean
  fromYear?: number // Prop của DateRangePicker
  toYear?: number // Prop của DateRangePicker
}

 function DateRangePicker({
  selectedRange,
  onRangeSelected,
  placeholder = 'Chọn khoảng ngày',
  className,
  popoverContentClassName,
  buttonProps,
  calendarProps,
  numberOfMonths = 2,
  allowClear = false,
  clearButtonLabel = 'Xóa',
  displayFormat = 'PPP',
  useYearNavigation = false,
  fromYear,
  toYear,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleRangeSelect = (range: DateRange | undefined) => {
    onRangeSelected(range)
    if (range?.from && range?.to) {
      setIsOpen(false)
    }
  }

  const handleClearRange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onRangeSelected(undefined)
    setIsOpen(false)
  }

  const formatDateForDisplay = (
    date: Date,
    formatString: SupportedDateDisplayFormat,
  ) => {
    if (!isValidDate(date)) return ''
    try {
      return format(date, formatString, { locale: vi })
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Invalid Date'
    }
  }

  // Build the final props for the Calendar component
  const effectiveCalendarProps: CalendarProps = {
    ...calendarProps, // Start with user-provided calendarProps
    mode: 'range',
    selected: selectedRange,
    onSelect: handleRangeSelect,
    initialFocus: true,
    locale: vi,
    numberOfMonths: numberOfMonths,
  }

  if (useYearNavigation) {
    effectiveCalendarProps.captionLayout = 'dropdown-buttons'
    if (fromYear !== undefined) {
      effectiveCalendarProps.fromYear = fromYear
    }
    if (toYear !== undefined) {
      effectiveCalendarProps.toYear = toYear
    }
  }
  // If useYearNavigation is false, captionLayout, fromYear, toYear from calendarProps (if provided) will be used.

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !selectedRange?.from && 'text-muted-foreground',
            className,
          )}
          {...buttonProps}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {selectedRange?.from ? (
            selectedRange.to ? (
              <>
                {formatDateForDisplay(selectedRange.from, displayFormat)} -{' '}
                {formatDateForDisplay(selectedRange.to, displayFormat)}
              </>
            ) : (
              formatDateForDisplay(selectedRange.from, displayFormat)
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-auto p-0', popoverContentClassName)}
        align='start'
      >
        <Calendar {...effectiveCalendarProps} />
        {allowClear && selectedRange?.from && (
          <div className='p-2 border-t border-border'>
            <Button
              variant='ghost'
              size='sm'
              className='w-full'
              onClick={handleClearRange}
            >
              {clearButtonLabel}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default DateRangePicker
