//// ORIGINAL


// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
        // Load the bird sprite
        game.load.image('bird', 'assets/unicorn.png'); 
        game.load.image('star', 'assets/star.png');
        game.load.image('pipe', 'assets/pixel_cloud.png');
        game.load.audio('jump', 'assets/jump.wav'); 
        game.load.audio('intro', 'assets/grow1.wav'); 
        game.load.audio('newStar', 'assets/grow2.wav');
        game.load.audio('endSound', 'assets/colt45.wav'); 
        game.load.image ( 'background' , 'assets/layer-1.png' );


    },
    

    create: function() { 
        // Change the background color of the game to blue
//        game.stage.backgroundColor = '#000';
        var background = game.add.tileSprite(0, 0, 500, 500, "background");


        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');
//        this.bird.scale.setTo(0.15, 0.15);

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;  

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);  
        // Create an empty group
        this.pipes = game.add.group(); 
//        this.pipes.scale.setTo(0.70, 0.70);
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", 
        { font: "30px Arial", fill: "#ffffff" }); 
         // Move the anchor to the left and downward
        this.bird.anchor.setTo(-0.2, 0.5); 
        this.jumpSound = game.add.audio('jump'); 
        this.startSound = game.add.audio('intro');
        this.endSound = game.add.audio('endSound');
        
    },

    update: function() {
        if(this.score == 0) { 
            this.startSound.play();
        }
        
        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
        game.physics.arcade.overlap(
        this.bird, this.pipes, this.hitPipe, null, this);
        if (this.bird.angle < 20)
        this.bird.angle += 1; 

    },

    // Make the bird jump 
    jump: function() {
        if (this.bird.alive == false)
        return;
        
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
        game.add.tween(this.bird).to({angle: -20}, 100).start(); 
        this.jumpSound.play();

    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
    
    addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe 
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 

    // Automatically kill the pipe when it's no longer visible 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
    }, 
    
    addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1) 
            this.addOnePipe(400, i * 60 + 10); 
    
    this.score += 1;
    this.labelScore.text = this.score;
    },
    hitPipe: function() {
        this.endSound.play(); 
        // If the bird has already hit a pipe, do nothing
        // It means the bird is already falling off the screen
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    }, 
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main'); 


//// MODIFIED

// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
        // Load the bird sprite
        game.load.image('bird', 'assets/unicorn.png'); 
        game.load.image('star', 'assets/star.png');
        game.load.image('pipe', 'assets/pixel_cloud.png');
        game.load.audio('jump', 'assets/jump.wav'); 
        game.load.audio('intro', 'assets/grow1.wav'); 
        game.load.audio('newStar', 'assets/grow2.wav');
        game.load.audio('endSound', 'assets/colt45.wav'); 
        game.load.image ( 'background' , 'assets/layer-1.png' );


    },
    

    create: function() { 
        // Change the background color of the game to blue
//        game.stage.backgroundColor = '#000';
        var background = game.add.tileSprite(0, 0, 500, 500, "background");


        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');
//        this.bird.scale.setTo(0.15, 0.15);

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;  

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);  
        // Create an empty group
        this.pipes = game.add.group(); 
        // Create an empty group for stars
        this.stars = game.add.group(); 
//        this.pipes.scale.setTo(0.70, 0.70);
        this.pipeTimer = game.time.events.loop(2500, this.addRowOfPipes, this); 
        this.starTimer = game.time.events.loop(1000, this.addRowOfStars, this);
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", 
        { font: "30px Arial", fill: "#ffffff" }); 
         // Move the anchor to the left and downward
        this.bird.anchor.setTo(-0.2, 0.5); 
        this.jumpSound = game.add.audio('jump'); 
        this.startSound = game.add.audio('intro');
        this.endSound = game.add.audio('endSound');
        
    },

    update: function() {
        if(this.score == 0) { 
            this.startSound.play();
        }
        
        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
        game.physics.arcade.overlap(this.bird, this.stars, this.hitStar, null, this); 
        if (this.bird.angle < 20)
        this.bird.angle += 1; 

    },

    // Make the bird jump 
    jump: function() {
        if (this.bird.alive == false)
        return;
        
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
        game.add.tween(this.bird).to({angle: -20}, 100).start(); 
        this.jumpSound.play();

    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
    
    addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe 
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 

    // Automatically kill the pipe when it's no longer visible 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
    }, 
    
    addOneStar: function(x,y) {
    // Create a star at the position x and y
    var star = game.add.sprite(x, y, 'star');

    // Add the star to our previously created group
    this.stars.add(star);

    // Enable physics on the star 
    game.physics.arcade.enable(star);

    // Add velocity to the star to make it move left
    star.body.velocity.x = -200; 

    // Automatically kill the star when it's no longer visible 
    star.checkWorldBounds = true;
    star.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1) 
            this.addOnePipe(400, i * 60 + 10); 
    
//    this.score += 1;
//    this.labelScore.text = this.score;
    },
    
    addRowOfStars: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var spot = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    // With one big spot at position 'hole' and 'hole + 1'
    for (var j = 0; j < 8; j++)
        if (j == spot) 
            this.addOneStar(400, j * 60 + 10); 
    
//    this.score += 1;
//    this.labelScore.text = this.score;
    },

    hitPipe: function() {
        this.endSound.play(); 
        // If the bird has already hit a pipe, do nothing
        // It means the bird is already falling off the screen
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        game.time.events.remove(this.pipeTimer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    }, 
    
    hitStar: function() {

        this.score += 1;
        this.labelScore.text = this.score;
        this.stars.remove(this.star);

    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main'); 


