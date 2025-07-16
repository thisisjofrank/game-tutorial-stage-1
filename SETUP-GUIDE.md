# 🦕 Deno Dinosaur Game Tutorial - Quick Setup Guide

## 🚀 Setting up Tutorial Branches

Let's create the tutorial branches manually to ensure everything works correctly.

### Step 1: Initialize Git and Create Main Branch

```bash
# Add all files and commit to main
git add .
git commit -m "Initial commit: Tutorial setup and README"
```

### Step 2: Create Stage 1 Branch

```bash
# Create and switch to stage-1-setup branch
git checkout -b stage-1-setup

# Create deno.json for stage 1
cat > deno.json << 'EOF'
{
  "tasks": {
    "dev": "deno run --allow-net --allow-read --watch main.ts",
    "start": "deno run --allow-net --allow-read main.ts"
  },
  "imports": {
    "@std/http": "jsr:@std/http@1"
  }
}
EOF

# Create main.ts for stage 1
cat > main.ts << 'EOF'
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
EOF

# Commit stage 1
git add .
git commit -m "Stage 1: Basic Deno server setup"
```

### Step 3: Create Stage 2 Branch

```bash
# Switch back to main and create stage-2-canvas branch
git checkout main
git checkout -b stage-2-canvas

# Copy existing content from our previous work
# (You'll need to copy the stage 2 files we created earlier)

git add .
git commit -m "Stage 2: Canvas foundation and animations"
```

### Step 4: Create Stage 3 Branch

```bash
# Switch back to main and create stage-3-character branch
git checkout main
git checkout -b stage-3-character

# Copy existing content from our previous work
# (You'll need to copy the stage 3 files we created earlier)

git add .
git commit -m "Stage 3: Character creation and physics"
```

## 🎯 Testing Your Setup

### Test Stage 1
```bash
git checkout stage-1-setup
deno task dev
# Visit http://localhost:8000
```

### Test Stage 2
```bash
git checkout stage-2-canvas
deno task dev
# Visit http://localhost:8000
```

### Test Stage 3
```bash
git checkout stage-3-character
deno task dev
# Visit http://localhost:8000
```

## 📚 Branch Structure

After setup, you'll have:

```
main (tutorial documentation)
├── stage-1-setup (basic server)
├── stage-2-canvas (canvas + animations)
├── stage-3-character (character + physics)
└── (future stages...)
```

## 🔄 Usage Instructions

### For Tutorial Learners:
1. Clone the repository
2. `git checkout stage-1-setup`
3. `deno task dev`
4. Follow the in-browser instructions
5. Move to next stage: `git checkout stage-2-canvas`

### For Tutorial Creators:
1. Each stage is a complete working example
2. Students can jump to any stage
3. Each stage builds on the previous
4. Complete isolation between stages

## 🎉 Benefits of This Approach

- **Progressive Learning**: Each stage builds on the previous
- **Complete Examples**: Every stage is fully functional
- **Easy Navigation**: Simple git commands to switch stages
- **Isolated Testing**: Each stage can be tested independently
- **Version Control**: Full history of progression
- **Deployment Ready**: Each stage can be deployed separately

## 🚀 Next Steps

1. Test the basic setup manually
2. Create additional stages (4-12) following the same pattern
3. Add deployment configurations for each stage
4. Create comprehensive documentation
5. Add automated testing for each stage

This approach gives you maximum flexibility and ensures each stage is a complete, working example!
