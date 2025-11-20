import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/homePage.jsx';
import LoginPage from './pages/loginPage.jsx';
import SignupPage from './pages/signupPage.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <div className="w-full h-[100vh]">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/*" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
