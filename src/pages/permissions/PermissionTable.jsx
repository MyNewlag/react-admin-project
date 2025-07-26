

import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import { getAllPermissionsService } from '../../service/users'



export default function PermissionTable() {
       const [data , setData]=useState([])
        const [loading , setLoading]=useState(false)
    
        const dataInfo=[
            {field:"id" , title:"#"},
            {field:"title" , title:"عنوان"},
            {field:"description" , title:"توضیحات"},
            {field:"category" , title:"عنوان دسته"},
        ]
    
    
        const searchParams={
        title:"جستجو",
        placeholder:"متن رو وارد کن",
        searchField:"description"
        }


        const getAllPermission=async ()=>{
            setLoading(true)
            const res=await getAllPermissionsService()

            if (res.status==200) {
                setData(res.data.data)
                setLoading(false)
            }
        }

        useEffect(()=>{
            getAllPermission()
        },[])
    
      return (
        <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        numOfPage={15}
        searchParams={searchParams}
        loading={loading}
        >
    
        </PaginatedTable>
     
      )
}


