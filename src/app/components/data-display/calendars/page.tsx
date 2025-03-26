'use client'

import React, { useState } from 'react'
import { MonthView } from '@/components/data-display/calendars'

export default function CalendarShowcase() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  
  // Sample events for the calendar
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
    },
    {
      id: '3',
      name: 'Client Presentation',
      time: '11:30 AM',
      datetime: '2023-11-08T11:30',
      href: '#'
    },
    {
      id: '4',
      name: 'Team Lunch',
      time: '12:00 PM',
      datetime: '2023-11-10T12:00',
      href: '#'
    },
    {
      id: '5',
      name: 'Strategy Planning',
      time: '9:00 AM',
      datetime: '2023-11-28T09:00',
      href: '#'
    }
  ]

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
  }

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Calendar Components</h1>
      <p className="text-gray-600 mb-10">Display dates and events in various calendar formats</p>
      
      <div className="space-y-16">
        {/* Month View Calendar */}
        <section>
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Month View Calendar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
              <MonthView 
                initialDate={new Date()} 
                events={events}
                onDateSelect={handleDateSelect}
                onEventSelect={handleEventSelect}
              />
              
              <div className="mt-10 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Example Code</h4>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
{`const events = [
  {
    id: '1',
    name: 'Team Meeting',
    time: '10:00 AM',
    datetime: '2023-11-15T10:00',
    href: '#'
  },
  // More events...
]

<MonthView 
  initialDate={new Date()} 
  events={events}
  onDateSelect={(date) => console.log('Date selected:', date)}
  onEventSelect={(event) => console.log('Event selected:', event)}
/>`}
                </pre>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium mb-4">Selection Details</h3>
              {selectedDate && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2">Selected Date</h4>
                  <div className="p-3 bg-blue-50 rounded">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              )}
              
              {selectedEvent && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Selected Event</h4>
                  <div className="p-3 bg-green-50 rounded">
                    <p className="font-semibold">{selectedEvent.name}</p>
                    <p className="text-sm text-gray-600">{selectedEvent.time}</p>
                  </div>
                </div>
              )}
              
              {!selectedDate && !selectedEvent && (
                <div className="text-gray-500 italic">
                  Select a date or event from the calendar to see details here.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 