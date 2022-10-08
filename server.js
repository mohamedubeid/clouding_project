require('dotenv').config({ path: './configs/config.env' });
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db/config');
const routes = require('./routes');
const Image = require('./models/Image');
const CacheConfig = require('./models/CacheConfig');
const CacheStatistics = require('./models/CacheStatistics');

const app = express();
app.use('/images', express.static('images')); //make images folder as public for views
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//allows the bodyParser to accept json like data within the form data including nested objects. e.g. { person: { name: Adam } } sent using javascript rather than the name value pairs which traditional HTML form send.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT, async () => {
    console.log(`server started at port ${process.env.PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');
        await Image.sync({force: true});
        await CacheConfig.sync();
        await CacheStatistics.sync();
        console.log('Tables created.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(0);
    }
});

