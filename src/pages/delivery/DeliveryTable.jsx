

import React, {useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import AddButtonLink from '../../components/form/AddButtonLink'
import { Outlet } from 'react-router-dom'
import { deleteDeliveryServices, getAllDeliveriesServices } from '../../service/deliveries'
import Actions from './tableAction/Actions'
import { Alert, Confirm } from '../../utils/Alert'

export default function DeliveryTable() {
    const [data ,setData]=useState([])
    const [loading ,setLoading]=useState(false)



    const dataInfo=[
        {field : "id" , title:"#"},
        {field : "title" , title:"عنوان"},
        {field : "amount" , title:"هزینه"},
        {field : null, title:"مدت ارسال",
         elements:(rowData)=> rowData.time +" " + rowData.time_unit
        },
        {field : null, title:"عملیات " ,
         elements:(rowData)=> <Actions rowData={rowData}
          handleDeleteDelivery={handleDeleteDelivery} /> 
        }
    ]

    const searchParams={
     title:"جستجو",
    placeholder:"متن رو وارد کن",
    searchField:"title"
    }


 const handleGetAllDeliveries=async()=>{
     setLoading(true)
     const res= await getAllDeliveriesServices()
     res && setLoading(false)
     if(res.status==200){
        setData(res.data.data)
     }
    }
    

    const handleDeleteDelivery=async(rowData)=>{
        if(await Confirm("حذف روش ارسال" , `آیا از حذف ایتم ${rowData.title} اطمینان دارید؟`)){
            const res=await deleteDeliveryServices(rowData.id)
            if (res.status==200) {
                Alert("انجام شد" , res.data.message , "success")
                setData(old=>old.filter(o=>o.id!=rowData.id))
            }
        }
    }



    useEffect(()=>{
        handleGetAllDeliveries()
    },[])

  return (

    <PaginatedTable
    data={data}
    loading={loading}
    dataInfo={dataInfo}
    numOfPage ={6}
    searchParams={searchParams}
    >
     <AddButtonLink href={"/deliveries/add-delivery"}/>
     <Outlet context={{setData}}/>
    </PaginatedTable>
  )
}
