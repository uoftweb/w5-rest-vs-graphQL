const express = require("express");
const utils = require("./utils");

const app = express();
app.use(express.json());

const PORT = 4004;

// CODE STARTS FROM HERE






// CODE ENDS HERE

app.listen({ port: PORT }, () =>
  console.log(`Now browse to http://localhost:${PORT}`)
);
