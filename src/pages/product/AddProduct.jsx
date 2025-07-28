

import React, { useEffect, useState } from 'react'
import {  Form, Formik } from 'formik'
import { initialValues, onSubmit, validationSchema } from './core'
import FormikControl from '../../components/form/FormikControl'
import { getCategoriesService } from '../../service/category'
import SpinnerLoad from '../../components/SpinnerLoad'
import PrevPageButton from '../../components/PrevPageButton'
import SubmitBotton from '../../components/form/SubmitBotton';
import { getAllBrandsService } from '../../service/brands'
import { getColorsService } from '../../service/color'
import { getAllGuarantieServices } from './../../service/guarantie';
import { useLocation } from 'react-router-dom'

export default function AddProduct() {
    const [parentCategories,setParentCategories]=useState([])
    const [mainCategories,setMainCategories]=useState([])
    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])
    const [guaranties, setGuaranties] = useState([])
    const [reInitialValue, setReInitialValue] = useState(null)

    const [selectedCategories,setSelectedCategories] = useState([])
    const [selectedColors,setSelectedColors] = useState([])
    const [selectedGuarantees,setSelectedGuarantees] = useState([])


    const location=useLocation()
    const rowData=location.state?.productToEdit
    

  const getAllParentCategories=async()=>{
         const res=await getCategoriesService()
         if (res.status==200) {
            setParentCategories(
                res.data.data.map(d=>{
                     return {id:d.id , value:d.title}
                }) )
         }
    }

 const getAllBrands = async ()=>{
    const res = await getAllBrandsService();
    if (res.status === 200) {
      setBrands(res.data.data.map(d=>{
        return {id:d.id, value:d.original_name}
      }));
    }
  }

  const getAllColors = async ()=>{
    const res = await getColorsService();
    if (res.status === 200) {
      setColors(res.data.data.map(d=>{
        return {id:d.id, value:d.title}
      }));
    }
  }

  const getAllGuaranties = async ()=>{
    const res = await getAllGuarantieServices();
    if (res.status === 200) {
      setGuaranties(res.data.data.map(d=>{
        return {id:d.id, value:d.title}
      }));
    }
  }

    const handleSetMainCategories=async(value)=>{
        setMainCategories("waiting")
      if (value>0) {
          const res=await getCategoriesService(value)
        if (res.status==200) {
            setMainCategories(res.data.data.map(d=>{
                return { id:d.id , value:d.title}
            }))
        }
    }else{
        setMainCategories([])
      }
    }

    const setIntialSelectedValues=()=>{
      if (rowData) {


        setSelectedCategories(
         rowData.categories.map(c=>{
           return {id:c.id , value:c.title}
         }))

         setSelectedColors(
          rowData.colors.map(c=>{
            return{id:c.id , value:c.title}
          }))

          setSelectedGuarantees(
            rowData.guarantees.map(g=>{
              return {id:g.id , value:g.title}
            }))
      }
    }

    useEffect(()=>{
        getAllParentCategories()
        getAllBrands()
        getAllColors()
        getAllGuaranties()
        setIntialSelectedValues()

        for(const key in rowData){
          if(rowData[key]===null) rowData[key]=""
        }
        
        if(rowData){
          setReInitialValue({
            ...rowData,
            category_ids:rowData.categories.map(c=>c.id).join("-"),
            color_ids:rowData.colors.map(c=>c.id).join("-"),
            guarantee_ids:rowData.guarantees.map(c=>c.id).join("-")
          })
        }else{
          setReInitialValue(null)
        }
    },[])


  return  (

    <Formik
    initialValues={ reInitialValue||initialValues}
    onSubmit={(values,action)=>onSubmit(values,action,rowData)}
    validationSchema={validationSchema}
    enableReinitialize
    >

    {formik=>{
        // console.log(formik);
        
        return(
             <Form>
          <div className="container">

             <h4 className='text-center my-3'>{ rowData ? 
            ( <>
                ویرایش : <span className='text-primary'>{rowData.title}</span>
             </>)
              :(" افزودن محصول جدید" )
              } </h4>

            <div className='text-left col-md-6 col-lg-8 m-auto my-3'>
                <PrevPageButton/>
            </div>
            <div className="row justify-content-center">

                <FormikControl
                className="col-12 col-md-6 col-lg-8"
                control="select"
                options={parentCategories}
                name="parentCats"
                label="دسته والد"
                firstItem="دسته مورد نظر را انتخاب کنید"
                handleChange={handleSetMainCategories}
                />
       
          

                {mainCategories === "waiting" ? (
                    <SpinnerLoad isSmall={true} colorClass="text-primary" />
                  ) : null}

                  <FormikControl
                  label="دسته اصلی *"
                  className="col-md-6 col-lg-8"
                  control="searchableSelect"
                  options={typeof(mainCategories) == "object" ? mainCategories : []}
                  name="category_ids"
                  firstItem="دسته مورد نظر را انتخاب کنبد..."
                  resultType="string"
                  initialItems={selectedCategories}
                  />  
                  
                        
                 <FormikControl
                    label="عنوان *"
                    className="col-md-6 col-lg-8"
                    control="input"
                    type="text"
                    name="title"
                    placeholder="فقط از حروف و اعداد استفاده کنید"
                  />

                  <FormikControl
                    label="قیمت *"
                    className="col-md-6 col-lg-8"
                    control="input"
                    type="number"
                    name="price"
                    placeholder="فقط از اعداد استفاده کنید(تومان)"
                  /> 


                <FormikControl
                  label="وزن "
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="number"
                  name="weight"
                  placeholder="فقط از اعداد استفاده کنید(گِرم)"
                  />

                  <FormikControl
                  label="برند"
                  className="col-md-6 col-lg-8"
                  control="select"
                  options={brands}
                  name="brand_id"
                  firstItem="برند مورد نظر را انتخاب کنبد..."
                  /> 
                  
                  <FormikControl
                  label="رنگ"
                  className="col-md-6 col-lg-8"
                  control="searchableSelect"
                  options={typeof(colors) == "object" ? colors : []}
                  name="color_ids"
                  firstItem="رنگ مورد نظر را انتخاب کنبد..."
                 resultType="string"
                 initialItems={selectedColors}
                  /> 

                  <FormikControl
                  label="گارانتی"
                  className="col-md-6 col-lg-8"
                  control="searchableSelect"
                  options={typeof(guaranties) == "object" ? guaranties : []}
                  name="guarantee_ids"
                  firstItem="گارانتی مورد نظر را انتخاب کنبد..."
                   resultType="string"
                   initialItems={selectedGuarantees}
                  /> 

  


                  <FormikControl
                    label="توضیحات"
                    className="col-md-6 col-lg-8"
                    control="textarea"
                    name="descriptions"
                    placeholder="فقط از حروف واعداد استفاده شود"
                  />

                  <FormikControl
                    label="توضیحات کوتاه"
                    className="col-md-6 col-lg-8"
                    control="textarea"
                    name="short_descriptions"
                    placeholder="فقط از حروف واعداد استفاده شود"
                  />

                  <FormikControl
                    label="توضیحات  سبد"
                    className="col-md-6 col-lg-8"
                    control="textarea"
                    name="cart_descriptions"
                    placeholder="فقط از حروف واعداد استفاده شود"
                  />

                  {
                    !rowData ?(
                      <FormikControl
                      label="تصویر"
                      className="col-md-6 col-lg-8"
                      control="file"
                      name="image"
                      placeholder="تصویر"
                      />
                    ):(
                      null
                    )
                  }

                  <FormikControl
                  label="توضیح تصویر "
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="alt_image"
                  placeholder="فقط از حروف و اعداد استفاده کنید"
                  />

                  <FormikControl
                  label="کلمات کلیدی "
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="keywords"
                  placeholder="مثلا: تست1-تست2-تست3"
                  />

                  <FormikControl
                    label="موجودی "
                    className="col-md-6 col-lg-8"
                    control="input"
                    type="number"
                    name="stock"
                    placeholder="فقط از اعداد استفاده کنید(عدد)"
                  />

                  <FormikControl
                    label="درصد تخفیف "
                    className="col-md-6 col-lg-8"
                    control="input"
                    type="number"
                    name="discount"
                    placeholder="فقط از اعداد استفاده کنید(درصد)"
                  />

        
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                    <SubmitBotton id={location.state?.productToEdit.id}/>
                    <PrevPageButton className="me-2"/>
                 </div>
      

            </div>
        </div>
        </Form>
        )
    }}

    </Formik>

  )
}