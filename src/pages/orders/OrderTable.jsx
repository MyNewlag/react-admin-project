

import React, { useEffect, useState } from 'react'
import PaginatedDataTable from '../../components/PaginatedDataTable'
import AddButtonLink from '../../components/form/AddButtonLink'
import { Outlet } from 'react-router-dom'
import { convertDateToJalali } from './../../utils/convertDate';
import { numberWithCommas } from './../../utils/numbers';
import Actions from './tableActions/Actions'
import { deleteOrdersService, getAllOrdersService } from './../../service/orders';
import { Alert, Confirm } from '../../utils/Alert';

export default function OrderTable() {

    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [searchChar,setSearchChar]=useState("")
    const [curentPage,setCurentPage]=useState(1) 
    const [countOnPage,setCountOnPage]=useState(4)
    const [pageCount,setPageCount]=useState(0) 



    const dataInfo=[
        {field:"id" , title:"#"},
        {field:"user_id" , title:"آی دی کاربر"},
        {field:null , title:"نام کاربر",
        elements:(rowData)=>`${rowData.user.first_name || ""} ${rowData.user.last_name || ""}`
        },
        {field:null , title:"شماره تماس",
        elements:(rowData)=>rowData.user.phone
        },
        {field:"cart_id" , title:"کد سبد "},
        {field:null , title:"تاریخ پرداخت ",
            elements:(rowData)=>convertDateToJalali(rowData.pay_at)
        },
        {field:null , title:"مبلغ پرداخت ",
        elements:(rowData)=>numberWithCommas(rowData.pay_amount)
        },
        {field:null , title:"عملیات ",
        elements:(rowData)=><Actions rowData={rowData} handleDeleteOrder={handleDeleteOrder} />
        }
    ]

    const searchParams={
    title:"جستجو",
    placeholder:"متن رو وارد کن"
    }

    
    const handleGetAllOrders=async(page=curentPage,count=countOnPage,char=searchChar)=>{
        const res=await getAllOrdersService(page,count,char)
        setLoading(true)
        if (res.status==200) {
            setData(res.data.data.data) 
            setPageCount(res.data.data.last_page)
            setLoading(false)
        }
    }

    const handleDeleteOrder=async(rowData)=>{
        if (await Confirm("حذف سفارش",`ایا از حذف سفارش ${rowData.id} اطمینان دارید؟`)) {
            const res=await deleteOrdersService(rowData.id)
            if (res.status==200) {
                setData(old=>old.filter(o=>o.id!=rowData.id))
                //  handleGetAllOrders(curentPage,countOnPage,searchChar)
                handleGetAllOrders()
                Alert("موفقیت",res.data.message,"success")
            }
        }
    }
    
    const handleSearch=(char)=>{
       setSearchChar(char)
       handleGetAllOrders(1,countOnPage,char)
   }


    useEffect(()=>{
        handleGetAllOrders(curentPage,countOnPage,searchChar)
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

      <AddButtonLink href={"/orders/add-order"}/>
      <Outlet context={{handleGetAllOrders}}/>

    </PaginatedDataTable>
  )
}
