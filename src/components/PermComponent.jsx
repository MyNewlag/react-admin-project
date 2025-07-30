

import React from 'react'
import { useHasPermission } from '../hook/permissionsHook'
import { Navigate } from 'react-router-dom'

export default function PermComponent({component,pTitle}) {
    
    const hasPerm=useHasPermission(pTitle)
    return hasPerm ? component : <Navigate to={'/'}/>
}
