

import React from 'react'
import FormikError from './FormikError'
import { ErrorMessage, FastField } from 'formik'

export default function Input({type,name,label,className,placeholder}) {
  return (
        <div className={`col-12 ${className}`}>
            <div className="input-group my-3 dir_ltr">
                <FastField type={type} name={name} className="form-control" placeholder={placeholder} />
                <span className="input-group-text w_8rem justify-content-center"> {label} </span>
            </div>
            <ErrorMessage name={name} component={FormikError}/>
        </div>
    );
}
