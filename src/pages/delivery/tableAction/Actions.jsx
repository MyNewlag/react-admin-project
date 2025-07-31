
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Actions({rowData,handleDeleteDelivery}) {
  const navigate = useNavigate()
  return (
    <>
      <i className=' fas fa-edit text-warning mx-1 hovweable_text pointer has_tooltip'
      title='ویرایش  '
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      onClick={()=>navigate('/deliveries/add-delivery',
        {state : {deliveryToEdit:rowData}}
      )}
      ></i>

      <i className=' fas fa-times text-danger mx-1 hovweable_text pointer has_tooltip'
      title='حذف روش ارسال'
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      onClick={()=>handleDeleteDelivery(rowData)}
      ></i>
    </>
  )
}
