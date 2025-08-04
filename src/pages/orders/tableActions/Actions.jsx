
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ActionIcon from '../../../components/ActionIcon';

export default function Actions({rowData,handleDeleteOrder}) {
  const navigate=useNavigate()

    return (
    <>
      <ActionIcon
        icon="fas fa-shopping-cart text-info"
        pTitle="read_order"
        title="  جزئیات سفارش"
        onClick={()=>navigate("/orders/add-order",{state :{orderId:rowData.id}})}
      />
      <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_order"
        title="حذف سبد"
        onClick={()=>handleDeleteOrder(rowData)}
      />
    </>
  );
  
}
