import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css'
import { Button } from "@/components/ui/button"
import  LoginPage  from './pages/login/LoginPage'
import Dashboard from './pages/Dasboard'
import Patient from './pages/Patient'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/" element={<LoginPage />} />
        {/* Add more routes here as needed */}
     </Routes>
    </Router>
  )
}

export default App
