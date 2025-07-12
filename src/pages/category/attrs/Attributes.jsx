
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PaginatedTable from '../../../components/PaginatedTable';
import ShowInFilter from './ShowInFilter';
import AttAction from './AttAction';
import PrevPageButton from '../../../components/PrevPageButton';
import { deleteCategoryAttrService, getCategoryAttrService } from '../../../service/categoryAttr';
import { Alert, Confirm } from '../../../utils/Alert';
import AddAttr from './AddAttr';



export default function Attributes() {

    const location=useLocation()
    const [data,setData]=useState([])
    const [loading ,setLoading]=useState(false);
    const [editAttribute ,setEditAttribute]=useState(null);
    const [reInitialValue,setReInitialValue]=useState(null)


    const dataInfo=[
    {field:"id" , title:"#"},
    {field:"title" , title:"عنوان محصول"},
    {field:"unit" , title:"واحد"},
      ]

    const additionFeild =[    
        {
            title:"نمابش در فیلتر",
            elements:(rowData)=><ShowInFilter rowData={rowData}/>
            },
            {
            title:"عملیات",
                elements:(rowData)=><AttAction rowData={rowData}
                editAttribute={editAttribute} setEditAttribute={setEditAttribute}
                handleDeleteAttr={handleDeleteAttr}/>
        }]
        
        
  const searchParams={
    title:"سرچ",
    placeholder:"متن رو وارد کن",
    searchField:"title"
  }

  const handleGetAttr=async()=>{
        setLoading(true)

    try {
         const res=await getCategoryAttrService(location.state.categoryData.id)
    if (res.status==200) {
        if(res.data.data.length>0){
            setData(res.data.data)
        }else{
            Alert("",res.data.message,"warning")
        }
    }
    } catch (error) {
            console.log(error);
    } finally{
        setLoading(false)
    }
    
  }

  const handleDeleteAttr=async (rowData)=>{
     if ( await Confirm(`حذف   ${rowData.title}` , `آیا از حذف  {${rowData.title}} اطمینان دارید؟`)){
         try {
             const res=await deleteCategoryAttrService(rowData.id)
             if (res.status==200) {
               Alert('موفقیت','','success')  
            //    setData (data.filter(d=>d.id!=rowData.id))
               setData(lastData=>[...lastData.filter(d=>d.id!=rowData.id)])
            //   setData(lastData=>console.log(lastData))
             }else{
               Alert('!!!','شما از حذف منصرف شدید','warning')  
             }
         } catch (error) {
             console.log(error.message);
         }
        }else{
            Alert('!!!','شما از حذف منصرف شدید','warning')  
        }
    }


  useEffect(()=>{
    if(editAttribute){
        setReInitialValue({
            title:editAttribute.title,
            unit: editAttribute.unit,
            in_filter:editAttribute.in_filter ? true : false
        })
        }else (setReInitialValue(null))
  },[editAttribute])


  useEffect(()=>{
   handleGetAttr()
  },[])

  return (   
       <>
       <h4 className='text-center my-3'>مدیریت ویژگیهای دسته بندی</h4>
       <h6 className='text-center my-3'>
        ویژگی های:
        <span className='text-primary'>
            {location.state.categoryData.title}
        </span>
       </h6>
       
        <div className="container">
            <div className="row justify-content-center">

                <AddAttr 
                reInitialValue={reInitialValue}
                location={location}
                setData={setData}
                editAttribute={editAttribute}
                setEditAttribute={setEditAttribute}
                />

                <hr/>
                
                  <PaginatedTable
                      data={data}
                      dataInfo={dataInfo}
                      additionFeild={additionFeild}
                      numOfPage={4}
                      searchParams={searchParams}
                      loading={loading}
                      >

                      <PrevPageButton/>                
                      </PaginatedTable>
            </div>
        </div>
        </>

  )
}
