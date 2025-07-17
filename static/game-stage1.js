// Stage 1: Basic Setup - Just a simple message and canvas element

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    
    // Set canvas size
    this.canvas.width = 800;
    this.canvas.height = 400;
    
    console.log("🦕 Stage 1: Game initialized!");
  }

  start() {
    // Clear canvas
    this.ctx.fillStyle = "#f0f0f0";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw welcome message
    this.ctx.fillStyle = "#333";
    this.ctx.font = "24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Stage 1: Basic Setup Complete!", this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.fillText("Next: Stage 2 will add animation!", this.canvas.width / 2, this.canvas.height / 2 + 40);
  }
}
