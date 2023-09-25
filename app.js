require("dotenv").config();

const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

//Port
const PORT = process.env.PORT;

//flows
const flowMain = require("./flows/main.flow");

//Agents
const agent1 = require("./data/agents");

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowMain]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb({ PORT });
};

main();
