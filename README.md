# Tome

### Introduction

Tome is a text-based Role-Play Game (RPG) making use of OpenAI's ChatGPT for narrative interactions and development. The goal is to enable players to build their own narrative adventures as they go, engaging with the world via natural language.

---

## Install & Run

Using the command line, navigate to a folder where you want the project to be installed (ie. Projects). Clone the repository:

`> git clone https://github.com/khalea/tome.git`

Create a `.env` file in the root of the project folder and add your OpenAI API key:

`OPENAI_API_KEY="REPLACE_TEXT_WITH_KEY"`

> _This file will be ignored by Git for security purposes, by default. Do not remove `.env` from the `.gitignore` file._

Navigate to the repository folder on your computer and run the following:

```
> npm install
> node start
```

If successful, you should see the following in the command line:

`📚 Tome is running on Port 3001 (http://localhost:3001).`

To start the command line program, you can either make a request to the `/begin` api endpoint via command line or browser:

##### Command Line

In a new terminal window, run:

`node cli/TomeCLI`

```
📚 Welcome to Tome.

Set the CONTEXT of your story. Write a comma separated list of keywords (ie. Futuristic, Desert, Cyberpunk):
```

---
