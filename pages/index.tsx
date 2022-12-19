import Head from 'next/head'
import React from "react";
import Link from 'next/link'
import ScrollImg from './scrollImg';
import MainEvent from './mainEvent/mainEvent';
// import { id } from 'aws-sdk/clients/datapipeline';
import Image from 'next/image'
import admin from '../public/admin.png' 


interface IHome {
  signOut: ()=> void
  
  user: Record<string, any>
  renderedAt: string;
}
// Interface IHome {
//   user: TUser
//   }
  
//   Type TUser = {
//   userName: string 
//   }

function Home({ }: IHome) {  
  return (
    <div className='cursor-pointer'>
      <Head>
        <title>Weeout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" font-mono bg-gray-200 h-full ">
        <main >
        <nav className="bg-gray-800 p-2 mt-0 fixed w-full z-10 top-0">
        <div className="container mx-auto flex flex-wrap items-center">
		    <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
				<div className="text-white no-underline hover:text-white hover:no-underline">
					<div className="flex text-2xl pl-2">
            <div className="em em-grinning"></div> Bienvenido a 
            <div className='text-violet-500 mx-2'>Weeout</div> 
            <Image className="w-5 h-5 rounded-full mx-2 my-1" src={admin} alt="Rounded avatar"/>
          </div>
				</div>
            </div>
			<div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
				<ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
				  <li className="mr-3">
            <Link href='/aboutUs' className='inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4'>Mas sobre nosotros</Link>
				  </li>
          <li className="mr-3">
					<a className="inline-block py-2 px-4 text-white no-underline hover:text-violet-500 hover:text-underline py-2 px-4" href='/post'>Comienza a disfrutar</a>
				  </li>
				</ul>
			</div>
        </div>
     </nav>
          <section className="container mx-auto text-center py-6 mb-12">
            <div className="w-full mb-4">
              <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
            <ScrollImg/>
          <MainEvent/>
          </section>   

        </main>
        
      </div>
      {/* <div style={{ padding: 50 }}>
      <h1>Logged in as {user.username}.</h1>
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
      <div>This page was server-side rendered on {renderedAt}.</div>
    </div> */}
    </div>
  )
}

export default Home;