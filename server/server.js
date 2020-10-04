import express from "express";
import bodyParser from "body-parser";

// ROUTES
import userRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Api routes
// Legges under mappen server/routes
// må importeres på toppen
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
});