

import React from 'react'
import CategoryTable from './CategoryTable'
import AddCategory from './AddCategory'
import AddAttribute from './AddAttribute'

export default function Category() {
  return (
    <div id="manage_product_category" className="manage_product_category main_section">
            <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>

                <CategoryTable/>
                <AddAttribute/>
 
        </div>
  )
}
