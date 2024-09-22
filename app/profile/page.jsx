'use client'
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const MyProfile = () => {

  const router = useRouter();
    const {data:session} = useSession();
    const [myPost,setMyPost] =useState([])

const handleEdit =(post)=>{

  router.push(`/update-post?id=${post._id}`);

}
const handleDelete =async(post)=>{
  const hasConfirmed = confirm("Are you sure to delete that prompt, after deleted it will never be retrieved");

  if(hasConfirmed){
    try{
      await fetch(`api/prompt/${post._id.toString()}`,{
        method:"DELETE"
      });
      const filteredPost = myPost.filter((item)=>item._id !==post._id);

      setMyPost(filteredPost);
    }
    catch(error){
      console.log(error);
    }
  }
}
const fetchUser =async()=>{
    const response = await fetch(`/api/users/${session?.user.id}/posts`)
    const data = await response.json();
    setMyPost(data);
}

useEffect (()=>{
    if(session?.user.id) fetchUser();
},[session?.user.id]);

  return (
   <Profile
   name={session?.user.name}
   desc ={`Welcome to ${session?.user.name}'s customized profile`}
   data={myPost}
   handleEdit = {handleEdit}
   handleDelete = {handleDelete}
   />
  )
}

export default MyProfile