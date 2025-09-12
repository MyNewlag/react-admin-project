
import React from 'react'

export default function ShowInMenu({rowData}) {
  return (
    <div>
        <span className={ rowData.show_in_menu==1 ? "text-success" : "text-danger"}>
            {rowData.show_in_menu==1 ? "هست" : "نیست"}
        </span>
    </div>
  )
}
