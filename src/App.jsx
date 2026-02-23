
import { ToastContainer } from 'react-toastify'
import AppRouter from './router/AppRouter'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {


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
        transition={"bounce"}
      />
    </>
  )
}

export default App
