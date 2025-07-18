import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";

const router = new Router();

router.get("/health", (ctx) => {
  ctx.response.body = { status: "ok", message: "🦕 Stage 1 - Dino server is healthy!" };
});

const app = new Application();

// Serve static files first (including index.html)
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/static`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

// Then handle API routes
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });

console.log("🦕 Stage 1: Basic Deno + Oak server setup complete!");
console.log("🌐 Server is running on http://localhost:8000");
console.log("🎯 Visit http://localhost:8000 to see the game");
console.log("❤️ Health check available at http://localhost:8000/health");
