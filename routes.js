const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({ storage });
const {showImage, addImage, getKeys} = require('./controller/imageController');

router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/show-image',showImage);

router.post('/upload',upload.single('image'), addImage);


router.get('/keys', getKeys)

router.get('/cache-configuration', async (req, res) => {
    res.render('cache-configuration');
});

router.get('/mem-cache-statistics', async (req, res) => {
    res.render('mem-cache-statistics');
});

router.get('/test', async (req, res) => {
    res.send('Hello World!');
});

module.exports = router;
