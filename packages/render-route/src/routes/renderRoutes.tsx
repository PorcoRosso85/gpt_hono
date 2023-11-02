import { Hono } from "hono";
import { _TODOS } from "../../../../src/components/_TODO";
import { Render } from "../components/Render";
import { Sortable } from "../components/Sortable";
import { SaveItem } from "../components/SaveItem";
import Meta from "../../../../src/components/Meta";

const route = "/render";

const renderRoute = new Hono();
renderRoute
  .use("*", async (c, next) => {
    c.setRenderer((children) => {
      console.log("view: ", _TODOS);
      return c.html(
        <Meta>
          <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
          <div>{children}</div>
        </Meta>
      );
    });
    await next();
  })
  .get("/", (c) => {
    return c.render(
      <>
        {!_TODOS.user || _TODOS.user.length === 0 ? (
          <div class="container">
            {/* <div>code</div> */}
            <div>_TODOS is empty now</div>
          </div>
        ) : (
          <Sortable>
            <div class="new-item"></div>
            {_TODOS.user
              .slice()
              .reverse()
              .map((item, index) => (
                <SaveItem route={route}>
                  <Render item={item} index={index} />
                </SaveItem>
              ))}
          </Sortable>
        )}
      </>
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
          <SaveItem route={route}>
            <Render item={item} index={index} />
          </SaveItem>
        </Sortable>
      </>
    );
  });

export default renderRoute;
