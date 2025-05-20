
import React from 'react'

export default function SidebarGropTitle(props) {

  const {title}=props
  return (
    <div>
          <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover sidebar_item">
              <span className="hiddenable no_wrap group_sidebar_title">{title}</span>
          </li>
    </div>
  )
}
