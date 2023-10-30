import { Hono } from "hono";

const viewRoute = new Hono();
viewRoute.get("/", (c) => {
  return c.html(<>view</>);
});

export default viewRoute;
