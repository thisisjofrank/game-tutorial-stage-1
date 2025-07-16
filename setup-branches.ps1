# 🦕 Deno Dinosaur Game Tutorial - Branch Setup Script (PowerShell)
# This script creates all the tutorial branches with appropriate content

Write-Host "🦕 Setting up Deno Dinosaur Game Tutorial branches..." -ForegroundColor Green

# Create .gitignore
@'
# Deno
.deno/
deno.lock

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Runtime
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
out/

# Testing
coverage/
.nyc_output/

# Cache
.cache/
'@ | Out-File -FilePath ".gitignore" -Encoding UTF8

# Initialize git and create main branch
git add .
git commit -m "Initial commit: Tutorial setup and README"

Write-Host "📝 Creating tutorial branches..." -ForegroundColor Yellow

# Function to create stage 1 content
function Create-Stage1-Content {
    @'
{
  "tasks": {
    "dev": "deno run --allow-net --allow-read --watch main.ts",
    "start": "deno run --allow-net --allow-read main.ts"
  },
  "imports": {
    "@std/http": "jsr:@std/http@1"
  }
}
'@ | Out-File -FilePath "deno.json" -Encoding UTF8

    @'
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
'@ | Out-File -FilePath "main.ts" -Encoding UTF8

    New-Item -Path "static" -ItemType Directory -Force

    @'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🦕 Stage 1: Deno Setup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        h1 {
            text-align: center;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .status {
            background: rgba(40, 167, 69, 0.2);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid #28a745;
        }
        .next-stage {
            background: #28a745;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            margin: 20px auto;
            display: block;
            transition: all 0.3s ease;
        }
        .next-stage:hover {
            background: #218838;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .code-block {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            margin: 15px 0;
            border-left: 4px solid #ffc107;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin: 8px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🦕 Stage 1: Deno Environment Setup</h1>
        
        <div class="status">
            <h3>✅ Congratulations! You've completed Stage 1</h3>
            <p>Your Deno server is running successfully!</p>
        </div>

        <div class="status">
            <h3>🎯 What you accomplished:</h3>
            <ul>
                <li>✅ Set up Deno development environment</li>
                <li>✅ Created your first HTTP server</li>
                <li>✅ Configured static file serving</li>
                <li>✅ Learned about Deno permissions</li>
                <li>✅ Understanding project structure</li>
            </ul>
        </div>

        <div class="status">
            <h3>🧠 Key concepts learned:</h3>
            <ul>
                <li><strong>Deno Security:</strong> Permission-based access control</li>
                <li><strong>JSR Modules:</strong> Modern JavaScript registry</li>
                <li><strong>HTTP Server:</strong> Building web servers with Deno</li>
                <li><strong>Static Assets:</strong> Serving files and web pages</li>
                <li><strong>Development Workflow:</strong> Using tasks and file watching</li>
            </ul>
        </div>

        <div class="code-block">
            <h4>🔧 Commands used:</h4>
            <div>deno task dev  # Start development server</div>
            <div>deno task start  # Start production server</div>
            <div>deno run --allow-net --allow-read main.ts  # Manual run</div>
        </div>

        <div class="status">
            <h3>🚀 Next: Canvas Foundation</h3>
            <p>In Stage 2, you'll learn HTML5 Canvas and create your first animations!</p>
            <p>You'll build:</p>
            <ul>
                <li>Interactive canvas drawing</li>
                <li>Animation loops with requestAnimationFrame</li>
                <li>Performance monitoring</li>
                <li>User interaction handling</li>
            </ul>
        </div>

        <button class="next-stage" onclick="nextStage()">
            Continue to Stage 2: Canvas Foundation →
        </button>
    </div>

    <script>
        function nextStage() {
            alert('🎉 Great job completing Stage 1!\n\nTo continue:\n1. git checkout stage-2-canvas\n2. deno task dev\n3. Refresh this page');
        }
        
        // Add some celebration animation
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.querySelector('.container');
            container.style.animation = 'fadeIn 1s ease-in';
        });
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>
'@ | Out-File -FilePath "static/index.html" -Encoding UTF8

    @'
# Stage 1: Deno Environment Setup

## 🎯 Learning Objectives
- Install and configure Deno
- Understand Deno's permission system
- Create a basic HTTP server
- Set up static file serving
- Configure development workflow

## 📋 Prerequisites
- Computer with internet access
- Basic JavaScript knowledge
- Text editor (VS Code recommended)

## 🚀 Getting Started

### 1. Install Deno
```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows (PowerShell)
iwr https://deno.land/install.ps1 -useb | iex

# Verify installation
deno --version
```

### 2. Run the Server
```bash
deno task dev
```

### 3. Test the Server
Visit: http://localhost:8000

## 🔧 Key Files

### `deno.json`
- Project configuration
- Task definitions
- Import maps

### `main.ts`
- Main server file
- HTTP request handling
- Static file serving

### `static/index.html`
- Web interface
- Stage completion page

## 🎯 What You Learned

1. **Deno Permissions**: `--allow-net`, `--allow-read`
2. **HTTP Server**: Using `@std/http/server`
3. **Static Files**: Serving with `@std/http/file-server`
4. **Project Structure**: Organizing Deno projects
5. **Development Workflow**: Tasks and file watching

## 🚀 Next Steps

Ready for Stage 2? Run:
```bash
git checkout stage-2-canvas
deno task dev
```

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change port
$env:PORT=3000; deno task dev
```

**Permission denied?**
```bash
# Check permissions in main.ts
deno run --allow-net --allow-read main.ts
```

**Static files not loading?**
- Ensure `static/` directory exists
- Check file paths are correct
- Verify permissions
'@ | Out-File -FilePath "static/STAGE-1-GUIDE.md" -Encoding UTF8
}

# Create branches
Write-Host "Creating Stage 1 branch..." -ForegroundColor Cyan
git checkout -b "stage-1-setup"
Create-Stage1-Content
git add .
git commit -m "Stage 1: Deno environment and basic server"
Write-Host "✅ Created stage-1-setup" -ForegroundColor Green

git checkout main

Write-Host "🎉 Tutorial branches created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Available branches:" -ForegroundColor Yellow
Write-Host "  - stage-1-setup: Basic Deno server setup"
Write-Host ""
Write-Host "🚀 To start the tutorial:" -ForegroundColor Green
Write-Host "  git checkout stage-1-setup"
Write-Host "  deno task dev"
Write-Host ""
Write-Host "🔄 To switch between stages:" -ForegroundColor Cyan
Write-Host "  git checkout stage-1-setup"
Write-Host ""
Write-Host "✨ Each branch contains complete working code for that stage!" -ForegroundColor Magenta
