import { Hono } from "hono";
import { _TODOS } from "../commons/_TODO";

const viewRoute = new Hono();
viewRoute.get("/", (c) => {
  console.log("view: ", _TODOS);
  const object = {
    user: ["<h1>hello</h1>", "<h1>hello</h1>"],
  };
  // return c.html(<>{_TODOS}</>);
  return c.html(
    <html>
      <head></head>
      <body>
        <div>
          <hr />
          {_TODOS.user.map((item, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: item }}></div>
          ))}
          <hr />
          {object.user.map((item, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: item }}></div>
          ))}
        </div>
      </body>
    </html>
  );
});

export default viewRoute;
