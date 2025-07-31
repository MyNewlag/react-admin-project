
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ActionIcon from '../../../components/ActionIcon'

export default function Actions({rowData,handleDeleteProduct}) {
  const navigate=useNavigate()
  return (


       <>
      <ActionIcon
        icon="fas fa-edit text-warning"
        pTitle="update_product"
        title="ویرایش محصول"
        onClick={() =>
          navigate("/products/add-product", {
            state: { productToEdit: rowData },
          })
        }
      />

      <ActionIcon
        icon="fas fa-receipt text-info"
        pTitle="create_product_attr"
        title="ثبت ویژگی"
        onClick={() =>
          navigate("/products/set-attr", {
            state: { selectedProduct: rowData },
          })
        }
      />

      <ActionIcon
        icon="fas fa-images text-success"
        pTitle="create_product_image"
        title="مدیریت گالری"
        onClick={() =>
          navigate("/products/gallery", {
            state: { selectedProduct: rowData },
          })
        }
      />

      <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_product"
        title="حذف محصول"
        onClick={() => handleDeleteProduct(rowData)}
      />
    </>

  )
  
}
