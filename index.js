const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/red-rain";
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//Check if there is an error when connecting with the database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));


app.get('/home', (req, res) => {
    res.render('home');
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/events', (req, res) => {
    res.render('events');
})

app.get('/sports', (req, res) => {
    res.render('sports');
})


app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/talent-agency', (req, res) => {
    res.render('./talent-agency/talent-agency2');

})




app.listen(3000, () => {
    console.log(`Server on port 3000`);
});