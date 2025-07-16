// Game entity base class
export class GameObject {
  constructor(x, y, width, height, color = "#000000") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  update(_deltaTime) {
    // Override in subclasses
  }

  render(_ctx) {
    // Override in subclasses
  }

  // Collision detection
  collidesWith(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}

// Player class
export class Player extends GameObject {
  constructor(x, y, width, height, color, groundY, jumpHeight, gravity) {
    super(x, y, width, height, color);
    this.velocityY = 0;
    this.isJumping = false;
    this.groundY = groundY;
    this.jumpHeight = jumpHeight;
    this.gravity = gravity;
  }

  jump() {
    if (!this.isJumping) {
      this.velocityY = -this.jumpHeight;
      this.isJumping = true;
    }
  }

  update(_deltaTime) {
    // Apply gravity
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    // Check if landed
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.velocityY = 0;
      this.isJumping = false;
    }
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Add simple animation (eyes)
    ctx.fillStyle = "white";
    ctx.fillRect(this.x + 8, this.y + 8, 6, 6);
    ctx.fillRect(this.x + 20, this.y + 8, 6, 6);
    ctx.fillStyle = "black";
    ctx.fillRect(this.x + 10, this.y + 10, 2, 2);
    ctx.fillRect(this.x + 22, this.y + 10, 2, 2);
  }
}

// Obstacle class
export class Obstacle extends GameObject {
  constructor(x, y, width, height, color, speed) {
    super(x, y, width, height, color);
    this.speed = speed;
  }

  update(_deltaTime) {
    this.x -= this.speed;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Check if obstacle is off screen
  isOffScreen() {
    return this.x + this.width < 0;
  }
}

// Ground class
export class Ground extends GameObject {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
  }

  update(_deltaTime) {
    // Ground doesn't move
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
