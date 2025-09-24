

import React, { useEffect, useState } from 'react'
import { deleteDiscountServic, getAllDiscountServic } from './../../service/discounts';
import PaginatedTable from '../../components/PaginatedTable';
import { Outlet } from 'react-router-dom';
import { convertDateToJalali } from './../../utils/convertDate';
import Actions from './tableAddition/Actions';
import AddButtonLink from '../../components/form/AddButtonLink';
import { Alert, Confirm } from '../../utils/Alert';


export default function DiscountTable() {

    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان" },
    { field: "code", title: "کد تخفیف" },
    { field: "percent", title: "درصد تخفیف" },
    {
      field: null,
      title: "تاریخ انقضا",
      elements: (rowData) => convertDateToJalali(rowData.expire_at) ,
    },
    {
      field: null,
      title: "وضعیت",
      elements: (rowData) => rowData.is_active ? "فعال" : "غیرفعال",
    },
    {
      field: null,
      title: "مربوط به",
      elements: (rowData) => rowData.for_all ? "همه" : "تعدادی از محصولات",
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} deleteDiscount={deleteDiscount}/>,
    },
  ];



  const deleteDiscount=async(rowData)=>{
    if (await Confirm("حذف تخفیف !!!",`آیا از حذف تخفیف  ${rowData.title} اطمینان دارید؟`)) {
     const res=await deleteDiscountServic(rowData.id)
      if (res.status==200) {
        Alert("موفقیت",res.data.message,"success")
        setData(data.filter(d=>d.id!=rowData.id))
      }      
    }
  }

    const handleGetAllDiscouny=async()=>{
        setLoading(true)
        const res=await getAllDiscountServic()
        setLoading(false)
        if (res.status==200) {
            setData(res.data.data)
        }
    }


    const searchParams={
    title:"جستجو",
    placeholder:"متن رو وارد کن",
    searchField:"title"
  }

    useEffect(()=>{
        handleGetAllDiscouny()
    },[])

  return (
    <PaginatedTable
    data={data}
    dataInfo={dataInfo}
    numOfPage={4}
    searchParams={searchParams}
    loading={loading}
    >
        <AddButtonLink href={"/discounts/add-discount-code"}/>
        <Outlet context={{setData:setData}}/>
    </PaginatedTable>
  )
}
