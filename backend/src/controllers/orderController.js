import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Add new order
// @route POST api/orders
// @access private

export const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order item');
    }else{
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(200).json(createdOrder);
    }
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private

export const getOrderById = asyncHandler(async (req, res) => {
    // Usar findById y populate para obtener el user el name y email
    // Si existe la orden y el user que realiza la request es admin
    // o es el usuario que realizó la orden, retornar
    // res.json() con la orden encontrada
    // Sino retornar status 404
    // Y arrojar el error: 'Order not found'

    const order = await Order.findById(req.params.id).populate({path:'user', select: 'name email'}); //'user: name email' 
    if(order){
        if(req.user.isAdmin || req.user._id === order.user._id){
            res.json(order)
        }else{
            res.status(400);
            throw new Error('Invalid operation');
        }
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private

export const updateOrderToPaid = asyncHandler(async (req, res)=>{
    // Usar findByid
    // Si existe la orden y el user que realiza la request es admin
    // o es el usuario que realizó la orden,
    // Asignar a isPaid true y a paidAt la fecha actual
    // Luego a la orden encontrada asignar el objeto paymentResult:
    // order.paymentResult = {
    // id: req.body.id
    // status: req.body.status
    // update_time: req.body.update_time,
    // email_address: req.body.payer.email_address,
    //}
    // Realizar un .save() y retornar la orden actualizada
    // Sino retornar status 404 y arrojar el error: 'Order not found'

    const order = await Order.findById(req.params.id);
    if(order){
        if(req.user?.isAdmin || req.user?._id === order.user._id){
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }
            const orderSaved = await order.save()
            res.status(200).json(orderSaved);
        }else{
            res.status(401);
            throw new Error('Unauthorized user')
        }
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    // User findById
    // Si existe la orden y el user que realiza la request es admin
    // o es el usuario que realizó la orden
    // Asignar a isDelivered true y a deliveredyAt la fecha actual
    // Realizar un .save() y retorna la orden actualizada
    // Sino retornar status 404 y arrojar el error 'Order not found'

    const order = await Order.findById(req.params.id);
    if(order){
        if(req.user.isAdmin || req.user._id === order.user._id){
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        }else{
            res.status(401);
            throw new Error('Unauthorized user')
        }
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private

export const getMyOrders = asyncHandler(async (req, res) => {
    // Usar find y en el parámetro enviar la propiepad user con
    // el id que viene del req.user
    // Retornar un json() con las ordenes
    const orders = await Order.find(req.user._id);
    if(orders && orders.length > 0){
        res.status(200).json(orders);
    }else{
        res.status(200);
        res.json({
            msg: "User has not orders"
        });
    }
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin

export const getOrders = asyncHandler(async (req, res) => {
    // Usar find y popular con los datos del user: id y name
    // Retornar un json() con las ordenes
    const orders = await Order.find().populate('user', 'id name');
    if(orders){
        res.status(200).json(orders);
    }else{
        res.status(404);
        throw new Error('Orders not found');
    }
});