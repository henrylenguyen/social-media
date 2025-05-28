// File: libs/organisms/src/dateRangePicker/useDateRangePicker.ts
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useCallback, useEffect, useState } from 'react'
import { DateRangeType } from '../date-picker-common/types'
import { DateRangePickerProps } from './dateRangePicker'

export const useDateRangePicker = (props: DateRangePickerProps) => {
  const { value, onChange, dateFormat = 'dd/MM/yyyy', placeholder } = props

  const locale = vi

  const [isOpen, setIsOpen] = useState(false)
  const [month, setMonth] = useState<Date>(value?.from || new Date())
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>()

  // For year/month navigation
  const currentYear = month.getFullYear()
  const currentMonth = month.getMonth()

  // Update month when value changes
  useEffect(() => {
    if (value?.from) {
      setMonth(value.from)
    }
  }, [value?.from])

  // Format the date range for display
  const formatDateRange = useCallback(
    (range: DateRangeType | undefined): string => {
      if (!range || (!range.from && !range.to)) return ''

      try {
        if (range.from && !range.to) {
          return format(range.from, dateFormat, { locale })
        }
        if (range.from && range.to) {
          return `${format(range.from, dateFormat, { locale })} - ${format(
            range.to,
            dateFormat,
            { locale },
          )}`
        }
        return ''
      } catch (error) {
        console.error('Date formatting error:', error)
        return ''
      }
    },
    [dateFormat, locale],
  )

  const formattedValue = formatDateRange(value)

  // Handle date range selection
  const handleSelect = useCallback(
    (range: DateRangeType | undefined) => {
      if (!range) {
        onChange?.(undefined)
        return
      }

      onChange?.(range)

      // Remove auto-close behavior - let user click outside to close
      // User can continue selecting different ranges without popup closing
    },
    [onChange],
  )

  // Handle month change from calendar navigation
  const handleMonthChange = useCallback((newMonth: Date) => {
    setMonth(newMonth)
  }, [])

  // Handle year change from dropdown
  const handleYearChange = useCallback(
    (year: number) => {
      const newDate = new Date(month)
      newDate.setFullYear(year)
      setMonth(newDate)
    },
    [month],
  )

  // Handle month change from dropdown
  const handleMonthSelectChange = useCallback(
    (monthIndex: number) => {
      const newDate = new Date(month)
      newDate.setMonth(monthIndex)
      setMonth(newDate)
    },
    [month],
  )

  // Handle date hover for range preview
  const handleDateHover = useCallback((date: Date | undefined) => {
    setHoveredDate(date)
  }, [])

  // Get preview range when hovering
  const getPreviewRange = useCallback(() => {
    if (!value?.from || !hoveredDate || value.to) return undefined

    const from = value.from
    const to = hoveredDate

    return from <= to ? { from, to } : { from: to, to: from }
  }, [value?.from, value?.to, hoveredDate])

  return {
    isOpen,
    setIsOpen,
    formattedValue,
    handleSelect,
    month,
    handleMonthChange,
    currentYear,
    currentMonth,
    handleYearChange,
    handleMonthSelectChange,
    handleDateHover,
    getPreviewRange,
    locale,
    inputPlaceholder: placeholder || `${dateFormat} - ${dateFormat}`,
  }
}
