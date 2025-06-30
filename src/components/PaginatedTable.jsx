

import React, { useEffect, useState } from 'react'
import SpinnerLoad from './SpinnerLoad'


export default function PaginatedTable({data,dataInfo,additionFeild,children,numOfPage,searchParams,loading}) {



const [itemInPage,setItemInPage]=useState(numOfPage)
const [initData,setInitData]=useState(data)
const [searchChar,setSearchChar]=useState("")

const [tableData,setTableData]=useState([])
const [curentPage,setCurentPage]=useState(1)

const [pageCount,setPageCount]=useState(1)       // تعداد صفحات
const [pages,setPages]=useState([])              //شماره صفحات


useEffect(()=>{
  let pCount=Math.ceil(initData.length/itemInPage)
  setPageCount(pCount)
  let pArr=[]
  for(let i=1;i<=pCount;i++){
    pArr=[...pArr ,i]
    setPages(pArr)  
  }
},[initData,itemInPage])


useEffect(()=>{
 setInitData(data.filter(i=>i[searchParams.searchField].includes(searchChar)))
 setCurentPage(1)
},[searchChar,data])


  useEffect(()=>{
    const start=(curentPage*itemInPage)-itemInPage
    const end=curentPage*itemInPage
    setTableData(initData.slice(start,end))
  },[curentPage,initData,itemInPage])



const upItemInPage=()=>{
  if(itemInPage>=initData.length){
    setItemInPage(initData.length)
  }else{
    setItemInPage(itemInPage+1)
  }
}

const downItemInPage=()=>{
  if(itemInPage==1){
    setItemInPage(1)
  }else{
    setItemInPage(itemInPage-1)
  }
}



  return (
     <>
            {/* <div className="col-7 col-md-6 col-lg-4 mt-5">
                <div className="input-group mb-3 dir_ltr">
                  <button className='btn btn-danger d-flex justify-content-center align-items-center'
                    onClick={downItemInPage}>کاهش رکورد</button>
                  <button className='btn btn-success d-flex justify-content-center align-items-center'
                  onClick={upItemInPage}>افزایش رکورد</button>
                    <input type="number" className="form-control " placeholder="تعداد رکورد را مشخص کنید"
                  value={itemInPage} onChange={()=>null}
                  />
                    <span className="input-group-text" >تعداد رکورد</span>
                </div>
            </div> */}

     <div className="row justify-content-between">
            <div className="col-10 col-md-6 col-lg-4">
                <div className="input-group mb-3 dir_ltr">
                    <input type="text" className="form-control" placeholder={searchParams.placeholder}
                    onChange={(e)=>setSearchChar(e.target.value)}/>
                    <span className="input-group-text" >{searchParams.title}</span>
                </div>
            </div>
            <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
            {children}
            </div>
      </div>

          {
            loading?(
              <SpinnerLoad colorClass={"text-primary"}/>
            ):
            data.length ?(
           <table className="table table-responsive text-center table-hover table-bordered">
                <thead className="table-secondary">
                <tr>
                  {dataInfo.map(i=>(
                    <th key={i.field}>{i.title}</th>
                    ))
                  }

                  { additionFeild ? (
                      additionFeild.map((a , index)=>(
                        <th key={a.id+"__"+index}>{a.title}</th>
                      ))
                    ):""
                  }
                </tr>
                </thead>
                
                <tbody>
                   {tableData.map(d=>(
                     <tr key={d.id}>
                      {dataInfo.map(i=>(
                        <td key={i.field+"_"+d.id}>{d[i.field]}</td>
                      ))}
                  {
                       additionFeild ? (
                      additionFeild.map((a , index)=>(
                        <td key={a.id+"__"+index}>{a.elements(d)}</td>
                      ))
                    ):""
                  }                    
                   </tr>
                   ))}

                </tbody>
            </table>

            ):(
              <h4 className='text-center my-5 text-danger'>رکوردی برای نمایش  وجود ندارد</h4>
            )
          }

            { pageCount>1
              ?(
            <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination dir_ltr">
                  <li className="page-item">
                    <a className={`page-link pointer ${curentPage==1? "disabled" :"" }`}
                     href="#" aria-label="Previous" 
                    onClick={()=>setCurentPage(curentPage-1)}>
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                  
                  {
                    pages.map(p=>(
                      <li key={p} className="page-item pointer">
                        <a className={`page-link ${curentPage==p ? "alert-danger":""}`} 
                        onClick={()=>setCurentPage(p)}>{p}</a></li>
                    ))
                  }
                
                  <li className="page-item">
                    <a className={`page-link pointer ${curentPage==pageCount? "disabled" :"" }`} 
                    aria-label="Next" 
                    onClick={()=>setCurentPage(curentPage+1)}>
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
              ):
              null
            }

 
    </>
  )
}
