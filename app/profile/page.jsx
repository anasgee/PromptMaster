'use client'
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'

const MyProfile = () => {
    const {data:session} = useSession();
    const [post,setPost] =useState([])

const handleEdit =()=>{

}
const handleDelete =()=>{

}

const fetchUser =async()=>{
    const response = await fetch(`/api/users/${session?.user.id}/posts`)
    const data = await response.json();
    setPost(data);
}

useEffect (()=>{
  if(session?.user.id) fetchUser();
},[])

  return (
   <Profile
   name={session?.user.name}
   desc ={`Welcome to ${session?.user.name}'s customized profile`}
   data={post}
   handleEdit = {handleEdit}
   handleDelete = {handleDelete}
   />
  )
}

export default MyProfile