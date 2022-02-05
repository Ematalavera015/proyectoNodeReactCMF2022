import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../redux/actions/userActions';

const RegisterUserPage = () => {

    const dispatch = useDispatch();
    const newUser = useSelector((state) => state.userLogger);
    const { loading, error, user } = newUser;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        if (user?._id) {
            navigate("/");
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email,
            password,
            name: nombre,
        }
        console.log('BODY REGISTER ', body)
        dispatch(userRegister(body));
    };

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)}>

                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre de usuario" value={nombre} onChange={e => setNombre(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPasswordConfirm">
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                </Form.Group>
                {
                    password && passwordConfirm ?
                        (

                            password !== passwordConfirm &&
                            (
                                <p style={{ color: 'red' }}>Contraseñas no coinciden!!!</p>
                            )
                        ) :
                        null
                }
                <Button variant="primary" type="submit">
                    Entrar
                </Button>
            </Form>
        </>
    );
};

export default RegisterUserPage;
