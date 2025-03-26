'use client'

import React, { useState } from 'react'
import { 
  Combobox, 
  ComboboxButton, 
  ComboboxInput, 
  ComboboxOption, 
  ComboboxOptions 
} from '../ui/combobox'
import { Label } from '../ui/label'
import { Card } from '../ui/Card'
import { CheckIcon } from '@heroicons/react/20/solid'

// Example user data with different variations
const people = [
  { id: 1, name: 'Leslie Alexander', online: true, imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 2, name: 'Michael Foster', online: false, imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 3, name: 'Dries Vincent', online: true, imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 4, name: 'Lindsay Walton', online: false, imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 5, name: 'Courtney Henry', online: true, imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 6, name: 'Tom Cook', online: false, imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function ComboboxExample() {
  const [query, setQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState<typeof people[0] | null>(null)

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Simple Combobox</h2>
        <Combobox
          as="div"
          value={selectedPerson}
          onChange={(person) => {
            setQuery('')
            setSelectedPerson(person)
          }}
        >
          <Label className="block text-sm font-medium mb-1 text-foreground">Assigned to</Label>
          <div className="relative mt-1">
            <ComboboxInput
              size="sm"
              state="default"
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => setQuery('')}
              displayValue={(person: typeof people[0] | null) => person?.name || ''}
            />
            <ComboboxButton />

            {filteredPeople.length > 0 && (
              <ComboboxOptions size="sm">
                {filteredPeople.map((person) => (
                  <ComboboxOption
                    key={person.id}
                    value={person}
                    checkPosition="right"
                    padding="md"
                  >
                    <span className="block truncate">{person.name}</span>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}
          </div>
        </Combobox>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Check on Left</h2>
        <Combobox
          as="div"
          value={selectedPerson}
          onChange={(person) => {
            setQuery('')
            setSelectedPerson(person)
          }}
        >
          <Label className="block text-sm font-medium mb-1 text-foreground">Assigned to</Label>
          <div className="relative mt-1">
            <ComboboxInput
              size="sm"
              state="default"
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => setQuery('')}
              displayValue={(person: typeof people[0] | null) => person?.name || ''}
            />
            <ComboboxButton />

            {filteredPeople.length > 0 && (
              <ComboboxOptions size="sm">
                {filteredPeople.map((person) => (
                  <ComboboxOption
                    key={person.id}
                    value={person}
                    checkPosition="left"
                    padding="md"
                  >
                    <span className="block truncate">{person.name}</span>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}
          </div>
        </Combobox>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">With Status Indicator</h2>
        <Combobox
          as="div"
          value={selectedPerson}
          onChange={(person) => {
            setQuery('')
            setSelectedPerson(person)
          }}
        >
          <Label className="block text-sm font-medium mb-1 text-foreground">Assigned to</Label>
          <div className="relative mt-1">
            <ComboboxInput
              size="sm"
              state="default"
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => setQuery('')}
              displayValue={(person: typeof people[0] | null) => person?.name || ''}
            />
            <ComboboxButton />

            {filteredPeople.length > 0 && (
              <ComboboxOptions size="sm">
                {filteredPeople.map((person) => (
                  <ComboboxOption
                    key={person.id}
                    value={person}
                    checkPosition="right"
                    padding="md"
                  >
                    <div className="flex items-center">
                      <span
                        className={classNames(
                          'inline-block size-2 shrink-0 rounded-full',
                          person.online ? 'bg-green-500' : 'bg-muted',
                        )}
                        aria-hidden="true"
                      />
                      <span className="ml-3 truncate">
                        {person.name}
                        <span className="sr-only"> is {person.online ? 'online' : 'offline'}</span>
                      </span>
                    </div>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}
          </div>
        </Combobox>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">With Images</h2>
        <Combobox
          as="div"
          value={selectedPerson}
          onChange={(person) => {
            setQuery('')
            setSelectedPerson(person)
          }}
        >
          <Label className="block text-sm font-medium mb-1 text-foreground">Assigned to</Label>
          <div className="relative mt-1">
            <ComboboxInput
              size="sm"
              state="default"
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => setQuery('')}
              displayValue={(person: typeof people[0] | null) => person?.name || ''}
            />
            <ComboboxButton />

            {filteredPeople.length > 0 && (
              <ComboboxOptions size="sm">
                {filteredPeople.map((person) => (
                  <ComboboxOption
                    key={person.id}
                    value={person}
                    checkPosition="right"
                    padding="md"
                  >
                    <div className="flex items-center">
                      <img 
                        src={person.imageUrl} 
                        alt="" 
                        className="size-6 shrink-0 rounded-full" 
                      />
                      <span className="ml-3 truncate">{person.name}</span>
                    </div>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}
          </div>
        </Combobox>
      </Card>
    </div>
  )
} 