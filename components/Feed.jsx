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
//input search field
  const [searchPrompt,setSearchPrompt] = useState('');

  //for timeout
  const [searchTimeout,setSearchTimeot] = useState(null);


  //filtered prompts
  const [searchedPrompts,setSearchedPrompts] =useState([]);

  //all prompts
  const [allPost,setAllPost] = useState([]);



  useEffect(()=>{
    const promptData = async()=>{
      const response = await fetch('/api/prompt');
      const data = await response.json();
      
      setAllPost(data);
      // console.log(data)
   
    };
    promptData();
  },[]);
  


  const filterPrompts = (searchText) => {

    const regex = new RegExp(searchText , "i");

   return allPost.filter((item) =>
     { return regex.test(item.creator.username) || regex.test(item.prompt) || regex.test(item.tag)}
    )}
   
  
  const handleChange =(e)=>{

    clearTimeout(searchTimeout);
    setSearchPrompt(e.target.value);

    setSearchTimeot(setTimeout(()=>{
      const searchResult = filterPrompts(e.target.value);
      setSearchedPrompts(searchResult);
    },500))
  }

  const handleTagClick =(tagname)=>{
    setSearchPrompt(tagname);

    const searchResult  = filterPrompts(tagname);
    setSearchedPrompts(searchResult)
  }


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


{
  searchPrompt ? (
<PromptCardList
data={searchedPrompts}
handleTagClick={handleTagClick}
/>
  ):(
<PromptCardList
          data={allPost}
          handleTagClick={handleTagClick}
        />


  )
}
</section>
  )
}

export default Feed