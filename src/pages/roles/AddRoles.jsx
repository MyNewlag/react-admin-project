
import React, { useEffect, useState } from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import FormikControl from '../../components/form/FormikControl'
import { Form, Formik } from 'formik'
import SubmitBotton from '../../components/form/SubmitBotton'
import { initialValues, onSubmit, validationSchema } from './core'
import { getAllPermissionsService, getSingleRoleService } from '../../service/users'


export default function AddRoles() {
    
    const [permission , setPermission]=useState([])
    const [roleToEdit , setRoleToEdit]=useState(null)
    const [reinitilValue , setReinitilValue]=useState(null)

    const navigate = useNavigate()

    const location=useLocation()
    const roleIdToEdit=location.state?.roleToEdit
    const editType=location.state?.editType
    

    const {setData}=useOutletContext()
// console.log(reinitilValue.permissions);

    

    const hanldleGetAllPermissions=async()=>{
            const res=await getAllPermissionsService()
            if (res.status==200) {
                setPermission(res.data.data.map(d=>{return{id:d.id , title:d.description}}))
            }
     }

    const hanldleGetSinglePermission=async()=>{
            const res=await getSingleRoleService(roleIdToEdit)
            if (res.status==200) {
              const rol=res.data.data
             setRoleToEdit(rol)
            
             editType=="role" ? 
             setReinitilValue({title:rol.title ,
              description:rol.description }) :
               setReinitilValue({permissions_id:rol.permissions.map(p=>""+p.id)
                ,editPermissions:true
               })
            }
          }

  

    useEffect(()=>{
       editType!="role" && hanldleGetAllPermissions()
       roleIdToEdit && hanldleGetSinglePermission()
    },[])

  return (
    <>

        <ModalsContainer
             className="show d-block"
            id={"add_discount_modal"}
            title={editType=="role" ? "ویرایش نقش" : 
              editType=="permissions" ? "ویرایش مجوزهای :" +roleToEdit?.title:
               "افزودن نقش کاربر"}
            fullScreen={editType=="role" ? false : true}
            closeFunction={()=>navigate(-1)}
        >
              <div className="container">

                <Formik
                initialValues={reinitilValue || initialValues}
                onSubmit={(values,action)=>onSubmit(values,action,setData,roleIdToEdit,editType)}
                validationSchema={validationSchema}
                enableReinitialize
                >
                    <Form>
                   <div className="row justify-content-center">

                    {
                      editType!="permissions" ?(
                        <>
                        
                        <FormikControl
                          className={editType=="role" ? "" :"col-md-8"}
                          control="input"
                          type="text"
                          name="title"
                          label="عنوان نقش "
                          placeholder="فقط از حروف فارسی استفاده کنید"
                          />
                          
                  
                        <FormikControl
                          className={editType=="role" ? "" :"col-md-8"}
                          control="textarea"
                          name="description"
                          label="توضیحات نقش "
                          placeholder="فقط از حروف فارسی استفاده کنید"
                          />
                        </>
                      ): null
                    }


                        {
                          editType!="role"  ?(
                            <FormikControl
                              className="col-md-8"
                              control="checkBox"
                              name="permissions_id"
                              label="دسترسی ها"
                              options={permission}
                              />
                  
                          ):null
                        }

                        <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                            <SubmitBotton/>
                        </div>
                    </div>
                    </Form>
                </Formik>
            </div>
        </ModalsContainer>
    </>
  )
}
