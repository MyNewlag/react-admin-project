import React from 'react';
import OrdersDetails from './OrdersDetails';
import OrderTable from './OrderTable';

const Orders = () => {
    return (
        <div id="manage_orders_section" className="manage_orders_section main_section">
        <h4 className="text-center my-3">مدیریت سفارشات</h4>
            <OrderTable/>
    </div>

    );
}

export default Orders;