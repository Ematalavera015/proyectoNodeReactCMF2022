import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner
            animation='border'
            role='status'
            variant='warning'
            style={{
                width: '100px',
                heigth: '100px',
                margin: 'auto',
                display: 'block',
            }}
        >
            <span className='sr-only'>Cargando...</span>
        </Spinner>
    );
};

export default Loader;
