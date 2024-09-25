import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

function App() {
  const isLoggedIn = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.length > 0;
  };

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="signup" element={isLoggedIn() ? <Navigate to="/home" replace /> : <Signup />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
