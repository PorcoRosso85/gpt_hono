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
              _TODOS.user.map((item, index) => (
                <>
                  {/* TODO: 降順 */}
                  {/* <div class="container">
                    <div>code</div> */}
                  <Sortable>
                    <SaveItem>
                      <Render item={item} index={index} />
                    </SaveItem>
                  </Sortable>
                  {/* </div> */}
                  <div class="new-item"></div>
                </>
              ))
            )}
          </div>
        </body>
      </html>
    );
  })
  .post(
    "/inputtest",
    zValidator(
      "form",
      z.object({
        title: z.string().min(1),
      })
    ),
    async (c) => {
      console.log("c.req.parseBody()", await c.req.parseBody());
      console.log("c.req.formData()", await c.req.formData());
      return c.text("");
    }
  )
  .post(
    "/input",
    // zValidator(
    //   "form",
    //   z.object({
    //     inputHtml: z.string().min(1),
    //   })
    // ),
    async (c) => {
      // const { username } = c.req.valid("param");
      // const { input } = c.req.valid("json");
      const username = "user";

      const input = await c.req.parseBody();
      const inputHtml = input["inputHtml"];
      console.log("inputHtml: ", inputHtml);

      if (typeof inputHtml === "string") {
        _TODOS[username].push(inputHtml);
      } else {
        console.error("inputHtml is not a string:", inputHtml);
      }

      const item = _TODOS[username][_TODOS[username].length - 1];
      const index = "newest";

      return c.html(
        <>
          <SaveItem>
            <Sortable>
              <Render item={item} index={index} />
            </Sortable>
          </SaveItem>
          <div class="new-item"></div>
        </>
      );
    }
  );

export default viewRoute;
