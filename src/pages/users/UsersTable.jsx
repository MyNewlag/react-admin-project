

import React, { useEffect, useState } from 'react'
import PaginatedDataTable from '../../components/PaginatedDataTable'
import { deleteUserService, getAllUsersService } from '../../service/users'
import Actions from './tableAddition/Actions'
import AddButtonLink from '../../components/form/AddButtonLink'
import { Outlet } from 'react-router-dom'
import { Alert, Confirm } from '../../utils/Alert'
import Roles from './tableAddition/Roles';


export default function UsersTable() {

    const [data,setData]=useState([])
    const [loading , setLoading]=useState(false)
    const [searchChar,setSearchChar]=useState("")
    const [curentPage,setCurentPage]=useState(1) 
    const [countOnPage,setCountOnPage]=useState(4)
    const [pageCount,setPageCount]=useState(0)        //تعداد کل صفحات


   const dataInfo = [
    { field: "id", title: "#" },
    { field: "user_name", title: "نام کاربری" },
    {
      field: null,
      title: "نام",
      elements: (rowData) => `${rowData.first_name || ""} ${rowData.last_name || ""}`,
    },
    {
      field: null,
      title: "نقش",
      elements: (rowData) => <Roles rowData={rowData}/>,
    },
    { field: "phone", title: "شماره تلفن" },
    { field: "email", title: "ایمیل" },
    {
      field: null,
      title: "جنسیت",
      elements: (rowData) => rowData.gender == 1 ? "آقا" : "خانم",
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteUser={handleDeleteUser}/>,
    },
  ];

    const handleDeleteUser=async(rowData)=>{
        if (await Confirm ("حذف کاربر" , `آیا از حذف کاربر ${rowData.user_name} اطمینان دارید؟>`)) {
            const res=await deleteUserService(rowData.id)
            if (res.status==200) {
                Alert("موفقیت",res.data.message,"success")
                // setData(data.filter(d=>d.id!=rowData.id))
                  handleGetAllUser(curentPage,countOnPage,searchChar)
                  if (data.length === 1 && curentPage > 1) {
                  setCurentPage(curentPage - 1)
                  }
            }
        }
    }

    const searchParams={
    title:"جستجو",
    placeholder:"متن رو وارد کن",
  }


  const handleGetAllUser=async(page,count,char)=>{
    setLoading(true)
    const res=await getAllUsersService(page,count,char)
    res && setLoading(false)
    if (res.status==200) {
        setData(res.data.data.data)
        setPageCount(res.data.data.last_page)      
    }
  }

    const handleSearch=(char)=>{
    setSearchChar(char)
    handleGetAllUser(1,countOnPage,char)
  }


  useEffect(()=>{
    handleGetAllUser(curentPage,countOnPage,searchChar)
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
        <AddButtonLink href={"/users/add-user"}/>
        <Outlet context={{setData}}/>
    </PaginatedDataTable>
  )
}
