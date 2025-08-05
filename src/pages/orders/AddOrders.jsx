import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../components/ModalsContainer';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import FormikControl from './../../components/form/FormikControl';
import { getAllDeliveriesServices } from './../../service/deliveries';
import { getOneCartService } from '../../service/carts';
import { getOneDiscountServic } from '../../service/discounts';
import { getOneOrdersService } from '../../service/orders';
import { convertDateToJalali } from './../../utils/convertDate';
import { numberWithCommas } from './../../utils/numbers';
import SubmitBotton from '../../components/form/SubmitBotton';
import { Alert } from '../../utils/Alert';


const AddOrder = () => {

    const {handleGetAllOrders}=useOutletContext()
    
    const navigate = useNavigate()

    const location=useLocation()
     const selectedOrderId=location.state?.orderId

    const [reInitialValue,setReInitialValue]=useState(null)
    const [selectedCartItemsInfo,setSelectedCartItemsInfo]=useState([])
    const [discountPercent,setDiscountPercent]=useState(0)
    const [allDeliveries,setAllDeliveries]=useState([])


    const getAllDelivery=async()=>{
        const res=await getAllDeliveriesServices()
        if (res.status==200) {
            // setAllDeliveries(res.data.data.map(d=>{return {id:d.id , value:d.tile +"-" +d.amount}}))
            setAllDeliveries(res.data.data.map(d=>({id:d.id , value:d.title +"-" +d.amount})))
        }
    }
    

    const handleGetCartsInfo=async(cartId)=>{
        if (!cartId) return setSelectedCartItemsInfo([])
        const res=await getOneCartService(cartId)
        if (res.status==200) {
            let products=[] 
            const cart=res.data.data
           for (const item of cart.items) {
               products.push({
                id:item.id,
                product:item.product,
                guarantee:item.guarantee,
                color:item.color,
                count:item.count
               }) 
           }
           setSelectedCartItemsInfo(products)
        }
    }    


    const handleDiscountInfo=async(discountId)=>{
          if (!discountId) return setDiscountPercent(0)
        const res=await getOneDiscountServic(discountId)
        if (res.status==200) {
            setDiscountPercent(res.data.data.percent)
           }
        }


        const getSelectOrderInfo=async()=>{
            const res=await getOneOrdersService(selectedOrderId) 
            if (res.status==200) {
                const order=res.data.data
                setReInitialValue({
                    cart_id: order.cart_id,
                    discount_id: order.discount_id || "",
                    delivery_id: order.delivery_id,
                    address: order.address,
                    phone: order.phone,
                    email: order.email || "",
                    pay_at:order.pay_at ? convertDateToJalali(order.pay_at) : "",
                    pay_card_number:order.pay_card_number || "",
                    pay_bank: order.pay_bank || ""
                })
                    let products=[] 
                    const cart=order.cart
                     for (const item of cart.items) {
                    products.push({
                        id:item.id,
                        product:item.product,
                        guarantee:item.guarantee,
                        color:item.color,
                        count:item.count,
                        unit_price:item.unit_price
                    }) 
                }
                setSelectedCartItemsInfo(products)
            }
        }


    useEffect(()=>{
        getAllDelivery()
        selectedOrderId && getSelectOrderInfo()
    },[])

    return (
        <>
        <ModalsContainer
        className="show d-block"
        id={"add_order_modal"}
        title={selectedOrderId ? "جزئیات سفارش" : "افزودن سفارش"}
        fullScreen={true}
        closeFunction={()=>navigate(-1)}
        >

        <div className="container">

            <Formik
            initialValues={reInitialValue || initialValues}
            onSubmit={(values,actions)=>onSubmit(values,actions,navigate,handleGetAllOrders)}
            validationSchema={validationSchema}
            enableReinitialize
            >
            {formik=>{
                return (
                    <Form>
                            <div className="row my-1 justify-content-center">
                        <FormikControl
                        className="col-12 col-md-4 col-lg-2 my-1"
                        control="input"
                        type="number"
                        name="cart_id"
                        placeholder="کد سبد"
                        onBlur={(e)=>handleGetCartsInfo(e.target.value)}
                        />

                        <FormikControl
                        className="col-12 col-md-4 col-lg-2 my-1 mini_date_box"
                        control="date"
                        formik={formik}
                        name="pay_at"
                        placeholder="تاریخ پرداخت "
                        initialDate={undefined}
                        yearsLimit={{from:10 , to:0}}
                        />

                        <div className="col-12 col-md-4 col-lg-2 my-1">
                            <input 
                            type="text" 
                            className="form-control" 
                            value={`مبلغ سبد : ${ selectedCartItemsInfo.length > 0 ?
                              numberWithCommas(selectedCartItemsInfo
                             .map(p=>p.count*(p.unit_price || p.product.price)).reduce((a, b)=>a+b)) : 0}`} 
                            disabled />
                        </div>

                        <FormikControl
                        className="col-12 col-md-4 col-lg-2 my-1"
                        control="input"
                        type="number"
                        name="discount_id"
                        placeholder="آی دی تخفیف "
                        onBlur={(e)=>handleDiscountInfo(e.target.value)}
                        />

                        <div className='col-12 col-md-4 col-lg-2 my-1'>
                            <input type='text' className='form-control' 
                            value={"درصد تخفیف : "+discountPercent}
                            disabled/>
                        </div>

                      
                                <FormikControl
                                className="col-12 col-md-10 my-1"
                                control="input"
                                type="text"
                                name="address"
                                placeholder="آدرس"
                                />
                            

                                <FormikControl
                                className="col-12 col-md-4 col-lg-2 my-1"
                                control="select"
                                options={allDeliveries}
                                name="delivery_id"
                                firstItem="روش ارسال"
                                />

                                <FormikControl
                                className="col-12 col-md-4 col-lg-2 my-1"
                                control="input"
                                type="text"
                                name="phone"
                                placeholder="شماره تماس"
                                />

                                <FormikControl
                                className="col-12 col-md-4 col-lg-2 my-1"
                                control="input"
                                type="text"
                                name="email"
                                placeholder="ایمیل"
                                />

                                <FormikControl
                                className="col-12 col-md-4 col-lg-2 my-1"
                                control="input"
                                type="nomber"
                                name="pay_card_number"
                                placeholder="شماره کارت"
                                />

                                <FormikControl
                                className="col-12 col-md-4 col-lg-2 my-1"
                                control="input"
                                type="text"
                                name="pay_bank"
                                placeholder="نام بانک"
                                />

                            <hr className="mt-3" />
                            

                         <div className='row'>
                              {
                                 selectedCartItemsInfo.map(item=>(
                                       <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                                        <div className="input-group my-3 dir_ltr">
                                             <span className="input-group-text text-end font_08 w-100 text_truncate">
                                                 {item.product.title}
                                                 (قیمت واحد: {numberWithCommas(item.unit_price || item.product.price)})
                                                (گارانتی: {item.guarantee?.title})
                                                 ({item.count} عدد)
                                                 <i className="fas fa-circle mx-1" style={{ color: item.color?.code }}></i>
                                             </span>
                                           </div>
                                     </div>
                                 ))
                                }
                            </div>

                            {
                                (selectedCartItemsInfo.length > 0 && !selectedOrderId) && (
                                    <div className="btn_box text-center col-12 mt-4">
                                        <SubmitBotton/>
                                    </div>
                                )
                            }
                    </div>
                    </Form>
                )
            }}
            </Formik>
        </div>
         </ModalsContainer>

        </>

    );
}

export default AddOrder;