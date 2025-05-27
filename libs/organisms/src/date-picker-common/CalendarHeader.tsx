import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@social-media/atoms'
import { ChevronLeft, ChevronRight } from 'lucide-react' // Assuming lucide-react is available
import React from 'react'

interface CalendarHeaderProps {
  currentYear: number
  currentMonth: number
  years: number[]
  months: { value: number; label: string }[]
  prevMonth?: () => void
  nextMonth?: () => void
  setYear: (year: number) => void
  setMonth: (month: number) => void
  useYearNavigation?: boolean
  monthName: string
  year: number
  hideNavigation?: boolean
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  monthName,
  year,
  currentMonth,
  currentYear,
  years,
  months,
  prevMonth,
  nextMonth,
  setYear,
  setMonth,
  useYearNavigation,
  hideNavigation = false,
}) => {
  return (
    <div className='flex items-center justify-between px-2 py-2 bg-gray-50 border-b'>
      {!hideNavigation && prevMonth ? (
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 rounded-full border-gray-300 hover:bg-gray-100'
          onClick={prevMonth}
          aria-label='Tháng trước' // Previous month
        >
          <ChevronLeft className='h-5 w-5 text-text-secondary' />
        </Button>
      ) : (
        <div className='h-8 w-8' /> // Placeholder để giữ layout
      )}

      {useYearNavigation ? (
        <div className='flex items-center space-x-2 flex-1 justify-center'>
          <Select
            value={String(currentMonth)}
            onValueChange={(value) => setMonth(parseInt(value, 10))}
          >
            <SelectTrigger className='h-9 text-sm px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary bg-white min-w-[100px]'>
              <SelectValue>
                {months.find((m) => m.value === currentMonth)?.label ?? 'Tháng'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className='max-h-60 bg-white shadow-lg rounded-md border border-gray-200'>
              {months.map((m) => (
                <SelectItem key={m.value} value={String(m.value)}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={String(currentYear)}
            onValueChange={(value) => setYear(parseInt(value, 10))}
          >
            <SelectTrigger className='h-9 text-sm px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary bg-white min-w-[80px]'>
              <SelectValue>{currentYear}</SelectValue>
            </SelectTrigger>
            <SelectContent className='max-h-60 bg-white shadow-lg rounded-md border border-gray-200'>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className='text-sm font-bold text-text-primary'>
          {monthName} {year}
        </div>
      )}

      {!hideNavigation && nextMonth ? (
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 rounded-full border-gray-300 hover:bg-gray-100'
          onClick={nextMonth}
          aria-label='Tháng sau' // Next month
        >
          <ChevronRight className='h-5 w-5 text-text-secondary' />
        </Button>
      ) : (
        <div className='h-8 w-8' /> // Placeholder để giữ layout
      )}
    </div>
  )
}
