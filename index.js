const express = require('express');
const app = express();

app.use(express.json());

const users = [
    {id:1, username: 'yomero', albums: [''], movies:[''], videogames:[''], tvshows:[''], animanga:['']},
    {id:2, username: 'yomero', albums: [''], movies:[''], videogames:[''], tvshows:[''], animanga:['']},
]

app.get('/', (req, res) => {
    res.send('MyApi');
});

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('Usuario no encontrado');
    else res.send(user);
});

app.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1,
        username: req.body.username,
        albums: req.body.albums,
        movies: req.body.movies,
        videogames: req.body.videogames,
        tvshows: req.body.tvshows,
        animanga: req.body.animanga
    };
    users.push(user);
    res.send(user);
});

app.delete('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('Usuario no encontrado');

    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(user);
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));









