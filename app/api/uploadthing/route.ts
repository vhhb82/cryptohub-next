import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// GET/POST /api/uploadthing
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

