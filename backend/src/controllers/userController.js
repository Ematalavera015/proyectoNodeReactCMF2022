import asyncHandler from 'express-async-handler';
import generateToken from '../common/generateToken.js';
import User from '../models/userModel.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @acces public

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }

});

// @desc Register a new user
// @route POST /api/users
// @access Public

export const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log('BACK BODY ', req.body);
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(404);
        throw new Error('User already exists!');
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        // res.status(201).json({
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     isAdmin: user.isAdmin,
        //     token: generateToken(user._id),
        // });
        req.newUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        }
        return next();
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

export const getUserProfile = asyncHandler(async (req, res) => {
    // Usar findById
    // Enviar un res.json({}) que contenga: _id, name, email, isAdmin
    // En caso de error devolver status 404 y arrojar el error: 'User not found'
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

//@desc Update user profile
// @route /api/users/profile
// @accsess Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(findById(req.user._id))
    //const salt = await bcrypt.genSalt(10);
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        //user.password = await bcrypt.hash(req.body.params, salt) || await bcrypt.hash(user.password,salt)
        user.password = req.body.params || user.password
        try {
            user.save();
            res.status.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: user.token,
            })
        } catch (error) {
            res.status(404);
            res.json({
                status: "0",
                msg: "Error procesing operation",
            })
        }
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc GET all users
// @route GET /api/users
// @access Provate/Admin

export const getUsers = asyncHandler(async (req, res) => {
    // Usar find
    // Enviar un res.json() con el resultado

    const users = await User.find();
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Delete user
// @reoute DELETE /api/users/:id
// @access Private/Admin

export const deleteUser = asyncHandler(async (req, res) => {
    //Usar findById
    // Si se encontró el usuario usar -> .remove()
    // Retornar un res.json() con el message: 'User removed'
    // Si no se encontró el usuario retornar status 404
    // y arrojar el error 'User not found'
    const user = await User.findById(req.params.id);
    if (user) {
        try {
            await User.deleteOne(user);
            res.status(200).json({
                status: '1',
                msg: 'User removed'
            })
        } catch (error) {
            res.status(404);
            res.json({
                status: "0",
                msg: "Error procesing operation",
            })
        }
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc Get user by id
// @route GET /api/users/:id
// @acces Private/Admin

export const getUserById = asyncHandler(async (req, res) => {
    // Usar findById agregandole eñ .select() para evitar el password
    // Si existe el usuario devolver res.json() con el resultado
    // Si no existe el usuario retornar status 404
    // Y arrojar el error: 'User not found'

    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin

export const updateUser = asyncHandler(async (req, res) => {
    // Usar findById
    // Si se encontró el usuario entonces:
    // user.name = req.body.name || user.name
    // user.email = req.body.email || user.email
    // user.isAdmin = req.body.isAdmin || user.isAdmin
    // guardar con .save()
    // Retornar un res.json() que contenga: _id, name, email, isAdmin
    // Si no se encontró el usuario entonces retornar status 404
    // Y arrojar el error: 'User not found'
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
        user.save();
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});