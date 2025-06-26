

import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import AuthFormikControl from '../../components/authForm/AuthFormikControl';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../utils/Alert';
import { loginService } from '../../service/auth';


const initialValues ={
    phone:"",
    password: "",
    remember: false
}
const onSubmit = async (values,submitMethods,navigate)=>{
    // console.log(submitMethods); 
    try {
    const res=await loginService(values)
        if(res.status==200){
            localStorage.setItem('loginToken' , JSON.stringify(res.data))
            navigate('/')
            // submitMethods.setSubmitting(false)
        }else{
            // console.log(res);
            Alert("خطا",res.data.message,"error")
        }
        submitMethods.setSubmitting(false)
        
    } catch (error) {
        submitMethods.setSubmitting(false)
        Alert("خطا",'متاسفم مشکلی در سمت سرور رخ داده است',"error")
          }
    }
 

const validationSchema = yup.object({
    phone:yup.number().required('لطفا این قسمت را پر کنید'),
    password: yup.string().required('لطفا این قسمت را پر کنید')
        .matches(/^[a-zA-Z0-9@!%$?&]+$/ , 'فقط از حروف و عدد استفاده شود'),
        remember:yup.boolean()
});

const Login = () => {

    const navigate = useNavigate()
    return (
                <Formik
                initialValues={initialValues}
                onSubmit={(values,submitMethods)=>onSubmit(values,submitMethods,navigate)}
                validationSchema={validationSchema}
                >
                    {
                        formik=>{
                            // console.log(formik);
                            return(                                
                                <div className="wrap-login100">
                                    <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
                                        <span className="login100-form-title">
                                            ورود اعضا
                                        </span>

                                        <AuthFormikControl
                                        formik={formik}
                                        control="input"
                                        type="text"
                                        name="phone"
                                        icon="fa fa-mobile"
                                        label="تلفن همراه"
                                        />

                                        <AuthFormikControl
                                        formik={formik}
                                        control="input"
                                        type="password"
                                        name="password"
                                        icon="fa fa-lock"
                                        label="روز عبور "
                                        />

                                        <AuthFormikControl
                                        control="switch"
                                        name="remember"
                                        label="مرا بخاطر بسپار   "
                                        />

                                        
                                                                        
                                        <div className="container-login100-form-btn">
                                            <button className="login100-form-btn" disabled={formik.isSubmitting}>
                                                {formik.isSubmitting ? " لطفا صبر کنید ..." : "ورود"}
                                            </button>
                                        </div>
                                        
                                    </Form>
                                    <div className="login100-pic js-tilt" data-tilt>
                                        <img src="/auth/images/img-01.png" alt="IMG"/>
                                    </div>
                                </div>
                            )
                        }
                    }
                </Formik>
    );
}

export default Login;