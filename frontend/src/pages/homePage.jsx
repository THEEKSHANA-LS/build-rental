import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import BrowserTools from './browserTools.jsx';
import AboutPage from './aboutPage.jsx';
import ContactPage from './contactPage.jsx';
import { ArrowRight } from 'lucide-react'; 
import MyOrders from './myOrders.jsx';

//hero section component...
const HeroSection =() =>{

  const navigate = useNavigate();
  const backgroundImage = '/bg.jpg'; 
  
  return (
    <div 
      className="relative h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 1. Dark Overlay (Opacity and Color match your design) */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 p-6 max-w-4xl mx-auto text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
          Rent Professional 
          <span className="block text-[#ffb800] mt-2">
            Construction Tools
          </span>
        </h1>
        <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
          Access quality construction equipment at affordable rates. From power tools to heavy machinery.
        </p>

        <div className="flex justify-center space-x-4">
          
          <button onClick={() => navigate("/browse-tools")}
            className="flex items-center space-x-2 px-8 py-3 text-base font-semibold text-black bg-[#ffb800] rounded-lg 
                       hover:bg-[#ffaa00] transition duration-300 shadow-lg"
          >
            <span>Browse Tools</span>
            <ArrowRight size={20} />
          </button>
          
          <button 
            className="px-8 py-3 text-base font-semibold text-white border border-white rounded-lg 
                       bg-black bg-opacity-30 hover:bg-opacity-50 transition duration-300"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
};

//main home page function...
export default function HomePage(){
  return (
    
    <div className="flex flex-col min-h-screen"> 
      <Header/>
      
      {/* Main Content Area */}
      <main className="flex-grow"> 
        <Routes>
          {/* Default Route: Home Page with the Hero Section */}
          <Route path="/" element={<HeroSection />} />
          
          {/* Other Routes */}
          <Route path="/browse-tools" element={<BrowserTools/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/my-orders" element={<MyOrders/>}/>
        </Routes>
      </main>
      
      <Footer/>
    </div>
  )
}