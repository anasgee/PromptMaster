import Link from 'next/link';
import React from 'react'

const Form = ({ type,  post,  setPost,  submitting,  handleSubmit}) => {
  return (
      <section className="w-full flex flex-start max-w-full flex-col">
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{type} Post </span>
        </h1>
        <p className='max-w-md text-left desc'>
          {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered Plateform
        </p>
        <form
        onSubmit={handleSubmit}
         className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>
          <textarea style={{resize:"none"}} value={post.prompt}
          onChange={(e)=>setPost({...post,prompt:e.target.value})}
          placeholder='Enter your Prompt'
          required
          className='form_textarea'
          ></textarea>
        
        
          </label>


          {/* Form Tag */}
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>Tag <span className='font-normal' > (#product, #webdevelopment) </span> </span>
          <textarea style={{resize:"none"}} value={post.tag}
          onChange={(e)=>setPost({...post,tag:e.target.value})}
          placeholder='#tag'
          required
          className='form_input'
          ></textarea>
          </label>
        <div className='flex flex-end mt-5 mx-3 gap-5'>
          
        <Link className='text-gray-500' href="/">Cancel</Link>
        <button
        type='submit'
        disabled = {submitting }
        className='bg-orange-500 px-3 py-2 hover:bg-orange-700 rounded-full text-white'
        >
          {submitting ? `${type}....`: type}
          </button>
        </div>


        </form>
      </section>
    
  )
}

export default Form;