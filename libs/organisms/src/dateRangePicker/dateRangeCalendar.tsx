// File: libs/organisms/src/dateRangePicker/dateRangeCalendar.tsx
import React, { useMemo, useState } from 'react'
import { CalendarGrid } from '../date-picker-common/CalendarGrid'
import { CalendarHeader } from '../date-picker-common/CalendarHeader'
import { DateRangeType, Day } from '../date-picker-common/types'
import { getMonthName, getYearsRange } from '../date-picker-common/utils'

// Lightweight calendar generator for better performance
const generateSimpleMonthDays = (currentDate: Date): Day[] => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and how many days in month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()

  // Get day of week for first day (0=Sunday, 1=Monday, etc.)
  // Convert to Monday=0, Sunday=6 for Vietnamese calendar
  const firstDayOfWeek = (firstDay.getDay() + 6) % 7

  const days: Day[] = []

  // Add previous month days
  const prevMonth = new Date(year, month - 1, 0)
  const prevMonthDays = prevMonth.getDate()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthDays - i)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: false,
    })
  }

  // Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()

    days.push({
      date,
      isCurrentMonth: true,
      isToday,
      isSelected: false,
      isDisabled: false,
    })
  }

  // Add next month days to complete the grid (42 days total = 6 weeks)
  const totalDays = days.length
  const remainingDays = 42 - totalDays
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day)
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: false,
    })
  }

  return days
}

interface DateRangeCalendarProps {
  value?: DateRangeType
  onSelect: (range: DateRangeType | undefined) => void
  numberOfMonths: 1 | 2
  minDate?: Date
  maxDate?: Date
}

export const DateRangeCalendar: React.FC<DateRangeCalendarProps> = ({
  value,
  onSelect,
  numberOfMonths,
  minDate,
  maxDate,
}) => {
  // Use Vietnamese locale by default
  const { vi } = require('date-fns/locale')
  const locale = vi

  // Simple state management - no conflicts
  const [firstCalendarDate, setFirstCalendarDate] = useState(() => {
    if (value?.from)
      return new Date(value.from.getFullYear(), value.from.getMonth(), 1)
    return new Date()
  })

  const [secondCalendarDate, setSecondCalendarDate] = useState(() => {
    if (value?.from) {
      return new Date(value.from.getFullYear(), value.from.getMonth() + 1, 1)
    }
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    return nextMonth
  })

  // Ensure two calendars never show the same month (only when no existing range)
  React.useEffect(() => {
    if (!value?.from && !value?.to) {
      const firstMonth = firstCalendarDate.getMonth()
      const firstYear = firstCalendarDate.getFullYear()
      const secondMonth = secondCalendarDate.getMonth()
      const secondYear = secondCalendarDate.getFullYear()

      // If both calendars show the same month/year, adjust second calendar
      if (firstMonth === secondMonth && firstYear === secondYear) {
        const adjustedSecond = new Date(firstCalendarDate)
        adjustedSecond.setMonth(adjustedSecond.getMonth() + 1)
        setSecondCalendarDate(adjustedSecond)
      }
    }
  }, [firstCalendarDate, secondCalendarDate, value?.from, value?.to])

  // Sync calendar dates with value when value changes (e.g., when popup opens with existing range)
  React.useEffect(() => {
    if (value?.from) {
      const fromDate = new Date(
        value.from.getFullYear(),
        value.from.getMonth(),
        1,
      )

      let toDate: Date
      if (value.to) {
        const valueToDate = new Date(
          value.to.getFullYear(),
          value.to.getMonth(),
          1,
        )
        // If range is within same month, show next month in second calendar for better UX
        if (valueToDate.getTime() === fromDate.getTime()) {
          toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1)
        } else {
          toDate = valueToDate
        }
      } else {
        toDate = new Date(
          value.from.getFullYear(),
          value.from.getMonth() + 1,
          1,
        )
      }

      setFirstCalendarDate(fromDate)
      setSecondCalendarDate(toDate)
    }
  }, [value])

  // Generate years and months data
  const years = useMemo(() => getYearsRange(new Date().getFullYear()), [])
  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: getMonthName(i, locale),
      })),
    [locale],
  )

  // Navigation handlers for first calendar
  const handleFirstPrevMonth = () => {
    const newDate = new Date(firstCalendarDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setFirstCalendarDate(newDate)
  }

  const handleFirstNextMonth = () => {
    const newDate = new Date(firstCalendarDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setFirstCalendarDate(newDate)
  }

  const handleFirstYearChange = (year: number) => {
    const newDate = new Date(firstCalendarDate)
    newDate.setFullYear(year)
    setFirstCalendarDate(newDate)
  }

  const handleFirstMonthChange = (month: number) => {
    const newDate = new Date(firstCalendarDate)
    newDate.setMonth(month)
    setFirstCalendarDate(newDate)
  }

  // Navigation handlers for second calendar
  const handleSecondPrevMonth = () => {
    const newDate = new Date(secondCalendarDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setSecondCalendarDate(newDate)
  }

  const handleSecondNextMonth = () => {
    const newDate = new Date(secondCalendarDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setSecondCalendarDate(newDate)
  }

  const handleSecondYearChange = (year: number) => {
    const newDate = new Date(secondCalendarDate)
    newDate.setFullYear(year)
    setSecondCalendarDate(newDate)
  }

  const handleSecondMonthChange = (month: number) => {
    const newDate = new Date(secondCalendarDate)
    newDate.setMonth(month)
    setSecondCalendarDate(newDate)
  }

  // Date selection handler
  const handleDateSelect = (date: Date) => {
    if (!value?.from || (value.from && value.to)) {
      // Start new selection
      onSelect({ from: date, to: undefined })
    } else if (value.from && !value.to) {
      // Complete the range
      if (date >= value.from) {
        onSelect({ from: value.from, to: date })
      } else {
        onSelect({ from: date, to: value.from })
      }
    }
  }

  // Optimized range helper functions with memoization
  const rangeHelpers = useMemo(() => {
    const isDateInRange = (date: Date): boolean => {
      if (!value?.from || !value?.to) return false
      return date >= value.from && date <= value.to
    }

    const isDateRangeStart = (date: Date): boolean => {
      if (!value?.from) return false
      return date.getTime() === value.from.getTime()
    }

    const isDateRangeEnd = (date: Date): boolean => {
      if (!value?.to) return false
      return date.getTime() === value.to.getTime()
    }

    const isDateSelected = (date: Date): boolean => {
      return isDateRangeStart(date) || isDateRangeEnd(date)
    }

    return { isDateInRange, isDateRangeStart, isDateRangeEnd, isDateSelected }
  }, [value?.from, value?.to])

  // Fast calendar data generation with lightweight function
  const firstMonthData = useMemo(() => {
    const days = generateSimpleMonthDays(firstCalendarDate)

    // Only apply range styling if we have a range
    const enhancedDays =
      value?.from || value?.to
        ? days.map((day) => ({
            ...day,
            isSelected: rangeHelpers.isDateSelected(day.date),
            isInRange: rangeHelpers.isDateInRange(day.date),
            isRangeStart: rangeHelpers.isDateRangeStart(day.date),
            isRangeEnd: rangeHelpers.isDateRangeEnd(day.date),
          }))
        : days

    return {
      days: enhancedDays,
      monthName: getMonthName(firstCalendarDate.getMonth(), locale),
      year: firstCalendarDate.getFullYear(),
    }
  }, [firstCalendarDate, rangeHelpers, locale, value?.from, value?.to])

  const secondMonthData = useMemo(() => {
    const days = generateSimpleMonthDays(secondCalendarDate)
    return {
      days: days.map((day) => ({
        ...day,
        isSelected: rangeHelpers.isDateSelected(day.date),
        isInRange: rangeHelpers.isDateInRange(day.date),
        isRangeStart: rangeHelpers.isDateRangeStart(day.date),
        isRangeEnd: rangeHelpers.isDateRangeEnd(day.date),
      })),
      monthName: getMonthName(secondCalendarDate.getMonth(), locale),
      year: secondCalendarDate.getFullYear(),
    }
  }, [secondCalendarDate, rangeHelpers, locale])

  if (numberOfMonths === 1) {
    return (
      <div className='space-y-3'>
        <CalendarHeader
          monthName={firstMonthData.monthName}
          year={firstMonthData.year}
          currentMonth={firstCalendarDate.getMonth()}
          currentYear={firstCalendarDate.getFullYear()}
          years={years}
          months={months}
          prevMonth={handleFirstPrevMonth}
          nextMonth={handleFirstNextMonth}
          setYear={handleFirstYearChange}
          setMonth={handleFirstMonthChange}
          useYearNavigation={true}
          minDate={minDate}
          maxDate={maxDate}
        />
        <CalendarGrid
          days={firstMonthData.days}
          onDateSelect={handleDateSelect}
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      <div className='grid grid-cols-2 gap-4'>
        {/* First Month */}
        <div className='space-y-3'>
          <CalendarHeader
            monthName={firstMonthData.monthName}
            year={firstMonthData.year}
            currentMonth={firstCalendarDate.getMonth()}
            currentYear={firstCalendarDate.getFullYear()}
            years={years}
            months={months}
            prevMonth={handleFirstPrevMonth}
            nextMonth={handleFirstNextMonth}
            setYear={handleFirstYearChange}
            setMonth={handleFirstMonthChange}
            useYearNavigation={true}
            minDate={minDate}
            maxDate={maxDate}
          />
          <CalendarGrid
            days={firstMonthData.days}
            onDateSelect={handleDateSelect}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        {/* Second Month */}
        <div className='space-y-3'>
          <CalendarHeader
            monthName={secondMonthData.monthName}
            year={secondMonthData.year}
            currentMonth={secondCalendarDate.getMonth()}
            currentYear={secondCalendarDate.getFullYear()}
            years={years}
            months={months}
            prevMonth={handleSecondPrevMonth}
            nextMonth={handleSecondNextMonth}
            setYear={handleSecondYearChange}
            setMonth={handleSecondMonthChange}
            useYearNavigation={true}
            minDate={minDate}
            maxDate={maxDate}
          />
          <CalendarGrid
            days={secondMonthData.days}
            onDateSelect={handleDateSelect}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      </div>
    </div>
  )
}
