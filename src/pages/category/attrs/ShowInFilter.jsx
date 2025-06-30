
import React from 'react'

export default function ShowInFilter({rowData}) {
  return (
    <div>
        <span className={rowData.in_filter==1 ? "text-success" : "text-danger"}>
            {rowData.in_filter==1 ? "هست" : "نیست"}
        </span>
    </div>
  )
}