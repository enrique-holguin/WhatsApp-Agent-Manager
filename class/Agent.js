class Agent {
  static #agents = [];
  constructor({ name, phone }) {
    this.name = name;
    this.phone = phone;
    this.active = true;
    this.queue = [];
    this.id = `${this.phone}@s.whatsapp.net`;

    Agent.#agents.push(this);
  }

  static #setStateUser({ globalState, phone, pushName, agent }) {
    //Asignando estado ocupado al usuario
    if (!globalState || typeof globalState.update !== "function") {
      throw new Error(
        "GlobalState con el método 'update' es obligatorio y debe ser una función."
      );
    }
    globalState?.update({
      [phone]: {
        name: pushName,
        phone,
        agent,
        id: `${phone}@s.whatsapp.net`,
      },
    });
  }
  static isAdmin(phone) {
    return this.#agents.find((agent) => agent.phone === phone);
  }

  static getAgents() {
    return Agent.#agents;
  }

  static isUserActive(phoneAgent, phoneUser) {
    const agent = this.#agents.find((agent) => agent.phone === phoneAgent);
    console.log("Este es el agente", agent);
    return agent.queue[0]?.phone === phoneUser;
  }

  static findAgent(phone, pushName, globalState) {
    // Filtrar agentes activos
    let activeAgents = Agent.#agents.filter((agent) => agent.active);

    // Si no hay agentes activos, retornar null
    if (activeAgents.length === 0) return null;

    // Encontrar el agente con la menor cantidad de elementos en la cola
    let agent = activeAgents.sort(
      (agentA, agentB) => agentA.queue.length - agentB.queue.length
    )[0];

    // Asignar la cola al agente elegido
    agent.queue.push({ phone, name: pushName, id: `${phone}@s.whatsapp.net` });

    Agent.#setStateUser({ globalState, agent, phone, pushName });

    return agent;
  }
}

module.exports = Agent;
