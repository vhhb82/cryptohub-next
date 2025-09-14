import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// GET/POST /api/uploadthing
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

