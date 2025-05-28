// File: libs/organisms/src/dateRangePicker/dateRangePicker.tsx
import { Button, Input } from '@social-media/atoms'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@social-media/molecules'
import { CalendarDays } from 'lucide-react'
import React from 'react'
import { cn } from 'src/utils'
import {
  DateRangeType,
  SupportedDateDisplayFormat,
} from '../date-picker-common/types'
import { DateRangeCalendar } from './dateRangeCalendar'

import { useDateRangePicker } from './useDateRangePicker'

export interface DateRangePickerProps {
  value?: DateRangeType
  onChange?: (range?: DateRangeType) => void
  label?: string
  error?: string
  required?: boolean
  className?: string
  inputClassName?: string
  disabled?: boolean
  placeholder?: string
  numberOfMonths?: 1 | 2
  dateFormat?: SupportedDateDisplayFormat
  minDate?: Date
  maxDate?: Date
}

export const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  const {
    label,
    error,
    required,
    className,
    inputClassName,
    disabled,
    numberOfMonths = 2,
    minDate,
    maxDate,
    placeholder,
  } = props

  // Validate numberOfMonths - only 1 or 2 are allowed
  const validatedNumberOfMonths =
    numberOfMonths === 1 || numberOfMonths === 2 ? numberOfMonths : 2

  const { isOpen, setIsOpen, formattedValue, handleSelect } =
    useDateRangePicker(props)

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
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className='relative'>
            <Input
              id={label}
              type='text'
              value={formattedValue}
              readOnly
              onClick={() => !disabled && setIsOpen(true)}
              placeholder={placeholder ?? 'Chọn khoảng thời gian'}
              disabled={disabled}
              className={cn(
                'w-full pr-10 cursor-pointer min-w-[280px]',
                inputClassName,
                error && 'border-error focus:border-error focus:ring-error',
              )}
            />
            <Button
              type='button'
              variant='outline'
              size='icon'
              className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-1 border-0 hover:bg-gray-100 text-text-tertiary'
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
              aria-label='Mở lịch'
            >
              <CalendarDays className='h-5 w-5' />
            </Button>
          </div>
        </PopoverTrigger>
        {!disabled && (
          <PopoverContent
            className={cn(
              'w-auto p-0',
              validatedNumberOfMonths === 2 && 'min-w-[540px]',
            )}
            align='start'
          >
            <div className='p-3'>
              <DateRangeCalendar
                value={props.value}
                onSelect={handleSelect}
                numberOfMonths={validatedNumberOfMonths}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
          </PopoverContent>
        )}
      </Popover>
      {error && <p className='mt-1 text-xs text-error'>{error}</p>}
    </div>
  )
}

export default DateRangePicker
