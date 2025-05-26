
import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import AddCategory from './AddCategory'
import { getCategoriesService } from '../../service/getCategoriesService';
import { Alert } from '../../utils/Alert';
import ShowInMenu from './tableAdditions/ShowInMenu';
import Actions from './tableAdditions/Actions';

export default function CategoryTable() {

  const [data ,setData]=useState([]);

const handleGetCategories=async ()=>{
  try {
    const res=await getCategoriesService()
    if (res.status==200) {
      setData(res.data.data)
    }else{
       Alert("خطا",res.data.message,"error")
    }
  } catch (error) {
     Alert("خطا","مشکل از سمت سرور است","error")
  }
}

useEffect(()=>{
  handleGetCategories()
},[])
   

    const dataInfo=[
        {field:"id" , title:"#"},
        {field:"title" , title:"عنوان محصول"},
        // {field:"show_in_menu" , title:"نمایش در منو"},
        {field:"parent_id" , title:"والد"},
        {field:"created_at" , title:"تاریخ"}
    ]




   const additionFeild =[
     {
       title:"نمابش در منو",
       elements:(rowData)=><ShowInMenu rowData={rowData}/>
      },
      {
      title:"عملیات",
      elements:(rowData)=><Actions rowData={rowData}/>
     },
]



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
