import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userLog = useSelector((state) => state.userLogger);
    const { error, user } = userLog;

    const navigate = useNavigate();

    useEffect(() => {
        if (user?._id) {
            navigate("/");
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const initialUserState = {
            email: email,
            password: password,
        }
        dispatch(loginUser(initialUserState));
    }
    return (
        <>
            <h1>Iniciar Sesión</h1>
            {error ?
                <p style={{ color: 'red' }}>{error}</p>
                :
                <></>
            }
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Entrar
                </Button>
            </Form>
            <p>
                Eres nuevo?
                <a href='/registrar/usuario' style={{ color: 'blue', textDecoration: 'none' }}> Crear Cuenta</a>

            </p>
        </>
    );
};

export default LoginPage;
