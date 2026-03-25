import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import  AdminSidebar  from "../components/admin/AdminSidebar";
import Login1 from "../components/Login1";
import SignUp1 from "../components/SignUp1";
import { VerificationCode } from "../components/VerificationCode";
import {UserNavbar} from "../components/user/UserNavbar";
import { HomePage } from "../components/user/HomePage";
import Servicesidebar from "../components/ServiceProvider/ServiceSidebar";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { Profile } from "../components/Profile";
import AllServices from "../components/user/AllServices";
import BookService from "../components/user/BookService";
import { AllServicesofprovider } from "../components/ServiceProvider/AllServicesofprovider";
import { AllUser } from "../components/admin/AllUser";
import { AddUser } from "../components/user/AddUser";
import { AllProvider } from "../components/admin/AllProvider";



const router=createBrowserRouter([
       {path:"/",element:<HomePage/>},
       {path:"/login",element:<Login1/>},
       {path:"/signup",element:<SignUp1/>},
       {path:"/verification",element:<VerificationCode/>},

       {path:"/user",element: <ProtectedRoutes userRoles={["user"]}>
            <UserNavbar/>,
        </ProtectedRoutes>,
        children:[
            {path:"deshbord",element:<HomePage/>},
            {path:"profile",element:<Profile/>},
            {path:"services",element:<AllServices/>},
            {path:"bookings",element:<div>book</div>},
            {path:"bookservices/:id",element:<BookService/>},
            {path:"support",element:<div>Support</div>},
            {path:"settings",element:<div>Settings</div>}, 
        ]
       },

       {path:"/provider",element:<Servicesidebar/>,
        children:[
            {path:"services/:id",element:<AllServicesofprovider/>}
        ]
       },
       {path:"/admin",element:<AdminSidebar/>,
        children:[
            {path:"users",element:<AllUser/>},
            {path:"providers",element:<AllProvider/>},
            {path:"addUser",element:<AddUser/>}
        ]
       }
])

const AppRouter=()=>{
    return <RouterProvider router={router}></RouterProvider>
}

export default AppRouter