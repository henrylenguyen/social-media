// libs/organisms/src/date-picker-common/utils.ts
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format as formatDateFnsInternal,
  getDay,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isSameDay as isSameDayFnsInternal,
  isToday as isTodayFns,
  isValid as isValidDateFns,
  Locale,
  parse as parseDateFnsInternal,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { vi } from 'date-fns/locale' // Default locale
import { DateRangeType, Day } from './types'

const DEFAULT_LOCALE_INTERNAL = vi

export const getMonthName = (
  month: number,
  locale: Locale = DEFAULT_LOCALE_INTERNAL,
): string => {
  const date = new Date(2000, month)
  return formatDateFnsInternal(date, 'MMMM', { locale })
}

export const getDayNames = (
  locale: Locale = DEFAULT_LOCALE_INTERNAL,
): string[] => {
  const dayNames: string[] = []
  for (let i = 0; i < 7; i++) {
    dayNames.push(
      formatDateFnsInternal(new Date(2000, 0, i + 1), 'EEEEEE', { locale }),
    )
  }
  return dayNames
}

export const generateMonthDays = (
  currentDate: Date,
  selectedValue?: Date | DateRangeType,
  minDate?: Date,
  maxDate?: Date,
  isRangePicker = false,
): Day[] => {
  const start = startOfMonth(currentDate)
  const end = endOfMonth(currentDate)

  const daysInMonth = eachDayOfInterval({ start, end })

  const firstDayOfMonthWeekIndex = getDay(start)
  const lastDayOfMonthWeekIndex = getDay(end)

  const days: Day[] = []

  for (let i = 0; i < firstDayOfMonthWeekIndex; i++) {
    const dateLoop = subMonths(start, 1) // Use a different variable name
    const dayValue =
      endOfMonth(dateLoop).getDate() - (firstDayOfMonthWeekIndex - 1 - i)
    days.push({
      date: new Date(getYear(dateLoop), getMonth(dateLoop), dayValue),
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: true,
    })
  }

  daysInMonth.forEach((date) => {
    let isSelected = false
    let isRangeStart = false
    let isRangeEnd = false
    let isInRange = false

    if (selectedValue) {
      if (
        isRangePicker &&
        selectedValue &&
        typeof selectedValue === 'object' &&
        'from' in selectedValue
      ) {
        const range = selectedValue as DateRangeType
        if (range.from && isSameDayFnsInternal(date, range.from)) {
          isSelected = true
          isRangeStart = true
        }
        if (range.to && isSameDayFnsInternal(date, range.to)) {
          isSelected = true
          isRangeEnd = true
        }
        if (
          range.from &&
          range.to &&
          isAfter(date, range.from) &&
          isBefore(date, range.to)
        ) {
          isInRange = true
        }
        if (range.from && !range.to && isSameDayFnsInternal(date, range.from)) {
          isSelected = true
          isRangeStart = true
        }
      } else if (!isRangePicker && selectedValue instanceof Date) {
        isSelected = isSameDayFnsInternal(date, selectedValue as Date)
      }
    }

    const isDisabled = (
      (minDate &&
        isBefore(date, minDate) &&
        !isSameDayFnsInternal(date, minDate)) ||
      (maxDate &&
        isAfter(date, maxDate) &&
        !isSameDayFnsInternal(date, maxDate))
    ) ?? false

    days.push({
      date,
      isCurrentMonth: true,
      isToday: isTodayFns(date),
      isSelected,
      isRangeStart,
      isRangeEnd,
      isInRange,
      isDisabled,
    })
  })

  const daysToAddAfter = 6 - lastDayOfMonthWeekIndex
  for (let i = 0; i < daysToAddAfter; i++) {
    const dateLoop = addMonths(start, 1) // Use a different variable name
    days.push({
      date: new Date(getYear(dateLoop), getMonth(dateLoop), i + 1),
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: true,
    })
  }
  return days
}

export const getYearsRange = (
  currentYear: number,
  range = 100,
): number[] => {
  const years: number[] = []
  for (let i = currentYear - range; i <= currentYear + range; i++) {
    years.push(i)
  }
  return years
}

export const formatDate = (
  date: Date | undefined,
  formatStr: string,
  locale: Locale = DEFAULT_LOCALE_INTERNAL,
): string => {
  if (!date) return ''
  try {
    return formatDateFnsInternal(date, formatStr, { locale })
  } catch (e) {
    console.error('Error formatting date:', e)
    return 'Invalid Date'
  }
}

export const parseDate = (
  dateStr: string,
  formatStr: string,
  locale: Locale = DEFAULT_LOCALE_INTERNAL,
): Date | undefined => {
  if (!dateStr) return undefined
  const parsed = parseDateFnsInternal(dateStr, formatStr, new Date(), {
    locale,
  })
  return isValidDateFns(parsed) ? parsed : undefined
}
