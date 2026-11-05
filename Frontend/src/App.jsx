import { useState } from 'react'


import Navbar from './component/common/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signup from './component/pages/Signup'
import VerifyEmail from './component/pages/VerifyEmail'
import Login from './component/pages/Login'
import MyProfile from './component/common/MyProfile'

function App() {
 

  return (
    <div className=''>

<Navbar/>
<Routes>
<Route path='/signup' element={<Signup/>}/>
<Route  path='/verify-email' element={<VerifyEmail/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/dashboard/my-profile'   element={<MyProfile/>}/>

</Routes>

    </div>
  )
}

export default App
