import { GameConfig, DEFAULT_CONFIG } from "./config.ts";
import { Player, Obstacle, Ground } from "./game-objects.ts";

export interface GameState {
    score: number;
    isGameOver: boolean;
    isPlaying: boolean;
    highScore: number;
}

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private config: GameConfig;
    private player: Player;
    private obstacles: Obstacle[] = [];
    private ground: Ground;
    private gameState: GameState;
    private lastTime: number = 0;
    private obstacleSpawnTimer: number = 0;
    private kv: Deno.Kv;

    constructor(canvas: HTMLCanvasElement, config: GameConfig = DEFAULT_CONFIG) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.config = config;

        // Set canvas size
        this.canvas.width = config.canvas.width;
        this.canvas.height = config.canvas.height;

        // Initialize game objects
        const groundY = config.canvas.height - config.ground.height - config.player.height;
        this.player = new Player(
            50,
            groundY,
            config.player.width,
            config.player.height,
            config.player.color,
            groundY,
            config.player.jumpHeight,
            config.player.gravity
        );

        this.ground = new Ground(
            0,
            config.canvas.height - config.ground.height,
            config.canvas.width,
            config.ground.height,
            config.ground.color
        );

        this.gameState = {
            score: 0,
            isGameOver: false,
            isPlaying: false,
            highScore: 0
        };

        this.kv = {} as Deno.Kv; // Will be initialized properly in init()
    }

    async init(): Promise<void> {
        // Initialize Deno KV
        this.kv = await Deno.openKv();

        // Load high score
        const highScoreResult = await this.kv.get(["highScore"]);
        this.gameState.highScore = highScoreResult.value as number || 0;

        // Set up event listeners
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Handle spacebar and click for jumping
        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                this.handleJump();
            }
        });

        this.canvas.addEventListener("click", () => {
            this.handleJump();
        });
    }

    private handleJump(): void {
        if (!this.gameState.isPlaying && !this.gameState.isGameOver) {
            this.startGame();
        } else if (this.gameState.isPlaying) {
            this.player.jump();
        } else if (this.gameState.isGameOver) {
            this.resetGame();
        }
    }

    private startGame(): void {
        this.gameState.isPlaying = true;
        this.gameState.isGameOver = false;
        this.gameState.score = 0;
        this.obstacles = [];
        this.obstacleSpawnTimer = 0;
    }

    private resetGame(): void {
        this.gameState.isGameOver = false;
        this.gameState.isPlaying = false;
        this.gameState.score = 0;
        this.obstacles = [];
        this.obstacleSpawnTimer = 0;

        // Reset player position
        const groundY = this.config.canvas.height - this.config.ground.height - this.config.player.height;
        this.player.x = 50;
        this.player.y = groundY;
    }

    private async saveHighScore(): Promise<void> {
        if (this.gameState.score > this.gameState.highScore) {
            this.gameState.highScore = this.gameState.score;
            await this.kv.set(["highScore"], this.gameState.highScore);
        }
    }

    private spawnObstacle(): void {
        const obstacle = new Obstacle(
            this.config.canvas.width,
            this.config.canvas.height - this.config.ground.height - this.config.obstacles.height,
            this.config.obstacles.width,
            this.config.obstacles.height,
            this.config.obstacles.color,
            this.config.obstacles.speed
        );
        this.obstacles.push(obstacle);
    }

    private updateGame(deltaTime: number): void {
        if (!this.gameState.isPlaying) return;

        // Update player
        this.player.update(deltaTime);

        // Update obstacles
        this.obstacles.forEach(obstacle => obstacle.update(deltaTime));

        // Remove off-screen obstacles and increase score
        this.obstacles = this.obstacles.filter(obstacle => {
            if (obstacle.isOffScreen()) {
                this.gameState.score += 10;
                return false;
            }
            return true;
        });

        // Spawn new obstacles
        this.obstacleSpawnTimer += deltaTime;
        if (this.obstacleSpawnTimer > (1000 / this.config.obstacles.spawnRate)) {
            if (Math.random() < this.config.obstacles.spawnRate) {
                this.spawnObstacle();
                this.obstacleSpawnTimer = 0;
            }
        }

        // Check collisions
        for (const obstacle of this.obstacles) {
            if (this.player.collidesWith(obstacle)) {
                this.gameState.isGameOver = true;
                this.gameState.isPlaying = false;
                this.saveHighScore();
                break;
            }
        }
    }

    private render(): void {
        // Clear canvas
        this.ctx.fillStyle = this.config.colors.background;
        this.ctx.fillRect(0, 0, this.config.canvas.width, this.config.canvas.height);

        // Render ground
        this.ground.render(this.ctx);

        // Render player
        this.player.render(this.ctx);

        // Render obstacles
        this.obstacles.forEach(obstacle => obstacle.render(this.ctx));

        // Render UI
        this.renderUI();
    }

    private renderUI(): void {
        this.ctx.fillStyle = this.config.colors.text;
        this.ctx.font = "20px Arial";

        // Score
        this.ctx.fillText(`Score: ${this.gameState.score}`, 10, 30);

        // High Score
        this.ctx.fillText(`High Score: ${this.gameState.highScore}`, 10, 60);

        // Game state messages
        if (!this.gameState.isPlaying && !this.gameState.isGameOver) {
            this.ctx.font = "30px Arial";
            this.ctx.fillText("Press SPACE or CLICK to start", this.config.canvas.width / 2 - 200, this.config.canvas.height / 2);
        }

        if (this.gameState.isGameOver) {
            this.ctx.font = "30px Arial";
            this.ctx.fillText("Game Over!", this.config.canvas.width / 2 - 100, this.config.canvas.height / 2);
            this.ctx.font = "20px Arial";
            this.ctx.fillText("Press SPACE or CLICK to restart", this.config.canvas.width / 2 - 150, this.config.canvas.height / 2 + 40);
        }
    }

    public gameLoop(currentTime: number): void {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.updateGame(deltaTime);
        this.render();

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    public start(): void {
        this.gameLoop(0);
    }

    public getGameState(): GameState {
        return { ...this.gameState };
    }

    public updateConfig(newConfig: Partial<GameConfig>): void {
        this.config = { ...this.config, ...newConfig };
    }
}
