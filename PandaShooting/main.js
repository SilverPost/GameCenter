/*
 * Panda Shooting
 */

phina.globalize();

var ASSETS = {
  image: {
    bg: "http://user-images.githubusercontent.com/39637599/40866206-64f140f0-6637-11e8-9988-e6ed4cc6241f.png",
    objects: 'http://user-images.githubusercontent.com/39637599/40733177-030311ca-6470-11e8-9757-5783b9824fe8.png',
  },
  // animation
  spritesheet: {
    "player_ss":
    {
      "frame": {
        "width": 120,
        "height": 120,
        "cols": 4,
        "rows": 1,
      },
      "animations" : {
        "normal": {
          "frames": [0,1,2,3],
          "next": "normal",
          "frequency": 10,
        },
      }
    },
  }
};

// screen size
var SCREEN_WIDTH  = 600;
var SCREEN_HEIGHT = 960;
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
    this.player = Sprite('objects', 120, 120).addChildTo(this);
    this.player.setPosition(SCREEN_WIDTH/2, SCREEN_HEIGHT*0.9);
    //  player animation
    var anim = FrameAnimation('player_ss').attachTo(this.player);
    anim.gotoAndPlay('normal');
  },

  // update
  update: function(app) {
    var p = app.pointer;
    
    if (p.getPointing()) {
      var x_diff = this.player.x - p.x;
      if (Math.abs(x_diff) > SPEED) {
        // move horizontal direction
        if (x_diff < 0) {
          this.player.x += SPEED;
        } else {
          this.player.x -= SPEED;
        }
      }
      var y_diff = this.player.y - p.y;
      if (Math.abs(y_diff) > SPEED) {
        // move vertical direction
        if (y_diff < 0) {
          this.player.y += SPEED;
        } else {
          this.player.y -= SPEED;
        }
      }
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
