
// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
       game.load.image('unicorn', 'assets/unicorn.jpg'); 
    },

    create: function() { 
       // Change the background color of the game to blue
    game.stage.backgroundColor = '#d1c4e9';

    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the unicorn at the position x=100 and y=245
    this.unicorn = game.add.sprite(100, 245, 'unicorn');

    // Add physics to the unicorn
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.unicorn);

    // Add gravity to the unicorn to make it fall
    this.unicorn.body.gravity.y = 1000;  

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);     
},

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic   
        if (this.unicorn.y < 0 || this.unicorn.y > 490)
        this.restartGame();
    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');
