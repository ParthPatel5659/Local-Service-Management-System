import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { UserNavbar } from "../components/user/UserNavbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";

const router=createBrowserRouter([
       {path:"/",element:<Login/>},
       {path:"/signup",element:<Signup/>},
       {path:"/user",element:<UserNavbar/>
        
       },
       {path:"/admin",element:<AdminSidebar/>}
])

const AppRouter=()=>{
    return <RouterProvider router={router}></RouterProvider>
}

export default AppRouter