

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Actions({rowData,handleDeleteRole}) {
  const navigate = useNavigate()
  return (
    <>
      <i className=' fas fa-edit text-warning mx-1 hovweable_text pointer has_tooltip'
      title='ویرایش نقش '
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      onClick={()=>navigate('/roles/add-role' , 
        {state:{roleToEdit: rowData.id , editType:"role"}})}
      ></i>

      <i className=' fas fa-fingerprint text-info mx-1 hovweable_text pointer has_tooltip'
      title='دسترسی ها '
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      onClick={()=>navigate('/roles/add-role' , 
        {state:{roleToEdit: rowData.id , editType:"permissions"}})}
      ></i>

      <i className=' fas fa-times text-danger mx-1 hovweable_text pointer has_tooltip'
      title='حذف کد تخفیف'
      data-bs-toggle='tooltip'
      data-bs-placement='top'
    onClick={()=>handleDeleteRole(rowData)}
      ></i>
    </>
  )
}
