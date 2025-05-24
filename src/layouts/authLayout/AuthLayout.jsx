

import React from 'react'
import Login from '../../pages/auth/Login'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { useIsLogin } from '../../hook/authHook';

export default function AuthLayout() {

  const [isLogin,loading]=useIsLogin()

  return (
          <div className="limiter">
            {
              loading ?(
                  <h1 className='text-center'>
                      لطفا صبر کنید ...
                  </h1>
              ): isLogin ?(
                <Navigate to={'/'}/>
              ):(
            <div className="container-login100">
              <Routes>
                <Route path='/auth/login' element={<Login/>}/>
              </Routes>
            </div>
              )
            }
           </div>
  )
}
