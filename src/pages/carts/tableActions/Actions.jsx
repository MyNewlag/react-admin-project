
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Actions({rowData,handleDeleteCart}) {
  const navigate=useNavigate()
      return (
    <>
        <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" 
        title="ویرایش سبد" data-bs-toggle="modal" data-bs-placement="top"
         data-bs-target="#add_color_modal" 
          onClick={()=>navigate("/carts/add_cart" , {state:{cartId:rowData.id}})}
         ></i>

        <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
        title="حذف رنگ" data-bs-toggle="tooltip" data-bs-placement="top"
       onClick={()=>handleDeleteCart(rowData)} ></i>
    </>
  )
}
