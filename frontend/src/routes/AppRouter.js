import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage';
import RegisterUserPage from '../pages/RegisterUserPage';
import CreateProductPage from '../pages/CreateProductPage';


const AppRouter = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/registrar/usuario' element={<RegisterUserPage />} />
                        <Route path='/product/create' element={<CreateProductPage />} />
                    </Routes>
                </Container>
            </main>
        </Router>
    );
};

export default AppRouter;
