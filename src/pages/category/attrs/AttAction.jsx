

import React from 'react'

export default function AttAction({rowData}) {
  return (
    <>
      
      <i className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
            title="ویرایش ویژگی" data-bs-toggle="tooltip" data-bs-placement="top"
           ></i>
      
        <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
        title="حذف ویژگی" data-bs-toggle="tooltip" data-bs-placement="top"
        ></i>
    </>
  )
}
