import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './global';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle  />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
