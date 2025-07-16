import { serve } from "@std/http/server";
import { serveDir } from "@std/http/file-server";

const handler = (req: Request): Response => {
  const url = new URL(req.url);
  
  if (url.pathname === "/health") {
    return new Response("🦕 Stage 1 - Server is healthy!");
  }
  
  return serveDir(req, {
    fsRoot: "static",
    urlRoot: "",
  });
};

const port = parseInt(Deno.env.get("PORT") || "8000");
console.log(`🚀 Stage 1 - Server starting on port ${port}`);
serve(handler, { port });
