// libs/organisms/src/date-picker-common/useDatePickerBaseLogic.ts
import {
  addMonths as addMonthsFns,
  getMonth as getMonthFns,
  getYear as getYearFns,
  isSameMonth,
  isValid,
  setMonth as setMonthDateFns,
  setYear as setYearDateFns,
  startOfDay,
  subMonths as subMonthsFns,
} from 'date-fns'
import { vi } from 'date-fns/locale'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { PickerProps } from './types'
import { generateMonthDays, getMonthName, getYearsRange } from './utils'

const DEFAULT_LOCALE_INTERNAL = vi

export interface UseDatePickerBaseLogicProps
  extends Pick<
    PickerProps,
    'value' | 'minDate' | 'maxDate' | 'locale' | 'useYearNavigation'
  > {
  initialVisibleDate?: Date
  numberOfMonths?: number
  isRangePicker?: boolean
}

export const useDatePickerBaseLogic = ({
  value,
  minDate,
  maxDate,
  locale = DEFAULT_LOCALE_INTERNAL,
  useYearNavigation = false,
  initialVisibleDate,
  numberOfMonths = 1,
  isRangePicker = false,
}: UseDatePickerBaseLogicProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const getInitialDate = useCallback(() => {
    if (initialVisibleDate && isValid(initialVisibleDate))
      return initialVisibleDate
    if (value) {
      if (
        isRangePicker &&
        typeof value === 'object' &&
        'from' in value &&
        value.from &&
        isValid(value.from)
      )
        return value.from
      if (!isRangePicker && value instanceof Date && isValid(value))
        return value
    }
    return new Date()
  }, [initialVisibleDate, value, isRangePicker])

  const [currentDisplayedMonthDate, setCurrentDisplayedMonthDate] =
    useState<Date>(startOfDay(getInitialDate()))

  useEffect(() => {
    if (!isOpen) {
      const newInitialDate = getInitialDate()
      if (
        !isSameMonth(newInitialDate, currentDisplayedMonthDate) ||
        getYearFns(newInitialDate) !== getYearFns(currentDisplayedMonthDate)
      ) {
        setCurrentDisplayedMonthDate(startOfDay(newInitialDate))
      }
    }
  }, [value, isOpen, getInitialDate, currentDisplayedMonthDate])

  const currentYear = getYearFns(currentDisplayedMonthDate)
  const currentMonth = getMonthFns(currentDisplayedMonthDate)

  const years = useMemo(() => getYearsRange(getYearFns(new Date())), [])
  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: getMonthName(i, locale),
      })),
    [locale],
  )

  const visibleMonthsData = useMemo(() => {
    const monthDates: Date[] = []
    for (let i = 0; i < numberOfMonths; i++) {
      monthDates.push(addMonthsFns(currentDisplayedMonthDate, i))
    }
    return monthDates.map((monthDate) => ({
      monthDate,
      days: generateMonthDays(
        monthDate,
        value,
        minDate,
        maxDate,
        isRangePicker,
      ),
      monthName: getMonthName(getMonthFns(monthDate), locale),
      year: getYearFns(monthDate),
    }))
  }, [
    currentDisplayedMonthDate,
    value,
    minDate,
    maxDate,
    locale,
    numberOfMonths,
    isRangePicker,
  ])

  const nextMonth = useCallback(() => {
    setCurrentDisplayedMonthDate((prev) => addMonthsFns(prev, 1))
  }, [])

  const prevMonth = useCallback(() => {
    setCurrentDisplayedMonthDate((prev) => subMonthsFns(prev, 1))
  }, [])

  const setYear = useCallback((year: number) => {
    setCurrentDisplayedMonthDate((prev) => setYearDateFns(prev, year))
  }, [])

  const setMonth = useCallback((monthNumber: number) => {
    // Renamed parameter to avoid conflict
    setCurrentDisplayedMonthDate((prev) => setMonthDateFns(prev, monthNumber))
  }, [])

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const openPicker = useCallback(() => setIsOpen(true), [])
  const closePicker = useCallback(() => setIsOpen(false), [])

  return {
    isOpen,
    toggleOpen,
    openPicker,
    closePicker,
    currentDisplayedMonthDate,
    setCurrentDisplayedMonthDate,
    visibleMonthsData,
    currentYear,
    currentMonth,
    years,
    months,
    nextMonth,
    prevMonth,
    setYear,
    setMonth,
    useYearNavigation,
    locale,
  }
}
