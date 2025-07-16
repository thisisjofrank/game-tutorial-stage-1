# Stage 2: Canvas Foundation

Time to create the visual foundation of your dinosaur game! In this stage, you'll learn HTML5 Canvas basics and create your first animated game loop.

## 🎯 Learning Objectives

By the end of this stage, you'll understand:

- HTML5 Canvas element and 2D context
- Animation loops with requestAnimationFrame
- Canvas coordinate system and drawing
- Basic game loop architecture

## 🚀 Step 1: Update Your Server

First, let's enhance our server to better handle Canvas applications. Update `main.ts`:

```typescript
import { serve } from "@std/http/server";
import { serveDir } from "@std/http/file-server";

const handler = (req: Request): Response => {
  const url = new URL(req.url);
  
  // Health check endpoint
  if (url.pathname === "/health") {
    return new Response("🦕 Server is healthy!");
  }
  
  // API endpoint for game state (we'll use this later)
  if (url.pathname === "/api/game-state") {
    return new Response(JSON.stringify({
      stage: 2,
      features: ["canvas", "animation-loop", "basic-drawing"],
      timestamp: Date.now()
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
  
  // Serve static files from the 'static' directory
  return serveDir(req, {
    fsRoot: "static",
    urlRoot: "",
  });
};

console.log("🚀 Stage 2 - Canvas Foundation");
console.log("🎨 Server starting on http://localhost:8000");
console.log("📁 Serving static files from ./static/");
serve(handler, { port: 8000 });
```

## 🚀 Step 2: Create Canvas HTML Page

Replace `static/index.html` with our Canvas version:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🦕 Dinosaur Game - Stage 2: Canvas</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: #f0f0f0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        h1 {
            color: #2d5a27;
            margin-bottom: 20px;
        }
        
        #gameCanvas {
            border: 2px solid #2d5a27;
            background: #87CEEB;
            display: block;
            margin: 20px 0;
            cursor: pointer;
        }
        
        .controls {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin: 20px 0;
            text-align: center;
        }
        
        .info-panel {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            border-left: 4px solid #2d5a27;
        }
        
        .stats {
            font-family: monospace;
            background: #f8f8f8;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
        }
        
        button {
            background: #2d5a27;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 5px;
        }
        
        button:hover {
            background: #1a3317;
        }
        
        button:disabled {
            background: #cccccc;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <h1>🦕 Stage 2: Canvas Foundation</h1>
    
    <canvas id="gameCanvas" width="800" height="400"></canvas>
    
    <div class="controls">
        <h3>🎮 Canvas Controls</h3>
        <button onclick="startAnimation()">Start Animation</button>
        <button onclick="stopAnimation()">Stop Animation</button>
        <button onclick="clearCanvas()">Clear Canvas</button>
        <button onclick="drawShapes()">Draw Shapes</button>
    </div>
    
    <div class="info-panel">
        <h3>📊 Animation Stats</h3>
        <div class="stats" id="stats">
            FPS: <span id="fps">0</span> | 
            Frame: <span id="frame">0</span> | 
            Time: <span id="time">0</span>s
        </div>
    </div>
    
    <div class="info-panel">
        <h3>🎯 What you're learning:</h3>
        <ul>
            <li><strong>Canvas 2D Context:</strong> Drawing shapes and colors</li>
            <li><strong>Animation Loop:</strong> requestAnimationFrame for smooth animation</li>
            <li><strong>Coordinate System:</strong> Understanding x,y positioning</li>
            <li><strong>Performance:</strong> FPS monitoring and optimization</li>
        </ul>
    </div>

    <script type="module" src="game.js"></script>
</body>
</html>
```

## 🚀 Step 3: Create Game Engine

Create `static/game.js` with our canvas game engine:

```javascript
class CanvasGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isAnimating = false;
        this.animationId = null;
        
        // Animation tracking
        this.frameCount = 0;
        this.lastTime = 0;
        this.fps = 0;
        this.fpsUpdateInterval = 1000; // Update FPS every second
        this.lastFpsUpdate = 0;
        
        // Game objects for demonstration
        this.shapes = [];
        this.createInitialShapes();
        
        // Bind methods
        this.gameLoop = this.gameLoop.bind(this);
        
        // Set up canvas click handling
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.addShape(x, y);
        });
        
        console.log('🎮 Canvas Game Engine initialized');
    }
    
    createInitialShapes() {
        // Create some sample shapes
        this.shapes = [
            {
                type: 'rect',
                x: 100,
                y: 100,
                width: 50,
                height: 50,
                color: '#2d5a27',
                vx: 2,
                vy: 1
            },
            {
                type: 'circle',
                x: 300,
                y: 200,
                radius: 25,
                color: '#ff6b6b',
                vx: -1,
                vy: 2
            }
        ];
    }
    
    addShape(x, y) {
        const colors = ['#2d5a27', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
        const shape = {
            type: Math.random() > 0.5 ? 'rect' : 'circle',
            x: x,
            y: y,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4
        };
        
        if (shape.type === 'rect') {
            shape.width = 30 + Math.random() * 40;
            shape.height = 30 + Math.random() * 40;
        } else {
            shape.radius = 15 + Math.random() * 25;
        }
        
        this.shapes.push(shape);
    }
    
    update(deltaTime) {
        // Update all shapes
        this.shapes.forEach(shape => {
            shape.x += shape.vx;
            shape.y += shape.vy;
            
            // Bounce off walls
            if (shape.type === 'rect') {
                if (shape.x <= 0 || shape.x + shape.width >= this.canvas.width) {
                    shape.vx = -shape.vx;
                }
                if (shape.y <= 0 || shape.y + shape.height >= this.canvas.height) {
                    shape.vy = -shape.vy;
                }
            } else {
                if (shape.x - shape.radius <= 0 || shape.x + shape.radius >= this.canvas.width) {
                    shape.vx = -shape.vx;
                }
                if (shape.y - shape.radius <= 0 || shape.y + shape.radius >= this.canvas.height) {
                    shape.vy = -shape.vy;
                }
            }
        });
    }
    
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid for reference
        this.drawGrid();
        
        // Draw all shapes
        this.shapes.forEach(shape => {
            this.ctx.fillStyle = shape.color;
            
            if (shape.type === 'rect') {
                this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        // Draw instruction text
        this.ctx.fillStyle = '#2d5a27';
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Click anywhere to add shapes!', 10, 30);
        this.ctx.fillText(`Shapes: ${this.shapes.length}`, 10, 50);
    }
    
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(45, 90, 39, 0.1)';
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    gameLoop(currentTime) {
        if (!this.isAnimating) return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Update game state
        this.update(deltaTime);
        
        // Render frame
        this.render();
        
        // Update stats
        this.frameCount++;
        if (currentTime - this.lastFpsUpdate >= this.fpsUpdateInterval) {
            this.fps = Math.round(this.frameCount * 1000 / (currentTime - this.lastFpsUpdate));
            this.frameCount = 0;
            this.lastFpsUpdate = currentTime;
        }
        
        this.updateStats(currentTime);
        
        // Schedule next frame
        this.animationId = requestAnimationFrame(this.gameLoop);
    }
    
    updateStats(currentTime) {
        document.getElementById('fps').textContent = this.fps;
        document.getElementById('frame').textContent = this.frameCount;
        document.getElementById('time').textContent = (currentTime / 1000).toFixed(1);
    }
    
    start() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.lastTime = performance.now();
            this.lastFpsUpdate = performance.now();
            this.gameLoop(this.lastTime);
        }
    }
    
    stop() {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.shapes = [];
    }
    
    drawSampleShapes() {
        this.clear();
        
        // Draw various shapes to demonstrate canvas capabilities
        this.ctx.fillStyle = '#2d5a27';
        this.ctx.fillRect(50, 50, 100, 60);
        
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.beginPath();
        this.ctx.arc(250, 100, 40, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.beginPath();
        this.ctx.moveTo(400, 80);
        this.ctx.lineTo(450, 140);
        this.ctx.lineTo(350, 140);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw text
        this.ctx.fillStyle = '#2d5a27';
        this.ctx.font = '20px Arial';
        this.ctx.fillText('Canvas shapes demonstration!', 200, 200);
    }
}

// Initialize game
const game = new CanvasGame();

// Global functions for buttons
window.startAnimation = () => game.start();
window.stopAnimation = () => game.stop();
window.clearCanvas = () => game.clear();
window.drawShapes = () => game.drawSampleShapes();

// Auto-start animation
game.start();
```

## 🚀 Step 4: Test Your Canvas

Start your server and visit `http://localhost:8000`. You should see:

1. A canvas with animated shapes
2. Click anywhere to add new shapes
3. Real-time FPS counter
4. Control buttons for the animation

## 🎯 Understanding the Code

### Canvas Basics
```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
```

### Animation Loop
```javascript
gameLoop(currentTime) {
    // Update game state
    this.update(deltaTime);
    
    // Render frame
    this.render();
    
    // Schedule next frame
    requestAnimationFrame(this.gameLoop);
}
```

### Drawing Operations
```javascript
// Clear canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw rectangle
ctx.fillStyle = '#2d5a27';
ctx.fillRect(x, y, width, height);

// Draw circle
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.fill();
```

## 🎯 What You've Learned

- **Canvas Element**: HTML5 Canvas for 2D graphics
- **2D Context**: Drawing API for shapes, colors, and text
- **Animation Loop**: requestAnimationFrame for smooth animation
- **Coordinate System**: Understanding x,y positioning
- **Performance Monitoring**: FPS tracking and optimization
- **Event Handling**: Mouse clicks and user interaction

## 🚀 Deploy to Deno Deploy

Update your `deploy.json`:

```json
{
  "name": "dinosaur-game-stage2",
  "entry": "main.ts",
  "env": {
    "DENO_STAGE": "2"
  }
}
```

## 🎉 Challenge Extensions

Try these optional challenges:

1. **Collision Detection**: Make shapes bounce off each other
2. **Shape Trails**: Add trailing effects to moving shapes
3. **Particle System**: Create a simple particle explosion on click
4. **Sound Effects**: Add audio feedback for interactions
5. **Fullscreen Mode**: Add a fullscreen toggle button

## 🔗 Canvas Resources

- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

## 🐛 Troubleshooting

**Canvas not showing?**
- Check browser console for errors
- Verify the canvas element exists
- Ensure JavaScript is enabled

**Poor performance?**
- Monitor the FPS counter
- Reduce the number of shapes
- Optimize drawing operations

**Shapes not moving?**
- Check if animation is started
- Verify requestAnimationFrame is working
- Look for JavaScript errors

---

**Ready for Stage 3?** You'll create your first dinosaur character and learn about game object architecture!
