import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

// Pages
import Layout from './Layout';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import More from './pages/More/More';
import ManageAdmins from './pages/ManageAdmins/ManageAdmins';
import AddPost from './pages/AddPost/AddPost';
import AddAdmin from './pages/AddAdmin/AddAdmin';
import AdminDetails from './pages/AdminDetails/AdminDetails';

function App() {


  return (
    <main className='mx-auto'>
        <Router>
          <Routes>
            <Route path='/' element={<SplashScreen/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Layout />}>
              <Route index element={<Home />}/>
              <Route path='more' element={<More />}/>
              <Route path='admins' element={<ManageAdmins />}/>
              <Route path='addAdmin' element={<AddAdmin />}/>
              <Route path='addPost' element={<AddPost />}/>
              <Route path='a' element={<AdminDetails />}/>
            </Route>
          </Routes>
        </Router>
    </main>
  )
}

export default App
