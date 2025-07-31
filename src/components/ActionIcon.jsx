
import React from 'react'
import { useHasPermission } from '../hook/permissionsHook'

export default function ActionIcon({icon , pTitle , ...props}) {
    const hasPerm = useHasPermission(pTitle)
    console.log(pTitle);
    
  return hasPerm &&(
        <i 
        className={`${icon}  mx-1 hoverable_text pointer has_tooltip`}
        data-bs-toggle="tooltip" 
        data-bs-placement="top"
        {...props}
         ></i>
  )
}
