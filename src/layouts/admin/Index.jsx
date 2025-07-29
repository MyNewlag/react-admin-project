
import Navber from './navbar/Index'
import Sidebar from './sidebar/Index'
import AdminContextContainer, { AdminContext } from '../../context/AdminLayoutContext'
import Content from '../../pages/Content';
import { Navigate } from 'react-router-dom';
import { useIsLogin } from '../../hook/authHook';

// import '../../assets/js/toggleSidebare';

export default function Index() {

  // useEffect(()=>{
  //   //     document.getElementById('handle_toggle_sidemenu').addEventListener('change' , function(){
  //   //     if (this.checked) {
  //   //         document.querySelector('.mini_sidebar').classList.add('expanded')
  //   //         document.getElementById('content_section').classList.add('with_sidebar')
  //   //     }else{
  //   //         document.querySelector('.mini_sidebar').classList.remove('expanded')
  //   //         document.getElementById('content_section').classList.remove('with_sidebar')
  //   //     }
  //   // })

  //   // require('../../assets/js/toggleSidebare')
  // // import('../../assets/js/toggleSidebare');

  // // toggleSidebar()

  // },[])

    const [isLogin,loading]=useIsLogin()


  return (
    <AdminContextContainer>
        {loading ?(
          <h1 className='text-center'>
              لطفا صبر کنید ...
            </h1>
        ):isLogin ? (
      <div>
        <Content />      
        <Navber />
        <Sidebar />
     </div>
        ):(
          <Navigate to={'/auth/login'}/>
        )}
    
     </AdminContextContainer>
  )
}
