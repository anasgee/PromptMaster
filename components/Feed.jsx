"use client";
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';


const PromptCardList =({data,handleTagClick})=>{

  return(

  <div className='mt-16 prompt_layout'>
    {data.map((post)=>{
   return <PromptCard
      key={post._id}
      handleTagClick={handleTagClick}
      post={post}
      />
    })}
  </div>

  )
}

const Feed = () => {

  const [searchPrompt,setSearchPrompt] = useState('');
  const [post,setPost] = useState([]);

  const handleChange =(e)=>{
    setSearchPrompt(e.target.value);
  }

useEffect(()=>{
  const promptData = async()=>{
    const response = await fetch('/api/prompt');
    const data = await response.json();
    
    setPost(data);
    console.log(data)
 
  };
  promptData();
},[]);

  return (

    
    <section className='feed'>
      <form className='relative w-full flex-center'>
      <input className='p-5 w-full rounded-xl '
      type='text'
      placeholder='Enter prompt to search'
      value={searchPrompt}
      onChange={handleChange}
      />
</form>


<PromptCardList
          data={post}
          handleTagClick={()=>{}}
        />
    </section>
  )
}

export default Feed