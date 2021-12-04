require('dotenv').config()
const express = require('express')
const {cloudinary} = require('../utils/config')
const cors = require('cors')
const multer = require('multer')
const datauri = require('datauri/parser')
const path = require('path')

const upload = multer({
    fileFilter: (req, file, cb) =>{
        cb(undefined, true)
    }
})

const app = express()
const port = 3002

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.post('/upload', upload.single('image'), async (req, res)=>{
    try{
        const dataURI = new datauri()
        const fileStr = dataURI.format(path.extname(req.file.originalname), req.file.buffer)
        const response = await cloudinary.uploader.upload(fileStr.content, {
            upload_preset: process.env.UPLOAD_PRESET,
            folder: process.env.UPLOAD_FOLDER
        })
        res.send({
            msg: 'Upload Success!',
            image: response.url
        })
    } catch(e){
        res.status(500).send({errorMsg: e})
    }
}, (error, req, res, next) =>{
    res.status(500).send({errorMsg: e})
    next()
})

app.post('/test', (req, res)=>{
    res.send({
        msg: 'hello'
    })
})

app.listen(port, () =>{
    console.log('Server Started at port ' + port)
})