

import React, { useEffect, useState } from 'react'
import PaginatedDataTable from '../../components/PaginatedDataTable'
import AddProduct from './AddProduct'
import Actions from './tableAddition/Actions'
import { getProductsService } from '../../service/products'

export default function TableProduct() {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)
  const [searchChar,setSearchChar]=useState("")
  const [curentPage,setCurentPage]=useState(1) 
  const [countOnPage,setCountOnPage]=useState(5)
  const [pageCount,setPageCount]=useState(0)        //تعداد کل صفحات


     const dataInfo=[
        {field:"id" , title:"#"},
        {field:null , title:"گروه محصول " , elements: (rowData) => (
                      <>
                        {rowData.categories && rowData.categories.length > 0
                          ? rowData.categories[0].title
                          : "بدون گروه"}
                      </>
                        )
        },
        {field:"title" , title:"عنوان "},
        {field:"price" , title:"قیمت"},
        {field:"stock" , title:"موجودی"},
        {field:null , title:"عملیات" , elements:(rowData)=><Actions rowData={rowData}/>},
    ]


    const searchParams={
    title:"جستجو",
    placeholder:"متن رو وارد کن",
  }

  const handleGetProducts= async(page,count,char)=>{
    setLoading(true)
    const res=await getProductsService(page,count,char)
    res && setLoading(false)
    if (res.status==200) {
      setData(res.data.data)
      setPageCount(res.data.last_page)
    }
  }


  const handleSearch=(char)=>{
    setSearchChar(char)
    handleGetProducts(1,countOnPage,char)
  }


  useEffect(()=>{
    handleGetProducts(curentPage,countOnPage,searchChar)
  },[curentPage])

  return (

    <PaginatedDataTable
    tableData={data}
    dataInfo={dataInfo}
    searchParams={searchParams}
    loading={loading}
    curentPage={curentPage}
    setCurentPage={setCurentPage}
    pageCount={pageCount}
    handleSearch={handleSearch}
    >
      <AddProduct/>
      
    </PaginatedDataTable>
    
    
    // <div>

    //          <nav aria-label="Page navigation example" className="d-flex justify-content-center">
    //             <ul className="pagination dir_ltr">
    //               <li className="page-item">
    //                 <a className="page-link" href="#" aria-label="Previous">
    //                   <span aria-hidden="true">&raquo;</span>
    //                 </a>
    //               </li>
    //               <li className="page-item"><a className="page-link" href="#">1</a></li>
    //               <li className="page-item"><a className="page-link" href="#">2</a></li>
    //               <li className="page-item"><a className="page-link" href="#">3</a></li>
    //               <li className="page-item">
    //                 <a className="page-link" href="#" aria-label="Next">
    //                   <span aria-hidden="true">&laquo;</span>
    //                 </a>
    //               </li>
    //             </ul>
    //           </nav>
    // </div>
  )
}
