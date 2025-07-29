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
import Users from './users/Users'
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
import AddRoles from './roles/AddRoles';
import AddUser from './users/AddUser';
import { useSelector } from 'react-redux';

export default function Content() {

 const {showSidebar}=useContext(AdminContext);

 const user=useSelector(state=>state.userReducer.data)
 const roles = user.roles

 const hasPermissions=(permission)=>{
    return permissions.findIndex(p=>p.title.includes(permission)) > -1
 }
 
 let permissions =[]
 for (const role of roles){
  permissions = [...permissions,...role.permissions]
 }
 
 console.log(permissions);
 
 
  return (
         <section id="content_section"
          className={`bg-light py-2 px-3 ${showSidebar?"with_sidebar" : ""}`}>
            <Routes>
              <Route path='/' element={<Dashbord/>}/>

              {/* {permissions.filter (p=>p.title=='read_categories').length>0 ? (
                   <Route path='/categories' element={<Category/>}>
                <Route path=':categoryId' element={<CategoryChildren/>}/>
              </Route>
              ):null } */}

              {/* {permissions.findIndex(p=>p.title==('read_categories')) > -1 ? (         // این ینی title دقیقا برابر 'read_categories' باشد
                <Route path='/categories' element={<Category/>}>
                <Route path=':categoryId' element={<CategoryChildren/>}/>
              </Route>
              ):null } */}

              {hasPermissions('read_categories') && (   // این ینی title  شامل 'read_categories' باشد
                <Route path='/categories' element={<Category/>}>
                <Route path=':categoryId' element={<CategoryChildren/>}/>
              </Route>
             ) }
        
              {hasPermissions('read_categories_attrs')&&(
              <Route path='/categories/:categoryId/attributes' element={<Attributes/>}/>
              )}


              {hasPermissions('read_products')&&(
              <Route path='/products' element={<Product/>}/>
              )}

              {hasPermissions('create_product')&&(
              <Route path='/products/add-product' element={<AddProduct/>}/>
              )}
              
              {hasPermissions('create_product_attr')&&(
              <Route path='/products/set-attr' element={<SetAttribute/>}/>
              )}


              <Route path='/products/gallery' element={<ProductGallery/>}/>

              
              {hasPermissions('read_colors')&&(
              <Route path='/colors' element={<Colors/>}/>
              )}

              
              {hasPermissions('read_guarantees')&&(
              <Route path='/guaranties' element={<Guaranties/>}/>
              )}

              {hasPermissions('read_brands')&&(
              <Route path='/brands' element={<Brands/>}/>
              )}


              {hasPermissions('read_discounts')&&(
              <Route path='/discounts' element={<Discounts/>}>
                <Route path='/discounts/add-discount-code' element={<AddDiscount/>}/>
                {/* <Route path=':add-discount-code' element={<AddDiscount/>}/> */}
              </Route>
              )}


              <Route path='/cards' element={<Cards/>}/>
              <Route path='/orders' element={<Orders/>}/>
              <Route path='/delivery' element={<Delivery/>}/>



              {hasPermissions('read_users')&&(
              <Route path='/users' element={<Users/>}>
                <Route path=':add-user' element={<AddUser/>}/>
              </Route>
              )}


              {hasPermissions('read_roles')&&(
              <Route path='/roles' element={<Roles/>}>
                <Route path=':add-role' element={<AddRoles/>}/>
              </Route>
              )}
              


              {hasPermissions('read_permissions')&&(
              <Route path='/permissions' element={<Permissions/>}/>
            )}


              <Route path='/questions' element={<Questions/>}/>
              <Route path='/comments' element={<Comments/>}/>
              <Route path='/logout' element={<Logout/>}/>
             
              <Route path='*' element={<Dashbord/>}/>
              </Routes>
          </section>
  )
}