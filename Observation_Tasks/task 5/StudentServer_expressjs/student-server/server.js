const express = require('express');

const app = express();

const port = 3000;

// Student data
const students = [
    {
        id: 1,
        name: "Rahul",
        course: "CSE"
    },
    {
        id: 2,
        name: "Priya",
        course: "AI & ML"
    },
    {
        id: 3,
        name: "Arjun",
        course: "ECE"
    },
    {
        id: 4,
        name: "Sneha",
        course: "CSE"
    },
    {
        id: 5,
        name: "Kiran",
        course: "IT"
    }
];

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to Student Server!');
});

// Students route
app.get('/students', (req, res) => {
    res.json(students);
});

// About route
app.get('/about', (req, res) => {
    res.send('This application manages student information using Express.js.');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});