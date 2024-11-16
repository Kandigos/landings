import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Calendar from './components/Calendar';
import About from './components/About';
import Features from './components/Features';
import Instructor from './components/Instructor';
import Reviews from './components/Reviews';
import AdminButton from './components/AdminButton';
import AdminLogin from './pages/AdminLogin';
import AdminEdit from './pages/AdminEdit';
import { ContentProvider } from './context/ContentContext';

function HomePage() {
  return (
    <div className="min-h-screen bg-[#D9D1AD]">
      <div className="monstera-leaf monstera-leaf-top-left" />
      <div className="monstera-leaf monstera-leaf-bottom-right" />
      <div className="star-detail star-detail-top-right" />
      <div className="star-detail star-detail-bottom-left" />
      <div className="line-detail line-detail-top" />
      <div className="line-detail line-detail-bottom" />
      <AdminButton />
      <Hero />
      <Calendar />
      <About />
      <Features />
      <Instructor />
      <Reviews />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/edit" element={<AdminEdit />} />
        </Routes>
      </ContentProvider>
    </Router>
  );
}

export default App;