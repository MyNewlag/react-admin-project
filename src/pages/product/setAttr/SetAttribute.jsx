
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCategoryAttrService } from '../../../service/categoryAttr'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PrevPageButton from '../../../components/PrevPageButton'
import SpinnerLoad from '../../../components/SpinnerLoad'
import SubmitBotton from '../../../components/form/SubmitBotton'
import * as yup from "yup";
import FormikError from '../../../components/form/FormikError'
import { onSubmit } from './core'


export default function SetAttribute() {

    const location=useLocation()
    const {selectedProduct}=location.state 
    console.log(selectedProduct);

    
    const [attrs,setAttrs]=useState()
    const [initialValues,setInitialValues]=useState(null)
    const [validationSchema,setValidationSchema]=useState({})


        //     const handleGetAttributes= async()=>{    
        //   let attrVar=[]
        //      let initials={}
        //      let rules={}
        //     await Promise.all (
        //     selectedProduct.categories.map(async (cat)=>{
        //         const res=await getCategoryAttrService(cat.id)
        //         if (res.status==200) {
        //             attrVar=[...attrVar , {groupTitle:cat.title , data:res.data.data}] 
        //             if (res.data.data.length>0){
        //                 for (const d of res.data.data) {
        //                     initials={...initials , [d.id]:""}
        //                     rules={...rules , [d.id]: yup.string()
        //                         .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود")}
        //             } 
        //         }
        //         }else{
        //             return {groupTitle:cat.title , data:[]}
        //         }
        //             })).then(()=>{
        //                 setAttrs(attrVar)
        //                 setInitialValues(initials)
        //             // setInitialValues(Object.keys(initials).length>0 ? initials :{})
        //         setValidationSchema(Object.keys(initials).length>0 ? yup.object(rules) :{})
        //             })
        //         }

    const handleGetAttributes= async()=>{
        let initials={}
        let rules={}
        const allAttributes=await Promise.all (
        selectedProduct.categories.map(async (cat)=>{
            const res=await getCategoryAttrService(cat.id)
            if (res.status==200) {
                if (res.data.data.length>0){
                    for (const d of res.data.data) {
                        const value=""
                    initials={...initials , [d.id]:value}
                    rules={...rules , [d.id]: yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),}
                    } 
                }
                return {groupTitle:cat.title , data:res.data.data}
            }else{
                return {groupTitle:cat.title , data:[]}
            }
                }))
                 setAttrs(allAttributes)
                // setInitialValues(initials)
                 setInitialValues(Object.keys(initials).length>0 ? initials :{})
                setValidationSchema(Object.keys(initials).length>0 ? yup.object(rules) :{})
            }
            

    useEffect(()=>{
      handleGetAttributes() 
    },[])

  return (

            <div className="container">
                <h4 className='text-center my-3'> افزودن ویژگی محصول : <span className='text-primary'>
                 {selectedProduct.title} </span></h4>

                    <div className='text-left col-md-6 col-lg-8 m-auto my-3'>
                        <PrevPageButton/>
                    </div>
                <div className="row justify-content-center">

                {initialValues ?(
                    <Formik
                    initialValues={initialValues}
                    onSubmit={(values,action)=>onSubmit(values,action,selectedProduct.id)}
                    validationSchema={validationSchema}
                    >
                        <Form>
                                
                          { attrs.map((attr , index)=>(
                                <div key={"group "+index} className='row justify-content-center'>
                                    <h6 className='text-center'> گروه : {attr.groupTitle}</h6>
                                
                                    {attr.data.length > 0 ?(
                                            attr.data.map(attrData=>(
                                                <div className="col-12 col-md-6 col-lg-8" key={attrData.id}>
                                                <div className="input-group my-3 dir_ltr">
                                                    <span className="input-group-text w_6rem justify-content-center">
                                                        {attrData.unit}</span>
                                                <Field name={attrData.id} type="text" className="form-control" placeholder="" />   
                                                <span className="input-group-text w_8rem justify-content-center">
                                                    {attrData.title}</span>
                                                </div>
                                                <ErrorMessage name={attrData.id} component={FormikError}/>
                                            </div>
                                            ))
                                        ):(
                                            <small className='text-center text-danger'> 
                                            هیچ ویژگی برای گروه های این محصول ایجاد نشده است</small>
                                        )
                                    }
                                </div>
                            ))
                         }

                            <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4 m-auto">
                                <SubmitBotton />
                                <PrevPageButton className="me-2"/>
                                </div>

                        </Form>
                    </Formik>
                    
                ):(
                    <SpinnerLoad/>
                )}

  
                </div>
            </div>

  )

}



