

import React, { useEffect, useState } from 'react'


export default function PaginatedTable({data,dataInfo,additionFeild,children,numOfPage}) {


const [initData,setInitData]=useState(data)
const [searchChar,setSearchChar]=useState("")

const [tableData,setTableData]=useState([])
const [curentPage,setCurentPage]=useState(1)

const [pages,setPages]=useState([])              //شماره صفحات
const [pageCount,setPageCount]=useState(1)       // تعداد صفحات




useEffect(()=>{
  let pCount=Math.ceil(initData.length/numOfPage)
  setPageCount(pCount)
  let pArr=[]
  for(let i=1;i<=pCount;i++){
    pArr=[...pArr ,i]
    setPages(pArr)  
  }
},[initData])



useEffect(()=>{
 setInitData(data.filter(i=>i.title.includes(searchChar)))
 setCurentPage(1)
},[searchChar,data])


useEffect(()=>{
  const start=(curentPage*numOfPage)-numOfPage
  const end=curentPage*numOfPage
  setTableData(initData.slice(start,end))
},[curentPage,initData])


  return (
     <>

     <div className="row justify-content-between">
                     <div className="col-10 col-md-6 col-lg-4">
                         <div className="input-group mb-3 dir_ltr">
                             <input type="text" className="form-control" placeholder="قسمتی از عنوان را وارد کنید"
                             onChange={(e)=>setSearchChar(e.target.value)}/>
                             <span className="input-group-text" >جستجو</span>
                         </div>
                     </div>
                     <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                      {children}
                     {/* <AddCategory/> */}
                     </div>
                 </div>
           <table className="table table-responsive text-center table-hover table-bordered">
                <thead className="table-secondary">
                <tr>
                  {
                    dataInfo.map(i=>(
                      <th key={i.field}>{i.title}</th>
                    ))
                  }

                  {
                    additionFeild ? (
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

            {
              pageCount>1
              ?(
            <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination dir_ltr">
                  <li className="page-item">
                    <a className={`page-link pointer ${curentPage==1? "disabled" :"" }`} href="#" aria-label="Previous" 
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
                    <a className={`page-link pointer ${curentPage==pageCount? "disabled" :"" }`} aria-label="Next" 
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
