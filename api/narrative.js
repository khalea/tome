require("dotenv").config();
const CLI = require("../util/cli");
const OpenAI = require("openai");

class Narrative {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.cli = new CLI();
    this.theme = null;
    this.characterAttributes = {
      strength: null,
      perception: null,
      endurance: null,
      charisma: null,
      intellect: null,
      agility: null,
      luck: null,
    };
  }

  async test() {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices);
  }

  async initialize() {
    this.cli.getCliInput(
      "Set the CONTEXT of your story. Write a comma separated list of keywords (ie. Futuristic, Desert, Cyberpunk): ",
      (input) => {
        this.theme = input.split(", ") ?? null;
        console.log(this.theme ?? "You did not select any theme keywords.");

        if (this.theme) {
          const starter = { role: 'system', content: `You are guiding the narrative for a role-playing game. You are to generate stories that the player can guide with their decisions, which are fed to you as responses. In this case, the narrative context is: ${this.theme.join(' ')}. Now, begin the narrative with an introduction to the world, a scenario with a choice that the user can respond to.` }
          const context = {
            theme: this.theme,
            characterAttributes: this.characterAttributes,
            messages: [starter],
          };

          this.narrativeLoop(context);
        }
      }
    );
  }

  // Using context, generate 1) the start of the story or 2) responses to the user
  async narrativeLoop(context) {
    const completion = await this.openai.chat.completions.create({
      messages: [...context.messages],
      model: 'gpt-3.5-turbo',
    });

    context.messages.push(completion.choices[0].message)

    this.cli.getCliInput(`📚 Narrator: ${completion.choices[0].message.content}`, (input) => {
      console.log(input);
      if (input && input !== '') {
        context.messages.push({role: 'user', content: input})
        
        this.narrativeLoop(context)
      } else {
        console.log('You did not write a response.')
      }
    })
  }
}

module.exports = {
  Narrative: Narrative,
};
