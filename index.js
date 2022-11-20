const express = require('express');

const app = express();
const db = require('./db.js');

require('dotenv').config();

// Rotas
const user = require('./routes/user');
const product = require('./routes/product');

app.use(express.json());

app.use("/user", user);
app.use("/product", product);

db.sync( () => {console.log("Banco de dados rodando!")} );
app.listen( process.env.APP_PORT, () => console.log("Aplicação rodando!") );

// console.log('Hi!')
