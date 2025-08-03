
import React, { useEffect, useState } from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { initialValues, onSubmit, validateSchema } from './core'
import { getAllProductTitlesService, getOneProductService } from '../../service/products'
import FormikError from './../../components/form/FormikError';
// import Select from 'react-select/base'
import Select from 'react-select';
import { numberWithCommas } from '../../utils/numbers'
import { addNewCartService } from '../../service/cards'
import { Alert } from '../../utils/Alert'

export default function AddCards() {
  
  const navigate = useNavigate()

  const {handleGetCards}=useOutletContext()
  
  const [allProducts ,setAllProducts]=useState([])
  const [curentProduct ,setCurentProduct]=useState(null)
  const [colors ,setColors]=useState([])
  const [guarantees ,setGuarantees]=useState([])
  const [selectProducts ,setSelectProducts]=useState([])
  const [selectProductInfo ,setSelectProductsInfo]=useState([])
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
        // console.log(product);
        
        setCurentProduct(product)
        setColors(product.colors.map(c=>({value:c.id , label:c.title})))
        setGuarantees(product.guarantees.map(g=>({value:g.id , label:g.title})))
      }
    }


    const handleConfirmAddCart=async(formik)=>{
      setIsSubmitting(true);
      const res=await addNewCartService({
        user_id: formik.values.user_id,
        products:selectProducts
      })
          if (res.status==201) {
            Alert("OK..." , res.data.message,"success")
            handleGetCards()
            navigate(-1)
          }
          setIsSubmitting(false)
    }

    const handleDeleteProduct=(id)=>{
      console.log(id);
      
      const inedx=selectProductInfo.findIndex(s=>s.id==id)
      setSelectProducts(old=>old.splice(inedx,1))
      setSelectProductsInfo(old=>old.filter(o=>o.id!=id))
    }

    useEffect(()=>{
      handleGetAllProductsTitle()
    },[])

    
  return (
 <>

 <ModalsContainer
  className="show d-block"
    fullScreen={true}
    id="edit_cart_modal"
    title="جزِِئیات و افزودن سبد خرید"
    closeFunction={()=>navigate(-1)}
 >
    
        <div className="container">

            <Formik
            initialValues={initialValues}
            onSubmit={(values,actions)=>onSubmit(values,actions,setSelectProducts,
              setSelectProductsInfo,curentProduct)}
            validateSchema={validateSchema}
            >

              {
                formik=>{
                  return (
                    <Form>
                      <div className="row my-3 justify-content-center">
                        <div className=' col-12 col-md-4 col-lg-2 my-1'>
                          <Field type="text" name="user_id" className="form-control"
                          placeholder="آی دی مشتری" 
                            disabled={selectProducts.length > 0} />
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
                                          {product.productName}
                                          (قیمت واحد: {numberWithCommas(product.price)})
                                          (گارانتی: {product.guarantee&& product.guarantee})
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
                                                  {numberWithCommas(selectProductInfo.map(p=>p.count*p.price)
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
