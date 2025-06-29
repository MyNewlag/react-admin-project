
import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import AddCategory from './AddCategory'
import { getCategoriesService } from '../../service/category';
import ShowInMenu from './tableAdditions/ShowInMenu';
import Actions from './tableAdditions/Actions';
import { Outlet, useParams } from 'react-router-dom';
import { convertDateToJalali } from '../../utils/convertDate';


export default function CategoryTable() {

    const params=useParams()
    const [data ,setData]=useState([]);
    const [forceRender ,setForceRender]=useState(0);
    const [loading ,setloading]=useState(false);

  const handleGetCategories=async()=>{
    setloading(true)
    try {
      const res=await getCategoriesService(params.categoryId)
      if (res.status==200) {
        setData(res.data.data)
      }
      // else{
      //   Alert("خطا",res.data.message,"error")
      // }
    } catch (error) {
      console.log(error.message);
    } finally{
      setloading(false)
    }
  }

// console.log(data.length);

  useEffect(()=>{
    handleGetCategories()
  },[params,forceRender])

      const dataInfo=[
          {field:"id" , title:"#"},
          {field:"title" , title:"عنوان محصول"},
          // {field:"show_in_menu" , title:"نمایش در منو"},
          {field:"parent_id" , title:"والد"},
      ]


  const searchParams={
    title:"سرچ",
    placeholder:"متن رو وارد کن",
    searchField:"title"
  }

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
      }]

    return (
      <> 
      <Outlet/>

      {
       
      <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      additionFeild={additionFeild}
      numOfPage={6}
      searchParams={searchParams}
      loading={loading}
      >

      <AddCategory setForceRender={setForceRender}/>
      </PaginatedTable>
       
      }
      </>
    )
}
