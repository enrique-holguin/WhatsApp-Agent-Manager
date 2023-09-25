const Agent = require("../class/Agent");

//Agents
const agent1 = new Agent({ name: "Admin", phone: process.env.PHONE_AGENT });

module.exports = agent1;
