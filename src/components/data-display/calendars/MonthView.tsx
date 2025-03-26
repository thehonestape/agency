'use client'

import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { cn } from '../../../lib/utils'

export interface CalendarEvent {
  id: string
  name: string
  time: string
  datetime: string
  href: string
}

interface DayCell {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: CalendarEvent[]
}

interface MonthViewProps {
  initialDate?: Date
  events?: CalendarEvent[]
  onDateSelect?: (date: Date) => void
  onEventSelect?: (event: CalendarEvent) => void
  className?: string
}

export function MonthView({
  initialDate = new Date(),
  events = [],
  onDateSelect,
  onEventSelect,
  className = '',
}: MonthViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(initialDate))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Function to get all days in the current month view (including days from prev/next months)
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    
    // Day of week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()
    
    // Generate an array of dates for the calendar view
    const days: Date[] = []
    
    // Add days from previous month to fill the first row
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i))
    }
    
    // Add all days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    // Add days from next month to complete the last row
    const remainingDays = 7 - (days.length % 7 || 7)
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i))
      }
    }
    
    return days
  }

  // Function to generate a unique key for a date
  const getDateKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  // Function to handle month navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth)
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1)
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1)
      }
      return newMonth
    })
  }

  // Function to handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  // Function to handle event selection
  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the date click
    if (onEventSelect) {
      onEventSelect(event)
    }
  }

  // Get all days to display
  const days = getDaysInMonth(currentMonth)
  
  // Get today's date for highlighting
  const today = new Date()
  
  // Create day cells with all necessary data
  const dayCells: DayCell[] = days.map(date => {
    // Check if the date has any events
    const dateKey = getDateKey(date)
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.datetime)
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      )
    })
    
    return {
      date,
      isCurrentMonth: date.getMonth() === currentMonth.getMonth(),
      isToday: 
        date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear(),
      isSelected: selectedDate 
        ? date.getDate() === selectedDate.getDate() && 
          date.getMonth() === selectedDate.getMonth() && 
          date.getFullYear() === selectedDate.getFullYear()
        : false,
      events: dayEvents
    }
  })

  // Group days into weeks for rendering
  const weeks: DayCell[][] = []
  for (let i = 0; i < dayCells.length; i += 7) {
    weeks.push(dayCells.slice(i, i + 7))
  }

  return (
    <div className={`calendar-month-view ${className}`}>
      {/* Calendar header with month navigation */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button 
            onClick={() => navigateMonth('next')}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar cells */}
        <div className="bg-white">
          {weeks.map((week, weekIdx) => (
            <div 
              key={weekIdx} 
              className={`grid grid-cols-7 ${weekIdx !== weeks.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              {week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`min-h-[100px] p-2 border-r border-gray-200 ${
                    dayIdx === week.length - 1 ? 'border-r-0' : ''
                  } ${
                    !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                  } ${
                    day.isToday ? 'bg-blue-50' : ''
                  } ${
                    day.isSelected ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => handleDateClick(day.date)}
                >
                  <div className="flex justify-between">
                    <span className={`text-sm ${day.isToday ? 'font-bold text-blue-600' : ''}`}>
                      {day.date.getDate()}
                    </span>
                    {day.isToday && (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                        Today
                      </span>
                    )}
                  </div>
                  
                  {day.events.length > 0 && (
                    <div className="mt-2 space-y-1 max-h-[70px] overflow-y-auto">
                      {day.events.map(event => (
                        <a
                          key={event.id}
                          href={event.href}
                          onClick={(e) => {
                            e.preventDefault()
                            handleEventClick(event, e)
                          }}
                          className="block text-xs leading-5 p-1 rounded bg-blue-100 hover:bg-blue-200 truncate"
                        >
                          <time dateTime={event.datetime} className="font-medium text-gray-600">
                            {event.time}
                          </time>
                          <p className="truncate">{event.name}</p>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Example usage:
/*
const events = [
  {
    id: '1',
    name: 'Team Meeting',
    time: '10:00 AM',
    datetime: '2023-11-15T10:00',
    href: '#'
  },
  {
    id: '2',
    name: 'Product Launch',
    time: '2:00 PM',
    datetime: '2023-11-22T14:00',
    href: '#'
  }
]

<MonthView
  initialDate={new Date(2023, 10)}
  events={events}
  onDateSelect={(date) => console.log('Date selected:', date)}
  onEventSelect={(event) => console.log('Event selected:', event)}
/>
*/ 