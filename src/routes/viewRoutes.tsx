import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { _TODOS } from "../commons/_TODO";
import { Render } from "../components/Render";
import { Sortable } from "../components/Sortable";
import { SaveItem } from "../components/SaveItem";

const viewRoute = new Hono();
viewRoute
  .get("/", (c) => {
    console.log("view: ", _TODOS);
    // const object = {
    //   user: ["<h1>hello</h1>", "<h1>hello</h1>"],
    // };
    // return c.html(<>{_TODOS}</>);
    const style = `
      .container { display: grid; grid-template-columns: 10% 90%; } 
    `;

    return c.html(
      <html>
        <head>
          <style>{style}</style>
          <script src="https://unpkg.com/htmx.org@1.9.6"></script>
        </head>
        <body>
          <div>
            {!_TODOS.user || _TODOS.user.length === 0 ? (
              <div class="container">
                <div>code</div>
                <div>_TODOS is empty now</div>
              </div>
            ) : (
              <>
                <Sortable>
                  <div class="new-item"></div>
                  {_TODOS.user
                    .slice()
                    .reverse()
                    .map((item, index) => (
                      <SaveItem>
                        <Render item={item} index={index} />
                      </SaveItem>
                    ))}
                </Sortable>
              </>
            )}
          </div>
        </body>
      </html>
    );
  })
  .post("/input", async (c) => {
    // const { username } = c.req.valid("param");
    // const { input } = c.req.valid("json");
    const username = "user";

    const input = await c.req.parseBody();
    const inputHtml = input["inputHtml"];
    console.log("inputHtml: ", inputHtml);

    if (typeof inputHtml === "string") {
      _TODOS[username].push(inputHtml);
      console.log("_TODOS.user ", _TODOS[username]);
    } else {
      console.error("inputHtml is not a string:", inputHtml);
    }

    const item = _TODOS[username][_TODOS[username].length - 1];
    const index = "newest";

    return c.html(
      <>
        <Sortable>
          <div class="new-item"></div>
          <SaveItem>
            <Render item={item} index={index} />
          </SaveItem>
        </Sortable>
      </>
    );
  });

export default viewRoute;
