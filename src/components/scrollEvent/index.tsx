import EventCard from '../eventCard/eventCard'
import { Event } from '../../models'
import React from 'react'
import Link from 'next/link'

interface IProps {
  events: Array<Event>
}

export default function ScrollEvent({ events }: IProps) {
  return (
    <div
      className="flex flex-wrap overflow-auto "
      style={{
        width: '960px',
        height: '730px',
        marginRight: '30px',
        overflow: 'auto',
      }}
    >
      {events.map((event, index) => {
        return (
          <Link href={`/events/${event.id}`} key={event.id + index}>
            <EventCard event={event} key={event.id + index} />
          </Link>
        )
      })}
    </div>
  )
}
