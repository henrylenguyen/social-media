import { Button, Input } from '@social-media/atoms'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@social-media/molecules'
import { Locale } from 'date-fns'
import { CalendarDays } from 'lucide-react' // Assuming lucide-react is available
import React from 'react'
import { cn } from 'src/utils' // Assuming cn is in @ui/utils or similar NX path
import { CalendarGrid } from '../date-picker-common/CalendarGrid'
import { CalendarHeader } from '../date-picker-common/CalendarHeader'
import {
  DateRangeType,
  PickerProps,
  SupportedDateDisplayFormat,
} from '../date-picker-common/types'
import { useDatePicker } from './useDatePicker'

export interface DatePickerProps extends PickerProps {
  value?: Date
  onChange?: (date?: Date | DateRangeType) => void
  locale?: Locale
  dateFormat?: SupportedDateDisplayFormat
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { label, error, required, className, inputClassName, disabled } = props

  const {
    isOpen,
    toggleOpen,
    openPicker,
    visibleMonthsData,
    currentYear,
    currentMonth,
    years,
    months,
    prevMonth,
    nextMonth,
    setYear,
    setMonth,
    useYearNavigation,
    locale,
    formattedValue,
    handleDateSelect,
    inputPlaceholder,
  } = useDatePicker(props)

  const monthData = visibleMonthsData[0]

  return (
    <div className={cn('w-full space-y-1', className)}>
      {label && (
        <label
          htmlFor={label}
          className='block text-sm font-medium text-text-primary'
        >
          {label} {required && <span className='text-error'>*</span>}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <div className='relative'>
            <Input
              id={label} // Use label as id for accessibility if label is present
              type='text'
              value={formattedValue}
              readOnly
              onFocus={openPicker}
              placeholder={inputPlaceholder}
              disabled={disabled}
              className={cn(
                'w-full pr-10 cursor-pointer',
                inputClassName,
                error && 'border-error focus:border-error focus:ring-error',
              )}
            />
            <Button
              type='button'
              variant='outline'
              size='icon'
              className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-1 border-0 hover:bg-gray-100 text-text-tertiary'
              onClick={toggleOpen}
              disabled={disabled}
              aria-label='Mở lịch' // Open calendar
            >
              <CalendarDays className='h-5 w-5' />
            </Button>
          </div>
        </PopoverTrigger>
        {isOpen && !disabled && (
          <PopoverContent className='w-[320px] p-0 border rounded-lg shadow-xl bg-white z-50'>
            <CalendarHeader
              monthName={monthData.monthName}
              year={monthData.year}
              currentMonth={currentMonth}
              currentYear={currentYear}
              years={years}
              months={months}
              prevMonth={prevMonth}
              nextMonth={nextMonth}
              setYear={setYear}
              setMonth={setMonth}
              useYearNavigation={useYearNavigation}
            />
            <CalendarGrid
              days={monthData.days}
              onDateSelect={handleDateSelect}
              locale={locale} // Locale should be defined from props with default
              dateFormat={props.dateFormat}
            />
          </PopoverContent>
        )}
      </Popover>
      {error && <p className='mt-1 text-xs text-error'>{error}</p>}
    </div>
  )
}
