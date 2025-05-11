const serverless = require("serverless-http");
const app = require("../dist/app"); // built app.js from TypeScript

module.exports.handler = serverless(app);
