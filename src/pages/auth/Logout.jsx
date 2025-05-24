

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Alert } from '../../utils/Alert'

export default function Logout() {
 const [loading,setLoading]=useState(true)

 useEffect(()=>{
  const loginToken=JSON.parse(localStorage.getItem('loginToken'))
  axios.get('https://ecomadminapi.azhadev.ir/api/auth/logout' , {
    headers :{     
      Authorization:`Bearer ${loginToken.token}`,
    } 
  }).then(res=>{
    if (res.status==200) {
         console.log(res.data);
        localStorage.removeItem("loginToken")
        setLoading(false)
    }else{
        Alert("خطا",res.data.message,"error")
    }
  }).catch(error=>{
    setLoading(false)
     Alert("خطا",'متاسفم مشکلی در سمت سرور رخ داده است',"error")
  })
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
