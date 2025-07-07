

import React from 'react'

export default function Actions({rowData,setBrandToEdit,handleDeleteBrand}) {
  
  return (
    <>
        <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" 
        title="ویرایش دسته" data-bs-toggle="modal" data-bs-placement="top"
         data-bs-target="#add_brand_modal" 
         onClick={()=>setBrandToEdit(rowData)}></i>

           <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
        title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"
        onClick={()=>handleDeleteBrand(rowData)}></i>
    </>
  )
}
