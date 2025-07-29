

import { Provider } from 'react-redux';
import './App.css'
import AdminLayout from './layouts/admin/Index'
import AuthLayout from './layouts/authLayout/AuthLayout';
import { useLocation } from 'react-router-dom';
import store from './redux/store';


function App() {

  const location=useLocation()

  return (

    <Provider store={store}>

    <div className='App'>
      {
        location.pathname.includes('/auth') ?(
          <AuthLayout/>
        ):(
          <AdminLayout />
        )
      }
 
    </div>
      </Provider>
  )
}

export default App
