const express = require("express");
const env = require("./src/config/env.config");
const cors = require("cors");
const { connect } = require('./src/database/connection');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
}));

// Routes
const userRouter = require("./src/routes/users");
const rsvpRouter = require("./src/routes/rsvp");

app.use('/api/users', userRouter);
app.use('/api/rsvp', rsvpRouter);

app.all('*', (req, res) => {
    return res.status(404).json({ message: `Page Not Found!` });
});

const port = 3000;
app.listen(port, env("HOST"), () => console.log(`Listening on port ${port}!`));
connect();