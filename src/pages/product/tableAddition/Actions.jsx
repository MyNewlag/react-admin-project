
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Actions({rowData,handleDeleteProduct}) {
  const navigate=useNavigate()
  return (
    <>
        <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" 
        title="ویرایش محصول" 
        onClick={()=>navigate('/products/add-product' ,
          {state:{productToEdit:rowData}}
        )}
         ></i>

          <i
            className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip"
            title="ثبت ویژگی"
            onClick={()=>navigate('/products/set-attr' ,
              {state:{selectedProduct:rowData}})}
          ></i>

        <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
        title="حذف محصول" data-bs-toggle="tooltip" data-bs-placement="top"
      onClick={()=>handleDeleteProduct(rowData)} ></i>
    </>
  )
  
}
