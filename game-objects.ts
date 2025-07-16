// Canvas rendering context interface
interface CanvasContext {
    fillStyle: string;
    fillRect(x: number, y: number, width: number, height: number): void;
}

// Game entity base class
export abstract class GameObject {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string = "#000000"
    ) { }

    abstract update(_deltaTime: number): void;
    abstract render(ctx: CanvasContext): void;

    // Collision detection
    collidesWith(other: GameObject): boolean {
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
    private velocityY: number = 0;
    private isJumping: boolean = false;
    private groundY: number;
    private jumpHeight: number;
    private gravity: number;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
        groundY: number,
        jumpHeight: number,
        gravity: number
    ) {
        super(x, y, width, height, color);
        this.groundY = groundY;
        this.jumpHeight = jumpHeight;
        this.gravity = gravity;
    }

    jump(): void {
        if (!this.isJumping) {
            this.velocityY = -this.jumpHeight;
            this.isJumping = true;
        }
    }

    update(_deltaTime: number): void {
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

    render(ctx: CanvasContext): void {
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
    private speed: number;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
        speed: number
    ) {
        super(x, y, width, height, color);
        this.speed = speed;
    }

    update(_deltaTime: number): void {
        this.x -= this.speed;
    }

    render(ctx: CanvasContext): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Check if obstacle is off screen
    isOffScreen(): boolean {
        return this.x + this.width < 0;
    }
}

// Ground class
export class Ground extends GameObject {
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ) {
        super(x, y, width, height, color);
    }

    update(_deltaTime: number): void {
        // Ground doesn't move
    }

    render(ctx: CanvasContext): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
