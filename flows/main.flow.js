"use strict";

const { addKeyword } = require("@bot-whatsapp/bot");

//Class Agent
const Agent = require("../class/Agent");

//Valid Options
const validOptions = require("../utils/validOptions");

//Flows
const flowAdmin = require("./admin.flow");
const flowAgent = require("./agent.flow");

const flowMain = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { endFlow, provider, globalState }) => {
    try {
      const { from: phone, body } = ctx;
      console.log("Entrando al flujo principal");
      const userStates = globalState.getMyState();
      console.log("UserStates -->", userStates);
      const state = userStates[phone];
      if (state) {
        const phoneAgent = state?.agent?.phone;
        console.log("Numero de agente", phoneAgent);
        const idAgent = state?.agent?.id;
        console.log("Id del agente", idAgent);
        const isActive = Agent.isUserActive(phoneAgent, phone);
        console.log(isActive);
        if (isActive) {
          await provider.sendText(idAgent, `${state.name} : \n\n${body}`);
          await endFlow();
          return;
        }
        return endFlow(
          "Todavía se encuentra en la cola de espera, por favor espere un momento"
        );
      }
      return;
    } catch (err) {
      console.log(err);
      return endFlow("Ocurrió un error inesperado");
    }
  })
  .addAnswer(
    ["Escriba una de las siguientes opciones :", "Admin", "Agente"],
    {
      capture: true,
      delay: 600,
    },
    async (ctx, { fallBack, flowDynamic }) => {
      const { body } = ctx;
      return validOptions[body]
        ? await flowDynamic()
        : await fallBack("Por favor elija una opción válida");
    },
    [flowAgent, flowAdmin]
  );
