import Chart  from 'chart.js/auto';
import React, { useEffect } from 'react';
import { destroyChart, setDashbordChart } from '../../utils/dashbordChart';
import Card from './Card';
import ProductTable from './ProductTable';



export default function Dashbord() {


useEffect(()=>{
    const labels = ['فروردین' , 'اردیبهشت', 'خرداد' , 'تیر' , 'مرداد' , 'شهریور' ,
        'مهر' , 'آبان' , 'آذر' , 'دی' , 'بهمن' , 'اسفند'];
        
        const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];
        setDashbordChart(labels,datapoints)

        return()=>{
            destroyChart()
        }
},[])



  return (
   <div id="dashboard_section" className="dashboard_section main_section">

            <div className="row">

                <Card
                curentValue="7"
                title="سبد خرید امروز"
                icon="fas fa-shopping-basket"
                desc="سبد های خرید مانده امروز"
                lastWeekVlalue="13"
                lastMouthValue="18"
                />
         
                <Card
                curentValue="5"
                title="سفارشات مانده امروز"
                icon="fas fa-dolly"
                desc="سفارشات معلق و فاقد پرداختی"
                lastWeekVlalue="9"
                lastMouthValue="16"
                />

         

                <Card
                curentValue="45"
                title="سفارشات امروز"
                icon="fas fa-luggage-cart"
                desc="سفارشات کامل و دارای پرداختی"
                lastWeekVlalue="263"
                lastMouthValue="1038"
                />


                <Card
                curentValue="1,500,000"
                title="درآمد امروز"
                icon="fas fa-money-check-alt"
                desc="جمع مبالغ پرداختی"
                lastWeekVlalue="6,380,000"
                lastMouthValue="22,480,000"
                />


            
            </div>


            <div className="row">

                <div className="col-12 col-lg-6">

                    <p className="text-center mt-3 text-dark">محصولات رو به اتمام</p>

                    <table className="table table-responsive text-center table-hover table-bordered no_shadow_back_table font_08">
                        <thead className="table-secondary">
                            <tr>
                                <th>#</th>
                                <th>دسته</th>
                                <th>عنوان</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>دسته شماره فلان</td>
                                <td>محصول فلان</td>
                                <td>پایان یافته</td>
                                <td>
                                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                </td>
                            </tr>

                            <ProductTable
                            number="2"
                            number2="دسته شماره فلان"
                            number3="محصول فلان"
                            number4="رو به اتمام - 4"
                            />
                            {/* <tr>
                                <td>2</td>
                                <td>دسته شماره فلان</td>
                                <td>محصول فلان</td>
                                <td>رو به اتمام - 4</td>
                                <td>
                                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                </td>
                            </tr> */}
                            <tr>
                                <td>3</td>
                                <td>دسته شماره فلان</td>
                                <td>محصول فلان</td>
                                <td>پایان یافته</td>
                                <td>
                                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>دسته شماره فلان</td>
                                <td>محصول فلان</td>
                                <td>پایان یافته</td>
                                <td>
                                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>دسته شماره فلان</td>
                                <td>محصول فلان</td>
                                <td>رو به اتمام - 2</td>
                                <td>
                                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="نادیده گرفتن" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

                
                <div className="col-12 col-lg-6">
                    <canvas id="myChart" height="195"></canvas>
                </div>

            </div>


        </div>
  )
}
