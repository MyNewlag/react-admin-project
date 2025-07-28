

import React, { useEffect, useState } from 'react'
import PaginatedDataTable from '../../components/PaginatedDataTable'
import Actions from './tableAddition/Actions'
import { deleteProductsService, getProductsService } from '../../service/products'
import { Alert, Confirm } from '../../utils/Alert'
import AddButtonLink from '../../components/form/AddButtonLink'

export default function TableProduct() {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)
  const [searchChar,setSearchChar]=useState("")
  const [curentPage,setCurentPage]=useState(1) 
  const [countOnPage,setCountOnPage]=useState(2)
  const [pageCount,setPageCount]=useState(0)        //تعداد کل صفحات


     const dataInfo=[
        {field:"id" , title:"#"},
        {field:null , title:"گروه محصول " , elements: (rowData) =>
            //  rowData.categories[0]?.title
              (
                <>
                  {rowData.categories && rowData.categories.length > 0
                    ? rowData.categories[0].title
                    : "بدون گروه"}
                </>
                  )
        },
        {field:"title" , title:"عنوان "},
        {field:"price" , title:"قیمت"},
        {field:"stock" , title:"موجودی"},
        {field:null , title:"عملیات" , elements:(rowData)=><Actions rowData={rowData}
         handleDeleteProduct={handleDeleteProduct}/>},
    ]


    const handleDeleteProduct=async (rowData)=>{
      if( await Confirm("حذف !!!",`آیا از حذف  ${rowData.title} اطمینان دارید؟`)){
        const res=await deleteProductsService(rowData.id)
        if (res.status==200) {
          Alert("موفقست",`رکورد ${rowData.title} حذف شد `,"success")
          handleGetProducts(curentPage,countOnPage,searchChar)
          if (data.length === 1 && curentPage > 1) {
            setCurentPage(curentPage - 1)
            }
        }
      }else{
          console.log("از حذف منصرف شدید!!!");
      }
        
    }

    const searchParams={
    title:"جستجو",
    placeholder:"متن رو وارد کن",
  }

  const handleGetProducts= async(page,count,char)=>{
    setLoading(true)
    const res=await getProductsService(page,count,char)
    res && setLoading(false)
    if (res.status==200) {
      setData(res.data.data)
      setPageCount(res.data.last_page)
    }
  }


  const handleSearch=(char)=>{
    setSearchChar(char)
    handleGetProducts(1,countOnPage,char)
  }


  useEffect(()=>{
    handleGetProducts(curentPage,countOnPage,searchChar)
  },[curentPage])


  return (
    
    <PaginatedDataTable
    tableData={data}
    dataInfo={dataInfo}
    searchParams={searchParams}
    loading={loading}
    curentPage={curentPage}
    setCurentPage={setCurentPage}
    pageCount={pageCount}
    handleSearch={handleSearch}
    >
 
      <AddButtonLink href={"/products/add-product"}/>
      
    </PaginatedDataTable>
    
  
  )
}