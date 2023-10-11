import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../index';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../App';
import Todo from '../component/Todo';

const Home = () => {
  const {isAuth,setIsAuth,loader,setLoader } = useContext(Context);
  
  const navigate = useNavigate();
  const [tittle,setTittle] = useState();
  const [description,setDescription] = useState();
  const [tasks,setTasks] = useState([]);

  useEffect(()=>{
    if(!isAuth){
      navigate('/login')
    }
    getMyTodoList();
  },[])

  const getMyTodoList = async()=>{    
    try {
      const taskList = await axios.get(`${server}/task/getMyTask`,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });
        setTasks([...taskList.data.task]);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${server}/task/${id}`,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        },
      });
      getMyTodoList();
      toast.success("Task Deleted 👍");
    } catch (error) {
      toast.error("Error while Deleting Task");
    }
  };

  const updateTask = async (id) => {
    try {
        await axios.put(`${server}/task/${id}`, {}, {
            withCredentials: true
        })
        toast.success("Task Updated Success")
        getMyTodoList();
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
   
    try {
      await axios.post(`${server}/task/new`, {
        tittle,
        description
      },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });

        setIsAuth(true);
        setTittle('');
        setDescription('');
        setLoader(false);
        toast.success("Todo Added Success")
        getMyTodoList();
    } catch (error) {
      toast.error(error.response.data.message)
      setLoader(false);
    }
  }

  return (
    <div className='home'>
        <div className="todoContainer">
          <form className="todoInputContainer" onSubmit={submitHandler}>
            <h2>Add Your Todo Here</h2>
            <input type="text" value={tittle} placeholder='Tittle'
            onChange={(e)=>{
              setTittle(e.target.value)
            }}
            />
            <input type="text" value={description} placeholder='Description'
             onChange={(e)=>{
              setDescription(e.target.value)
            }}
            />
            <button type="submit" disabled={loader}>Add Todo</button>
          </form>
          <div className="todoList">
            {
             tasks.map((task,index)=><Todo task={task} key={index} deleteHandler={deleteHandler} updateTask={updateTask}/>)
          }
          </div>
        </div>
        
    </div>
  )
}

export default Home