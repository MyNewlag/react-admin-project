
import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'
import { deleteBrandService, getAllBrandsService } from './../../service/brands';
import AddBrands from './AddBrands';
import Actions from './tableAdditional/Actions';
import  apiPath  from '../../service/httpService';
import { Alert, Confirm } from '../../utils/Alert';

export default function BrandTable() {

    const [data ,setData]=useState([]);
    const [loading ,setLoading]=useState(false);
    const [brandToEdit ,setBrandToEdit]=useState(null);

    const handleGetAllBrands = async ()=>{
        setLoading(true)
        const res = await getAllBrandsService()

        res && setLoading(false) // اگر رس مقدار داشت لودینگ فالس شود
        if(res.status === 200 ) {
            setData(res.data.data)
        }
    }
    
    const handleDeleteBrand=async(rowData)=>{
      if (await Confirm("حذف برند",`آیا از حذف برند ${rowData.original_name} اطمینان دارید؟`)){
        const res=await deleteBrandService(rowData.id)  
        if (res.status==200) {
          Alert("موفقیت","حذف با موفقیت انجام شد","success")
          setData(lastData=>[...lastData].filter(d=>d.id!=rowData.id))
        }
      }
    }


       const dataInfo = [
        {field: 'id' , title: '#'},
        {field: 'original_name' , title: 'عنوان'},
        {field: 'persian_name' , title: 'عنوان فارسی'},
        {field: 'descriptions' , title: 'توضیحات'},
        {
          field: null,
          title: "لوگو",
          elements: (rowData) =>
            rowData.logo ? <img src={apiPath+"/"+rowData.logo} width="40" /> : null,
        },
        {
          field: null,
          title: "عملیات",
          elements: (rowData) => <Actions rowData={rowData} setBrandToEdit={setBrandToEdit} handleDeleteBrand={handleDeleteBrand} />,
        }
    ]


    const searchParams={
    title:"جستجو",
    placeholder:"متن رو وارد کن",
    searchField:"original_name"
  }

  useEffect(()=>{
    handleGetAllBrands()
  },[])

  return (
   <>

     <PaginatedTable
         data={data}
         dataInfo={dataInfo}
         numOfPage={2}
         searchParams={searchParams}
         loading={loading}
         >

           <AddBrands setData={setData} brandToEdit={brandToEdit} setBrandToEdit={setBrandToEdit}/>
        
         </PaginatedTable>
   </>
  )
}
