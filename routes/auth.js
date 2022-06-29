const router = require('express').Router();
const User = require('../models/user')
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');



// Creamos un esquema de registro usando las validaciones de Joi
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})


router.post('/register', async (req, res) => {
    // Dentro del método que invoca POST
    // Usaremos la propiedad error del objeto que nos entrega schemaRegister.validate()
    const { error } = schemaRegister.validate(req.body)

    // Si este error existe, aqui se termina la ejecución devolviedonos el error
    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)


    // Creamos el objeto usando el model que creaos anteriormente
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });
    // Usamos .save() del model para almacenar los datos en Mongo
    try {
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router