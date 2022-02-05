import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../redux/actions/productActions';
import { guardarImagen } from '../services/productServices';
import { useNavigate } from 'react-router-dom';

const CreateProductPage = () => {

    const userLog = useSelector((state) => state.userLogger);
    const { user } = userLog;

    const productNew = useSelector((state) => state.newProduct);
    const { loading, error, product } = productNew;

    const dispatch = useDispatch();

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0.0);
    const [urlImage, setUrlImage] = useState('');
    const [marca, setMarca] = useState('');
    const [cantidadStock, setCantidadStock] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (product._id) {
            navigate('/');
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const product = {
            price: precio,
            user: user._id,
            name: nombre,
            image: urlImage,
            brand: marca,
            countInStock: cantidadStock,
            category: categoria,
            description: descripcion,
        }
        dispatch(createProduct(product, user.token));
    };


    useEffect(() => {
        if (selectedFile) {
            subirImagen(user.token, selectedFile);
        } else {
            setUrlImage('');
        }
    }, [selectedFile])

    const singleFileChangedHandler = (e) => {
        const file = e.target.files[0]
        setSelectedFile(file);
        // if (file?.type.includes('image')) {
        //     console.log('ES UNA IMAGEN');
        //     const reader = new FileReader();
        //     reader.readAsDataURL(file);
        // }

    };

    const subirImagen = async (token, archivo) => {

        const response = await guardarImagen(token, archivo);
        setUrlImage(response.location);
    };

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)} style={{ width: '40rem' }} >
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre del producto" value={nombre} onChange={e => setNombre(e.target.value)} required={true} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPrecio">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} required={true} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUrlImage">
                    <Form.Label>Foto</Form.Label>
                    {selectedFile ?
                        <Card style={{ width: '150px', heigth: '100px', marginBottom: '8px' }}>
                            <Card.Img variant="top" src={urlImage} />
                        </Card> :
                        <></>
                    }
                    <Form.Control disabled={true} type="text" placeholder="URL de la imagen" value={urlImage} onChange={e => setUrlImage(e.target.value)} required={true} />
                    <Form.Control type="file" className='mt-3' onChange={(e) => singleFileChangedHandler(e)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMarca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" placeholder="Marca" value={marca} onChange={e => setMarca(e.target.value)} required={true} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCantidadStock">
                    <Form.Label>Cantidad de Stock</Form.Label>
                    <Form.Control type="number" placeholder="Stock disponible" value={cantidadStock} onChange={e => setCantidadStock(e.target.value)} required={true} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCategoria">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control type="text" placeholder="Categoría" value={categoria} onChange={e => setCategoria(e.target.value)} required={true} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescripción">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required={true} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Guardar Producto
                </Button>
            </Form>

        </>
    );
};

export default CreateProductPage;
