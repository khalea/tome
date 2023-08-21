const express = require("express");
const app = express();
const port = 3001;

const CLI = require("../util/cli");
const cliHelper = new CLI();

const { Narrative } = require("./narrative");
const narrative = new Narrative();

app.get("/", (req, res) => {
  res.status(200).send("Tome is up and running.");
});

app.get("/testCLI", (req, res) => {
  cliHelper.getCliInput("Type something: ", (input) => {
    console.log(`You said: ${input}`);

    narrative.test();

    cliHelper.outputToCLI("📝 CLI write successful!");
    res.status(200).send("Test complete.");
  });
});

app.get("/begin", (req, res) => {
  console.log(`📚 Welcome to Tome.`);
  narrative.initialize();
});

app.listen(port, () => {
  console.log(`📚 Tome is running on Port ${port} (http://localhost:${port}).`);
});
