

import React, { useEffect, useState } from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { Form, Formik } from 'formik'
import FormikControl from '../../components/form/FormikControl'
import { initialValues, onSubmit, validationSchema } from './core'
import SubmitButton from '../../components/form/SubmitBotton'
import { getAllRolesService, getSingleUserService } from '../../service/users'
import { convertDateToJalali } from './../../utils/convertDate';

export default function AddUser() {

     const navigate = useNavigate()

     const location = useLocation()
     const userId=location.state?.userId

     const {setData}=useOutletContext()
     
     const [getRoles , setGetRoles]=useState([])
     const [userToEdit , setUserToEdit]=useState(null)
     const [selectedRoles , setSelectedRoles]=useState([])
     const [reinitialValue , setReinitialValue]=useState(null)

  
     const handleGetSingleUser = async()=>{
        const res = await getSingleUserService(userId)
        if (res.status==200){
            setUserToEdit(res.data.data)
        }
     }
     

     const handleGetAllRoles=async ()=>{
        const res=await getAllRolesService()
        if (res.status==200) {
            setGetRoles(res.data.data.map(r=>{return {id:r.id , value:r.title}}))
        }
     }
     
     useEffect(()=>{
         handleGetAllRoles()
        if (userId) {
            handleGetSingleUser()
        }
    },[])
    

     useEffect(()=>{
        if (userToEdit) {
            setSelectedRoles(userToEdit.roles.map(r=>{return{id:r.id , value:r.title}}))
            const roles_id = userToEdit.roles.map(p=>p.id)

            setReinitialValue({
                user_name: userToEdit.user_name || "" ,
                first_name: userToEdit.first_name || "",
                last_name:  userToEdit.last_name || "",
                phone: userToEdit.phone || "",
                email: userToEdit.email || "",
                gender:  userToEdit.gender || 1,
                 password: "",
                birth_date: userToEdit.birth_date ? convertDateToJalali(userToEdit.birth_date , 'jD / jM / jYYYY') : "",
                roles_id:roles_id,
                isEditing:true
            })
        }
     },[userToEdit])

  return (

        <ModalsContainer
        className="show d-block"
        fullScreen={true}
        id="add_user_modal"
        title="افزورن کاربر جدید"
        closeFunction={()=>navigate(-1)}
        >
            
         <div className="container">
               
        <Formik
        initialValues={reinitialValue || initialValues}
        onSubmit={(values,action)=>onSubmit(values,action,setData,userId)}
        validationSchema={validationSchema}
        enableReinitialize
        >
    
            {
                formik=>{
                    return (
                        <Form className="row justify-content-center">
                            <div className="row justify-content-center">
                                <FormikControl
                                className={"col-md-8"}
                                control="input"
                                type="text"
                                name="user_name"
                                label="نام کاربری"
                                placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                />

                                <FormikControl
                                className={"col-md-8"}
                                control="input"
                                type="text"
                                name="first_name"
                                label="نام "
                                placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                />
                                <FormikControl
                                className={"col-md-8"}
                                control="input"
                                type="text"
                                name="last_name"
                                label="نام خانوادگی"
                                placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                />

                                <FormikControl
                                className={"col-md-8"}
                                control="input"
                                type="number"
                                name="phone"
                                label="شماره موبایل"
                                placeholder="فقط از اعداد استفاده کنید"
                                />

                                <FormikControl
                                className={"col-md-8"}
                                control="input"
                                type="text"
                                name="email"
                                label="ایمیل"
                                placeholder="فقط فرمت ایمیل (email@yourhost.com)"
                                />

                                <FormikControl
                                className={"col-md-8"}
                                control="input"
                                type="text"
                                name="password"
                                label="کلمه عبور"
                                placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                />

                                <FormikControl
                                className="col-md-8"
                                control="date"
                                formik={formik}
                                name="birth_date"
                                label="تاریخ تولد"
                                initialDate={userToEdit ? userToEdit.birth_date : undefined}
                                yearsLimit={{from: 100, to:-10}}
                                />

                                <FormikControl
                                className="col-md-6 col-lg-8"
                                control="select"
                                options={[{id:1 , value: "مرد"} ,{id:0 , value: "زن"}]}
                                name="gender"
                                label="جنسیت"
                                />

                                <FormikControl
                                label="نقش ها"
                                className="col-md-6 col-lg-8"
                                control="searchableSelect"
                                options={getRoles}
                                name="roles_id"
                                firstItem="لطفا نقش های مورد نظر را انتخاب کنید"
                                resultType="array"
                                initialItems={selectedRoles}
                                />

                                <div className="btn_box text-center col-12 mt-4">
                                    <SubmitButton />
                                </div>
                                
                          </div>
                      </Form>
                            )
                        }
                    }   
                           
                      </Formik>                                          
                </div>
        </ModalsContainer>
       
  )
}
