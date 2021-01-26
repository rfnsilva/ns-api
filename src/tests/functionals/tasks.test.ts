import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import { getRepository, getConnection, createConnection } from "typeorm";
import supertest from "supertest";
import * as bodyParser from "body-parser";
import { expect } from "chai";

import routes from "../../routes";
import { Task } from "../../entities/Task";

const app = express();
app.use(bodyParser.json());
app.use(routes);
dotenv.config();

describe("Tasks", () => {
  beforeAll(async () => {
    return await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      synchronize: true,
      logging: false,
      entities: ["src/entities/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber",
      },
    });
  });

  beforeEach(async () => {
    await getRepository(Task).query(`
      DELETE FROM public.task
    `);
  });

  afterAll(async () => {
    await getRepository(Task).query(`
      DROP TABLE public.task
    `);

    const conn = getConnection();
    conn.close();
  });

  test("create task", async () => {
    const task = {
      description: "create task create task create task create task",
    };

    const response = await supertest(app).post(`/createTask`).send(task);

    expect(response.status).to.equal(201);
  });

  test("get User", async () => {
    const task = {
      description: "get User get User get User get User get User get User",
    };

    const response = await supertest(app).post(`/createTask`).send(task);

    const taskResponse = await supertest(app).get(
      `/getTask/${response.body.id}`
    );

    expect(taskResponse.status).to.equal(200);
    // expect(response.status).exist();
  });

  test("get all tasks", async () => {
    const task = {
      description:
        "get all tasks get all tasks get all tasks get all tasks get all tasks",
    };

    await supertest(app).post(`/createTask`).send(task);

    const tasksResponse = await supertest(app).get(`/getTasks`);

    expect(tasksResponse.status).to.equal(200);
  });

  test("update task by id", async () => {
    const task = {
      description:
        "update task by id update task by id update task by id update task by id",
    };

    const response = await supertest(app).post(`/createTask`).send(task);

    const taskUpdate = {
      description: "update update update update update update update update",
    };

    const taskResponse = await supertest(app)
      .put(`/updateTask/${response.body.id}`)
      .send(taskUpdate);

    expect(taskResponse.status).to.equal(200);
  });

  test("delete task by id", async () => {
    const task = {
      description:
        "delete task by id delete task by id delete task by id delete task by id",
    };

    const response = await supertest(app).post(`/createTask`).send(task);

    const taskResponse = await supertest(app).delete(
      `/deleteTask/${response.body.id}`
    );

    expect(taskResponse.status).to.equal(200);
  });
});
