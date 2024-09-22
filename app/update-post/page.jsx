"use client"
import React, { useEffect,useState } from 'react'
import Form from '@components/Form'
import { useRouter,useSearchParams } from 'next/navigation'

const UpdatePost = () => {
const router = useRouter();
const searchParams = useSearchParams();
const promptId = searchParams.get("id");

    const [post,setPost] = useState({prompt:"",tag:""});
    const [submitting,setIsSubmitting] = useState(false);


useEffect(()=>{
    const fetchPost = async()=>{
        const fetchedPost = await fetch(`/api/prompt/${promptId}`);
        const response = await fetchedPost.json();
        setPost ({
            prompt: response.prompt,
            tag: response.tag,
        });
    }
  if(promptId)fetchPost();
},[promptId])



const updatePost = async(e)=>{
    e.preventDefault();
    setIsSubmitting(true);
    if (!promptId) return alert("Missing PromptId!");

    try{
        const response = await fetch(`/api/prompt/${promptId}`,{
            method:"PATCH",
            body:JSON.stringify({prompt:post.prompt,tag:post.tag})
        })
        if(response.ok){
            router.push('/')
        }

    }
    catch(error){
        console.log(error);
    }
finally{
    setIsSubmitting(false)
}

}

  return (
    <div>

<Form
   type="Edit Post "
   post ={post}
   setPost={setPost}
   submitting= {submitting}
   handleSubmit = {updatePost}

   />


    </div>
  )
}

export default UpdatePost