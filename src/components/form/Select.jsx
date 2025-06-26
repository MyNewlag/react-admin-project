
import { ErrorMessage, FastField } from 'formik'
import React from 'react'
import FormikError from './FormikError';
import { useParams } from 'react-router-dom';

export default function Select({options,name,label,className}) {
        const params=useParams()
    // console.log(params);
    // console.log(options);
    
  return (
        <div className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">
                <FastField as="select" className="form-control" id={name} name={name} >
                    <option value=""> دسته والد را انتخاب کنید... </option>
                    {options.map((o) => (
                        <option key={o.id} value={o.id}> {o.value} </option>
                    ))}
                </FastField>
                <span className="input-group-text w_6rem justify-content-center">{label}</span>
            </div>
            <ErrorMessage name={name} component={FormikError}/>
        </div>
  );
}
