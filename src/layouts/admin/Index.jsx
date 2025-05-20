import React, {  useEffect } from 'react'
import Navber from './navbar/Index'
import Sidebar from './sidebar/Index'
import AdminContextContainer, { AdminContext } from '../../context/AdminLayoutContext'
import Dashbord from '../../pages/dashbord/Dashbord';
import Category from '../../pages/category/Category';
import Content from '../../pages/Content';
// import '../../assets/js/toggleSidebare';

export default function Index() {

  useEffect(()=>{
    //     document.getElementById('handle_toggle_sidemenu').addEventListener('change' , function(){
    //     if (this.checked) {
    //         document.querySelector('.mini_sidebar').classList.add('expanded')
    //         document.getElementById('content_section').classList.add('with_sidebar')
    //     }else{
    //         document.querySelector('.mini_sidebar').classList.remove('expanded')
    //         document.getElementById('content_section').classList.remove('with_sidebar')
    //     }
    // })

    // require('../../assets/js/toggleSidebare')
  // import('../../assets/js/toggleSidebare');

  // toggleSidebar()

  },[])


  return (
    <AdminContextContainer>
    <div>

        <Content />      
        <Navber />
        <Sidebar />
    </div>
     </AdminContextContainer>
  )
}
