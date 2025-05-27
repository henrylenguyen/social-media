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
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  onDateSelect,
  locale,
  dateFormat = 'PPP',
  onDateHover,
}) => {
  const dayNames = getDayNames(locale)

  return (
    <div className='p-2'>
      <div className='grid grid-cols-7 gap-px text-center text-xs font-medium text-text-tertiary mb-1'>
        {dayNames.map((name) => (
          <div key={name}>{name}</div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-px'>
        {' '}
        {days.map((day) => (
          <button
            key={`${day.date.getTime()}-${day.isCurrentMonth}`}
            type='button'
            onClick={() =>
              !day.isDisabled && day.isCurrentMonth && onDateSelect(day.date)
            }
            onMouseEnter={() =>
              onDateHover && !day.isDisabled && onDateHover(day.date)
            }
            disabled={day.isDisabled || !day.isCurrentMonth}
            title={formatDate(day.date, dateFormat, locale)}
            className={cn(
              'relative flex items-center justify-center h-9 w-full rounded-md text-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary',
              !day.isCurrentMonth && 'text-text-light pointer-events-none',
              day.isDisabled &&
                day.isCurrentMonth &&
                'text-text-tertiary cursor-not-allowed opacity-70',
              !day.isDisabled && day.isCurrentMonth && 'hover:bg-gray-100',
              day.isToday && !day.isSelected && 'font-semibold text-primary',
              day.isSelected &&
                'bg-primary text-white font-semibold hover:bg-primary/90',
              day.isRangeStart && !day.isRangeEnd && 'rounded-r-none',
              day.isRangeEnd && !day.isRangeStart && 'rounded-l-none',
              day.isRangeStart && day.isRangeEnd && 'rounded-md',
              day.isInRange &&
                !day.isSelected &&
                'bg-primary/10 text-primary hover:bg-primary/20 rounded-none',
            )}
          >
            {day.date.getDate()}
            {day.isToday && (
              <span
                className={cn(
                  'absolute bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full',
                  day.isSelected ? 'bg-white' : 'bg-primary',
                )}
              ></span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
