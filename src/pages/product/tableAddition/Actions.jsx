
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
  
<<<<<<< HEAD
}




        const handleGetAttributes= async()=>{
          let attrVar=[]
            await Promise.all (
            selectedProduct.categories.map(async (cat)=>{
                const res=await getCategoryAttrService(cat.id)
                if (res.status==200) {
                    console.log(res.data.data);
                    attrVar=[...attrVar , {groupTitle:cat.title , data:res.data.data}] 
                }else{
                    return {groupTitle:cat.title , data:[]}
                }
                    })).then(()=>{
                        setAttrs(attrVar)
                    })
                }
=======
}
>>>>>>> a54064e (Set Attribute_2)
