import { Amplify } from 'aws-amplify'
import awsExports from '../../aws-exports'
import { FocusEvent } from 'react'
import { Event } from '../../models'
import { IFilters } from '../../../pages'
import EventCard2 from '../eventCard2/eventCard2'
import Link from 'next/link'
import svg5 from '../../../public/svg5.svg'
import Image from 'next/image'


Amplify.configure({ ...awsExports, ssr: true })
interface IProps {
  events: Array<Event>
  filters: Partial<IFilters>
  updateFilters: (newValue: Partial<IFilters>) => void
}

export default function EventsUser({
  events = [],
  updateFilters,
  filters,
}: IProps) {
  const handleChange = (value: string, name: string) => {
    updateFilters({ [name]: value })
  }

  return (
    <div className="flex border border-gray-300 w-6/6 rounded-lg p-8   "style={{padding:'8px', marginBottom:'100px',background:'#2596be',borderRadius:'10px' ,  color:'white', }}>
      <div className=" mb-10 mt-10  " style={{ maxWidth: '400px' }}>
        <div className="flex flex-col py-6 p-8 ">
          <h2 className="font-medium text-sm text-stone-600">Fecha inicio: </h2>
          <input
            className="w-7"
            type="date"
            placeholder="Fecha"
            onBlur={(e: FocusEvent<HTMLInputElement>) => {
              handleChange(e.target.value, 'startDate')
            }}
          />
        </div>
        <div className="flex flex-col p-8 ">
          <h2 className="font-medium text-sm text-stone-600">
            Tipo de evento:
          </h2>
          <input
            className="w-7"
            type="text"
            placeholder="tipo"
            onBlur={(e: FocusEvent<HTMLInputElement>) => {
              handleChange(e.target.value, 'types')
            }}
          />
          <Image alt="" src={svg5} width={500} height={500} />
          <h2 className="font-medium text-sm text-stone-600 text-lg">Filtra entre los eventos existentes para encontrar el que mas te guste.</h2>

        </div>
      </div>

      <div className="flex justify-center"style={{background:'white',
      padding: '48px', borderRadius:'10px'}}>
        <div className="justify-center">
          <div className="text-xl font-medium mb-12 border-b border-gray-300 ">
            <h5 className="py-1 mb-1" style={{color:'black'}}>
              Cantidad de eventos disponibles: {events.length}
            </h5>
          </div>

          <div
      className="flex flex-wrap "
      style={{
        width: '860px',
        height: '900px',
        overflow: 'auto',
      }}
    >
          <div className="">
            {events.map((event: any) => {
              return (
                <Link href={`/events/edit/${event.id}`} key={event.id}>
                  <EventCard2 event={event} key={event.id} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
