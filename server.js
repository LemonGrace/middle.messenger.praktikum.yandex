import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, function listen() {
	// eslint-disable-next-line no-console
	console.log(`Example app listening on port ${PORT}!`);
});
