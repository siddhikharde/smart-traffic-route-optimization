import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
                <Route path="/about" element={<About></About>}></Route>

      </Routes>
      <Footer/>
    </Router>
    </>
    
  )
}

export default App;