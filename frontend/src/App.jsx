import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History";


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/planner" element={<ProtectedRoute><Planner /></ProtectedRoute> }/>
                <Route path="/history" element={<ProtectedRoute> <History /></ProtectedRoute>} />
      </Routes>
      <Footer/>
    </Router>
    </>
    
  )
}

export default App;