const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'Esta es una ruta protegida',
            id: req.user.id,
            username:req.user.name
        }
    })
})

module.exports = router