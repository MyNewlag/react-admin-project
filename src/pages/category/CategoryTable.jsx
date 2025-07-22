
import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import AddCategory from './AddCategory'
import { deleteCategoryService, getCategoriesService } from '../../service/category';
import ShowInMenu from './tableAdditionl/ShowInMenu';
import Actions from './tableAdditionl/Actions';
import { Outlet, useParams } from 'react-router-dom';
import { convertDateToJalali } from '../../utils/convertDate';
import { Alert, Confirm } from '../../utils/Alert';


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

  const handleDeleteCategory=async(rowData)=>{
    if(await Confirm("حذف دسته بندی",`آیا از حذف (${rowData.title}) اطمینان دارید ؟`)){
     try {
      const res=await deleteCategoryService(rowData.id)
      if(res.status==200){
         Alert("حذف دسته",`حذف (${rowData.title}) با موفقیت انجام شد`,"success")
          setData(data.filter(d=>d.id!=rowData.id))
      }else{
           Alert("خطا ","حذف انجام نشد","error")
      }
     } catch (error) {
       Alert("خطا ",error.message,"error")
     }
    }else{
         Alert("انصراف ","از حذف منصرف شدید","warning")
    }
  }

  useEffect(()=>{
    handleGetCategories()
  },[params,forceRender])


      const dataInfo=[
          {field:"id" , title:"#"},
          {field:"title" , title:"عنوان محصول"},
          // {field:"show_in_menu" , title:"نمایش در منو"},
          {field:"parent_id" , title:"والد"},
      {
        field:null,
        title:"تاریخ",
        elements:(rowData)=> convertDateToJalali(rowData.created_at)
        },
      {
        field:null,
        title:"نمایش در منو",
        elements:(rowData)=><ShowInMenu rowData={rowData}/>
        },
        {
          field:null,
        title:"عملیات",
        elements:(rowData)=> <Actions rowData={rowData} 
        handleDeleteCategory={handleDeleteCategory}/>
      }
      ]

  const searchParams={
    title:"جستجو",
    placeholder:"متن رو وارد کن",
    searchField:"title"
  }


    return (
      <> 
      <Outlet/>

      {
      <PaginatedTable
      data={data}
      dataInfo={dataInfo}
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
