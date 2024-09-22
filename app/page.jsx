import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (

   <section className='w-full flex-center flex-col'>


      <h1 className='text-center head_text'>Discover & Share
{/* <br className='max-md:hidden'/> */}
<br />
<span className='text-center orange_gradient'>AI Powered Prompts</span>
</h1>
<p className='desc text-center'>
  Prompt Master, your prompt assitant. Whether you are a developer or designer or others, wanna a good prompt for helping, search here, create here and enjoy that one.
</p>

      <Feed  />
    {/* <div>this is feed</div> */}
    </section>
    

  )
}

export default Home