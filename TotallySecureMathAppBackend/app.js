const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('node:fs');

const notesPath = './data/notes.json';
const users = require('./data/users.json');

/**
 * These keys are 2048-bit RSA keys.
 * They were generated from https://travistidwell.com/jsencrypt/demo/.
 * DO NOT USE THESE KEYS IN A PRODUCTION SYSTEM!!!
 */
const publicKey = fs.readFileSync('./jwt.pem');
const privateKey = fs.readFileSync('./jwt.key');

const port = 3333;

const blacklist = [];

const createMiddleware = (app) => {
    app.use(express.json());
    app.use(cors());

    app.use((req, res, next) => {
        console.info(`Request received: ${req.method} ${req.path}`);

        next();
    });

    app.use(['/notes', '/logout'], (req, res, next) => {
        const authHeaderValue = req.header('Authorization');

        if (!authHeaderValue) {
            res.status(401);
            res.json({ message: 'Authorization header is missing.' });
            return;
        }

        const token = authHeaderValue.replace('Bearer ', '');

        jwt.verify(token, publicKey, function(err, decoded) {
            if (!err && !blacklist.includes(token)) {
                next();
            } else {
                res.status(401);
                res.json({ message: 'Authorization token is invalid.' });
            }
        });
    });
}

const createRoutes = (app) => {
    app.post('/login', (req, res) => {

        const { username, password } = req.body;

        if (!username || !password) {
            res.status(401);
            res.json({ message: 'The username or password is invalid.' });
            return;
        }

        let found = false;

        for (const user of users) {
            if (user.username === username && user.password === password) {
                found = user;
                break;
            }
        }

        if (found) {
            
            const token = jwt.sign({ }, privateKey, { algorithm: 'RS256', subject: String(found.id), expiresIn: '24h' });

            res.status(200);
            res.json({
                message: 'The username and password is correct.',
                token
            });
        } else {
            res.status(401);
            res.json({ message: 'The username or password is invalid.' });
        }
    });

    app.get('/notes', (req, res) => {
        const notes = JSON.parse(fs.readFileSync(notesPath));

        res.status(200);
        res.json({ notes });
    });

    app.post('/notes', (req, res) => {
        const notes = JSON.parse(fs.readFileSync(notesPath));

        const { title, text } = req.body;

        const note = { title, text };

        notes.push(note);

        fs.writeFileSync(notesPath, JSON.stringify(notes));

        res.status(200);
        res.json({ note });
    });

    app.post('/logout', (req, res) => {
        const token = req.header('Authorization').replace('Bearer ', '');

        blacklist.push(token);

        res.status(200);
        res.json({ message: 'You have been logged out.' });
    });
}

const start = () => {
    const app = express();

    createMiddleware(app);
    createRoutes(app);

    app.listen(port, () => {
        console.log(`API is running on http://localhost:${port} (or http://10.0.2.2:${port} in the Android Emulator)`);
    });
}

start();