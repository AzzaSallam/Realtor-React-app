import { createBrowserRouter , RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Home from "./Pages/Home";
import Profile from './Pages/Profile';
import Offers from './Pages/Offers';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import Root from "./Pages/Root";


const routerContainer = createBrowserRouter([
  {
    path : '/' , element : <Root/> , 
    children:[
      {index : true , element: <Home/>},
      {path : '/offers' , element: <Offers/>},
      {path : 'profile' , element: <Profile/>},
      {path : 'sign-in' , element: <SignIn/>},
      {path : 'sign-up' , element: <SignUp/>},
      {path : 'forgot-password' , element: <ForgotPassword/>},
    ]
  }
])

function App() {
  return <>
        <RouterProvider router={routerContainer}/>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />  
    </> 
  
}

export default App;
