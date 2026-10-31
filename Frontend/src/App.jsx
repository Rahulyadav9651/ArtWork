import { useState } from 'react'


import Navbar from './component/common/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signup from './component/pages/Signup'
import VerifyEmail from './component/pages/VerifyEmail'
import Login from './component/pages/Login'

function App() {
 

  return (
    <div className='w-screen min-h-screen bg-richblack-700 flex flex-col font-inter'>

<Navbar/>
<Routes>
<Route path='/signup' element={<Signup/>}/>
<Route  path='/verify-email' element={<VerifyEmail/>}/>
<Route path='/login' element={<Login/>}/>



</Routes>

    </div>
  )
}

export default App
