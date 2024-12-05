import express from 'express';
import axios from 'axios';
import 'dotenv/config';

const apiKey = process.env.API_KEY;

const app = express();
const PORT = 5000;

app.use(express.static('public/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/city/:dynamic', async (req, res) => {
    const dynamic = req.params.dynamic;
    const result = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${dynamic}&days=3`, {
        headers: { 'x-api-key': apiKey }
    });
    const data = result.data;
    return res.status(200).json(data);
});

app.listen(PORT, () => console.log('Server has started on port ' + PORT));

