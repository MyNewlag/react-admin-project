
import { ErrorMessage, Field } from 'formik'
import React, { useState } from 'react'
import FormikError from './FormikError'


export default function MultiSelect({resultType,options,name,label,className,firstItem}) {
    const [selectItems,setSelectItems]=useState([])
    


        const handleSelectItems=async(selectId,formik)=>{
              setSelectItems(oldData=>{
            if (oldData.findIndex(d=>d.id==selectId)== -1 && selectId>0) {
                const newData = [...oldData , options.filter(c=>c.id==selectId)[0]]

                const selectIds=newData.map(n=>n.id)
                const valueType=(resultType=="string" ? selectIds.join("-") : selectIds)
                    console.log(valueType);
                formik.setFieldValue(name,valueType)
                return newData
            }else{
                return oldData
            }
        })
    }


        const handleDeleteFromSelectItems=(id,formik)=>{

       setSelectItems(oldData=>{
        let newData=oldData.filter(s=>s.id !=id)
        
        const selectIds=newData.map(n=>n.id)
         formik.setFieldValue("category_ids",selectIds.join("-"))
         return newData
       }
       )
    }
    


  return (
  <Field>
    {({form})=>{
      return(
        <div className={`col-12 ${className}`}>
          <div className='input-group mb-3 dir_ltr'>
          <select className='form-control' id={name + "-select"}
           onChange={(e)=>handleSelectItems(e.target.value,form)} >
            <option value="">{firstItem}</option>
            { options.map(o=>(
                  <option key={o.id} value={o.id}>{o.value}</option>
              ))
            }
          </select>
          <label className='input-group-text w_6rem justify-content-center'>{label}</label>
          </div>
            <ErrorMessage name={name} component={FormikError}/>
          {
            selectItems.map(s=>
                <span key={s.id} className="chips_elem">
                    <i className="fas fa-times text-danger"
                            onClick={()=>handleDeleteFromSelectItems(s.id,form)}></i>
                   {s.value}
                   </span>
            )
          }
        </div>
      )
    }

    }
  </Field>
  )
}
