
import { ErrorMessage, FastField ,Field} from 'formik'
import React from 'react'
import FormikError from './FormikError';
import { useParams } from 'react-router-dom';

export default function Select({options,name,label,className,firstItem,handleChange}) {

    
  return (
        <div className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">
                <Field>
                    {({form})=>{
                        return(
                            <Field as="select" className="form-control" id={name} name={name} 
                            onChange={handleChange ? (e)=>handleChange(e.target.value ,form) : ()=>null}>
                                 <option value="" > {firstItem}</option>
                                   {options.map((o) => (
                                      <option key={o.id} value={o.id} >
                                      {o.value} </option>
                                  ))}
                            </Field>
                              )
                          }}
                </Field>
                    <span className="input-group-text w_6rem justify-content-center">{label}</span>
            </div>
            <ErrorMessage name={name} component={FormikError}/>
        </div>
  );
}
