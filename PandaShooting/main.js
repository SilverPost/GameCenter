/*
 * Panda Shooting
 */

phina.globalize();

// images
var ASSETS = {
  image: {
    bg: "http://jsrun.it/assets/a/G/5/Y/aG5YD.png",
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
    this.player = Sprite('objects', 120, 120).addChildTo(this);
    this.player.setPosition(SCREEN_WIDTH/2, SCREEN_HEIGHT-60);
    //  player animation
    var anim = FrameAnimation('player_ss').attachTo(this.player);
    anim.gotoAndPlay('normal');
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
        }
        // move left
        else {
          this.player.x -= SPEED;
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
