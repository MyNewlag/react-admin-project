

import React, { useEffect, useState } from 'react'
import { deleteCardService, getAllCardsService } from '../../service/cards'
import PaginatedDataTable from '../../components/PaginatedDataTable'
import AddButtonLink from '../../components/form/AddButtonLink'
import Actions from './tableActions/Actions'
import { Alert, Confirm } from '../../utils/Alert'
import { Outlet } from 'react-router-dom'

export default function CardsTable() {

    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [searchChar,setSearchChar]=useState("")
    const [curentPage,setCurentPage]=useState(1) 
    const [countOnPage,setCountOnPage]=useState(2)
    const [pageCount,setPageCount]=useState(0)        //تعداد کل صفحات


    const dataInfo=[
      {field:"id" , title:"#"},
      {field:"user_id" , title:"آی دی کاربر"},
      {field:null , title:"نام کاربر",
        elements:(rowData)=>`${rowData.user.first_name || ""} ${rowData.user.last_name || ""}`
      },
      {field:null , title:"شماره تماس",
        elements:(rowData)=>`${rowData.user.phone}`
      },
      {field:null , title:"تعداد کالاها",
        elements:(rowData)=>rowData.items.length
      },
      {field:null , title:"عملیات ",
        elements:(rowData)=><Actions rowData={rowData} handleDeleteCard={handleDeleteCard}/>
      },
    ]

    const searchParams={
    title:"جستجو",
    placeholder:"متن رو وارد کن"
    }

    const handleSearch=(char)=>{
    setSearchChar(char)
    handleGetCards(1,countOnPage,char)
  }

    const handleGetCards=async (page=curentPage,count=countOnPage,char=searchChar)=>{
      setLoading(true)
      const res=await getAllCardsService(page,count,char)
      if (res.status==200) {
        setData(res.data.data.data)
        setLoading(false)
        setPageCount(res.data.data.last_page)
      }
    }

    const handleDeleteCard=async(rowData)=>{
      if (await Confirm("حذف" , `آیا از حذف سبد ${rowData.id} اطمینان دارید؟`)) {
        const res=await deleteCardService(rowData.id)
          if (res.status==200) {
            setData(oldData=>oldData.filter(o=>o.id!=rowData.id))
            Alert("انجام شد" , res.data.message,"success")
              handleGetCards(curentPage,countOnPage,searchChar)
          }
        }
      }
    

      useEffect(()=>{
        handleGetCards(curentPage,countOnPage,searchChar)
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
 

      <AddButtonLink href={"/cards/add-card"}/>
      <Outlet context={{handleGetCards}}/>

    </PaginatedDataTable>
  )
}
