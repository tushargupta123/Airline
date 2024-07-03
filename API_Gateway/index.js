const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 2 * 60 *1000,
    max: 5
})


const {createProxyMiddleware} = require('http-proxy-middleware')

const PORT = 3005;

app.use(morgan('combined'))   // it is a logger

app.use(limiter);

app.use('/bookingservice',async(req,res,next) => {
    try {
        const response = await axios.get('http://localhost:3001/api/v1/isAuthenticated',{
        headers: {
            'x-access-token': req.headers['x-access-token']
        }
    })
    if(response.data.success){
        next();
    }else{
        return res.status(401).json({
            message:'Unauthorised'
        })
    }
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        })
    }
})
app.use('/bookingservice',createProxyMiddleware({target: 'http://localhost:3002/',changeOrigin: true}))

app.get('/home',(req,res) => {
    return res.json({message:'OK'});
})

app.listen(PORT, () => {
    console.log('server started on port  '+PORT);
})