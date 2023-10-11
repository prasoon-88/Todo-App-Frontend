import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {useState , createContext } from 'react'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext({isAuth : false});


const AppWrapper = ()=>{
  const [isAuth,setIsAuth]= useState(false);
  const [loader,setLoader] = useState(false);
  const [User,setUser] = useState({});

  return (
    <Context.Provider value={{isAuth,setIsAuth,loader,setLoader,User,setUser}}>
      <App />
   </Context.Provider>
  )
}


root.render(
  <React.StrictMode>
   <AppWrapper/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
