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
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae mollitia suscipit sapiente repellat alias maiores atque debitis, molestiae enim praesentium quas eum id nobis voluptas iusto! Molestias minima consequatur impedit doloremque sit.
</p>

      <Feed  />

    </section>
    

  )
}

export default Home