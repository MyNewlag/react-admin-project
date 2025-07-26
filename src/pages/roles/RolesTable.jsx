import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import AddButtonLink from '../../components/form/AddButtonLink'
import { Outlet } from 'react-router-dom'
import { deleteRolesService, getAllRolesService } from '../../service/users'
import Actions from './tableAddition/Actions'
import { Alert, Confirm } from '../../utils/Alert'


export default function RolesTable() {

    const [data ,setData]=useState([])
    const [loading ,setLoading]=useState(false)

    const dataInfo =[
    {field:"id" , title:"#"},
    {field:"title" , title:"عنوان"},
    {field:"description" , title:"توضیحات"},
    {
        field: null,
        title: "عملیات",
        elements:(rowData) => <Actions rowData={rowData}
         handleDeleteRole={handleDeleteRole} /> 
    }
    ]

    const searchParams={
        title:"جستجو",
        placeholder:"متن رو وارد کن",
        searchField:"title"
    }

    const handleGetAllRoles=async()=>{
        setLoading(true)
        const res=await getAllRolesService()
        if (res.status) {
            setData(res.data.data)
             setLoading(false)
        }
    }

    const handleDeleteRole=async(rowData)=>{
        if (await Confirm("حذف وظیفه" , `آیااز حذف وضیفه ${rowData.title} اطمینان دارید؟`)){
            const res=await deleteRolesService(rowData.id)
            if(res.status==200){
                setData(data.filter(d=>d.id!=rowData.id))
                Alert("موفقیت",res.data.message,"success")
            }
        }
    }

    useEffect(()=>{
        handleGetAllRoles()
    },[])

  return (
   <PaginatedTable
  data={data}
  dataInfo={dataInfo}
  numOfPage={4}
  searchParams={searchParams}
  loading={loading}
   >
    <AddButtonLink href={'/roles/add-role'}/>
    <Outlet context={{setData}}/>
   </PaginatedTable>
  )
}
