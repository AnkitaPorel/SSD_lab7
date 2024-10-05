const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

router.get('/todo', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.send('Welcome to the Todo Application');
});

router.post('/todo', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Unauthorized access' });
    }

    const { title, description, completionDate } = req.body;

    if (!title) {
        return res.status(400).json({ msg: 'Title is required' });
    }

    const newTodo = new Todo({
        title,
        description,
        completionDate,
        user: req.session.user._id
    });

    try {
        const savedTodo = await newTodo.save();
        return res.status(201).json(savedTodo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});
router.get('/hello', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.send('hello world');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Missing details' });
    }

    try {
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const newUser = new Users({ username, password });
        await newUser.save();
        return res.status(201).json({ msg: 'User successfully registered' });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Something missing' });
    }

    try {
        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        if (password === user.password) {
            req.session.user = { username: user.username, _id: user._id };
            return res.status(200).json({ msg: 'Login successful' });
        } else {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});
router.get('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
            if (err)
                return res.status(500).send("Unable to Logout!");
            else
                return res.status(200).json({ "msg": "Logout Successful..." });
        });
    } else {
        res.status(400).json({ msg: 'No user to log out' });
    }
});

// Auth Check Route
router.get('/isAuth', async (req, res) => {
    if (req.session.user) {
        return res.json(req.session.user);
    } else {
        return res.status(401).json('Unauthorized');
    }
});

module.exports = router;