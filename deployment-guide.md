# 🚀 Deployment Guide for Each Stage

This guide shows you how to deploy each stage of your dinosaur game to Deno Deploy, so you can see your progress online and share it with others.

## 📋 Prerequisites

- A GitHub account
- Basic Git knowledge
- Your game code committed to a repository

## 🌟 Quick Deploy Overview

Each stage can be deployed to Deno Deploy with a simple configuration. Here's what you need to know:

### Stage Structure
```
your-repo/
├── stages/
│   ├── stage1/
│   │   ├── main.ts
│   │   ├── static/
│   │   └── deno.json
│   ├── stage2/
│   │   ├── main.ts
│   │   ├── static/
│   │   └── deno.json
│   └── stage3/
│       ├── main.ts
│       ├── static/
│       └── deno.json
```

## 🚀 Stage 1: Basic Server Deployment

### Deploy Configuration
Create `stages/stage1/deno.json`:
```json
{
  "name": "dinosaur-game-stage1",
  "tasks": {
    "start": "deno run --allow-net --allow-read main.ts"
  },
  "imports": {
    "@std/http": "jsr:@std/http@1"
  }
}
```

### Main Server File
`stages/stage1/main.ts`:
```typescript
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
```

### Deploy Commands
```bash
# Deploy to Deno Deploy
deno deploy --project=dinosaur-stage1 stages/stage1/main.ts

# Or use GitHub integration
git add stages/stage1/
git commit -m "Add Stage 1: Basic server setup"
git push origin main
```

**Live URL**: `https://dinosaur-stage1.deno.dev`

---

## 🎨 Stage 2: Canvas Foundation Deployment

### Deploy Configuration
`stages/stage2/deno.json`:
```json
{
  "name": "dinosaur-game-stage2",
  "tasks": {
    "start": "deno run --allow-net --allow-read main.ts"
  },
  "imports": {
    "@std/http": "jsr:@std/http@1"
  }
}
```

### Enhanced Server
`stages/stage2/main.ts`:
```typescript
import { serve } from "@std/http/server";
import { serveDir } from "@std/http/file-server";

const handler = (req: Request): Response => {
  const url = new URL(req.url);
  
  if (url.pathname === "/health") {
    return new Response("🦕 Stage 2 - Canvas Foundation");
  }
  
  if (url.pathname === "/api/canvas-info") {
    return new Response(JSON.stringify({
      stage: 2,
      features: ["html5-canvas", "animation-loop", "shape-drawing"],
      timestamp: new Date().toISOString(),
      canvasSize: { width: 800, height: 400 }
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
  
  return serveDir(req, {
    fsRoot: "static",
    urlRoot: "",
  });
};

const port = parseInt(Deno.env.get("PORT") || "8000");
console.log(`🚀 Stage 2 - Canvas Foundation on port ${port}`);
serve(handler, { port });
```

### Deploy Commands
```bash
deno deploy --project=dinosaur-stage2 stages/stage2/main.ts
```

**Live URL**: `https://dinosaur-stage2.deno.dev`

---

## 🦕 Stage 3: Character Deployment

### Deploy Configuration
`stages/stage3/deno.json`:
```json
{
  "name": "dinosaur-game-stage3",
  "tasks": {
    "start": "deno run --allow-net --allow-read main.ts"
  },
  "imports": {
    "@std/http": "jsr:@std/http@1"
  }
}
```

### Character Server
`stages/stage3/main.ts`:
```typescript
import { serve } from "@std/http/server";
import { serveDir } from "@std/http/file-server";

const handler = (req: Request): Response => {
  const url = new URL(req.url);
  
  if (url.pathname === "/health") {
    return new Response("🦕 Stage 3 - Character System");
  }
  
  if (url.pathname === "/api/character-info") {
    return new Response(JSON.stringify({
      stage: 3,
      features: [
        "dinosaur-character",
        "animation-states",
        "physics-simulation",
        "input-handling",
        "health-system"
      ],
      controls: {
        jump: "SPACE or Click",
        run: "Arrow Right",
        reset: "R key"
      },
      timestamp: new Date().toISOString()
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
  
  // Debug endpoint for character state
  if (url.pathname === "/api/debug") {
    return new Response(JSON.stringify({
      message: "Use browser console with debugPlayer() for character debug info",
      commands: [
        "debugPlayer()",
        "healPlayer(amount)",
        "damagePlayer(amount)",
        "game.player.addScore(points)"
      ]
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
  
  return serveDir(req, {
    fsRoot: "static",
    urlRoot: "",
  });
};

const port = parseInt(Deno.env.get("PORT") || "8000");
console.log(`🚀 Stage 3 - Character System on port ${port}`);
serve(handler, { port });
```

### Deploy Commands
```bash
deno deploy --project=dinosaur-stage3 stages/stage3/main.ts
```

**Live URL**: `https://dinosaur-stage3.deno.dev`

---

## 🔧 Advanced Deployment Features

### Environment Variables
Add environment-specific configurations:

```typescript
// In your main.ts files
const isDevelopment = Deno.env.get("DENO_ENV") === "development";
const port = parseInt(Deno.env.get("PORT") || "8000");
const stage = Deno.env.get("GAME_STAGE") || "1";

if (isDevelopment) {
  console.log("🔧 Development mode enabled");
}
```

### CORS Configuration
For API endpoints:

```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

// Add to your API responses
return new Response(JSON.stringify(data), {
  headers: { 
    "Content-Type": "application/json",
    ...corsHeaders
  }
});
```

### Health Check Endpoints
For monitoring:

```typescript
if (url.pathname === "/health") {
  return new Response(JSON.stringify({
    status: "healthy",
    stage: stageNumber,
    timestamp: new Date().toISOString(),
    uptime: Date.now() - startTime,
    memory: Deno.memoryUsage()
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
```

## 📊 Deployment Workflow

### 1. Local Development
```bash
# Test locally first
deno task dev

# Check for errors
deno check main.ts

# Run tests
deno test
```

### 2. Git Workflow
```bash
# Commit your stage
git add stages/stage-X/
git commit -m "Add Stage X: [Feature description]"
git push origin main
```

### 3. Deploy to Deno Deploy
```bash
# Manual deploy
deno deploy --project=dinosaur-stage-X stages/stage-X/main.ts

# Or set up GitHub integration for automatic deploys
```

### 4. Verification
```bash
# Test health endpoint
curl https://dinosaur-stage-X.deno.dev/health

# Test API endpoints
curl https://dinosaur-stage-X.deno.dev/api/game-info
```

## 🌐 Domain Configuration

### Custom Domains
1. Go to your Deno Deploy dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Configure DNS records

### SSL Certificates
Deno Deploy automatically provides SSL certificates for all deployments.

## 📈 Monitoring and Analytics

### Performance Monitoring
```typescript
// Add to your main.ts
const requestCount = new Map<string, number>();

const handler = (req: Request): Response => {
  const url = new URL(req.url);
  const path = url.pathname;
  
  // Track requests
  requestCount.set(path, (requestCount.get(path) || 0) + 1);
  
  // Log performance
  console.log(`${new Date().toISOString()} - ${req.method} ${path}`);
  
  // Your existing handler logic...
};
```

### Analytics Endpoint
```typescript
if (url.pathname === "/api/analytics") {
  return new Response(JSON.stringify({
    requests: Object.fromEntries(requestCount),
    timestamp: new Date().toISOString()
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
```

## 🚀 Production Optimizations

### Caching Headers
```typescript
// For static assets
if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
  return serveDir(req, {
    fsRoot: "static",
    urlRoot: "",
    headers: {
      "Cache-Control": "public, max-age=31536000" // 1 year
    }
  });
}
```

### Compression
```typescript
// Enable compression for text responses
const response = new Response(JSON.stringify(data), {
  headers: { 
    "Content-Type": "application/json",
    "Content-Encoding": "gzip"
  }
});
```

## 🎯 Deployment Checklist

For each stage deployment:

- [ ] Code compiles without errors
- [ ] All imports are correct
- [ ] Environment variables are set
- [ ] Health check endpoint works
- [ ] Static files are served correctly
- [ ] CORS is configured if needed
- [ ] Performance is acceptable
- [ ] Error handling is in place
- [ ] Monitoring is configured
- [ ] Documentation is updated

## 🔗 Useful Resources

- [Deno Deploy Documentation](https://deno.com/deploy/docs)
- [Deno Deploy GitHub Integration](https://deno.com/deploy/docs/github-integration)
- [Custom Domains Setup](https://deno.com/deploy/docs/custom-domains)
- [Environment Variables](https://deno.com/deploy/docs/environment-variables)

---

**Next Steps**: Continue with Stage 4 to add physics and collision detection, then deploy it using the same pattern!
