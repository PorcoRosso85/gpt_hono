import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { aiPluginJson } from "../../../../src/ai-plugin";
import { z, createRoute } from "@hono/zod-openapi";

import { _TODOS } from "../../../../src/components/_TODO";

const UsernameParamsSchema = z.object({
  username: z.string().openapi({
    description: "The name of user.",
  }),
});

const routeGetTodos = createRoute({
  method: "get",
  path: "/todos/{username}",
  operationId: "getTodos",
  summary: "Get the list of todos",
  request: {
    params: UsernameParamsSchema,
  },
  responses: {
    "200": {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            todos: z.array(z.string()).openapi({
              description: "The list of todos.",
            }),
          }),
        },
      },
    },
  },
});

const routeAddTodo = createRoute({
  method: "post",
  path: "/todos/{username}",
  operationId: "addTodo",
  summary: "Add a todo to the list",
  request: {
    params: UsernameParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: z.object({
            todo: z.string().openapi({
              description: "The todo to add the list.",
            }),
          }),
        },
      },
    },
  },
  responses: {
    "200": {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
  },
});

const routeDeleteTodo = createRoute({
  method: "delete",
  path: "/todos/{username}",
  operationId: "deleteTodo",
  summary: "Delete a todo from the list",
  request: {
    params: UsernameParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: z.object({
            todo_idx: z.number().openapi({
              description: "The index of the todo to delete.",
            }),
          }),
        },
      },
    },
  },
  responses: {
    "200": {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
  },
});

export { routeGetTodos, routeAddTodo, routeDeleteTodo };

const appOpenApi = new OpenAPIHono();
appOpenApi.use("*", cors()).get("/.well-known/ai-plugin.json", (c) => {
  return c.json(aiPluginJson);
});

appOpenApi
  .openapi(routeAddTodo, (c) => {
    const { username } = c.req.valid("param");
    const { todo } = c.req.valid("json");
    if (!_TODOS[username]) {
      _TODOS[username] = [];
    }
    _TODOS[username].push(todo);
    const message = `Added ${todo} as ${username}`;
    console.log(message);
    console.log(_TODOS);
    return c.jsonT({
      ok: true,
      message,
    });
  })
  .openapi(routeGetTodos, (c) => {
    const { username } = c.req.valid("param");
    console.log(_TODOS);
    return c.jsonT({
      todos: _TODOS[username],
    });
  })
  .openapi(routeDeleteTodo, (c) => {
    const { username } = c.req.valid("param");
    const { todo_idx } = c.req.valid("json");
    let message = "Noop";
    if (
      0 <= todo_idx &&
      _TODOS[username] &&
      todo_idx < _TODOS[username].length
    ) {
      const deletedTodo = _TODOS[username].slice(todo_idx + 1, 1);
      message = `Deleted "${deletedTodo}" as ${username}`;
    }
    console.log(message);
    return c.jsonT({
      ok: true,
      message,
    });
  });

appOpenApi.doc("/openapi.json", {
  openapi: "3.0.1",
  info: {
    title: "TODO Plugin",
    description:
      'A plugin that allows the user to create and manage a TODO list using ChatGPT. If you do not know the user\'s username, ask them first before making queries to the plugin. Otherwise, use the username "global".',
    version: "v1",
  },
  servers: [
    {
      url: "http://localhost:8787",
    },
  ],
});

export default appOpenApi;
