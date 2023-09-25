const Agent = require("../class/Agent");

const agentPhone = process.env.PHONE_AGENT | null;

//Agents
const agent1 = new Agent({ name: "Admin", phone: agentPhone });
