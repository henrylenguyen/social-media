import { Locale } from 'date-fns'
import React from 'react'
import { cn } from 'src/utils'
import { Day } from './types'
import { formatDate, getDayNames } from './utils'

interface CalendarGridProps {
  days: Day[]
  onDateSelect: (date: Date) => void
  locale: Locale
  dateFormat?: string
  onDateHover?: (date: Date | undefined) => void
  minDate?: Date
  maxDate?: Date
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  onDateSelect,
  locale,
  dateFormat = 'PPP',
  onDateHover,
  minDate,
  maxDate,
}) => {
  const dayNames = getDayNames(locale)

  const handleMouseLeave = () => {
    if (onDateHover) {
      onDateHover(undefined)
    }
  }

  // Check if date is within valid range
  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  return (
    <div className='p-2' onMouseLeave={handleMouseLeave}>
      <div className='grid grid-cols-7 gap-px text-center text-xs font-medium text-text-tertiary mb-1'>
        {dayNames.map((name) => (
          <div key={name}>{name}</div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-px'>
        {' '}
        {days.map((day) => {
          const isOutOfRange = isDateDisabled(day.date)
          const isDisabled =
            day.isDisabled || !day.isCurrentMonth || isOutOfRange

          return (
            <button
              key={`${day.date.getTime()}-${day.isCurrentMonth}`}
              type='button'
              onClick={() => !isDisabled && onDateSelect(day.date)}
              onMouseEnter={() =>
                onDateHover && !isDisabled && onDateHover(day.date)
              }
              disabled={isDisabled}
              title={formatDate(day.date, dateFormat, locale)}
              className={cn(
                'relative flex items-center justify-center h-9 w-full rounded-md text-sm transition-all focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary',
                !day.isCurrentMonth && 'text-text-light pointer-events-none',
                isDisabled &&
                  day.isCurrentMonth &&
                  'text-text-tertiary cursor-not-allowed opacity-50',
                !isDisabled &&
                  day.isCurrentMonth &&
                  !day.isSelected &&
                  !day.isInRange &&
                  'hover:bg-gray-100',
                day.isToday &&
                  !day.isSelected &&
                  !isDisabled &&
                  'font-semibold text-primary border-2 border-primary bg-white',
                day.isSelected &&
                  !isDisabled &&
                  'bg-primary text-white font-semibold hover:bg-primary/90',
                day.isRangeStart && day.isRangeEnd && 'rounded-md',
                day.isRangeStart &&
                  !day.isRangeEnd &&
                  'rounded-l-md rounded-r-none',
                day.isRangeEnd &&
                  !day.isRangeStart &&
                  'rounded-r-md rounded-l-none',
                day.isInRange &&
                  !day.isSelected &&
                  !isDisabled &&
                  'bg-primary/10 text-primary hover:bg-primary/20 rounded-none',
              )}
            >
              {day.date.getDate()}
              {day.isToday && (
                <span
                  className={cn(
                    'absolute bottom-0.5 left-1/2 transform -translate-x-1/2 h-1.5 w-1.5 rounded-full',
                    day.isSelected ? 'bg-white' : 'bg-primary',
                  )}
                ></span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
