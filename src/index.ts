import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import { createConnection } from "typeorm";

import routes from "./routes";

const app = express();

app.use(bodyParser.json());

app.use(routes);

dotenv.config();

createConnection();

app.listen(process.env.PORT || 3333);
