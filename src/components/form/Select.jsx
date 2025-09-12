
import { ErrorMessage, FastField ,Field} from 'formik'
import React from 'react'
import FormikError from './FormikError';

export default function Select({options,name,label,className,firstItem,handleChange}) {

    const setOption=()=>{
        return(
        <>
         <option value="" > {firstItem}</option>
            {options.map((o) => (
            <option key={o.id} value={o.id}>{o.value} </option>
        ))}
        </>
        )
    }


    return (
        <div className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">

                <Field>
                    {({form})=>{
                        return(
                            <>
                        {handleChange ? 
                            (
                                <Field as="select" className="form-control" id={name} name={name} 
                                onChange= {(e)=>handleChange(e.target.value ,form)} >
                                  {setOption()}
                                </Field>
                            ) : (
                                    <Field as="select" className="form-control" id={name} name={name}>
                                    {setOption()}
                                </Field>
                            ) }
                            </>

                              )
                          }}
                </Field>
                {label &&
                    <span className="input-group-text w_6rem justify-content-center">{label}</span>
                }
            </div>
            <ErrorMessage name={name} component={FormikError}/>
        </div>
  );
}
