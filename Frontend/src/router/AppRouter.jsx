// import {  createBrowserRouter, RouterProvider } from "react-router-dom";
// import  AdminSidebar  from "../components/admin/AdminSidebar";
// import Login1 from "../components/Login1";
// import SignUp1 from "../components/SignUp1";
// import { VerificationCode } from "../components/VerificationCode";
// import {UserNavbar} from "../components/user/UserNavbar";
// import { HomePage } from "../components/user/HomePage";
// import Servicesidebar from "../components/ServiceProvider/ServiceSidebar";
// import ProtectedRoutes from "../components/ProtectedRoutes";
// import { Profile } from "../components/Profile";
// import AllServices from "../components/user/AllServices";
// import BookService from "../components/user/BookService";
// import { AllServicesofprovider } from "../components/ServiceProvider/AllServicesofprovider";
// import { AllUser } from "../components/admin/AllUser";
// import { AddUser } from "../components/user/AddUser";
// import { AllProvider } from "../components/admin/AllProvider";
// import AllBookings from "../components/admin/AllBookings";
// import { AllCategory } from "../components/admin/AllCategory";
// import { AddCategory } from "../components/admin/AddCategory";
// import AllReview from "../components/admin/AllReview";
// import { ForgotPassword } from "../components/ForgotPassword";
// import ResetPassword from "../components/ResetPassword";
// import { AllPayment } from "../components/admin/AllPayment";
// import AllServicesshow from "../components/admin/AllServicesshow";



// const router=createBrowserRouter([
//        {path:"/",element:<HomePage/>},
//        {path:"/login",element:<Login1/>},
//        {path:"/signup",element:<SignUp1/>},
//        {path:"/verification",element:<VerificationCode/>},
//        {path:"/forgot-password",element:<ForgotPassword/>},
//        {path:"/resetpassword/:token",element:<ResetPassword/>},

//        {path:"/user",element: <ProtectedRoutes userRoles={["user"]}>
//             <UserNavbar/>,
//         </ProtectedRoutes>,
//         children:[
//             {path:"deshbord",element:<HomePage/>},
//             {path:"profile",element:<Profile/>},
//             {path:"services",element:<AllServices/>},
//             {path:"bookings",element:<div>book</div>},
//             {path:"bookservices/:id",element:<BookService/>},
//             {path:"support",element:<div>Support</div>},
//             {path:"settings",element:<div>Settings</div>}, 
//         ]
//        },

//        {path:"/provider",element:<Servicesidebar/>,
//         children:[
//             {path:"services/:id",element:<AllServicesofprovider/>}
//         ]
//        },
//        {path:"/admin",element:<AdminSidebar/>,
//         children:[
//             {path:"users",element:<AllUser/>},
//             {path:"providers",element:<AllProvider/>},
//             {path:"addUser",element:<AddUser/>},
//             {path:"bookings",element:<AllBookings/>},
//             {path:"category",element:<AllCategory/>},
//             {path:"addcategory",element:<AddCategory/>},
//             {path:"reviews",element:<AllReview/>},
//             {path:"Payments",element:<AllPayment/>},
//             {path:"services",element:<AllServicesshow/>}
//         ]
//        }
// ])

// const AppRouter=()=>{
//     return <RouterProvider router={router}></RouterProvider>
// }

// export default AppRouter

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Auth & Common
import Login1 from "../components/Login1";
import SignUp1 from "../components/SignUp1";
import { VerificationCode } from "../components/VerificationCode";
import { ForgotPassword } from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";

// User
import { UserNavbar } from "../components/user/UserNavbar";
import { HomePage } from "../components/user/HomePage";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { Profile } from "../components/Profile";
import AllServices from "../components/user/AllServices";
import BookService from "../components/user/BookService";

// Provider
import Servicesidebar from "../components/ServiceProvider/ServiceSidebar";


// Admin
import AdminSidebar from "../components/admin/AdminSidebar";
import { AllUser } from "../components/admin/AllUser";
import { AddUser } from "../components/user/AddUser";
import { AllProvider } from "../components/admin/AllProvider";
import AllBookings from "../components/admin/AllBookings";
import { AllCategory } from "../components/admin/AllCategory";
import { AddCategory } from "../components/admin/AddCategory";
import AllReview from "../components/admin/AllReview";
import { AllPayment } from "../components/admin/AllPayment";
import AllServicesshow from "../components/admin/AllServicesshow";
import { AllServicesofprovider } from "../components/ServiceProvider/AllServicesofprovider";
import { AddService } from "../components/ServiceProvider/AddService";
import ProviderBookings from "../components/ServiceProvider/ProviderBookings";
import ProviderPayments from "../components/ServiceProvider/ProviderPayments";
import ProviderReviews from "../components/ServiceProvider/ProviderReviews";
import MyBookings from "../components/user/MyBooking";
import { AddReview } from "../components/user/AddReview";
import UserNotifications from "../components/user/UserNotifications";
import ProviderNotifications from "../components/ServiceProvider/ProviderNotifications";
import ServiceDetails from "../components/ServiceDetails";
import EditService from "../components/ServiceProvider/EditService";

const router = createBrowserRouter([

  // 🌐 Public Routes
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Login1 /> },
  { path: "/signup", element: <SignUp1 /> },
  { path: "/verification", element: <VerificationCode /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/resetpassword/:token", element: <ResetPassword /> },

  // 👤 User Routes
  {
    path: "/user",
    element: (
      <ProtectedRoutes userRoles={["user"]}>
        <UserNavbar />
      </ProtectedRoutes>
    ),
    children: [
      { path: "dashboard", element: <HomePage /> },
      { path: "profile/:id", element: <Profile /> },
      { path: "services", element: <AllServices /> },
      { path: "bookings", element: <MyBookings/> },
      { path: "add-review/:serviceId/:providerId",element:<AddReview/>},
      { path: "bookservices/:id", element: <BookService /> },
      { path: "support", element: <div>Support</div> },
      { path: "settings", element: <div>Settings</div> },
      {path:"notifications",element:<UserNotifications/>},
      {path:"servicedetail/:id",element:<ServiceDetails/>}
    ],
  },

  // 🧑‍🔧 Provider Routes ✅ FIXED
  {
    path: "/provider",
    element: <Servicesidebar />,
    children: [
      // ✅ NO :id here
      {path: "services/:id", element: <AllServicesofprovider/> },
      {path:"addservice",element:<AddService/>},
      {path:"edit-service/:id",element:<EditService/>},
      {path:"bookings",element:<ProviderBookings/>},
      {path:"payment",element:<ProviderPayments/>},
      {path:"reviwes/:id",element:<ProviderReviews/>},
      { path: "profile/:id", element: <Profile /> },
      {path:"notifications",element:<ProviderNotifications/>}
    ],
  },

  // 🛠️ Admin Routes
  {
    path: "/admin",
    element: <AdminSidebar />,
    children: [
      { path: "users", element: <AllUser /> },
      { path: "providers", element: <AllProvider /> },
      { path: "addUser", element: <AddUser /> },
      { path: "bookings", element: <AllBookings /> },
      { path: "category", element: <AllCategory /> },
      { path: "addcategory", element: <AddCategory /> },
      { path: "reviews", element: <AllReview /> },
      { path: "payments", element: <AllPayment /> },
      { path: "services", element: <AllServicesshow /> },
    ],
  },

]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;