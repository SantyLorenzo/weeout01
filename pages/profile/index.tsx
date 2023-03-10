import {
  Authenticator,
  Flex,
  useAuthenticator,
  useTheme,
} from '@aws-amplify/ui-react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Event } from '../../src/models'
import Image from 'next/image'
import { Amplify, withSSRContext } from 'aws-amplify'
import { ModelEventFilterInput } from '../../src/API'
import { listEvents } from '../../src/graphql/queries'
import awsExports from '../../src/aws-exports'
import EventsUser from '../../src/components/filterUser/filterUser'
import EventCreateForm from '../../src/components/eventCreateFormEdited/EventCreateForm'
import { EventCreateFormInputValues } from '../../src/components/eventCreateFormEdited/EventCreateForm'
import { Spinner } from '@theme-ui/components'
import svg3 from '../../public/svg3.svg'


Amplify.configure({ ...awsExports, ssr: true })

interface IProps {
  signOut: () => void
  user: Record<string, any>
  renderedAt: string
  events: Array<Event>
  filters: Partial<IFilters>
}
export interface IFilters {
  startDate?: string
  types?: string
  userId?: string
}
export async function getServerSideProps({ req, query }: any) {
  const SSR = withSSRContext({ req })
  const renderedAt = new Date()
  const startDate = new Date(query.startDate)
  const formattedBuildDate = renderedAt.toLocaleDateString('en-US', {
    dateStyle: 'long',
  })
  const formattedBuildTime = renderedAt.toLocaleTimeString('en-US', {
    timeStyle: 'long',
  })
  const types = query.types
  const userId = query.userId
  const filterOptions = {
    ...(query.types && { types: { contains: types } }),
    ...(query.startDate && { startDate: { gt: startDate.toISOString() } }),
    ...(query.userId && { user: { eq: userId } }),
  }
  const filter: ModelEventFilterInput = {
    and: [{ ...filterOptions }],
  }
  try {
    const response = await SSR.API.graphql({
      query: listEvents,
      variables: { filter: filter },
    })
    console.log(response)
    return {
      props: {
        events: response.data.listEvents.items,
        filters: filterOptions,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: { renderedAt: `${formattedBuildDate} at ${formattedBuildTime}` },
    }
  }
}

function Profile({ events = [], signOut, filters }: IProps) {
  const router = useRouter()
  const id = router.query.id as string
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState<boolean>(false)
  // const SSR = withSSRContext({ req })

  const { user } = useAuthenticator((context) => [context.user])

  const refreshData = ({ userId, startDate, types }: IFilters) => {
    router.push({
      pathname: '/profile',
      query: { startDate: startDate, types: types, userId: userId },
    })
  }

  useEffect(() => {
    refreshData({ userId: user.username })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const authComponents = {
    Header() {
      const { tokens } = useTheme()
      return (
        <Flex
          justifyContent={'center'}
          direction="column"
          paddingTop={tokens.space.xxxl}
          paddingBottom={tokens.space.xxl}
        ></Flex>
      )
    },
  }

  const handleSuccess = (newEvent: Event) => {
    console.log('ASDASD', { newEvent })
    router.push(`/events/edit/${newEvent.id}`)
  }
  const handleError = (_event: EventCreateFormInputValues, message: string) => {
    setError(message)
    setLoading(false)
  }
  const handleSubmit = (event: EventCreateFormInputValues) => {
    setLoading(true)

    return {
      ...event,
      ...{
        user: user.username,
      },
    }
  }
  const handleChange = (newFilters: IFilters) => {
    const prevFilters = router.query
    refreshData({
      ...(prevFilters as unknown as IFilters),
      ...newFilters,
    })
  }
  return (
    <Authenticator components={authComponents} hideSignUp={true}>
      <nav className="bg-violet-800 p-2 mt-0 fixed w-full z-10 top-0 " style={{background:'#2596be'}}>
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
            <div className="text-white no-underline hover:text-white hover:no-underline">
              <div className="flex text-2xl pl-2">
                <div className="em em-grinning"></div>
                Bienvenido a<div className="text-yellow-500 mx-2">Weeout</div>
              </div>
            </div>
          </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center pb-2">
              <li className="mr-3">
                <Link
                  href="/"
                  style={{background:'#ba7dc2'}} className=" text-white font-semibold   py-2 px-4 border border-white-500 hover:border-transparent rounded flex items-center justify-center"
                  >
                  Pagina principal
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  href="/"
                  style={{background:'#ba7dc2'}} className=" text-white font-semibold   py-2 px-4 border border-white-500 hover:border-transparent rounded flex items-center justify-center"
                  onClick={signOut}
                >
                  Cerrar sesion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="h-full p-8 flex items-center justify-center"
        style={{ background: '#ba7dc2' }}
      >
        <div className=" break-words bg-white  mt-16 border border-gray-300 w-6/6 rounded-lg p-8 ">
          <div className="">
            <div className="" >
              <div className="justiify-center flex flex-col items-center">
                
                <h3 className="mt-20 flex items-cen  text-4xl text-slate-700 font-bold leading-normal mb-1">
                  Hola {user.username} Bienvenido!
                </h3>
                <Image alt="" src={svg3} width={500} height={500} />

                <h1 className="mt-10 text-2xl text-slate-500 font-bold leading-normal mb-1">
                  Ahora que estas aqui, podras crear tus propios eventos <br/> Comienza eligiendo un nombre que te guste:{' '}
                </h1>
                <EventCreateForm
                  onSuccess={handleSuccess}
                  onSubmit={handleSubmit}
                  onError={handleError}
                  
                />
                {error && <div>{error}</div>}
                {isLoading && <Spinner />}
                <h1 className="mt-10 mb-20 text-2xl text-slate-500 font-bold leading-normal mb-1">
                  No olvides que darle a Subir Evento te llevara a la siguiente fase.
                </h1>
              </div>
        
              <div className="p-8  flex justify-center mt-6 py-6 border-t border-slate-300 text-center">
                <div className=" overflow-hidden flex items-center justify-center">
                  <div className="mt-8 mb-8 grid-cols-1 p-10">
                    <h1 className="text-3xl text-slate-700 font-bold leading-normal mb-10">
                      Busca uno de tus eventos y haz click para editarlo:{' '}
                    </h1>

                    <main className="grid gap-6 gap-y-8  ">
                      <section className="grid grid-cols-3 col-start-2 gap-4 lg:gap-6 gap-y-8 content-start">
                        <div
                          className="col-span-12  object-cover lg:row-span-2 rounded-lg"
                          
                        >
                          <EventsUser
                            events={events}
                            filters={filters}
                            updateFilters={handleChange}
                          />
                        </div>
                      </section>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="grid grid-cols-3 col-start-2 gap-4 lg:gap-6 gap-y-8 content-start"></section>
      <footer className="p-4   shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800"style={{background:'#2596be'}}>
        <span className="text-sm text-white sm:text-center dark:text-gray-400">
          ?? 2022. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link
              href="/aboutUs"
              className="mr-8  hover:text-yellow-500 md:mr-6 text-1xl text-white"
            >
              Sobre nosotros
            </Link>
          </li>
        </ul>
      </footer>
    </Authenticator>
  )
}
export default withAuthenticator(Profile)
