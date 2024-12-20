import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sign from './pages/Sign';
import Home from './pages/Home';
import Todo from './pages/List';
import List from './pages/Task';
import Profile from './pages/Profile';
import Modal from './components/Modal';
import NavBar from './components/NavBar';
import { useContext, useEffect } from 'react';
import { getUser } from './services/userService';
import { UserContext } from './context/UserContext';
import { SecurityContext } from './context/SecurityContext';

function App() {

  const { setCsrf } = useContext(SecurityContext);
  const { state, dispatch } = useContext(UserContext);
  console.log("etat du state User:", state.isConnected, state.firstName);
  
  useEffect(() => {
    const fetchAndReconnect = async () => {
      if (state.isConnected === false) {
        const newFetch = await getUser(dispatch);
        console.log(newFetch);
        console.log('state lors de la reconnexion :', state);
        
        if (newFetch.message) {
          return; 
        } else {
          console.log(newFetch.token);          
          setCsrf(newFetch.token)
        }
      }
    };
    fetchAndReconnect();
  }, [state.isConnected, dispatch]);
  

  return (
    <div className="background-container">
      <div className="app-content">
      <Router>
      <NavBar />
      <Modal />
      <Routes>
        <Route path='*' element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/todo/:id" element={<List />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
      </div>
    </div>
    
  );
}

export default App;
