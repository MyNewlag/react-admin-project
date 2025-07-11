
import React from 'react'

export default function Actions({rowData,handleDeleteProduct}) {
  return (
    <>
        <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" 
        title="ویرایش ممحصول" data-bs-toggle="modal" data-bs-placement="top"
         data-bs-target="#add_color_modal" 
         ></i>

          <i
            className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip"
            title="ثبت ویژگی"
            data-bs-toggle="modal"
            data-bs-target="#add_product_attr_modal"
          ></i>

        <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
        title="حذف محصول" data-bs-toggle="tooltip" data-bs-placement="top"
      onClick={()=>handleDeleteProduct(rowData)} ></i>
    </>
  )
}
