


import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import AddColor from './AddColor'
import { deleteColorsService, getColorsService } from '../../service/color'
import Actions from './tableAddition/Actions'
import { Alert, Confirm } from '../../utils/Alert'

export default function ColorTable() {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [editColor,setEditColor]=useState(null)

    const dataInfo=[
        {field:"id" , title:"#"},
        {field:"title" , title:"عنوان"},
        {field:"code" , title:"کد رنگ"},
        {field:null,
        title:"رنگ",
          elements:(rowData)=><div className='w-100 h-100 d-block' 
          style={{background:rowData.code , color: rowData.code}}>...</div>
        },
      {
        field:null,
        title:"عملیات",
         elements:(rowData)=><Actions rowData={rowData} 
         setEditColor={setEditColor} 
         handleDeleteColor={handleDeleteColor}
         />
        },
    ]

    const additionFeild =[

      ]

      const handleDeleteColor=async(rowData)=>{
        if (await Confirm("حذف",`آیا از حذف رنگ ${rowData.title} اطمینان دارید؟`)) {
          const res=await deleteColorsService(rowData.id)
          if (res.status==200) {
            setData(lastData=>[...lastData].filter(d=>d.id != rowData.id) )
            Alert("حذف !!!",`رنگ مورد نظر حرف شد`,'success')
          }
        }

      }

        
    const searchParams={
    title:"جستجو",
    placeholder:"متن رو وارد کن",
    searchField:"title"
   }

  const handleGetAllColor=async()=>{
    setLoading(true)
    const res=await getColorsService()
    if (res.status==200) {
        setData(res.data.data)
        setLoading(false)
    }
  }


  useEffect(()=>{
    handleGetAllColor()
  },[])



  return (
  <PaginatedTable
    data={data}
    dataInfo={dataInfo}
    additionFeild={additionFeild}
    numOfPage={10}
    searchParams={searchParams}
    loading={loading}
  >
    <AddColor editColor={editColor} setEditColor={setEditColor} setData={setData}/>
  </PaginatedTable>
  )
}




