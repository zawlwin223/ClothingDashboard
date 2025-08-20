'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function DatePicker({
  onChange,
}: {
  onChange: (date: Date | undefined) => void
}) {
  const [date, setDate] = useState<Date>()

  const handleSelect = function (date: Date | undefined) {
    setDate(date)

    onChange(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground min-w-[100px] ms-0 lg:ms-3  flex-1 justify-start text-left font-normal mt-1">
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Filter By Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-auto  p-3">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
        <Button
          onClick={() => {
            setDate(undefined)
            onChange(undefined)
          }}>
          Clear Date
        </Button>
      </PopoverContent>
    </Popover>
  )
}
