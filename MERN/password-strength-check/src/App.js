import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PasswordStrengthChecker from './PasswordStrengthChecker';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PasswordStrengthChecker/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
