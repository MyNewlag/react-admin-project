import React, { useEffect, useState } from 'react'
import { getThisYearOrdersService } from '../../service/orders'
import  jMoment  from 'jalali-moment';
import { setDashbordChart } from './../../utils/dashbordChart';


    const labels = ['فروردین' , 'اردیبهشت', 'خرداد' , 'تیر' , 'مرداد' , 'شهریور' ,
        'مهر' , 'آبان' , 'آذر' , 'دی' , 'بهمن' , 'اسفند'];

export default function SaleChart() {

  const [loading , setLoading]=useState(false)

  const handleGetChartInfo=async()=>{
    setLoading(true)
    const res=await getThisYearOrdersService()
    setLoading(false)
    
    if (res.status==200) {
      const monthOrderArr=[]
      const now=jMoment()
      let thisMonth= now.jMonth()

      for (let i = 0; i < 12; i++) {
        if (thisMonth==-1)  thisMonth=11 
        monthOrderArr.push({month:thisMonth , amount:0})
        thisMonth--
      }
      
      const orders=res.data.data
      for (const order of orders) {
        const moment=jMoment(order.pay_at)
        const monthIndex=moment.jMonth()
        const index=monthOrderArr.findIndex(o=>o.month==monthIndex)
        monthOrderArr[index].amount=monthOrderArr[index].amount+parseInt(order.pay_amount)
      }

      monthOrderArr.reverse()
      setDashbordChart(monthOrderArr.map(m=>labels[m.month]),
        monthOrderArr.map(p=>p.amount/1000000)
    )
    }
  }


  useEffect(()=>{
    handleGetChartInfo()
  },[])

  return (
           <div className="col-12 col-lg-6">
               <canvas id="myChart" height="195"></canvas>
           </div>
  )
}
