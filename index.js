const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.js');
const mongoose = require('mongoose')
const dashboardRoutes = require('./routes/dashboard')
const verifyToken = require('./routes/validateToken')


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}s@cluster0.nw256.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos')
    })
    .catch((e) => {
        console.log('Database error', e)
    })

require('dotenv').config()
app.use(express.json());


app.use(express.urlencoded({extended: false}))

app.use('/api/user', authRoutes)
app.use('/api/dashboard', verifyToken, dashboardRoutes)

app.get('/', (req, res) => {
    res.send('MyApi');
});

const PORT = process.env.PORT || 8002
app.listen(PORT, () => {
    console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})







