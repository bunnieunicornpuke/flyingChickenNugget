    addOneStar: function(x, y) {
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
    
    }
    
    addRowWithStar: function() {
    // Randomly pick a number between 1 and 5
    // This will be the randStar position
    var randStar = Math.floor(Math.random() * 5) + 1;

    // Add the 6 holes 
    // With one big star at position 'randStar' and 'randStar + 1'
    for (var i = 0; i < 8; i++)
        if (i != randStar && i != RandStar + 1) 
            this.addOneStar(400, i * 60 + 10); 
    
    } 

    collectStar: function() {
        //Play sound when collects star
        this.newStar.play(); 
        // If the bird has already hit a star ==> +100 points
        
        
        //FOR THIS ==> 
//        // Go through all the pipes, and stop their movement
//        this.stars.forEach(function(p){
//            p.body.velocity.x = 0;
//        }, this);
    }

    this.score += 100;
    this.labelScore.text = this.score;