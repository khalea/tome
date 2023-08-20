require("dotenv").config();
const OpenAI = require("openai");

class Narrative {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async test() {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices);
  }
}

module.exports = {
  Narrative: Narrative,
};
