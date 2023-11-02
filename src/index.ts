import { Hono } from "hono";

import appOpenApi from "./routes/openAPIRoutes";
import viewRoute from "./routes/viewRoutes";
import aboutRoutes from "./routes/aboutRoutes";

const app = new Hono();
app.route("/", appOpenApi);
app.route("/view", viewRoute);
app.route("/about", aboutRoutes);

export default app;
