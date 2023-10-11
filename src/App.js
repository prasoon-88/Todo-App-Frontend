import './style/style.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './component/Navbar'
import toast, {Toaster} from 'react-hot-toast'
import { useContext, useEffect } from 'react';
import {Context} from './index'
import Loader from './component/Loader';
import axios from 'axios';


function App() {
  const {User,setUser,loader,setLoader,setIsAuth} = useContext(Context)

  useEffect(() => { 
    setLoader(true);   
    axios.get(`${server}/user/me`,{
      withCredentials:true
    }).then(res=>{
      setIsAuth(true);
      setUser(res.data.user)
      setLoader(false);   
    }).catch(error=>{
      toast.error(error?.response?.data?.message)
      setIsAuth(false)
      setUser({})
      setLoader(false);   
    })

  }, [])
  

  return (
    <div className='App'>
      {
        loader?
        <Loader/>:
        <></>
      }
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
      <Toaster/>
    </div>
  );
}

export const server = 'https://todo-list-2dpb.onrender.com/api/v1'

export default App;
