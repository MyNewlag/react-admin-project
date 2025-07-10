
import React, { useEffect, useState } from 'react'
import SpinnerLoad from './SpinnerLoad';

export default function PaginatedDataTable({
        children,
        tableData,
        dataInfo,
        loading,
        pageCount,
        curentPage,
        setCurentPage,
        searchParams,
        handleSearch,
     
      }) {


    const [pages,setPages]=useState([])        //شماره های صفحات



    let timeOut;
    const handleSetSearchChar=(char)=>{
      clearTimeout(timeOut)
      timeOut=setTimeout(() => {
        handleSearch(char)
      }, 1000);
    }
    

    useEffect(()=>{
        let pArr=[]
        for(let i=1 ; i <=pageCount; i++){
            pArr=[...pArr , i]
            setPages(pArr)
        }
    },[pageCount])

  return (
    <>
          <div className="row justify-content-between">
            <div className="col-10 col-md-6 col-lg-4">
                <div className="input-group mb-3 dir_ltr">
                    <input type="text" className="form-control" placeholder={searchParams.placeholder}
                    onChange={(e)=>handleSetSearchChar(e.target.value)}
                    />
                    <span className="input-group-text" >{searchParams.title}</span>
                </div>
            </div>
            <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
            {children}
            </div>
          </div>

    {
        loading ? (
        <SpinnerLoad colorClass={"text-primary"}/>
        ): tableData.length ? (
             <table className="table table-responsive text-center table-hover table-bordered">
                  <thead className="table-secondary">
                <tr>
                  {dataInfo.map((i,index)=>(
                    <th key={i.field || `notField__${index}`}>{i.title}</th>
                    ))}

                    </tr>
                 </thead>

                <tbody>
                   {tableData.map(d=>(
                     <tr key={d.id}>
                      {dataInfo.map((i,index)=> i.field ? (
                          <td key={i.field+"_"+d.id}>{d[i.field]}</td>
                        ):(
                            <td key={d.id+"__"+i.id+"__"+index}>{i.elements(d)}</td>
                        ))}
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
            <nav aria-label="Page navigation example" 
            className="d-flex justify-content-center">
                <ul className="pagination dir_ltr">
                  <li className="page-item">
                    <span className={`page-link pointer ${curentPage==1? "disabled" :"" }`}
                     href="#" aria-label="Previous" 
                    onClick={()=>setCurentPage(curentPage-1)}>
                      <span aria-hidden="true">&raquo;</span>
                    </span>
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
