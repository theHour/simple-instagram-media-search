const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/api/user/:username', (req, res) => {
    const username = req.params.username;
    console.log(username);

    fetch(`https://instagram.com/${username}/media`)
        .then(data => data.json())
        .then(json => res.json(json))
        .catch(() => res.json({test: 'No result!'}))
});


app.listen(8080, () => {
    console.log('listening on port : 8080!');
})