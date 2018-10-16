import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import setHeaders from './middlewares/setHeaders';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

import collections from './routes/collections';
import sliderImages from './routes/sliderImages';

const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(setHeaders);
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/collections', collections);
app.use('/api/v1/slider', sliderImages);

app.get('/', (req, res) => {
    res.json({ text: 'API' });
});

// const response = cloudinary.v2.api.root_folders(function(error, result){console.log(result)});


app.listen(port, () => console.log(`Server listen on ${port}`));