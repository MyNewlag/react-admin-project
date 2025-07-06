
import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import AddGuarantie from './AddGuarantie';
import { deleteGuarantieServices, editGuarantieServices, getAllGuarantieServices } from './../../service/guarantie';
import Actions from './guarantiAdditional/Actions';
import { Alert, Confirm } from '../../utils/Alert';

export default function GuarantieTable() {

    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
      const [editGuarantie,setEditGuarantie]=useState()
      


    const handleGetGuaranties=async()=>{
        setLoading(true)
        const res = await getAllGuarantieServices()
        if (res.status==200) {
            setData(res.data.data)
            setLoading(false)
        }
    }


    const handleDeleteGuarantie=async(rowData)=>{
        if (await Confirm('حذف گارانتی',`آیا از حذف ${rowData.title} اطمینان دارید؟`)) {
            const res=await deleteGuarantieServices(rowData.id)
            if (res.status==200) {
                setData(lastData=>[...lastData].filter(d=>d.id!=rowData.id))
                Alert("حذف گارامنی","گارانتی با موفقیت حذف شد","success")
            }
        }
    }


    const dataInfo=[
        {field:"id" , title:"#"},
        {field:"title" , title:"عنوان گارانتی"},
        {field:"descriptions" , title:"توضیحات"},
        {field:"length" , title:"مدت گارانتی "},
    ]

    const additionFeild=[
    {title:"عملیات",
        elements:(rowData)=><Actions rowData={rowData}
         handleDeleteGuarantie={handleDeleteGuarantie} 
         setEditGuarantie={setEditGuarantie}/>
        }
    ]

    const searchParams={
     title:"جستجو",
    placeholder:"متن رو وارد کن",
    searchField:"title"
    }

    useEffect(()=>{
        handleGetGuaranties()
    },[])

  return (
    <div>

        <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        additionFeild={additionFeild}
        numOfPage={6}
       searchParams={searchParams}
        loading={loading}
        >
            <AddGuarantie setData={setData} editGuarantie={editGuarantie}
             setEditGuarantie={setEditGuarantie}/>
        </PaginatedTable>

    </div>
  )
}
