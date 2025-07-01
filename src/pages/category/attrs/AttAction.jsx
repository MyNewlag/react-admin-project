

import React from 'react'

export default function AttAction({rowData,editAttribute,setEditAttribute}) {
  return (
    <div className={`text-center ${editAttribute ? "alert-danger danger_shadow" : ""}`}>
      
      <i className="fas fa-edit text-warning text-info mx-1 hoverable_text pointer has_tooltip"
            title="ویرایش ویژگی" data-bs-toggle="tooltip" data-bs-placement="top"
           onClick={()=>setEditAttribute(rowData)}
           ></i>
      
        <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
        title="حذف ویژگی" data-bs-toggle="tooltip" data-bs-placement="top"
        ></i>
    </div>
  )
}
