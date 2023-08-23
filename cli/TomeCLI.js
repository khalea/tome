const CLI = require('../util/cli');
const axios = require('axios');

class TomeCLI {
	constructor() {
		this.cli = new CLI();
		this.context = {
			'theme': null,
			'characterAttributes': {
				'strength': null,
				'perception': null,
				'endurance': null,
				'charisma': null,
				'intellect': null,
				'agility': null,
				'luck': null,
			},
			'messages': []
		};
	}

	/**
	 * Begin the story — get context parameters, then initialize the conversation.
	 */
	async start() {
		this.cli.getCliInput(
			'Set the CONTEXT of your story. Write a comma separated list of keywords (ie. Futuristic, Desert, Cyberpunk): ',
			(input) => {
				this.context.theme = input.split(', ') ?? null;
				console.log(this.context.theme ?? 'You did not select any theme keywords.');

				if (this.context.theme) {
					const starter = {
						role: 'system',
						content: `You are guiding the narrative for a role-playing game. You are to generate stories that the player can guide with their decisions, which are fed to you as responses. In this case, the narrative context is: ${this.context.theme.join(
							' '
						)}. Now, begin the narrative with an introduction to the world, a scenario with a choice that the user can respond to.`,
					};
					const context = {
						theme: this.context.theme,
						characterAttributes: this.context.characterAttributes,
						messages: [starter],
					};

					this.continue(context);
				}
			}
		);
	}

	/** Continue conversation — Send input to OpenAI, return Assistant's response.
	 * 
	 * @param {*} context 
	 */
	async continue(context) {
		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:3001/continue',
			headers: {
				'Content-Type': 'application/json'
			},
			data: context
		};


		axios.request(config)
			.then((response) => {
				console.log(response);
				context.messages.push(response.data.choices[0].message);
				this.cli.getCliInput(
					`\n📚 Narrator: ${response.data.choices[0].message.content}\n\n`,
					(input) => {
						if (input && input === 'cmd:end') {
							console.log();
							return;
						}

						if (input && input !== '') {
							context.messages.push({ role: 'user', content: input });
							this.continue(context);
						} else {
							console.log('You did not write a response. Try again.');
							// TODO - Run input getter again in order to update context with response.
						}
					}
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}
}

const tomeCLI = new TomeCLI();
tomeCLI.start();

module.exports = {
	TomeCLI: TomeCLI,
};