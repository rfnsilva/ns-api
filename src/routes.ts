import cors from "cors";
import { Router, Request, Response } from "express";

import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./controllers/TasksController";

const routes = Router();

routes.use(cors());

routes.get("/", (request: Request, response: Response) => {
  response.json({ message: "PRONTO CARALHOOOOO !" });
});

routes.post("/createTask", createTask);
routes.get("/getTask/:id", getTask);
routes.get("/getTasks", getTasks);
routes.put("/updateTask/:id", updateTask);
routes.delete("/deleteTask/:id", deleteTask);

export default routes;
