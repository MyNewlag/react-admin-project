

import React, { useContext, useEffect, useState } from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import { Form, Formik } from 'formik';
import FormikControl from './../../components/form/FormikControl';
import {  getCategoriesService, getSingleCategories } from '../../service/category';
import { useParams } from 'react-router-dom';
import { CategoryContext } from '../../context/CategoryContext';
import { initialValues, onSubmit, validationSchema } from './core';
import { Alert } from '../../utils/Alert';
import SubmitBotton from '../../components/form/SubmitBotton';



export default function AddCategory({setForceRender}){
    
    const params=useParams()
    const {editId,setEditId}=useContext(CategoryContext)
    const [parents,setParents]=useState([])
    const [editCategory,setEditCategory]=useState(null)
    const [reInitialValue,setReInitialValue]=useState(null)        
    
    const handleGetParentsCategories =async ()=>{
        try {
            const res=await getCategoriesService();
            if (res.status==200) {
                const allParents=res.data.data
                setParents(
                  allParents.map(a=>{
                     return {id:a.id , value:a.title}
                    })) 
                }
            } catch (error) {
                console.log(error);
            }
    }

    const handleGetSingleCategory=async ()=>{
        try {
           const res= await getSingleCategories(editId)
           if(res.status==200){
               setEditCategory(res.data.data)
            }
        } catch (error) {
               console.log(error);
            Alert("مشکل ...!!!" , "دسته بندی مورد نظر یافت نشد" , "warning")
        }
    }

    useEffect(()=>{
        if (editId) {
         handleGetSingleCategory()
         }else{
        setEditCategory(null)
      }
    },[editId])
    

    useEffect(()=>{
             if (editCategory) {
            setReInitialValue({
                parent_id:editCategory.parent_id || "",
                title:editCategory.title,
                descriptions:editCategory.descriptions ,
                image:null,
                is_active:editCategory.is_active ? true : false,
                show_in_menu:editCategory.show_in_menu ? true : false,
            })
          }else if(params.categoryId){
            setReInitialValue({
                ...initialValues , parent_id:params.categoryId
            })
        }else{
            setReInitialValue(null)
        }   
    },[params.categoryId,editCategory])
    

    useEffect(()=>{
        handleGetParentsCategories()
    },[])

  return (
    <>
     <button className="btn btn-success d-flex justify-content-center align-items-center"
          data-bs-toggle="modal" data-bs-target="#add_product_category_modal" 
            onClick={()=>setEditId(null)}
          >
         <i className="fas fa-plus text-light"></i>
      </button>
    <ModalsContainer
         fullScreen={true}
         id="add_product_category_modal"
         title={editCategory ? "ویرایش :" +editCategory.title :"افزورن دسته محصولات"}
         >     

            <Formik
            initialValues={reInitialValue||initialValues}
            onSubmit={(values,action)=>onSubmit(values,action,setForceRender,editId)}
            validationSchema={validationSchema}
            enableReinitialize
            >

            <Form>
            <div className="container">
                <div className="row justify-content-center">

                {
                parents.length > 0 ? (
                    <FormikControl
                    className="col-md-6 col-lg-8"
                    control="select"
                    options={parents}
                    name="parent_id"
                    label="دسته والد"
                    firstItem="دسته مورد نظر را انتخاب کنید"
                    />
                    ):
                    null
                }
            

                <FormikControl
                className="col-md-6 col-lg-8"
                control="input"
                type="text"
                name="title"
                label="عنوان دسته "
                placeholder="عنوان دسته"
                />

                <FormikControl
                className="col-md-6 col-lg-8"
                control="textarea"
                name="descriptions"
                label=" توضیحات "
                placeholder="توضیحات "
                />

                {!editId ?
                    <FormikControl
                    className="col-md-6 col-lg-8"
                    control="file"
                    name="image"
                    label=" تصویر "
                    placeholder="تصویر "
                    />
                    : 
                    null
                }

                    <div className='col-12 col-md-6 col-lg-8 row justify-content-center'>
                        <div className='col-12 col-md-4 col-lg-3 mx-lg-5'>
                            <FormikControl
                            control="switch"
                            name="is_active"
                            label=" وضعیت فعال "
                            />
                        </div>
                        <div className='col-12 col-md-4 col-lg-3 mx-lg-5'>
                            <FormikControl
                            control="switch"
                            name="show_in_menu"
                            label="نمایش در منو"
                            />
                        </div>
                    </div>

                    <div className='btn_box text-center col-12 col-md-6 col-lg-8 mt-4'>
                        <SubmitBotton/>
                    </div>

                 </div>
             </div>
            </Form>
        </Formik>
    </ModalsContainer>
    </>
  )
}


