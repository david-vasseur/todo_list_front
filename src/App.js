import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sign from './pages/Sign';
import Home from './pages/Home';
import Todo from './pages/Todo';
import List from './pages/List';
import Profile from './pages/Profile';
import Modal from './components/Modal';
import NavBar from './components/NavBar';

function App() {
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
