import {  createBrowserRouter, RouterProvider } from "react-router-dom";

import { AdminSidebar } from "../components/admin/AdminSidebar";

import Login1 from "../components/Login1";
import SignUp1 from "../components/SignUp1";
import { VerificationCode } from "../components/VerificationCode";
import { UserNavbar } from "../components/user/UserNavbar";
import Services from "../components/user/Services";
import { HomePage } from "../components/user/HomePage";

import Bookings from "../components/user/Bookings";
import { Profile } from "../components/Profile";
import Servicesidebar from "../components/ServiceProvider/ServiceSidebar";
import { ServiceHome } from "../components/ServiceProvider/ServiceHome";
import BookServices from "../components/user/BookServices";
import ShowBookings from "../components/ServiceProvider/ShowBookings";

const router=createBrowserRouter([
       {path:"/",element:<HomePage/>},
       {path:"/login",element:<Login1/>},
       {path:"/signup",element:<SignUp1/>},
       {path:"/verification",element:<VerificationCode/>},
       {path:"/user",element:<UserNavbar/>,
        children:[
            {path:"deshbord",element:<HomePage/>},
            {path:"profile",element:<Profile/>},
            {path:"services",element:<Services/>},
            {path:"bookings",element:<Bookings/>},
            {path:"bookservices",element:<BookServices/>},
            {path:"support",element:<div>Support</div>},
            {path:"settings",element:<div>Settings</div>}, 
        ]
       },
       {path:"/service-provider",element:<Servicesidebar/>,
        children:[
            {path:"home",element:<ServiceHome/>},
            {path:"profile",element:<Profile/>},
            {path:"booking",element:<ShowBookings/>}
        ]
       },
       {path:"/admin",element:<AdminSidebar/>}
])

const AppRouter=()=>{
    return <RouterProvider router={router}></RouterProvider>
}

export default AppRouter