"use client"

import Image from 'next/image'
import Link from "next/link"
import React from 'react'
import {signIn,signOut,getProviders,useSession} from "next-auth/react"
import { useEffect,useState } from 'react'

const Nav = () => {


    // const isUserLoggedIn  = true
    const {data:session} = useSession();

    const [providers,setProviders]= useState(null);
    const [navToggler,setNavToggler]= useState(false);



useEffect(()=>{


    const setUpProviders = async()=>{
        const response = await getProviders();

        setProviders(response);
    };
    setUpProviders();

}, []);
// useEffect(() => {
//     (async () => {
//       const res = await getProviders();
//       setProviders(res);
//     })();
//   }, []);
  
  return (
    <>
        <nav className='w-full mb-16 pt-3 flex-between'>
            <Link href="/" className='flex gap-2 flex-center'>
            <Image src="/assets/images/logo.svg"
            width={30}
            height={30}
            alt='alt'
            className='object-contain'
            />
            <p className='logo_text'>Promptopia</p>
            </Link>

            {/* {alert(providers)} */}
{/* Desktop Navigation */}
            <div className='hidden sm:flex gap-3 ' >   
        {
session?.user? (
    <>
   
                       <Link className='rounded-full bg-black text-white px-3 py-2 hover:bg-orange-500' href="/create-post">
                Create Post
                </Link>
                <button className='border border-black bg-transparent rounded-full px-3 py-1 hover:bg-black hover:text-white' onClick={signOut}>
                    SignOut
                </button>
                <Link href="/profile">
                <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt='alt'
                className='rounded-full object-contain' 
                />
                </Link>
             

    </>
            

): (
 
      <>
            {
                providers && Object.values(providers).map((provider)=>(
                    <button
                        key={provider.name}
                        type='button'
                        onClick={()=>signIn(provider.id)}
                        className='black_btn'>
                        Sign In
                    </button>
                ))
            }

        </>
    
)
        }
        </div>



{/* Mobile Navigation */}
<div  className='flex sm:hidden'>
{
    session ?.user? (<>
    <div >
    <Image
    alt='alt'
    src={session?.user.image}
    width={37}
    className='cursor-pointer'

    height={37}
    onClick={()=>setNavToggler((prev)=>!prev)}
    />

    {
        navToggler && (
            <div className=' bg-white text-black absolute transition-all rounded-xl top-20  p-5 right-0 min-w-[210px] flex flex-col gap-3 justify-end items-end '>
            {/* // <div className='absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end'> */}
                <Link href="/profile" className='dropdown_link'   onClick={()=>{setNavToggler(false);signOut()}}>
                Profile
                </Link>
                <Link className='dropdown_link' href="/create-post"
                onClick={()=>setNavToggler(false)}
                >
                Create Post
                </Link>
                <button onClick={()=>setNavToggler(false)} className='mt-5 w-full black_btn'>
                    SignOut
                </button>

            </div>)}
            </div>
            </>):(<>
    
        {
             providers && Object.values(providers).map((provider)=>(
                <button 
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                type='button'
                className='black_btn'
                >
                    SignIn
                </button>
             ))
            }
           
          
    </>
)
}
</div>
</nav>
    </>
  )
}

export default Nav
