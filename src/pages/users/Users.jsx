

import React from 'react'
import UsersTable from './UsersTable'
import AddUser from './AddUser'

export default function Users() {
  return (
       <div id="manage_user_section" className="manage_user_section main_section">
            <h4 className="text-center my-3">مدیریت کاربران</h4>
              <UsersTable/>
        </div>
  )
}
