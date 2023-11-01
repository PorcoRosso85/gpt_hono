import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

import { Profile } from "../components/Profile";
import Meta from "../components/Meta";

const aboutRoutes = new Hono();
aboutRoutes
  .get("/", (c) => {
    return c.html(
      <Meta>
        <button hx-get="/about/profile" hx-swap="outerHTML">
          about
        </button>
      </Meta>
    );
  })
  .get("/profile", (c) => {
    return c.html(<Profile />);
  });

export default aboutRoutes;
