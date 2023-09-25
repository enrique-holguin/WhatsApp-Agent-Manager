<!-- Title -->
<h1 align="center">WhatsApp Agent Management (Baileys Provider)</h1>

<!-- Description -->
<p align="center">A WhatsApp bot for managing agents and automated conversations.</p>

<!-- Logo -->
<p align="center">
  <img width="300" src="https://i.imgur.com/Oauef6t.png">
</p>

## Features

- **Automated Conversations:** Configure automated conversation flows to handle customer queries efficiently.
- **FAQ Responses:** Set up responses for frequently asked questions, providing quick and accurate information to customers.
- **Agent Management:** Manage a team of agents who can connect with customers via WhatsApp.
- **Trigger-based Expansion:** Easily expand the functionality using triggers, allowing for limitless possibilities.

## Requirements

Before running the WhatsApp Agent Management application and testing it, you will need the following:

1. **WhatsApp Bot Number:** This is the phone number that will act as the bot and connect to the application. You will need to scan the QR code displayed in the application using this number.

2. **Agent Number:** A separate phone number that will act as an agent. This number should be set as the `PHONE_AGENT` variable in the `.env` file. The agent will receive messages from users.

3. **User Number:** Another phone number that will act as a user requesting assistance from an agent. You will use this number to test the bot's functionality.

   <img width="450" src="https://i.imgur.com/QJ7BGYH.png">

**Note:** The bot and user numbers must be different for testing purposes. You will need three distinct phone numbers to perform the demonstration.

## Getting Started

## How to Start / Setup

Before running the WhatsApp Agent Management application, make sure to set up your environment by following these steps:

1. Rename the`.env.template` to `.env`.

2. Open the `.env` file and provide the necessary values:

   - `PORT`: You can specify the port for the application to run on. If no port is provided, the application will run on port 3000.

   - `PHONE_AGENT`: Enter the phone number of the agent who will respond to messages. Note that this is not the bot's phone number, and you will set it up later.

## Docker

<img width="350" src="https://upload.wikimedia.org/wikipedia/commons/7/79/Docker_%28container_engine%29_logo.png">

You can run the WhatsApp Agent Management application using Docker for a containerized development environment. Make sure you have Docker and Docker Compose installed on your system.

### Running with Docker Compose

To start the application using Docker Compose, follow these steps:

1. Ensure you're in the same directory as the `docker-compose.yml` file.

2. Open a terminal and run the following command to start the application:

   ```bash
   docker-compose up -d
   ```

---

## Nodejs

<img width="250" src="
https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png">

For running the WhatsApp Agent Management application locally, follow these steps:

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

---

## Scanning the QR Code

Once you have the WhatsApp Agent Management application running, you can follow these steps to configure and connect your bot:

1. Open your web browser and navigate to the application by entering the following address:

`http://localhost:PORT`

- `NOTE` : If you didn't specify a port in your `.env` file, the application will be available at:

`http://localhost:3000`

2. You will see a page with a QR code displayed. This code is used to connect your bot.

   <img width="350" src="https://i.imgur.com/kN7aIrR.png">

3. Open WhatsApp on your mobile device and tap on the three dots in the upper-right corner to open the menu. Select "WhatsApp Web."

4. Scan the QR code displayed on the application's page using your WhatsApp on your mobile device.

5. Once the QR code is scanned successfully, and everything is set up correctly, you should see a message in the console where the application is running: "Proveedor conectado y listo."

   <img width="250" src="https://i.imgur.com/tsZLsF1.png">

## User and Agent Interaction

To initiate an interaction with the WhatsApp Agent Management bot, start by sending any message to the bot's phone number. The bot will respond with a menu, prompting you to type either "Agente" or "Admin."

- If you are an **Agent**, you should reply with "Admin." This will allow you to access the admin flow, where you can manage user interactions and send messages to waiting users.

- If you are a **User**, you should reply with "Agente." This will trigger the agent flow, where you can request assistance from available agents.

It's crucial to note that the bot enforces specific rules to maintain the integrity of the system:

- If an **Agent** tries to request another agent by typing "Agente," they will be automatically removed from the flow. Agents are not allowed to request other agents.

- If a **User** attempts to access the admin flow by typing "Admin," they will also be expelled from the flow. Only agents have access to the admin functionalities.

## Testing the Bot

To test the bot, you can use a different phone number from the one you used for the agent. You can now send messages from this phone number to interact with the bot and test its capabilities.

## Documentation

For detailed documentation, you can refer to the [official documentation](https://bot-whatsapp.netlify.app/).

## Resources

- [GitHub Repository](https://github.com/your/repository)
- [Roadmap](https://github.com/orgs/codigoencasa/projects/1)
- [Discord Community](https://link.codigoencasa.com/DISCORD)
- [Twitter](https://twitter.com/leifermendez)
- [YouTube Channel](https://www.youtube.com/watch?v=5lEMCeWEJ8o&list=PL_WGMLcL4jzWPhdhcUyhbFU6bC0oJd2BR)

## Authors

- [Enrique](https://github.com/enrique-holguin)
