import "@styles/globals.css"
import Nav from "@components/Nav"
import Provider from "@components/Provider"


export const metadata = {
  title:"PrompExpert",
  description:"Prompt expert for Developers"
}


const RootLayot = ({children}) => {
  return (
    <html lang='en'>

      <body>
       <Provider>
       <div className='main'>

<div className='gradient'/>
  </div>

  <main className='app'>
      <Nav/>
      {children}
  </main>
       </Provider>
      </body>

    </html>
  )
}

export default RootLayot