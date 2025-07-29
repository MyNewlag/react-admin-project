import React, { useContext } from 'react'
import { AdminContext } from '../../../context/AdminLayoutContext';
import Avatar from './Avatar';
import SidebarGropTitle from './SidebarGropTitle';
import SidebarItem from './SidebarItem';
import { useSelector } from 'react-redux';



export default function Index() {

    const user=useSelector(state=>state.userReducer.data)
    const {showSidebar}=useContext(AdminContext);

    
  return (
        <section id="sidebar_section">
          <div className={`mini_sidebar collapsedd bg-dark h-100 ${showSidebar?"expanded":""}`}>
            <div className="p-0 m-0">

                <Avatar
                imgSrc={user.image || "/assets/images/user.png"}
                name={user.full_name || user.user_name}
                />
                
                   <SidebarItem
                   targetPath={"/"}
                   icon="fas fa-tachometer-alt"
                   title="داشبورد"
                   />

               <div className='sidebar_items_container'>

       
                    <SidebarGropTitle
                        title="فروشگاه"
                    />

           
                <SidebarItem
                   targetPath={"/categories"}
                   icon="fas fa-stream"
                   title="مدیریت گروه محصول"
                   />

        
                  <SidebarItem
                   targetPath={"/products"}
                   icon="fas fa-cube"
                   title="مدیریت محصول"
                  />

            

                 <SidebarItem
                 targetPath={"/brands"}
                    icon="fas fa-copyright"
                    title="مدیریت برند ها"
                  />

            

                 <SidebarItem
                 targetPath={"/guaranties"}
                 icon="fab fa-pagelines"
                 title="مدیریت گارانتی ها"
                  />
                
              

                    <SidebarItem
                    targetPath={"/colors"}
                    icon="fas fa-palette"
                    title="مدیریت رنگ ها"
                    />

                
                    <SidebarItem
                    targetPath={"/discounts"}
                    icon="fas fa-percentage"
                    title="مدیریت تخفیف ها"
                  />       

                    <SidebarGropTitle
                    title="سفارشات و سبد"
                />


                 <SidebarItem
                 targetPath={"/cards"}
                 icon="fas fa-shopping-basket"
                 title="مدیریت سبد ها"
                  />  
                

                 <SidebarItem
                 targetPath={"/orders"}
                 icon="fas fa-luggage-cart"
                 title="مدیریت سفارشات "
                  /> 
             
                <SidebarItem
                targetPath={"/delivery"}
                icon="fas fa-truck-loading"
                title="مدیریت نحوه ارسال "
                  />                
                  
                   <SidebarGropTitle
                    title="کاربران و همکاران"
                    />


               
                <SidebarItem
                targetPath={"/users"}
                icon="fas fa-users"
                title="مشاهده کاربران "
                /> 

              

                  <SidebarItem
                  targetPath={"/roles"}
                  icon="fas fa-user-tag"
                  title=" نقش ها "
                  />
              

                      <SidebarItem
                      targetPath={"/permissions"}
                      icon="fas fa-shield-alt"
                      title=" مجوز ها "
                      />


                  <SidebarGropTitle
                    title="ارتباطات"
                    />
                
                  <SidebarItem
                  targetPath={"/questions"}
                  icon="fas fa-question-circle"
                  title="سوال ها "
                  />
               

                  <SidebarItem
                  targetPath={"/comments"}
                  icon="fas fa-comment"
                  title=" نظرات "
                  />
                 {/* <!-- <li className="py-2 btn-group dropstart pe-4"/>
                    <i className="ms-3 icon fas fa-check text-light"></i>
                    <span className="hiddenable" data-bs-toggle="dropdown" aria-expanded="false">داشبورد</span>
                    
                    <ul className="dropdown-menu px-2 sidebar_submenu_list">
                    <li className="d-none">اول</li>
                    <li>اول</li>
                    <li>دوم</li>
                    <li>سوم</li>
                    </ul>
                    </li> --> */}
               </div>
            </div>
        </div>
    </section>
  )
}
