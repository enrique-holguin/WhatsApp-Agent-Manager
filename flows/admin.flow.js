const flowAdmin = addKeyword(flowAdminKeyword, { sensitive: true })
  .addAction(async (ctx, { flowDynamic, endFlow, globalState, provider }) => {
    const { key, from: phone } = ctx;
    let agent = Agent.isAdmin(phone);
    if (!agent) {
      return endFlow(`Área solo para agentes/admins, acceso denegado`);
    } else if (agent?.queue.length <= 0) {
      return endFlow(
        "No tiene a ningún usuario en espera \nOperación cancelada"
      );
    } else {
      await flowDynamic(
        `Conexión establecida con el usuario ${agent?.queue[0].name}`
      );
      return;
    }
  })
  .addAnswer(
    "Escriba su mensaje ...",
    { capture: true, delay: 600 },
    async (ctx, { fallBack, endFlow, globalState, provider }) => {
      try {
        const { body, from: phone } = ctx;
        let agent = Agent.isAdmin(phone);
        const userStates = globalState.getMyState();

        if (body.toLowerCase() === "inactivo") {
          agent.active = false;
          agent.queue.forEach(async (user) => {
            delete userStates[user.phone]; // Eliminar usuario del estado
            await provider.sendText(
              `${user.id}`,
              `Lamentablemente nuestros agentes están muy ocupados en este momento y se le expulsó de la cola`
            );
          });

          globalState.update(userStates); // Actualizar el estado sin usuarios expulsados
          return endFlow(
            "Se expulsaron a los clientes de la cola, fin de la operación"
          );
        }

        let user = agent?.queue[0];

        console.log("El usuario -->", user);
        if (body.toLowerCase() === "expulsar") {
          agent.queue.shift();
          delete userStates[user.phone]; // Eliminar usuario de la cola
          await provider.sendText(
            `${user?.id}`,
            `Su conversación con el agente concluyó`
          );
          globalState.update(userStates); // Actualizar el estado sin el usuario expulsado
          return endFlow("Se concluyó la conversación con el usuario");
        }

        await provider.sendText(
          `${user?.id}`,
          `Agente ${agent?.name} : \n\n${body}`
        );
        await fallBack("Escriba su mensaje");
        return;
      } catch (err) {
        console.log("ERROR", err);
        return endFlow("Ocurrió un error inesperado");
      }
    }
  );
