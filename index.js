if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const express = require('express');
const app = express();
const fs = require('fs');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
const session = require('express-session')
const stripe = require('stripe')(stripeSecretKey);







app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));

// Body Parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const sessionOptions = { secret: 'thisisthesecret', resave: false, saveUninitialized: false };
app.use(session(sessionOptions));



app.post('/create-checkout-session', async (req, res) => {
    const amount = 3210;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/event-page',
    });

    res.json({ id: session.id });
});

app.get('/success', (req, res) => {
    res.render('success');
})

app.get('/failure', (req, res) => {
    res.render('failure');
})


app.get('/home', (req, res) => {
    res.render('home');
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/events', (req, res) => {
    res.render('./events/events');
})

app.get('/event-page', (req, res) => {
    fs.readFile('item.json', function (error, data) {
        if (error) {
            res.status(500).end();
        }
        else {
            res.render('./events/event-page', {
                items: JSON.parse(data),
                stripePublicKey: stripePublicKey
            });
        }
    });
})

app.get('/sports', (req, res) => {
    res.render('sports');
})


app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/talent-agency', (req, res) => {
    res.render('./talent-agency/talent-agency');

})

app.get("/talent", (req, res) => {
    res.render("./talent-agency/talents")
})

app.get("/about-talent", (req, res) => {
    res.render("./talent-agency/about-talent")
})


const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Server on port ${port}`);
});




















// const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/red-rain";
// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// });

//Check if there is an error when connecting with the database
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });