

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrevPageButton() {
    const navigate=useNavigate()
  return (
        <button className='btn btn-sm btn-secondary' onClick={()=>navigate(-1)}>بازگشت </button>
  )
}
