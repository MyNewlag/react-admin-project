import React, { useEffect, useState } from 'react'
import Card from './Card'
import SpinnerLoad from '../../components/SpinnerLoad'
import { getOrdersStatisticsService } from '../../service/orders'

const cartObject = [
    {
        key:1,
        name: "carts",
        currentValue:"",
        title:"سبد خرید امروز",
        desc:"سبد های خرید مانده امروز",
        icon:"fas fa-shopping-basket",
        lastWeekValue:"",
        lastMonthValue:"",
    },
    {
        key:2,
        name: "pendingOrders",
        currentValue:"",
        title:"سفارشات مانده امروز",
        desc:" سفارشات معلق و فاقد پرداختی",
        icon:"fas fa-dolly",
        lastWeekValue:"",
        lastMonthValue:"",
    },
    {
        key:3,
        name: "successOrders",
        currentValue:"",
        title:"سفارشات امروز",
        desc:"سفارشات کامل و دارای پرداختی",
        icon:"fas fa-luggage-cart",
        lastWeekValue:"",
        lastMonthValue:"",
    },
    {
        key:4,
        name:"successOrdersAmount",
        currentValue:"",
        title:"درآمد امروز",
        desc:"جمع مبالغ پرداختی (تومان)",
        icon:"fas fa-money-check-alt",
        lastWeekValue:"",
        lastMonthValue:"",
    },
]


export default function Cards() {
    
    const [cartsInfo,setCartsInfo]=useState(cartObject)
    const [loading,setLoading]=useState(false)
    
    const handleGetCartsInfo=async()=>{
        const res=await getOrdersStatisticsService()
        setLoading(true)
        if (res.status==200) {
            let newArr=[...cartsInfo]
            const data=res.data.data
            for (const key in data) {
              const index= newArr.findIndex(c=>c.name==key)
                newArr[index].currentValue=data[key].today
                newArr[index].lastWeekValue=data[key].thisWeek
                newArr[index].lastMonthValue=data[key].thisMonth
            }
            setCartsInfo(newArr)
        }
        setLoading(false);
    }
    
    useEffect(()=>{
    handleGetCartsInfo()
    },[])


  return (
            <div className="row">

                {loading ? (<SpinnerLoad colorClass={"text-primaey"}/>):
                 cartsInfo.map(cartInfo=> <Card {...cartInfo} /> )
                 }
      
        </div>

  )
}
