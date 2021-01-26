import { getRepository } from "typeorm";
import { Request, Response } from "express";

import { Task } from "../entities/Task";

// create task
export const createTask = async (req: Request, res: Response) => {
  const { description } = req.body;

  const task = await getRepository(Task).save({
    description,
  });

  return res.status(201).json(task);
};

// get task
export const getTask = async (req: Request, res: Response) => {
  const id = req.params.id;

  const task = await getRepository(Task).findOne(id);

  return res.status(200).json(task);
};

// get tasks
export const getTasks = async (req: Request, res: Response) => {
  const tasks = await getRepository(Task).find();

  return res.status(200).json(tasks);
};

// update task by id
export const updateTask = async (req: Request, res: Response) => {
  // const id = req.params.id;
  const { description } = req.body;
  const id = req.params.id;

  const results = await getRepository(Task).update(id, {
    description,
  });

  if (results.affected === 0) {
    return res.status(404).json({ message: "error update task" });
  }

  const task = await getRepository(Task).findOne(id);

  return res.status(200).json(task);
};

// delete task by id
export const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id;

  const results = await getRepository(Task).delete(id);

  if (results.affected === 0) {
    return res.status(404).json({ message: "error delete task" });
  }

  const tasks = await getRepository(Task).find();

  return res.status(200).json(tasks);
};
