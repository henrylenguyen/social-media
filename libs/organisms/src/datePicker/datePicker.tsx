'use client'

import { Button } from '@social-media/atoms'
import { Calendar, CalendarProps, Popover, PopoverContent, PopoverTrigger } from '@social-media/molecules'
import { format, isValid as isValidDate } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { SupportedDateDisplayFormat } from 'src/type'
import { cn } from 'src/utils'

export interface DatePickerProps {
  selectedDate?: Date
  onDateSelected: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  popoverContentClassName?: string
  buttonProps?: React.ComponentProps<typeof Button>
  /**
   * Props để truyền vào component Calendar.
   * Các props 'mode', 'selected', 'onSelect', 'initialFocus', 'locale' sẽ được DatePicker quản lý.
   * Nếu 'useYearNavigation' là true, 'captionLayout', 'fromYear', 'toYear' cũng sẽ được DatePicker quản lý.
   */
  calendarProps?: Omit<
    CalendarProps, // Sử dụng CalendarProps từ thư viện molecules của bạn
    'mode' | 'selected' | 'onSelect' | 'initialFocus' | 'locale'
  >
  allowClear?: boolean
  clearButtonLabel?: string
  displayFormat?: SupportedDateDisplayFormat
  useYearNavigation?: boolean
  fromYear?: number
  toYear?: number
}

export function DatePicker({
  selectedDate,
  onDateSelected,
  placeholder = 'Chọn ngày',
  className,
  popoverContentClassName,
  buttonProps,
  calendarProps, // This will not have mode, selected, onSelect, initialFocus, locale
  allowClear = false,
  clearButtonLabel = 'Xóa',
  displayFormat = 'PPP',
  useYearNavigation = false,
  fromYear, // Prop của DatePicker
  toYear, // Prop của DatePicker
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleDateSelect = (date: Date | undefined) => {
    onDateSelected(date)
    setIsOpen(false)
  }

  const handleClearDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onDateSelected(undefined)
    setIsOpen(false)
  }

  const formatDateForDisplay = (
    date: Date,
    formatString: SupportedDateDisplayFormat,
  ) => {
    if (!isValidDate(date)) return placeholder
    try {
      return format(date, formatString, { locale: vi })
    } catch (error) {
      console.error('Error formatting date:', error)
      return placeholder
    }
  }

  // Build the final props for the Calendar component
  const effectiveCalendarProps: CalendarProps = {
    ...calendarProps, // Start with user-provided calendarProps
    mode: 'single',
    selected: selectedDate,
    onSelect: handleDateSelect,
    initialFocus: true,
    locale: vi,
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
            !selectedDate && 'text-muted-foreground',
            className,
          )}
          {...buttonProps}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {selectedDate ? (
            formatDateForDisplay(selectedDate, displayFormat)
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
        {allowClear && selectedDate && (
          <div className='p-2 border-t border-border'>
            <Button
              variant='ghost'
              size='sm'
              className='w-full'
              onClick={handleClearDate}
            >
              {clearButtonLabel}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export type { DatePickerProps as DatePickerElementProps }
