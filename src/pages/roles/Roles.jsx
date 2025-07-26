

import React from 'react'
import RolesTable from './RolesTable'
import AddRoles from './AddRoles'

export default function Roles() {
  return (
        <div id="manage_role_section" className="manage_role_section main_section">
            <h4 className="text-center my-3">مدیریت نقش ها</h4>

                <RolesTable/>
        </div>
  )
}
