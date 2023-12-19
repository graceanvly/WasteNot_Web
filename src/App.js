import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login.js';
import { Register } from './Pages/Register.js';
import { Profile } from './Pages/Profile.js';
import { Homepage } from './Pages/HomePage.js';
import { Staff } from './Pages/Staff.js';
import { Menu } from './Pages/Menu.js';
import { Inventory } from './Pages/Inventory.js';
import { Market } from './Pages/Market.js';
import { AddStaff } from './Pages/AddStaff.js';
import { AddDish } from './Pages/AddDish.js';
import { AboutUs } from './components/AboutUs.js';

const App = () => {
  const storedForm = localStorage.getItem('currentForm');
  const [currentForm, setCurrentForm] = useState(storedForm || 'Login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
    localStorage.setItem('currentForm', formName);
  }

  useEffect(() => {
    localStorage.setItem('currentForm', currentForm);
  }, [currentForm]);

  useEffect(() => {
    if (!['Login', 'Register', 'Profile'].includes(storedForm)) {
      localStorage.setItem('currentForm', 'Login');
      setCurrentForm('Login');
    }
  }, [storedForm]);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login onFormSwitch={toggleForm} />} />
        <Route path='/login' element={<Login onFormSwitch={toggleForm} />} />
        <Route path='/register' element={<Register onFormSwitch={toggleForm} />} />
        <Route path='/homepage' element={<Homepage onFormSwitch={toggleForm} />} />
        <Route path='/staff' element={<Staff onFormSwitch={toggleForm} />} />
        <Route path='/menu' element={<Menu onFormSwitch={toggleForm} />} />
        <Route path='/market' element={<Market onFormSwitch={toggleForm} />} />
        <Route path='/inventory' element={<Inventory onFormSwitch={toggleForm} />} />
        <Route path='/profile' element={<Profile onFormSwitch={toggleForm} />} />
        <Route path='/addstaff' element={<AddStaff onFormSwitch={toggleForm} />} />
        <Route path='/addDish' element={<AddDish onFormSwitch={toggleForm} />} />
        <Route path='/aboutus' element={<AboutUs onFormSwitch= {toggleForm}/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;