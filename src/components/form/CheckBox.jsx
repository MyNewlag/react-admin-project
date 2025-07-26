
import React from 'react'
import FormikError from './FormikError';
import { ErrorMessage, FastField, Field  } from 'formik';

export default function CheckBox(props) {
 const {name,label,options,className} = props;

    return (
        <div className={`mb-2 ${className} row`}>
            <label htmlFor={name} className="form-label">{label}</label>
            <ErrorMessage name={name} component={FormikError} />
            <Field className="form-control" id={name} name={name}>
                {({field})=>{
                    // console.log(field.value)
                    return options.map(o=>(
                        <div className='d-inline-block col-md-6 col-xl-4 pb-1' key={o.id}>
                            <input 
                            className='form-check-input me-4 pointer'
                            type="checkbox" 
                            id={o.id}
                            {...field}
                            value={o.id}
                            checked={field.value.includes(""+o.id)}
                            />
                            <label htmlFor={o.id} className="mx-1 ms-4 pointer">{o.title}</label>
                        </div>
                    ))
                }}
            </Field>
        </div>
    );
}
