import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({name,data,desc,handleEdit,handleDelete}) => {
  return (
    <div>

      <h1>
        <span className='head_text orange_gradient'>{name}</span>
      </h1>
    <p>{desc}</p>

    <div className='mt-10 prompt_layout'>
      {
        data.map((post)=>{
       return <PromptCard
       key={post._id}
       post = {post}
       handleEdit ={()=>handleEdit && handleEdit(post)}
       handleDelete ={()=>handleDelete && handleDelete(post)}
       />

        })
      }
    </div>






    </div>
  )
}

export default Profile