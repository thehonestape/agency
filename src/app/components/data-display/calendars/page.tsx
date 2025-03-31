'use client';

import React, { useState } from 'react';
import { MonthView } from '@/components/data-display/calendars';

export default function CalendarShowcase() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // Sample events for the calendar
  const events = [
    {
      id: '1',
      name: 'Team Meeting',
      time: '10:00 AM',
      datetime: '2023-11-15T10:00',
      href: '#',
    },
    {
      id: '2',
      name: 'Product Launch',
      time: '2:00 PM',
      datetime: '2023-11-22T14:00',
      href: '#',
    },
    {
      id: '3',
      name: 'Client Presentation',
      time: '11:30 AM',
      datetime: '2023-11-08T11:30',
      href: '#',
    },
    {
      id: '4',
      name: 'Team Lunch',
      time: '12:00 PM',
      datetime: '2023-11-10T12:00',
      href: '#',
    },
    {
      id: '5',
      name: 'Strategy Planning',
      time: '9:00 AM',
      datetime: '2023-11-28T09:00',
      href: '#',
    },
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
  };

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Calendar Components</h1>
      <p className="mb-10 text-gray-600">Display dates and events in various calendar formats</p>

      <div className="space-y-16">
        {/* Month View Calendar */}
        <section>
          <h2 className="mb-6 border-b pb-2 text-xl font-semibold">Month View Calendar</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow md:col-span-2">
              <MonthView
                initialDate={new Date()}
                events={events}
                onDateSelect={handleDateSelect}
                onEventSelect={handleEventSelect}
              />

              <div className="mt-10 rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 text-sm font-semibold">Example Code</h4>
                <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
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

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 font-medium">Selection Details</h3>
              {selectedDate && (
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-semibold">Selected Date</h4>
                  <div className="rounded bg-blue-50 p-3">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              )}

              {selectedEvent && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold">Selected Event</h4>
                  <div className="rounded bg-green-50 p-3">
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
  );
}
