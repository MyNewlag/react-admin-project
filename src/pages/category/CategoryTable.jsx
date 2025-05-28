
import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import AddCategory from './AddCategory'
import { getCategoriesService } from '../../service/getCategoriesService';
import { Alert } from '../../utils/Alert';
import ShowInMenu from './tableAdditions/ShowInMenu';
import Actions from './tableAdditions/Actions';
import { Outlet, useParams } from 'react-router-dom';
import { convertDateToJalali } from '../../utils/convertDate';



export default function CategoryTable() {

  const params=useParams()
  

  const [data ,setData]=useState([]);

const handleGetCategories=async ()=>{

  try {
    const res=await getCategoriesService(params.categoryId)
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
},[params])
   

    const dataInfo=[
        {field:"id" , title:"#"},
        {field:"title" , title:"عنوان محصول"},
        // {field:"show_in_menu" , title:"نمایش در منو"},
        {field:"parent_id" , title:"والد"},
    ]




   const additionFeild =[
     {
       title:"تاریخ",
       elements:(rowData)=> convertDateToJalali(rowData.created_at)
      },
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
    <Outlet/>

    {
      data.length ?
      (
            <PaginatedTable
    data={data}
    dataInfo={dataInfo}
    additionFeild={additionFeild}
    numOfPage={2}
    >
      
      <AddCategory/>
    </PaginatedTable>
      ):(
        <h4 className='text-center my-5 text-danger'>دسته بندی برای نمایش  وجود ندارد</h4>
      )
    }

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
