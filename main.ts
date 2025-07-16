import { serveDir } from "@std/http/file-server";
import { join } from "@std/path";

const kv = await Deno.openKv();

// Serve static files and handle API endpoints
Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  // Handle high score API endpoints
  if (url.pathname === "/api/highscore") {
    if (req.method === "GET") {
      const result = await kv.get(["highScore"]);
      return new Response(JSON.stringify({ highScore: result.value || 0 }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (req.method === "POST") {
      const body = await req.json();
      const currentHighScore = await kv.get(["highScore"]);
      const newScore = body.score;

      if (newScore > (currentHighScore.value || 0)) {
        await kv.set(["highScore"], newScore);
        return new Response(JSON.stringify({ success: true, newHighScore: newScore }), {
          headers: { "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({ success: false, currentHighScore: currentHighScore.value }), {
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // Handle leaderboard (top 10 scores)
  if (url.pathname === "/api/leaderboard") {
    if (req.method === "GET") {
      const scores: { score: number; playerName: string; timestamp: number }[] = [];
      for await (const entry of kv.list({ prefix: ["scores"] })) {
        scores.push(entry.value as { score: number; playerName: string; timestamp: number });
      }
      scores.sort((a, b) => b.score - a.score);
      return new Response(JSON.stringify(scores.slice(0, 10)), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (req.method === "POST") {
      const body = await req.json();
      const timestamp = Date.now();
      await kv.set(["scores", timestamp], {
        score: body.score,
        playerName: body.playerName || "Anonymous",
        timestamp
      });
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // Serve static files
  const staticRoot = join(Deno.cwd(), "static");
  return serveDir(req, {
    fsRoot: staticRoot,
    urlRoot: "",
    enableCors: true
  });
});

console.log("🦕 Dinosaur Game server running on http://localhost:8000");
console.log("🎮 Open your browser and start playing!");
console.log("⚙️  Customize your game settings in the web interface");
console.log("🏆 High scores are stored using Deno KV");
