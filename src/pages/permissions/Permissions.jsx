

import React from 'react'
import PermissionTable from './PermissionTable'

export default function Permissions() {
  return (
        <div id="manage_permission_section" className="manage_permission_section main_section">
            <h4 className="text-center my-3">مدیریت مجوز ها</h4>

            <PermissionTable/>
        </div>
  )
}
