const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const connectMongoDBSession = require('connect-mongodb-session')(session);

const db = require('./db');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurerer express-session
const mongoDBStore = new connectMongoDBSession({
    uri: 'mongodb://10.12.15.70:27017/bitter',
    collection: 'sessions'
});

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: mongoDBStore
}));

// Middleware for å parse request body
app.use(express.urlencoded({ extended: true }));

// Setter opp enkel rute for rotstien
app.get('/', (req, res) => {
    res.send('Velkommen til min Express-app!');
});

// Registreringsrute
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send('Brukernavnet er allerede i bruk');
        }

        const newUser = new User({ username, password });
        await newUser.save();
        req.session.userId = newUser._id;
        res.send('Bruker registrert og logget inn');
    } catch (error) {
        console.error(error);
        res.status(500).send('Noe gikk galt');
    }
});

// Innloggingsrute
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).send('Ugyldig brukernavn eller passord');
        }

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(400).send('Ugyldig brukernavn eller passord');
        }

        req.session.userId = user._id;
        res.send('Innlogging vellykket');
    } catch (error) {
        console.error(error);
        res.status(500).send('Noe gikk galt');
    }
});

// Logg ut-rute
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Noe gikk galt');
        } else {
            res.send('Du er logget ut');
        }
    });
});

// Starter serveren
app.listen(PORT, () => {
    console.log(`Serveren kjører på port ${PORT}`);
});
