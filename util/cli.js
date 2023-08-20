require("node:fs");
const { stdin: input, stdout: output } = require("node:process");

const readline = require("node:readline");

class CLI {
  constructor() {
    this.readline = readline;
  }

  outputToCLI(text) {
    console.log(text);
  }

  getCliInput(prompt, callback) {
    const rl = readline.createInterface({
      input,
      output,
    });

    rl.question(prompt, (input) => {
      callback(input);
      rl.close();
    });
  }
}

module.exports = CLI;
