import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import NavHeader from './components/NavbarComponent';
import NotFound from './components/NotFoundComponent';
import Customer from './components/CustomerComponent';
import Login from './components/AuthComponents';
import { useState } from 'react';
import Queue from './components/QueueComponent';
import { AdminDashboard, CounterOfficerDashboard } from './components/DashboardComponent';



function App() {

  const [loggedIn, setLoggedIn] = useState(false);
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
        <Route index
          element={<Customer/>} />
        <Route path='login'
              element={<Login/>} />
        <Route path='queue'
              element={<Queue/>} />


        { loggedIn && isAdmin &&
        <Route path='dashboard'
              element={<AdminDashboard/>} />
        }
        { loggedIn && !isAdmin &&
        <Route path='dashboard'
              element={<CounterOfficerDashboard/>} />
        }


        <Route path='*' element={<NotFound />} />

      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
