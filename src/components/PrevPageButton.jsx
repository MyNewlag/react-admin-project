

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrevPageButton() {
    const navigate=useNavigate()
  return (
<<<<<<< HEAD
        <button className='btn btn-sm btn-secondary' type="button"
=======
        <button type='button' className='btn btn-sm btn-secondary' 
>>>>>>> a54064e (Set Attribute_2)
        onClick={()=>navigate(-1)}>بازگشت </button>
  )
}
