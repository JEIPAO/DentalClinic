import { useState } from 'react'
import {
  HashRouter  as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css'
import { Button } from "@/components/ui/button"
import  LoginPage  from './pages/login/LoginPage'
import SignUpPage from './pages/signup/SignUpPage'
import Invoices from './pages/Invoices'
import Dashboard from './pages/Dasboard'
import Patient from './pages/Patient'
import Billing from './pages/Billing'
import Treatments from './pages/Treatments'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/invoices" element={<Invoices />} />
        {/* Add more routes here as needed */}
     </Routes>
    </Router>
  )
}

export default App
