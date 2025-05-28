// libs/organisms/src/datePicker/useDatePicker.ts
import { vi } from 'date-fns/locale'
import { useCallback, useEffect, useState } from 'react'
import { useDatePickerBaseLogic } from '../date-picker-common/useDatePickerBaseLogic'
import { formatDate } from '../date-picker-common/utils'
import { DatePickerProps } from './datePicker'

const DEFAULT_LOCALE_INTERNAL = vi

export const useDatePicker = (props: DatePickerProps) => {
  const {
    value,
    onChange,
    dateFormat = 'dd/MM/yyyy',
    minDate,
    maxDate,
    useYearNavigation = true,
    placeholder,
  } = props

  const locale = DEFAULT_LOCALE_INTERNAL

  const baseLogic = useDatePickerBaseLogic({
    value,
    minDate,
    maxDate,
    locale,
    useYearNavigation,
    isRangePicker: false,
  })

  const [inputValue, setInputValue] = useState<string>(
    formatDate(value, dateFormat, locale),
  )

  useEffect(() => {
    setInputValue(formatDate(value, dateFormat, locale))
  }, [value, dateFormat, locale])

  const handleDateSelect = useCallback(
    (date: Date) => {
      if (onChange) {
        onChange(date)
      }
      setInputValue(formatDate(date, dateFormat, locale))
      // Remove auto-close behavior - let user click outside to close
    },
    [onChange, dateFormat, locale],
  )

  return {
    ...baseLogic,
    formattedValue: inputValue,
    handleDateSelect,
    inputPlaceholder: placeholder || dateFormat,
  }
}
