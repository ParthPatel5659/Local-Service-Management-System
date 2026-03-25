
import { ToastContainer, Zoom } from 'react-toastify'
import AppRouter from './router/AppRouter'
import axios from 'axios'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
   
  axios.defaults.baseURL = "http://localhost:5000"


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
