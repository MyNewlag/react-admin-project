

import React from 'react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';

import AuthFormikControl from '../../components/authForm/AuthFormikControl';
import axios from 'axios';


const initialValues ={
    phone:"",
    password: "",
    remember: false
}
const onSubmit = (values)=>{
        axios.post('https://ecomadminapi.azhadev.ir/api/auth/login' , {
            ...values ,
            remember:values.remember? 1 : 0
        }).then(res=>console.log(res)
        )
    }

const validationSchema = yup.object({
    phone:yup.number().required('لطفا این قسمت را پر کنید'),
    password: yup.string().required('لطفا این قسمت را پر کنید')
        .matches(/^[a-zA-Z0-9@!%$?&]+$/ , 'فقط از حروف و عدد استفاده شود'),
        remember:yup.boolean()
});

const Login = () => {
    return (

                <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                >
                    {
                        formik=>{
                            console.log(formik);
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
                                        control="swich"
                                        name="remember"
                                        label="مرا بخاطر بسپار   "
                                        />

                                        
                                                                        
                                        <div className="container-login100-form-btn">
                                            <button className="login100-form-btn">
                                                ورود
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