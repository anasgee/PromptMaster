import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname,useRouter } from 'next/navigation';


const PromptCard = ({post,handleTagClick,handleEdit, handleDelete}) => {
  const {data:session} =useSession();
  const router = useRouter();
  // const router = useRouter();
  const pathName =  usePathname();
  const [copied, setCopied] = useState('');

  const copyText =()=>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>setCopied(false),3000);
  }
const hanldeImageClick=()=>{
  if(post.creator._id === session?.user.id ){
    router.push('/profile');
  }
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
}


  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start'>
        <div className='flex-1 flex justify-start items-center gap-2 cursor-pointer'>
          <Image
          src={post.creator.image}
          alt='Creator Image'
          onClick={hanldeImageClick}
          width={40}
          height={40}
          className='rounded-full object-contain'
          />

<div className='flex flex-col '>
          <h3 className='font-stoshi font-semibold text-gray-900' >{post.creator.username} </h3>
          <p className='font-sm text-gray-500' >{post.creator.email} </p> 

        </div>

        </div>
      <div className='copy_btn flex flex-col w-full'
      
      onClick={copyText}

      >
        <Image
        src={copied === post.prompt ? `/assets/icons/tick.svg`:`/assets/icons/copy.svg`}
        alt='copy text'
        width={17}
        height={17}
        />
        
        <p>
        {copied ? `Copied` : ""}
        </p>

      </div>


      </div>

<p className='mt-3 text-gray-900 p-2 ' >{post.prompt} </p>
<p className='text-gray-700 mt-3 p-2' onClick={()=>handleTagClick && handleTagClick(post.tag)}>#{post.tag} </p>
   
    
   {
    session?.user.id === post.creator._id && pathName === '/profile' &&(
      <div className="flex justify-center gap-3">
    <p onClick={handleEdit} className="text-blue-700 cursor-pointer">Edit</p>
    <p onClick={handleDelete} className="text-red-700 cursor-pointer">Delete</p>
   </div>
    )
   }
   
    </div>
  )
}

export default PromptCard