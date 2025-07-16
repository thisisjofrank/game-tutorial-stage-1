# Stage 1: Setting Up Your Deno Environment

Welcome to the first stage of building your dinosaur game! In this stage, you'll set up Deno and create your first web server.

## 🎯 Learning Objectives

By the end of this stage, you'll understand:
- How to install and configure Deno
- Deno's permission system and why it matters
- How to create a basic web server
- The structure of a Deno project

## 📋 Prerequisites

- A computer with internet access
- Basic knowledge of JavaScript/TypeScript
- A code editor (VS Code recommended)

## 🚀 Step 1: Install Deno

First, let's install Deno. Choose your operating system:

### Windows (PowerShell)
```powershell
irm https://deno.land/install.ps1 | iex
```

### macOS/Linux
```bash
curl -fsSL https://deno.land/install.sh | sh
```

### Using Package Managers
```bash
# macOS with Homebrew
brew install deno

# Windows with Chocolatey
choco install deno

# Windows with Scoop
scoop install deno
```

Verify the installation:
```bash
deno --version
```

## 🚀 Step 2: Create Your Project Structure

Create a new directory for your game:

```bash
mkdir dinosaur-game
cd dinosaur-game
```

Create the following files:

### `deno.json`
```json
{
  "tasks": {
    "dev": "deno run --allow-net --allow-read --watch main.ts",
    "start": "deno run --allow-net --allow-read main.ts"
  },
  "imports": {
    "@std/http": "jsr:@std/http@1"
  }
}
```

### `main.ts`
```typescript
import { serve } from "@std/http/server";

const handler = (_req: Request): Response => {
  return new Response("🦕 Hello from Deno! Your dinosaur game server is running!");
};

console.log("🚀 Server starting on http://localhost:8000");
serve(handler, { port: 8000 });
```

## 🚀 Step 3: Understanding Deno Permissions

Deno is secure by default. Notice the permission flags in our `deno.json`:

- `--allow-net`: Allows network access (needed for our web server)
- `--allow-read`: Allows reading files (we'll need this for serving static files)
- `--watch`: Automatically restarts the server when files change

## 🚀 Step 4: Run Your First Server

Start your server:

```bash
deno task dev
```

Open your browser and go to `http://localhost:8000`. You should see your welcome message!

## 🚀 Step 5: Add Static File Serving

Let's upgrade our server to serve static files. Update `main.ts`:

```typescript
import { serve } from "@std/http/server";
import { serveDir } from "@std/http/file-server";

const handler = (req: Request): Response => {
  const url = new URL(req.url);
  
  // Health check endpoint
  if (url.pathname === "/health") {
    return new Response("🦕 Server is healthy!");
  }
  
  // Serve static files from the 'static' directory
  return serveDir(req, {
    fsRoot: "static",
    urlRoot: "",
  });
};

console.log("🚀 Server starting on http://localhost:8000");
console.log("📁 Serving static files from ./static/");
serve(handler, { port: 8000 });
```

Update `deno.json` to include the file server:

```json
{
  "tasks": {
    "dev": "deno run --allow-net --allow-read --watch main.ts",
    "start": "deno run --allow-net --allow-read main.ts"
  },
  "imports": {
    "@std/http": "jsr:@std/http@1"
  }
}
```

## 🚀 Step 6: Create Your First HTML Page

Create a `static` directory and add `index.html`:

```bash
mkdir static
```

### `static/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🦕 Dinosaur Game - Stage 1</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f0f0f0;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2d5a27;
            text-align: center;
        }
        .status {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #2d5a27;
        }
        .next-stage {
            background: #2d5a27;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 20px 0;
        }
        .next-stage:hover {
            background: #1a3317;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🦕 Dinosaur Game - Stage 1 Complete!</h1>
        
        <div class="status">
            <h3>✅ What you've accomplished:</h3>
            <ul>
                <li>Installed Deno successfully</li>
                <li>Created your first Deno web server</li>
                <li>Learned about Deno's permission system</li>
                <li>Set up static file serving</li>
                <li>Created a basic HTML page</li>
            </ul>
        </div>

        <div class="status">
            <h3>🧠 Key concepts learned:</h3>
            <ul>
                <li><strong>Deno Permissions:</strong> Secure by default with explicit permissions</li>
                <li><strong>JSR Imports:</strong> Modern module system with jsr: protocol</li>
                <li><strong>Task Runner:</strong> deno.json for project configuration</li>
                <li><strong>Static Serving:</strong> Serving files with @std/http/file-server</li>
            </ul>
        </div>

        <h3>🚀 Next Steps</h3>
        <p>In Stage 2, you'll learn how to create an HTML5 Canvas and start building the game foundation!</p>
        
        <button class="next-stage" onclick="window.location.href='stage2'">
            Continue to Stage 2: Canvas Foundation →
        </button>
    </div>

    <script>
        // Add some interactive feedback
        document.querySelector('.next-stage').addEventListener('click', function() {
            this.textContent = 'Loading Stage 2...';
            this.disabled = true;
        });
    </script>
</body>
</html>
```

## 🚀 Step 7: Test Your Setup

Restart your server and visit `http://localhost:8000`. You should see your Stage 1 completion page!

## 🎯 What You've Learned

- **Deno Installation**: How to install and verify Deno
- **Permission System**: Understanding `--allow-net` and `--allow-read`
- **Project Structure**: Creating `deno.json` for configuration
- **Static File Serving**: Using `@std/http/file-server`
- **JSR Imports**: Modern module system with `jsr:` protocol

## 🚀 Deploy to Deno Deploy

Ready to deploy your first stage? Create a `deploy.json`:

```json
{
  "name": "dinosaur-game-stage1",
  "entry": "main.ts",
  "env": {
    "DENO_STAGE": "1"
  }
}
```

## 🎉 Challenge Extensions

Try these optional challenges:

1. **Add Environment Variables**: Use `Deno.env.get()` to customize the port
2. **Add Logging**: Log requests with timestamps
3. **Health Check**: Create a `/health` endpoint that returns server status
4. **Custom 404**: Create a custom 404 page for missing files

## 🔗 Resources

- [Deno Manual](https://deno.land/manual)
- [Deno Standard Library](https://deno.land/std)
- [JSR Registry](https://jsr.io/)
- [Deno Deploy Documentation](https://deno.com/deploy/docs)

## 🐛 Troubleshooting

**Server won't start?**
- Check if port 8000 is available
- Verify Deno is installed correctly
- Ensure you have the correct permissions

**Static files not serving?**
- Make sure the `static` directory exists
- Check file permissions
- Verify the file path is correct

---

**Ready for Stage 2?** You'll learn how to create an HTML5 Canvas and start building the game foundation!
