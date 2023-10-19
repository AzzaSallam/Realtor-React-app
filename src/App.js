import { createBrowserRouter , RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Home from "./Pages/Home";
import Profile from './Pages/Profile';
import Offers from './Pages/Offers';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import PrivateRoute from "./Component/PrivateRoute";
import Root from "./Component/Root";
import CreateListing from "./Pages/CreateListing";
import EditListing from "./Pages/EditListing";
import Listing from './Pages/Listing';
import Category from "./Pages/Category";


const routerContainer = createBrowserRouter([
  {
    path : '/' , element : <Root/> , 
    children:[
      {index : true , element: <Home/>},
      {path : 'sign-in' , element: <SignIn/>},
      {path : 'sign-up' , element: <SignUp/>},
      {path : 'profile' , element: <PrivateRoute/> ,
        children:[
          {index: true , element:<Profile/>},
          {path : '/profile/create-listing' , element: <CreateListing/>},
          {path : '/profile/edit-listing/:listingId' , element: <EditListing/>},
        ]
      },
      {path : 'offers' , element: <Offers/>},
      {path : 'category/:categoryName' , element: <Category/>},
      {path : 'category/:categoryType/:listingId' , element: <Listing/>},
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
