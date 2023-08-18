import { useState,useEffect } from 'react';

import { AllRoutes } from './routes/AllRoutes';
import { Header, Footer } from './components';

import './App.css';

function App() {

  const [logIn, setLogIn] = useState( JSON.parse(localStorage.getItem("login")) || false);

  useEffect(()=>{
    localStorage.setItem("login",JSON.stringify(logIn));
  },[logIn])

  return (
    <div className="">
      <Header logIn={logIn} setLogIn={setLogIn}/>
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
