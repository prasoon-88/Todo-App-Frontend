import React , {useContext} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import { Context } from '../index'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../App'

const Navbar = () => {
  const navigate = useNavigate()
  const {isAuth,setIsAuth,loader,setLoader,setUser } = useContext(Context);

  const submitHandle = async()=>{
    setLoader(true);
    try {
      await axios.post(`${server}/user/logout`,{},{
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuth(false);
      setLoader(false);
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuth(true);
      setLoader(false);
    }
  }
  return (
    <div className='navbar'>
        <h1>TodoApp</h1>
        <div className="list">
          <Link to={'/'}> <div className="listItem">Home</div></Link>
          <Link to={'/profile'}><div className="listItem">My Profile</div></Link>
          {
            isAuth ? 
            <button id="logout" onClick={submitHandle} disabled={loader}><div >Logout</div></button>             
            :
            <Link to={'/login'}><div className="listItem">Login</div></Link>  

          }   
        </div>
    </div>
  )
}

export default Navbar