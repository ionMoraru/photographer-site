import express from 'express';
import { debug } from 'util';

const debugLog = debug()('server');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({ text: 'Buna' });
});

app.listen(port, () => debugLog(`Server listen on ${port}`));