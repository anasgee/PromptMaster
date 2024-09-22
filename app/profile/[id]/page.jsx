'use client'
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';


const MyProfile = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const userName = searchParams.get('name');

    const [myPost,setMyPost] =useState([])



const fetchUser =async()=>{
    const response = await fetch(`/api/users/${params?.id}/posts`)
    const data = await response.json();
    setMyPost(data);
}

useEffect (()=>{
  if(params?.id) fetchUser();
},[params?.id]);

  return (
   <Profile
   name={userName}
   desc ={`Welcome to ${userName}'s profile`}
   data={myPost}
   
   />
  )
}

export default MyProfile