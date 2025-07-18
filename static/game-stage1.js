/**
 * 🦕 Dino Game Tutorial - Stage 1: Foundation & Setup
 * 
 * This is the foundation stage that introduces:
 * - Basic game architecture and project structure
 * - Canvas setup and rendering pipeline
 * - Event handling system
 * - Modular game design principles
 * - Development environment with Deno
 * 
 * This stage sets up the foundation that all subsequent stages build upon.
 * We establish the core patterns and structures that will be enhanced throughout the tutorial.
 */

/**
 * Game Configuration Object
 * Centralizes all game settings for easy modification
 */
export const STAGE1_CONFIG = {
    canvas: {
        width: 800,
        height: 400
    },
    colors: {
        background: '#87CEEB', // Sky blue
        ground: '#228B22',     // Forest green
        text: '#333333',       // Dark gray
        accent: '#4CAF50'      // Material green
    },
    tutorial: {
        title: 'Stage 1: Foundation & Setup',
        description: 'Building the foundation for our Dino game'
    }
};

/**
 * Basic Game Class - Foundation
 * This establishes the core game architecture that all stages will follow
 */
export class Game {
    constructor(canvas, config = STAGE1_CONFIG) {
        // Core canvas setup
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.config = structuredClone(config);
        
        // Set canvas dimensions
        this.canvas.width = this.config.canvas.width;
        this.canvas.height = this.config.canvas.height;
        
        // Game state management
        this.gameState = {
            initialized: false,
            showWelcome: true,
            currentDemo: 'setup'
        };
        
        // Animation timing
        this.lastTime = 0;
        this.animationId = null;
        
        // Demo animations
        this.demoTime = 0;
        this.showFeatures = false;
        
        console.log('🦕 Stage 1: Foundation initialized!');
        console.log('📋 Canvas size:', this.canvas.width, 'x', this.canvas.height);
        console.log('🎨 Theme: Sky blue background with forest ground');
    }
    
    /**
     * Initialize the game and set up event listeners
     */
    init() {
        this.setupEventListeners();
        this.gameState.initialized = true;
        console.log('✅ Game foundation ready!');
    }
    
    /**
     * Event handling setup - demonstrates input system foundation
     */
    setupEventListeners() {
        // Keyboard interaction
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    this.handleSpacePress();
                    break;
                case 'Enter':
                    this.toggleDemo();
                    break;
                case 'KeyR':
                    this.restart();
                    break;
            }
        });
        
        // Mouse/touch interaction
        this.canvas.addEventListener('click', () => {
            this.handleCanvasClick();
        });
        
        // Show that we're listening for events
        console.log('🎮 Event listeners registered: Space, Enter, R, Click');
    }
    
    /**
     * Handle space key press - foundation for jump mechanics
     */
    handleSpacePress() {
        if (this.gameState.showWelcome) {
            this.gameState.showWelcome = false;
            this.showFeatures = true;
            console.log('🚀 Starting feature demonstration...');
        } else {
            this.gameState.currentDemo = this.gameState.currentDemo === 'setup' ? 'preview' : 'setup';
            console.log('🔄 Demo mode:', this.gameState.currentDemo);
        }
    }
    
    /**
     * Handle canvas click - foundation for touch controls
     */
    handleCanvasClick() {
        this.handleSpacePress(); // Same behavior as space for now
    }
    
    /**
     * Toggle demonstration mode
     */
    toggleDemo() {
        this.showFeatures = !this.showFeatures;
        console.log('✨ Features display:', this.showFeatures ? 'ON' : 'OFF');
    }
    
    /**
     * Restart the demonstration
     */
    restart() {
        this.gameState.showWelcome = true;
        this.showFeatures = false;
        this.gameState.currentDemo = 'setup';
        this.demoTime = 0;
        console.log('🔄 Demo restarted');
    }
    
    /**
     * Main game loop - foundation for all future stages
     */
    gameLoop(currentTime) {
        // Calculate delta time
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Update demo animations
        this.demoTime += deltaTime;
        
        // Render the current state
        this.render();
        
        // Continue the animation loop
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    /**
     * Rendering system - foundation for all visual elements
     */
    render() {
        // Clear canvas with sky background
        this.ctx.fillStyle = this.config.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw ground foundation
        this.renderGround();
        
        // Render current state
        if (this.gameState.showWelcome) {
            this.renderWelcomeScreen();
        } else if (this.showFeatures) {
            this.renderFeatureDemo();
        } else {
            this.renderSetupInfo();
        }
        
        // Always show controls
        this.renderControls();
    }
    
    /**
     * Render ground - foundation for game world
     */
    renderGround() {
        const groundHeight = 60;
        const groundY = this.canvas.height - groundHeight;
        
        // Ground base
        this.ctx.fillStyle = this.config.colors.ground;
        this.ctx.fillRect(0, groundY, this.canvas.width, groundHeight);
        
        // Ground details with animated grass
        this.ctx.fillStyle = '#32CD32'; // Lime green for grass effect
        const grassOffset = Math.sin(this.demoTime * 0.001) * 2;
        
        for (let x = 0; x < this.canvas.width; x += 20) {
            const grassHeight = 8 + Math.sin(x * 0.1 + this.demoTime * 0.002) * 3 + grassOffset;
            this.ctx.fillRect(x, groundY - grassHeight, 15, grassHeight);
        }
    }
    
    /**
     * Welcome screen with tutorial introduction
     */
    renderWelcomeScreen() {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Title
        this.ctx.fillStyle = this.config.colors.accent;
        this.ctx.font = 'bold 36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🦕 Dino Game Tutorial', this.canvas.width / 2, 120);
        
        // Stage info
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillText('Stage 1: Foundation & Setup', this.canvas.width / 2, 160);
        
        // Description
        this.ctx.font = '18px Arial';
        this.ctx.fillText('Building the foundation for our 24-stage tutorial series', this.canvas.width / 2, 190);
        
        // Instructions with pulsing effect
        const pulse = Math.sin(this.demoTime * 0.005) * 0.3 + 0.7;
        this.ctx.fillStyle = `rgba(76, 175, 80, ${pulse})`;
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText('Press SPACE or CLICK to continue', this.canvas.width / 2, 250);
        
        // Features preview
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = '16px Arial';
        this.ctx.fillText('📚 24 Progressive Stages', this.canvas.width / 2, 300);
        this.ctx.fillText('🎮 From Basic Setup to Advanced Features', this.canvas.width / 2, 325);
        this.ctx.fillText('🦕 Complete Game Development Journey', this.canvas.width / 2, 350);
    }
    
    /**
     * Feature demonstration mode
     */
    renderFeatureDemo() {
        // Title
        this.ctx.fillStyle = this.config.colors.text;
        this.ctx.font = 'bold 28px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🎯 Stage 1 Foundation Features', this.canvas.width / 2, 50);
        
        // Feature boxes with animations
        const features = [
            { icon: '🏗️', title: 'Project Architecture', desc: 'Modular design foundation' },
            { icon: '🎨', title: 'Canvas Rendering', desc: 'Visual output system' },
            { icon: '🎮', title: 'Event Handling', desc: 'Input management' },
            { icon: '⚙️', title: 'Configuration', desc: 'Centralized settings' }
        ];
        
        const boxWidth = 180;
        const boxHeight = 120;
        const spacing = 20;
        const startX = (this.canvas.width - (features.length * boxWidth + (features.length - 1) * spacing)) / 2;
        
        features.forEach((feature, index) => {
            const x = startX + index * (boxWidth + spacing);
            const y = 100;
            
            // Animated box background
            const hoverEffect = Math.sin(this.demoTime * 0.003 + index) * 0.1 + 0.9;
            this.ctx.fillStyle = `rgba(76, 175, 80, ${0.2 * hoverEffect})`;
            this.ctx.fillRect(x, y, boxWidth, boxHeight);
            
            // Border
            this.ctx.strokeStyle = this.config.colors.accent;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, boxWidth, boxHeight);
            
            // Icon
            this.ctx.fillStyle = this.config.colors.text;
            this.ctx.font = '32px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(feature.icon, x + boxWidth / 2, y + 40);
            
            // Title
            this.ctx.font = 'bold 14px Arial';
            this.ctx.fillText(feature.title, x + boxWidth / 2, y + 65);
            
            // Description
            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = '#666';
            this.ctx.fillText(feature.desc, x + boxWidth / 2, y + 85);
        });
        
        // Progress indicator
        this.ctx.fillStyle = this.config.colors.accent;
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('✅ Foundation Complete - Ready for Stage 2!', this.canvas.width / 2, 280);
    }
    
    /**
     * Setup information display
     */
    renderSetupInfo() {
        // Header
        this.ctx.fillStyle = this.config.colors.text;
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🔧 Development Environment Setup', this.canvas.width / 2, 60);
        
        // Setup checklist
        const setupItems = [
            '✅ Deno runtime installed and configured',
            '✅ TypeScript support enabled',
            '✅ Static file serving operational',
            '✅ Canvas HTML5 element initialized',
            '✅ ES6 modules system working',
            '✅ Event handling system functional'
        ];
        
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'left';
        const startY = 100;
        
        setupItems.forEach((item, index) => {
            this.ctx.fillStyle = index % 2 === 0 ? this.config.colors.accent : this.config.colors.text;
            this.ctx.fillText(item, 50, startY + index * 30);
        });
        
        // Next steps
        this.ctx.fillStyle = '#FF6B6B';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🚀 Ready to progress to Stage 2: Animation & Movement!', this.canvas.width / 2, 300);
    }
    
    /**
     * Control instructions
     */
    renderControls() {
        // Control panel background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, 50);
        
        // Controls text
        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('🎮 Controls: SPACE/CLICK - Next | ENTER - Toggle Demo | R - Restart', 10, this.canvas.height - 20);
        
        // Stage indicator
        this.ctx.textAlign = 'right';
        this.ctx.fillStyle = this.config.colors.accent;
        this.ctx.fillText('Stage 1/24', this.canvas.width - 10, this.canvas.height - 20);
    }
    
    /**
     * Start the game loop
     */
    start() {
        console.log('🎬 Starting Stage 1 demonstration...');
        this.gameLoop(0);
    }
    
    /**
     * Stop the game loop
     */
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        console.log('⏹️ Stage 1 demonstration stopped');
    }
    
    /**
     * Get current game state for debugging
     */
    getGameState() {
        return {
            stage: 1,
            initialized: this.gameState.initialized,
            showWelcome: this.gameState.showWelcome,
            showFeatures: this.showFeatures,
            currentDemo: this.gameState.currentDemo,
            canvasSize: {
                width: this.canvas.width,
                height: this.canvas.height
            }
        };
    }
}

// Export configuration for use in other files
export { STAGE1_CONFIG as DEFAULT_CONFIG };

// Log stage initialization
console.log('📦 Stage 1 module loaded successfully');
console.log('🎯 Foundation stage ready for initialization');
