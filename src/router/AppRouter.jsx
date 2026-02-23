import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { UserNavbar } from "../components/user/UserNavbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { GetApiDemo } from "../components/user/GetApiDemo";
import UseEffectDemo from "../components/user/UseEffectDemo";

const router=createBrowserRouter([
       {path:"/",element:<Login/>},
       {path:"/signup",element:<Signup/>},
       {path:"/user",element:<UserNavbar/>
         ,children:[
            {path:"getapidemo1",element:<GetApiDemo/>},
            {path:"useeffectdemo",element:<UseEffectDemo/>}
         ]
       },
       {path:"/admin",element:<AdminSidebar/>}
])

const AppRouter=()=>{
    return <RouterProvider router={router}></RouterProvider>
}

export default AppRouter