
import React from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import AddCategory from './AddCategory'

export default function CategoryTable() {

     const data=[
        {
            id:"1",
            category:"aaa",
            title:"ab",
            price:"1",
            stock:"4",
            like_count:"2",
            status:"2"
        },
        {
            id:"2",
            category:"bbb",
            title:"abb",
            price:"2",
            stock:"4",
            like_count:"2",
            status:"2"
        },
        {
            id:"3",
            category:"abbb",
            title:"abbb",
            price:"3",
            stock:"4",
            like_count:"2",
            status:"2"
        },
        {
            id:"4",
            category:"ddd",
            title:"ddd",
            price:"4",
            stock:"4",
            like_count:"2",
            status:"2"
        },
    
        {
            id:"5",
            category:"ddd",
            title:"eee",
            price:"5",
            stock:"4",
            like_count:"2",
            status:"2"
        },
    
    ]

    const dataInfo=[
        {field:"id" , title:"#"},
        {field:"title" , title:"عنوان محصول"},
        {field:"price" , title:"قیمت محصول"}
    ]


    const additionalElements=(itemId)=>{
        return(
            <>
                <i className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
                 title="زیرمجموعه" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" 
                title="ویرایش دسته" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_product_category_modal"></i>
                <i className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip" 
                title="افزودن ویژگی" data-bs-placement="top" data-bs-toggle="modal" data-bs-target="#add_product_category_attr_modal"></i>
                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
                title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>
            </>
        )
    }

   const additionFeild ={
    title:"عملیات",
    elements:(itemId)=>additionalElements(itemId)
   }

  return (
    <>
    <PaginatedTable
    data={data}
    dataInfo={dataInfo}
    additionFeild={additionFeild}
    numOfPage={2}
    >
      <AddCategory/>
    </PaginatedTable>
           {/*  <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination dir_ltr">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                </ul>
              </nav> */}
    </>
  )
}
