import express from 'express'
import path from 'path'
import logger from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

/// Routes

import productRoutes from './routes/productRoute';

const app = express();

app.use(cors("*"));

app.use(logger('dev'));

app.use(cookieParser());

app.set('view engine', 'pug');

app.set('views', path.join('views'));

app.use(express.static(path.join('public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json({ limit: "50MB" }));

app.use('/', productRoutes)

export default app;