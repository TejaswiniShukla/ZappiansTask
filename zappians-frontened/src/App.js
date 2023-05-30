import React from 'react'
import Header from './Header'
import HomePage from './HomePage'
import Register from './Register';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';







function App() {
  


  return (
     <React.Fragment>
   
    
 
   
   
    <Router>
        <Header />
        <Routes>

        <Route path="/" element={<HomePage/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
            
      
        </Routes>
  </Router>
      
  </React.Fragment>
    


  );
}

export default App