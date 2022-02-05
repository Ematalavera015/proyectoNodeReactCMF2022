import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import config from './config/index.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import path from 'path';

//Created server
const server = express();

//Parse JSON
server.use(express.json());

//Logger
if (config.nodeEnv === 'development') {
    server.use(morgan('dev'));
}

//DB connection
connectDB();

//Config header
server.use((req, res, next) => {
    // from where can I access
    res.header('Access-Control-Allow-Origin', '*');
    // type headers
    res.header('Access-Control-Allow-Headers', 'content-type, authorization')
    // type methods
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD')
    // next event
    return next()
})

// Use routes
server.use(config.api.prefix, routes)

//Upload folder
const __dirname = path.resolve();
server.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//Frontend production

//API status
server.get(config.api.prefix, (req, res) => {
    res.send('API is running...')
});

//Middlewares
server.use(notFound);
server.use(errorHandler);

//Export server
export default server;
