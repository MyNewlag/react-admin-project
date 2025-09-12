
import Navber from './navbar/Index'
import Sidebar from './sidebar/Index'
import AdminContextContainer, { AdminContext } from '../../context/AdminLayoutContext'
import Content from '../../pages/Content';
import { Navigate } from 'react-router-dom';
import { useIsLogin } from '../../hook/authHook';


export default function Index() {

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
