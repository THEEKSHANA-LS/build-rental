import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/homePage.jsx';
import LoginPage from './pages/loginPage.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <div className="w-full h-[100vh">
    <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Toaster position="top-center" />

      <Routes path="/">
        <Route path="/*" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
