
import React, { useEffect, useState } from 'react'
import FormikError from './FormikError'
import { ErrorMessage, Field } from 'formik'

export default function SearchableSelect({resultType,options,name,label,className,firstItem,initialItems}) {

        const [selectItems,setSelectItems]=useState([])
        const [showItems,setShowItems]=useState(false)
        const [copyOptions,setCopyOptions]=useState(options)


    
        const handleSelectItems=async(selectId,formik)=>{
              setSelectItems(oldData=>{
            if (oldData.findIndex(d=>d.id==selectId)== -1 && selectId>0) {
                const newData = [...oldData , options.filter(c=>c.id==selectId)[0]]

                const selectIds=newData.map(n=>n.id)
                const valueType=(resultType=="string" ? selectIds.join("-") : selectIds)
                formik.setFieldValue(name,valueType)
                return newData
            }else{
                return oldData
            }
          })
       }

        const handleDeleteFromSelectItems=(e,id,formik)=>{

    e.stopPropagation()
    setSelectItems((oldData) => {
      const newData = oldData.filter((d) => d.id != id);


          const selectedIds = newData.map((n) => n.id);
          const nameValue = resultType == "string" ? selectedIds.join("-") : selectedIds
          formik.setFieldValue(name, nameValue);

          return newData;
        });
      }

      useEffect(()=>{
        setSelectItems(initialItems)
      },[initialItems])



        useEffect(() => {
          setCopyOptions(options)
        }, [options])
   

        useEffect(() => {
          document.querySelector('body').addEventListener('click' ,()=>{
            setShowItems(false)
          })
        }, [])
   
        
  return (
      <Field>
        {({form})=>{
          // console.log(form);
          
          return(
            <div className={`col-12 ${className}`}>
              <div className='input-group mb-3 dir_ltr pointer ' 
              onClick={(e)=>{ e.stopPropagation()
                setShowItems(!showItems)}}>
              <div className='form-control d-flex' id={name + "-select"} >
               
               {selectItems.length>0 ? 
               selectItems.map(s=>(
                <span className='chips_elem' key={s.id}>
                    <i className='fas fa-times text-danger' 
                    onClick={(e)=>handleDeleteFromSelectItems(e,s.id,form)}></i>
                        {s.value}
                </span>
               )):(
                <span className='text-secondary'>{firstItem}</span>
               )}

                 <div className={`multi_select_items_content ${!showItems ? "d-none" : ""}`}>
                     <input type="text" className="form-control"
                      placeholder="قسمتی از عنوان مورد نظر را وارد کنید" 
                      onClick={(e)=>e.stopPropagation()} 
                          onChange={(e)=>setCopyOptions(options.filter(o=>o.value.includes(e.target.value)))}/>       

                                <ul className="p-0">
                                    {copyOptions.map((o) => (
                                        <li key={o.id} className="multi_select_items pointer" onClick={()=>handleSelectItems(o.id, form)}> {o.value} </li>
                                    ))}
                                </ul>

                </div>
              </div>
              <label className='input-group-text w_6rem justify-content-center'>{label}</label>
              </div>
                <ErrorMessage name={name} component={FormikError}/>
             
            </div>
          )
        }
    
        }
      </Field>
  )
}
