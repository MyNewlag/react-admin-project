
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Actions({rowData}) {

  const params=useParams()
  
  const navigate=useNavigate();
  return (
      <>
      {
      !params.categoryId ?(
        <i className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
            title="زیرمجموعه" data-bs-toggle="tooltip" data-bs-placement="top"
            onClick={()=>navigate(`/categories/${rowData.id}`,{
            state:rowData
          })}></i>
      ):(
        null
      )
      }
       

        <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" 
        title="ویرایش دسته" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_product_category_modal"></i>

        <i className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip" 
        title="افزودن ویژگی" data-bs-placement="top" data-bs-toggle="modal" data-bs-target="#add_product_category_attr_modal"></i>

        <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
        title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>
     </>
  )
}
