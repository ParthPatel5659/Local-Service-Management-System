
import { ToastContainer, Zoom } from 'react-toastify'
import AppRouter from './router/AppRouter'
import axios from 'axios'
import { useEffect } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
   
useEffect(() => {

    // ✅ Set Base URL once
    axios.defaults.baseURL = "http://localhost:5000";

    // ✅ Attach token automatically to every request
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

  }, []);

  return (
    <>
      <AppRouter></AppRouter>
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </>
  )
}

export default App
