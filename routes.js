const express = require('express');
const router = express.Router();

router.get('/test', async (req, res) => {
    res.send('Hello World!');
});

router.get('/home', async (req, res) => {
    res.render('index');
});

router.post('/upload', async (req, res) => {
    console.log(req.body);
    res.send('image uploaded');
});

module.exports = router;
