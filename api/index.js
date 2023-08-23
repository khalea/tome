require('dotenv').config();

const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

const OpenAI = require('openai');
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

/* Default endpoint */
app.get('/', (req, res) => {
	res.status(200).send('Tome is up and running.');
});

/* Return a ChatGPT completion based on given context */
app.post('/continue', (req, res) => {
	openai.chat.completions.create({
		messages: [...req.body.messages],
		model: 'gpt-3.5-turbo',
	}).then((value) => {
		res.status(200).send(value);
	}).catch((reason) => {
		res.status(400).send(reason);
	});
});

app.listen(port, () => {
	console.log(`📚 Tome is running on Port ${port} (http://localhost:${port}).`);
});