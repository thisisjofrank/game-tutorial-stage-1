import { assertEquals, assertExists } from "@std/assert";
import { DEFAULT_CONFIG } from "./config.ts";
import { Player, Obstacle, Ground } from "./game-objects.ts";

// Test game configuration
Deno.test("Default configuration is valid", () => {
  assertEquals(typeof DEFAULT_CONFIG.canvas.width, "number");
  assertEquals(typeof DEFAULT_CONFIG.canvas.height, "number");
  assertEquals(typeof DEFAULT_CONFIG.player.jumpHeight, "number");
  assertEquals(typeof DEFAULT_CONFIG.obstacles.speed, "number");
  assertExists(DEFAULT_CONFIG.colors.background);
});

// Test Player class
Deno.test("Player can be created and jump", () => {
  const player = new Player(50, 100, 40, 40, "#green", 200, 15, 0.8);

  assertEquals(player.x, 50);
  assertEquals(player.y, 100);
  assertEquals(player.width, 40);
  assertEquals(player.height, 40);

  // Test jumping
  player.jump();
  // After jump, player should have negative velocity
  player.update(16); // Simulate one frame
  // Player should be moving upward (y decreasing)
  assertEquals(player.y < 100, true);
});

// Test Obstacle class
Deno.test("Obstacle moves and can be detected off-screen", () => {
  const obstacle = new Obstacle(800, 300, 20, 60, "#brown", 5);

  assertEquals(obstacle.x, 800);
  assertEquals(obstacle.isOffScreen(), false);

  // Move obstacle off screen
  for (let i = 0; i < 200; i++) {
    obstacle.update(16);
  }

  assertEquals(obstacle.isOffScreen(), true);
});

// Test collision detection
Deno.test("Collision detection works correctly", () => {
  const player = new Player(50, 100, 40, 40, "#green", 200, 15, 0.8);
  const obstacle = new Obstacle(70, 120, 20, 60, "#brown", 5);

  // Objects should collide
  assertEquals(player.collidesWith(obstacle), true);

  // Move obstacle away
  obstacle.x = 200;
  assertEquals(player.collidesWith(obstacle), false);
});

// Test Ground class
Deno.test("Ground can be created and rendered", () => {
  const ground = new Ground(0, 380, 800, 20, "#brown");

  assertEquals(ground.x, 0);
  assertEquals(ground.y, 380);
  assertEquals(ground.width, 800);
  assertEquals(ground.height, 20);

  // Ground should not move
  const originalX = ground.x;
  ground.update(16);
  assertEquals(ground.x, originalX);
});

// Test configuration merging
Deno.test("Configuration can be customized", () => {
  const customConfig = {
    ...DEFAULT_CONFIG,
    player: {
      ...DEFAULT_CONFIG.player,
      color: "#ff0000"
    }
  };

  assertEquals(customConfig.player.color, "#ff0000");
  assertEquals(customConfig.player.jumpHeight, DEFAULT_CONFIG.player.jumpHeight);
});
