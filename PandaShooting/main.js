/*
 * Panda Shooting
 */

phina.globalize();

// images
var ASSETS = {
  image: {
    bg: "http://jsrun.it/assets/a/G/5/Y/aG5YD.png",
    objects: 'http://user-images.githubusercontent.com/39637599/40667194-7ee52abe-639c-11e8-82e0-bff84770db08.png',
  },
};

// screen size
var SCREEN_WIDTH  = 465;
var SCREEN_HEIGHT = 465;
var SPEED         = 4;

/*
 * main scene
 */
phina.define("MainScene", {
  superClass: 'DisplayScene',

  init: function(options) {
    this.superInit(options);

    // background
    this.bg = Sprite("bg").addChildTo(this);
    this.bg.origin.set(0, 0);
    
    // player
    this.player = Sprite('objects', 16, 16).addChildTo(this);
    this.player.setPosition(400, 400);
    this.player.frameIndex = 0;
  },

  // update
  update: function(app) {
    var p = app.pointer;

    if (p.getPointing()) {
      var diff = this.player.x - p.x;
      if (Math.abs(diff) > SPEED) {
        // move right
        if (diff < 0) {
          this.player.x += SPEED;
          this.player.scaleX = -1;
        }
        // move left
        else {
          this.player.x -= SPEED;
          this.player.scaleX = 1;
        }

        // animation
        if (app.frame % 4 === 0) {
          this.player.frameIndex = (this.player.frameIndex === 12) ? 13:12;
        }
      }
    }
    else {
      // wait
      this.player.frameIndex = 0;
    }
  }
});

/*
 * main function
 */
phina.main(function() {
  // create application
  var app = GameApp({
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });

  app.enableStats();

  app.run();
});
