import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSignOut = () => {
    googleLogout();
    sessionStorage.removeItem("userName");
    setUserName('');
    toast.info("Signout Successfully");
    navigate('/');
  }

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []); 

  return (
    <>
      <header>
        <Navbar className="bg-info">
          <Container>
            <Navbar.Brand className='text-white'>Heyy!!</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Button onClick={handleSignOut} variant="outline-light">Sign Out <i className="fa-solid fa-right-from-bracket"></i></Button>{' '}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <div className="container d-flex justify-content-center mt-5" style={{minHeight: '40vh'}}>
      <div className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '50px' }} className='text-center'>Welcome {userName}</Card.Title>
              <Card.Text className='mt-3'>
                This is your dashboard...You can customize it further as needed.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>
  )
}

export default Dashboard;
