

import React from 'react'
import Login from '../../pages/auth/Login'
import { Route, Routes } from 'react-router-dom'

export default function AuthLayout() {
  return (
          <div className="limiter">
            <div className="container-login100">
              <Routes>
                <Route path='/login' element={<Login/>}/>
              </Routes>
               </div>
           </div>
  )
}
