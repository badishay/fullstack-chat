// import './App.css';
import axios from 'axios'

import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import React,{useContext, useState,useEffect} from 'react'
import {UserContext} from './UserContext';
import Chat from './components/chat/Chat';
import Home from './components/home/Home';
import Navbar from './components/layout/Navbar'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
function App() {
  const [user, setUser] = useState(null);
  useEffect(async() => {
    try {
      const res = await axios.get(`http://localhost:5000/verifyuser`,{ withCredentials: true });
      setUser(res.data)
      console.log('res:',res)
    } catch (error) {
      console.log(error)
     
    }
    
   
  }, [])

  return (
    <Router>
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <Navbar/>
      <Switch>
        <Route exact path ="/" component={Home}/>
        <Route  path ="/signup" component={Signup}/>
        <Route  path ="/login" component={Login}/>
        <Route  path ="/chat/:room_id/:room_name" component={Chat}/>
      </Switch>
    </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
