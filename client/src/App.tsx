import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import NavHeader from './components/NavbarComponent';
import NotFound from './components/NotFoundComponent';
import Customer from './components/CustomerComponent';
import TemporaryHome from './components/TemporaryHomeComponent';
import Login from './components/AuthComponents';
import { useState } from 'react';
import Queue from './components/QueueComponent';
import { ServiceManagement, CounterOfficerDashboard, ServiceForm } from './components/DashboardComponent';



function App() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);


  return (
    <BrowserRouter>
    <Routes>
      <Route element={
        <>
          <NavHeader/>
          <Container fluid className="mt-3">

            <Outlet />
          </Container>
        </>} >
       <Route index element={<TemporaryHome setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />} />
        <Route path='login'
              element={<Login/>} />
        <Route path='queue'
              element={<Queue/>} />
        <Route path='customer'
              element={<Customer/>} />


        <Route path='services'
              element={<ServiceManagement/>} />
        <Route path='services/new'
              element={<ServiceForm/>} />
        <Route path='services/:id'
              element={<ServiceForm/>} />

        <Route path='dashboard'
              element={<CounterOfficerDashboard/>} />

        <Route path='*' element={<NotFound />} />

      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
