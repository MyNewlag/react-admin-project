
import React from 'react'

export default function Actions({rowData,deleteDiscount,updateDiscount}) {
  return (
    <>
      <i className=' fas fa-edit text-warning mx-1 hovweable_text pointer has_tooltip'
      title='ویرایش کد تخفیف'
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      onClick={()=>updateDiscount(rowData)}
      ></i>

      <i className=' fas fa-times text-danger mx-1 hovweable_text pointer has_tooltip'
      title='حذف کد تخفیف'
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      onClick={()=>deleteDiscount(rowData)}
      ></i>
    </>
  )
}
