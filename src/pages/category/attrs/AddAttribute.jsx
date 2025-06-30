
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PaginatedTable from '../../../components/PaginatedTable';
import ShowInFilter from './ShowInFilter';
import AttAction from './AttAction';
import PrevPageButton from './../../../components/PrevPageButton';
import { addCategoryAttrService, getCategoryAttrService } from '../../../service/categoryAttr';
import { Alert } from '../../../utils/Alert';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import FormikControl from '../../../components/form/FormikControl';
import SumbitBotton from '../../../components/form/SumbitBotton';


     const onSubmit=async(values,action,catId,setData)=>{
        values={
            ...values ,
            in_filter: values.in_filter ? 1 : 0
        }
     try {
        const res=await addCategoryAttrService(catId,values)     
        if(res.status==201){
            setData(oldData=>[...oldData,res.data.data])
            Alert("اضافه شد","ویژگی به لیست اضافه شد","success")
            action.resetForm()
        }
     } catch (error) {
        console.log(error);
        
     }   
    }


    const initialValues={
        title:"",
        unit:"",
        in_filter:""
    }

     const validationSchema =yup.object({
        id:yup.number(),
        title:yup.string().required("لطفا این قست را پر کنید").matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده کنید"),
        unit:yup.string().required("لطفا این قست را پر کنید").matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده کنید"),
         in_filter:yup.boolean()
          
    });
export default function AddAttribute() {

    const location=useLocation()
    const [data,setData]=useState([])
    const [loading ,setLoading]=useState(false);



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
            elements:(rowData)=><AttAction rowData={rowData} />
        }]
        
        
  const searchParams={
    title:"سرچ",
    placeholder:"متن رو وارد کن",
    searchField:"title"
  }

  const handleGetAttr=async()=>{
        setLoading(false)
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

                <Formik
                initialValues={initialValues}
                onSubmit={(values,action)=>onSubmit(values,action,location.state.categoryData.id,setData)}
                validationSchema={validationSchema}
                >

                    <Form>
                 <div className="row my-3">

                        <FormikControl
                        className="col-md-6 col-lg-4 my-1"
                        control="input"
                        name="title"
                        type="text"
                         label="عنوان"
                        placeholder="عنوان ویژگی جدید"
                        />

                        
                        <FormikControl
                        className="col-md-6 col-lg-4 my-1"
                        control="input"
                        name="unit"
                        type="text"
                        label="واحد"
                        placeholder="واحد ویژگی جدید"
                        />


                    <div className="col-8 col-lg-2 my-1 d-flex justify-content-center align-items-center p-0 h-100">
                        <FormikControl
                        control="switch"
                        name="in_filter"
                        label="نمایش در  فیلتر"
                        />                           
                    </div>

                    <div className="col-4 col-lg-2 d-flex justify-content-center align-items-start my-1">
                      <SumbitBotton/>
                    </div>
                </div>
            </Form>
                </Formik>
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
