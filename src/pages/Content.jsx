import React, { useContext } from 'react'
import Category from './category/Category'
import Dashbord from './dashbord/Dashbord'
import { AdminContext } from '../context/AdminLayoutContext';
import Product from './product/Product';
import { Route, Routes } from 'react-router-dom';
import Colors from './colors/Colors';
import Guaranties from './guaranties/Guaranties';
import Brands from './brands/Brands';
import Discounts from './discount/Discounts';
import Cards from './cards/Cards';
import Orders from './orders/Orders';
import Delivery from './delivery/Delivery';
import Users from './users/Users';
import Roles from './roles/Roles';
import Permissions from './permissions/Permissions';
import Questions from './questions/Questions';
import Comments from './comments/Comments';
import Logout from './auth/Logout';
import CategoryChildren from './category/CategoryChildren';
import Attributes from './category/attrs/Attributes';
import AddProduct from './product/AddProduct';
import SetAttribute from './product/setAttr/SetAttribute';
import ProductGallery from './product/gallery/ProductGallery';
import AddDiscount from './discount/AddDiscount';

export default function Content() {

 const {showSidebar}=useContext(AdminContext);

  return (
         <section id="content_section"
          className={`bg-light py-2 px-3 ${showSidebar?"with_sidebar" : ""}`}>
            <Routes>
              <Route path='/' element={<Dashbord/>}/>

              <Route path='/categories' element={<Category/>}>
                <Route path=':categoryId' element={<CategoryChildren/>}/>
              </Route>

              <Route path='/categories/:categoryId/attributes' element={<Attributes/>}/>
              <Route path='/products' element={<Product/>}/>
              <Route path='/products/add-product' element={<AddProduct/>}/>
              <Route path='/products/set-attr' element={<SetAttribute/>}/>
              <Route path='/products/gallery' element={<ProductGallery/>}/>
              <Route path='/colors' element={<Colors/>}/>
              <Route path='/guaranties' element={<Guaranties/>}/>
              <Route path='/brands' element={<Brands/>}/>
              <Route path='/discounts' element={<Discounts/>}>
                {/* <Route path='/discounts/add-discount-code' element={<AddDiscount/>}/> */}
                <Route path=':add-discount-code' element={<AddDiscount/>}/>
              </Route>
              <Route path='/cards' element={<Cards/>}/>
              <Route path='/orders' element={<Orders/>}/>
              <Route path='/delivery' element={<Delivery/>}/>
              <Route path='/users' element={<Users/>}/>
              <Route path='/roles' element={<Roles/>}/>
              <Route path='/permissions' element={<Permissions/>}/>
              <Route path='/questions' element={<Questions/>}/>
              <Route path='/comments' element={<Comments/>}/>
              <Route path='/logout' element={<Logout/>}/>
             
              <Route path='*' element={<Dashbord/>}/>
              </Routes>

              
           
          </section>
  )
}