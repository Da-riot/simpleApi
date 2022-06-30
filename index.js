const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.js');
const mongoose = require('mongoose')


app.use(express.urlencoded({extended: false}))

app.use('/api/user', authRoutes)


app.get('/', (req, res) => {
    res.send('MyApi');
});

const PORT = process.env.PORT || 8002
app.listen(PORT, () => {
    console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})







