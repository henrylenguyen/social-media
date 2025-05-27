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
  DateRangeType as DateRangePropType,
  PickerProps,
  SupportedDateDisplayFormat,
} from '../date-picker-common/types'
import { useDateRangePicker } from './useDateRangePicker'

export interface DateRangePickerProps extends Omit<PickerProps, 'onChange'> {
  value?: DateRangePropType
  onChange?: (range?: DateRangePropType) => void
  numberOfMonths?: number
  locale?: Locale
  dateFormat?: SupportedDateDisplayFormat
}
export type DateRange = DateRangePropType

export const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  const {
    label,
    error,
    required,
    className,
    inputClassName,
    disabled,
    numberOfMonths = 2,
  } = props
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
    setHoveredDate,
  } = useDateRangePicker(props)

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
            {' '}
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
              <CalendarDays className='h-5 w-5' />            </Button>
          </div>
        </PopoverTrigger>
        {isOpen && !disabled && (
          <PopoverContent className='w-auto p-0 border rounded-lg shadow-xl bg-white z-50'>
            {/* Header chung cho cả DateRangePicker */}
            {numberOfMonths === 1 && (
              <div className='bg-gray-50 border-b'>
                <CalendarHeader
                  monthName={visibleMonthsData[0].monthName}
                  year={visibleMonthsData[0].year}
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
              </div>
            )}

            <div
              className={cn(
                'flex flex-col md:flex-row',
                numberOfMonths === 1 && 'max-w-xs',
                numberOfMonths === 2 && 'md:min-w-[640px]',
              )}
              onMouseLeave={() => setHoveredDate(undefined)}
            >
              {visibleMonthsData.map((monthData, index) => (
                <div
                  key={`${monthData.year}-${monthData.monthName}-${index}`}
                  className='flex-1 border-r last:border-r-0'
                >
                  {/* Header riêng cho từng tháng khi có nhiều tháng */}
                  {numberOfMonths > 1 && (
                    <div className='bg-gray-50 border-b'>
                      <CalendarHeader
                        monthName={monthData.monthName}
                        year={monthData.year}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        years={years}
                        months={months}
                        prevMonth={index === 0 ? prevMonth : undefined}
                        nextMonth={
                          index === numberOfMonths - 1 ? nextMonth : undefined
                        }
                        setYear={setYear}
                        setMonth={setMonth}
                        useYearNavigation={useYearNavigation}
                        hideNavigation={index > 0} // Ẩn navigation cho tháng thứ 2 trở đi
                      />
                    </div>
                  )}
                  <CalendarGrid
                    days={monthData.days}
                    onDateSelect={handleDateSelect}
                    onDateHover={setHoveredDate}
                    locale={locale}
                    dateFormat={props.dateFormat}
                  />
                </div>
              ))}
            </div>
          </PopoverContent>
        )}
      </Popover>
      {error && <p className='mt-1 text-xs text-error'>{error}</p>}
    </div>
  )
}
