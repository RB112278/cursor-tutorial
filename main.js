// Initialize Kaboom.js
kaboom({
    width: 800,
    height: 600,
    background: [135, 206, 235], // Sky blue background
});

// Load game assets (using simple colored rectangles for simplicity)
loadSprite("player", "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjRkY2QjNCIi8+CjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMzMzMiLz4KPHJlY3QgeD0iMjAiIHk9IjQiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMzMzMiLz4KPHJlY3QgeD0iMTIiIHk9IjE2IiB3aWR0aD0iOCIgaGVpZ2h0PSI0IiBmaWxsPSIjMzMzIi8+Cjwvc3ZnPgo=");
loadSprite("platform", "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA2NCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjMyIiBmaWxsPSIjOEI1NzNBIi8+CjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI0IiBmaWxsPSIjNkE0QzJDIi8+Cjwvc3ZnPgo=");
loadSprite("coin", "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNGRkQ3MDAiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNiIgZmlsbD0iI0ZGRDcwMCIgc3Ryb2tlPSIjRkZDNzAwIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==");

// Game scene
scene("game", () => {
    // Set up gravity
    setGravity(800);
    
    // Create player character
    const player = add([
        sprite("player"),
        pos(50, 300),
        area(),
        body(),
        {
            speed: 200,
            myJumpForce: 400,
            canJump: true
        }
    ]);
    
    // Player movement and jumping
    onKeyDown("left", () => {
        player.move(-player.speed, 0);
    });
    
    onKeyDown("right", () => {
        player.move(player.speed, 0);
    });
    
    onKeyPress("space", () => {
        if (player.canJump) {
            player.jump(player.myJumpForce);
            player.canJump = false;
        }
    });
    
    // Reset jump ability when player lands on ground
    player.onGround(() => {
        player.canJump = true;
    });
    
    // Create platforms
    // Ground platform
    add([
        sprite("platform"),
        pos(0, 550),
        area(),
        body({ isStatic: true }),
        scale(12.5, 1) // Scale to cover the bottom of the screen
    ]);
    
    // Floating platforms
    add([
        sprite("platform"),
        pos(200, 450),
        area(),
        body({ isStatic: true }),
        scale(2, 1)
    ]);
    
    add([
        sprite("platform"),
        pos(400, 350),
        area(),
        body({ isStatic: true }),
        scale(2, 1)
    ]);
    
    add([
        sprite("platform"),
        pos(600, 250),
        area(),
        body({ isStatic: true }),
        scale(2, 1)
    ]);
    
    // Create collectible coin
    const coin = add([
        sprite("coin"),
        pos(650, 200),
        area(),
        "coin"
    ]);
    
    // Coin collection logic
    player.onCollide("coin", (coin) => {
        destroy(coin);
        add([
            text("Coin collected!", { size: 32, font: "arial" }),
            pos(400, 100),
            color(255, 215, 0),
            lifespan(2)
        ]);
    });
    
    // Win condition - reach the right side
    player.onUpdate(() => {
        if (player.pos.x > 750) {
            add([
                text("You Win!", { size: 48, font: "arial" }),
                pos(350, 250),
                color(0, 255, 0),
                lifespan(3)
            ]);
        }
    });
    
    // Instructions
    add([
        text("Use LEFT/RIGHT arrows to move, SPACE to jump", { size: 16, font: "arial" }),
        pos(10, 10),
        color(255, 255, 255)
    ]);
    
    add([
        text("Collect the coin and reach the right side to win!", { size: 16, font: "arial" }),
        pos(10, 30),
        color(255, 255, 255)
    ]);
});

// Start the game
go("game"); 