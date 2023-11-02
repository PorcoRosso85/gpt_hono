import { Hono } from "hono";

import appOpenApi from "../packages/openapi-route/src/routes/openAPIRoutes";
import renderRoute from "../packages/render-route/src/routes/renderRoutes";
import aboutRoutes from "../packages/about-route/src/routes/aboutRoutes";

const app = new Hono();
app.route("/", appOpenApi);
app.route("/render", renderRoute);
app.route("/about", aboutRoutes);

export default app;
