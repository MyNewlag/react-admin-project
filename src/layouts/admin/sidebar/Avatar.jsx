import React from 'react'

export default function Avatar(props) {
    const{name,imgSrc}=props
  return (
  <div>
        <li className="align-items-center justify-content-center pt-1 pb-2 d-flex flex-column avatar_li position-relative mb-2 sidebar_item">
            <span className="avatar_box">
                <img className="w-100 h-100 rounded-circle" src={imgSrc}/>
            </span>
                <div className="sidebar_avatar_name text-center hiddenable">{name}</div>
        </li>
    </div>
  )
}
