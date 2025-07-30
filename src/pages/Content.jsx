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
import PermComponent from '../components/PermComponent';
import { useHasPermission } from './../hook/permissionsHook';

export default function Content() {

 const {showSidebar}=useContext(AdminContext);
 
 const hasCategoryPermission = useHasPermission("read_categories")
 const hasDiscountPermission = useHasPermission("read_discounts")
 const hasUserPermission = useHasPermission("read_users")
 const hasRolePermission = useHasPermission("read_roles")
 
 
  return (
      <section id="content_section"
      className={`bg-light py-2 px-3 ${showSidebar?"with_sidebar" : ""}`}>
        <Routes>
          <Route path='/' element={<Dashbord/>}/>

          {hasCategoryPermission && (
          <Route path='/categories' element={<Category/>}>
            <Route path=':categoryId' element={<CategoryChildren/>}/>
          </Route>
          )}
    
          <Route path='/categories/:categoryId/attributes' 
          element={<PermComponent component={<Attributes/>} pTitle={'read_category_attr'}/>}/>

          <Route path='/products' element={<PermComponent component={<Product/>} pTitle={'read_products'}/>}/>

          <Route path='/products/add-product' element={<PermComponent component={<AddProduct/>} pTitle={'create_products'}/>}/>

          <Route path='/products/set-attr' element={<PermComponent component={<SetAttribute/>} pTitle={'create_product_attr'}/>}/>

          <Route path='/products/gallery' element={<PermComponent component={<ProductGallery/>} pTitle={'create_product_image'}/>}/>
          
          <Route path='/colors' element={<PermComponent component={<Colors/>} pTitle={'read_colors'}/>}/>

          <Route path='/guaranties' element={<PermComponent component={<Guaranties/>} pTitle={'read_guarantees'}/>}/>
          
          <Route path='/brands' element={<PermComponent component={<Brands/>} pTitle={'read_brands'}/>}/>

    
            {hasDiscountPermission && (
               <Route path='/discounts' element={<Discounts/>}>
                  <Route path='/discounts/add-discount-code' element={<AddDiscount/>}/>
                  {/* <Route path=':add-discount-code' element={<AddDiscount/>}/> */}
               </Route>
            )}
         
          
          <Route path='/cards' element={<Cards/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/delivery' element={<Delivery/>}/>

            {hasUserPermission && (
              <Route path='/users' element={<Users/>}>
                <Route path=':add-user' element={<AddUser/>}/>
              </Route>
            )}
              <Route path='/users' element={<Users/>}>
                <Route path=':add-user' element={<AddUser/>}/>
              </Route>
              

            {hasRolePermission && (
              <Route path='/roles' element={<Roles/>}>
                <Route path=':add-role' element={<AddRoles/>}/>
              </Route>
            )}
              <Route path='/roles' element={<Roles/>}>
                <Route path=':add-role' element={<AddRoles/>}/>
              </Route>


           <Route path='/permissions' element={<PermComponent component={<Permissions/>} pTitle={'read_permissions'}/>}/>
          <Route path='/questions' element={<Questions/>}/>
          <Route path='/comments' element={<Comments/>}/>
          <Route path='/logout' element={<Logout/>}/>
          
          <Route path='*' element={<Dashbord/>}/>
          </Routes>
      </section>
  )
}