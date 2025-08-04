
import React, { useEffect, useState } from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { initialValues, onSubmit, validateSchema } from './core'
import { getAllProductTitlesService, getOneProductService } from '../../service/products'
import FormikError from '../../components/form/FormikError';
// import Select from 'react-select/base'
import Select from 'react-select';
import { numberWithCommas } from '../../utils/numbers'
import { addNewCartService, editCartService, getOneCartService } from '../../service/carts'
import { Alert } from '../../utils/Alert'

export default function AddCarts() {
  
  const navigate = useNavigate()

  const location=useLocation()
  const cartToEdit=location.state?.cartId
  

  const {handleGetCarts}=useOutletContext()
  
  const [allProducts ,setAllProducts]=useState([])
  const [curentProduct ,setCurentProduct]=useState(null)
  const [colors ,setColors]=useState([])
  const [guarantees ,setGuarantees]=useState([])
  const [selectProductInfo ,setSelectProductsInfo]=useState([])
  const [reInitialValue ,setReInitialValue]=useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)



    const handleGetAllProductsTitle=async()=>{
      const res=await getAllProductTitlesService()
      if (res.status==200) {
        setAllProducts(res.data.data.map(p=>{return{value:p.id,label:p.title}}))
      }
    }


    const handleChangeSelectProduct=async(e,formik)=>{
      formik.setFieldValue("product_id" , e.value)
      const res=await getOneProductService(e.value)
      if (res.status==200) {
        const product = res.data.data
        setCurentProduct(product)
        setColors(product.colors.map(c=>({value:c.id , label:c.title})))
        setGuarantees(product.guarantees.map(g=>({value:g.id , label:g.title})))
      }
    }

    

    const handleConfirmAddCart=async(formik)=>{
      setIsSubmitting(true);
      let products=[]
      for (const p of selectProductInfo) {
            products.push({
            product_id:p.product.id,
            color_id:p.color.id || "",
            guarantee_id:p.guarantee.id || "",
            count:p.count
          })
      }
      let res ;
     if( cartToEdit ){
        res=await editCartService(cartToEdit ,{
          user_id: formik.values.user_id,
          products
       })
     } else{
         res=await addNewCartService({
          user_id: formik.values.user_id,
          products
        })
      }
      res && setIsSubmitting(false)
      if (res.status==201 || res.status==200) {
        Alert("OK..." , res.data.message,"success")
        handleGetCarts()
        navigate(-1)
      }
      
      
    }

    const handleGetOneCart=async()=>{
      const res=await getOneCartService(cartToEdit)
      if (res.status==200) {
        const cart=res.data.data
        console.log(cart);
        
        setReInitialValue({...initialValues , user_id:cart.user_id})
        let products=[]
        for (const item of cart.items) {
          products.push({
            id:item.id,
            product:item.product,
            guarantee:item.guarantee,
            color:item.color,
            count:item.count
          })
        }
        setSelectProductsInfo(products)
      }
    }

    const handleDeleteProduct=(id)=>{
      setSelectProductsInfo(old=>old.filter(o=>o.id!=id))
    }

    useEffect(()=>{
      cartToEdit && handleGetOneCart()
    },[])

    useEffect(()=>{
      handleGetAllProductsTitle()
    },[])

    
  return (
 <>

 <ModalsContainer
  className="show d-block"
    fullScreen={true}
    id="edit_cart_modal"
    title={cartToEdit ? "جزئیات و ویرایش سبد خرید" :"افزودن سبد خرید"}
    closeFunction={()=>navigate(-1)}
 >
    
        <div className="container">

            <Formik
              initialValues={reInitialValue || initialValues}
              onSubmit={(values,actions)=>onSubmit(values,actions,setSelectProductsInfo,curentProduct)}
              validateSchema={validateSchema}
              enableReinitialize
            >

              {
                formik=>{
                  return (
                    <Form>
                      <div className="row my-3 justify-content-center">
                        <div className=' col-12 col-md-4 col-lg-2 my-1'>
                          <Field type="text" name="user_id" className="form-control"
                          placeholder="آی دی مشتری" />
                          <br/>
                          <ErrorMessage name="user_id" component={FormikError}/>
                        </div>

                        <div className=' col-12 col-md-4 col-lg-2 my-1'>
                            <Select  options={allProducts} placeholder="محصول"
                            onChange={(e)=>handleChangeSelectProduct(e,formik)}/>
                              <br/>
                          <ErrorMessage name="product_id" component={FormikError}/>
                        </div>

                        
                        <div className=' col-12 col-md-4 col-lg-2 my-1'>
                            <Select  options={colors} placeholder="رنگ"
                            onChange={(e)=>formik.setFieldValue("color_id" ,  e.value)}/>
                              <br/>
                          <ErrorMessage name="color_id" component={FormikError}/>
                        </div>

                        <div className=' col-12 col-md-4 col-lg-2 my-1'>
                            <Select  options={guarantees} placeholder="گارانتی"
                            onChange={(e)=>formik.setFieldValue("guarantee_id" , e.value)}/>
                              <br/>
                          <ErrorMessage name="guarantee_id" component={FormikError}/>
                        </div>

                        <div className=' col-12 col-md-4 col-lg-2 my-1'>
                          <Field type="number" name="count" className="form-control"
                          placeholder="تعداد " />
                          <br/>
                          <ErrorMessage name="count" component={FormikError}/>
                        </div>

                        <div className="col-4 col-lg-1 d-flex justify-content-center align-items-center my-1">
                            <i className="fas fa-check text-light bg-success rounded-circle p-2 mx-1
                              hoverable_text hoverable pointer has_tooltip hoverable_text"
                              title="ثبت فرم" data-bs-toggle="tooltip" data-bs-placement="top" 
                              onClick={()=>formik.submitForm()}></i>
                          </div>
                          <hr className="mt-3" />
                      </div>

                      <div className='row justify-content-center'>
                      {  
                          selectProductInfo.map(product=>(
                              <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                                  <div className="input-group my-3 dir_ltr">
                                      <span className="input-group-text text-end font_08 w-100 text_truncate">
                                          <i className="fas fa-times text-danger hoverable_text pointer mx-1 has_tooltip"
                                           title="حذف محصول از سبد" data-bs-placement="top"
                                            onClick={()=>handleDeleteProduct(product.id)}
                                            ></i>
                                          {product.product.title}
                                          (قیمت واحد: {numberWithCommas(product.product.price)})
                                          (گارانتی: {product.guarantee.title})
                                          ({product.count} عدد)
                                        
                                          <i className="fas fa-circle mx-1" style={{ color: product.color?.code }}></i>
                                      </span>
                                  </div>
                              </div>
                          ))
                      }
                        <div className='col-12'></div>
                            {selectProductInfo.length > 0 ? (
                                    <>
                                        <div className="col-6">
                                            <div className="input-group my-3 dir_ltr">
                                                <span className="input-group-text justify-content-center w-75" >
                                                  {numberWithCommas(selectProductInfo.map(p=>p.count*p.product.price)
                                                  .reduce((a, b)=>a+b))}</span>
                                                <span className="input-group-text w-25 text-center"> جمع کل </span>
                                            </div>
                                        </div>
                                        <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                            <button type='button' className="btn btn-primary" 
                                            onClick={()=>handleConfirmAddCart(formik)} disabled={isSubmitting}>
                                              {isSubmitting ? "صبر کنید..." :"ذخیره"}
                                            </button>
                                        </div>
                                    </>
                                ) : (<h6 className='text-center text-primary'>محصولات خود را مشخص کنید</h6>)
                            }
                      </div>
                  </Form>
                  )
                }
              }

            </Formik>
        
                </div>
 </ModalsContainer>
 </>
  )
}
