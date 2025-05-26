

import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Alert } from '../../utils/Alert'
import { logoutService } from '../../service/auth';

export default function Logout() {
 const [loading,setLoading]=useState(true)


 const handleLogout=async ()=>{
   try {
  const res =await logoutService()
        if (res.status==200) {
        //  console.log(res.data);
        localStorage.removeItem("loginToken")
        setLoading(false)
    }else{
        Alert("خطا",res.data.message,"error")
    }
  } catch (error) {
      setLoading(false)
     Alert("خطا",'متاسفم مشکلی در سمت سرور رخ داده ',"error")
  }

 }

 useEffect(()=>{
handleLogout();
 },[])

  return (
    <div>
      {
        loading ?(
          <h1 className='text-center'>
              لطفا صبر کنید ...
          </h1>
    ):(
      <Navigate to='/auth/login'/>
    )
      }
    </div>
  )
}
