// libs/organisms/src/dateRangePicker/useDateRangePicker.ts
import {
  isBefore as isBeforeDateInternal,
  isSameDay as isSameDayInternalRange,
  startOfDay as startOfDayInternal,
} from 'date-fns'
import { vi } from 'date-fns/locale'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DateRangeType } from '../date-picker-common/types'
import { useDatePickerBaseLogic } from '../date-picker-common/useDatePickerBaseLogic'
import { formatDate } from '../date-picker-common/utils'
import { DateRangePickerProps } from './dateRangePicker'

const DEFAULT_LOCALE_INTERNAL = vi

export const useDateRangePicker = (props: DateRangePickerProps) => {
  const {
    value,
    onChange,
    locale = DEFAULT_LOCALE_INTERNAL,
    dateFormat = 'dd/MM/yyyy',
    minDate,
    maxDate,
    useYearNavigation,
    numberOfMonths = 2,
    placeholder,
  } = props

  // Validate numberOfMonths to only allow 1 or 2
  const validatedNumberOfMonths =
    numberOfMonths === 1 || numberOfMonths === 2 ? numberOfMonths : 2

  const baseLogic = useDatePickerBaseLogic({
    value,
    minDate,
    maxDate,
    locale,
    useYearNavigation,
    numberOfMonths: validatedNumberOfMonths,
    isRangePicker: true,
  })

  const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined)

  const formatRange = useCallback(
    (range: DateRangeType | undefined): string => {
      if (!range || (!range.from && !range.to)) return ''
      const fromStr = range.from
        ? formatDate(range.from, dateFormat, locale)
        : '...'
      const toStr = range.to ? formatDate(range.to, dateFormat, locale) : '...'
      if (range.from && !range.to) return `${fromStr} - `
      return `${fromStr} - ${toStr}`
    },
    [dateFormat, locale],
  )
  const [inputValue, setInputValue] = useState<string>(formatRange(value))
  useEffect(() => {
    setInputValue(formatRange(value))
  }, [value, formatRange])
  const handleDateSelect = useCallback(
    (date: Date) => {
      const sDate = startOfDayInternal(date)
      let newRange: DateRangeType = value || {}

      // Case 1: Chưa có ngày nào được chọn hoặc đã có đủ 2 ngày -> bắt đầu lại
      if (!newRange.from || (newRange.from && newRange.to)) {
        newRange = { from: sDate, to: undefined }
      }
      // Case 2: Đã có ngày từ, đang chọn ngày đến
      else if (newRange.from && !newRange.to) {
        // Nếu chọn cùng ngày với ngày từ -> reset
        if (isSameDayInternalRange(sDate, newRange.from)) {
          newRange = { from: sDate, to: undefined }
        }
        // Nếu chọn ngày trước ngày từ -> đổi chỗ
        else if (isBeforeDateInternal(sDate, newRange.from)) {
          newRange = { from: sDate, to: newRange.from }
          baseLogic.closePicker()
        }
        // Nếu chọn ngày sau ngày từ -> hoàn thành range
        else {
          newRange = { from: newRange.from, to: sDate }
          baseLogic.closePicker()
        }
      }

      // Cập nhật giá trị
      onChange?.(newRange)
      setInputValue(formatRange(newRange))

      // Reset hover state
      setHoveredDate(undefined)
    },
    [value, onChange, baseLogic, formatRange],
  )
  const enhancedVisibleMonthsData = useMemo(() => {
    return baseLogic.visibleMonthsData.map((monthData) => {
      const newDays = monthData.days.map((day) => {
        let isInHoverRange = false
        let isHoveredEnd = false

        // Chỉ hiển thị hover effect khi đã chọn ngày đầu nhưng chưa chọn ngày cuối
        // Cho phép hover trên tất cả các ngày, không chỉ ngày trong tháng hiện tại
        if (value?.from && !value.to && hoveredDate && !day.isDisabled) {
          const startDate = value.from
          const endDate = hoveredDate

          // Kiểm tra xem ngày hiện tại có nằm trong khoảng hover không
          const dayTime = day.date.getTime()
          const startTime = startDate.getTime()
          const endTime = endDate.getTime()

          // Kiểm tra xem có phải ngày đang được hover không
          if (isSameDayInternalRange(day.date, endDate)) {
            isHoveredEnd = true
          }

          if (endTime >= startTime) {
            // Hover ngày sau hoặc cùng ngày startDate
            isInHoverRange = dayTime > startTime && dayTime < endTime
          } else if (endTime < startTime) {
            // Hover ngày trước startDate (không được phép do đã disable)
            isInHoverRange = dayTime > endTime && dayTime < startTime
          }
        }

        return {
          ...day,
          isInRange: day.isInRange || isInHoverRange,
          isRangeEnd: day.isRangeEnd || isHoveredEnd,
        }
      })
      return { ...monthData, days: newDays }
    })
  }, [baseLogic.visibleMonthsData, value, hoveredDate])
  return {
    ...baseLogic,
    formattedValue: inputValue,
    handleDateSelect,
    inputPlaceholder: placeholder ?? `${dateFormat} - ${dateFormat}`,
    setHoveredDate,
    visibleMonthsData: enhancedVisibleMonthsData,
  }
}
