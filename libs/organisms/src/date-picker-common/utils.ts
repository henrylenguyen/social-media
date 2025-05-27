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
  // Với locale Việt Nam, tuần bắt đầu từ Thứ 2
  // Ngày 3/1/2000 là Thứ 2
  const startDate = new Date(2000, 0, 3) // 3/1/2000 là Thứ 2
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    dayNames.push(formatDateFnsInternal(date, 'EEEEEE', { locale }))
  }
  return dayNames
}

// Helper function để tính toán disabled state
const calculateDisabledState = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  isRangePicker = false,
  selectedValue?: Date | DateRangeType,
): boolean => {
  // Kiểm tra minDate và maxDate
  let isDisabled =
    ((minDate &&
      isBefore(date, minDate) &&
      !isSameDayFnsInternal(date, minDate)) ||
      (maxDate &&
        isAfter(date, maxDate) &&
        !isSameDayFnsInternal(date, maxDate))) ??
    false

  // Đối với range picker, disable các ngày trước ngày đã chọn
  if (
    isRangePicker &&
    selectedValue &&
    typeof selectedValue === 'object' &&
    'from' in selectedValue &&
    selectedValue.from &&
    !selectedValue.to
  ) {
    const range = selectedValue as DateRangeType
    if (
      range.from &&
      isBefore(date, range.from) &&
      !isSameDayFnsInternal(date, range.from)
    ) {
      isDisabled = true
    }
  }

  return isDisabled
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

  // Với locale Việt Nam, tuần bắt đầu từ Thứ 2 (1), không phải Chủ nhật (0)
  // Chuyển đổi getDay() từ 0-6 (CN-T7) sang 0-6 (T2-CN)
  const firstDayOfMonthWeekIndex = (getDay(start) + 6) % 7
  const lastDayOfMonthWeekIndex = (getDay(end) + 6) % 7

  const days: Day[] = []

  for (let i = 0; i < firstDayOfMonthWeekIndex; i++) {
    const dateLoop = subMonths(start, 1) // Use a different variable name
    const dayValue =
      endOfMonth(dateLoop).getDate() - (firstDayOfMonthWeekIndex - 1 - i)
    const prevMonthDate = new Date(
      getYear(dateLoop),
      getMonth(dateLoop),
      dayValue,
    )
    days.push({
      date: prevMonthDate,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: calculateDisabledState(
        prevMonthDate,
        minDate,
        maxDate,
        isRangePicker,
        selectedValue,
      ),
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

    const isDisabled = calculateDisabledState(
      date,
      minDate,
      maxDate,
      isRangePicker,
      selectedValue,
    )

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
    const nextMonthDate = new Date(getYear(dateLoop), getMonth(dateLoop), i + 1)
    days.push({
      date: nextMonthDate,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: calculateDisabledState(
        nextMonthDate,
        minDate,
        maxDate,
        isRangePicker,
        selectedValue,
      ),
    })
  }
  return days
}

export const getYearsRange = (currentYear: number, range = 100): number[] => {
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
