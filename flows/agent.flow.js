"use strict";
const { addKeyword } = require("@bot-whatsapp/bot");

//Class Agent
const Agent = require("../class/Agent");

//Keyword
const { flowAgentKeyword } = require("../utils/keywords");

const flowAgent = addKeyword(flowAgentKeyword, { sensitive: true })
  .addAction(async (ctx, { endFlow }) => {
    try {
      const { from } = ctx;
      const agents = Agent.getAgents();
      const isAgent = agents.find((agent) => agent.phone === from);
      if (isAgent) {
        return endFlow(
          `Los agentes no pueden solicitar otro agente \nOperación cancelada`
        );
      }
    } catch (err) {
      console.log(err);
      return endFlow("Error inesperado, la operación fue cancelada");
    }
  })
  .addAnswer(
    "Por favor escriba su nombre",
    { capture: true, delay: 600 },
    async (ctx, { flowDynamic, endFlow, globalState, provider }) => {
      try {
        const { body: name, from: phone } = ctx;
        //Se busca primero agentes disponibles
        const agent = Agent.findAgent(phone, name, globalState);
        await flowDynamic("Buscando agentes ...");
        if (agent) {
          const data = agent.queue[0].phone === phone;
          const msg = data
            ? `Se está intentando contactar el usuario : \n📱 Phone: ${phone} \n🧍 Name: ${name}`
            : `El usuario ${phone} se añadió a la cola`;
          await provider.sendText(`${agent.id}`, msg);
          return endFlow(
            "Lo estaremos contactando con un agente por favor espere, esto puede demorar..."
          );
        }
        return endFlow(
          "Lamentablemente no hay agentes disponibles \nOperación cancelada."
        );
      } catch (err) {
        console.log(err);
        return endFlow("Error inesperado, la operación fue cancelada");
      }
    }
  );

module.exports = flowAgent;
