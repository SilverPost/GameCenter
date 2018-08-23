/*
 * Panda moji awase
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 640;
var SCREEN_HEIGHT = 960;
var TITLE_PANDA_WIDTH   = 611;
var TITLE_PANDA_HEIGHT  = 575;

var ASSETS = {
  image: {
    'panda': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/title_panda.png',
    '50on': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/50on.png',
    'hayabusa': 'http://www.shinkalion.com/wp/wp-content/themes/shinkalion/image/anime/shinkarion/e5/img.png',
    'komachi': 'http://www.shinkalion.com/wp/wp-content/themes/shinkalion/image/anime/shinkarion/e6/img.png',
    'kagayaki': 'http://www.shinkalion.com/wp/wp-content/themes/shinkalion/image/anime/shinkarion/e7/img.png',
    'subaru': 'http://car-moby.jp/wp-content/uploads/2016/11/30b08ed771414ef523728b9bbb52116e.jpg',
    'honda': 'http://car-moby.jp/wp-content/uploads/2016/11/3b01fa6d218455c3e18ad496c02a9db8.jpg',
    'mazda': 'http://car-moby.jp/wp-content/uploads/2016/11/d1d04c3bdb21d5208ad03ca11e1c90461.jpg',
  },
};

/*
 * title scene
 */
phina.define("TitleScene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit();
    this.backgroundColor = 'skyblue';

    this.panda = Sprite('panda').addChildTo(this);
    this.panda.setPosition(SCREEN_WIDTH*0.7, SCREEN_HEIGHT*0.8);
    this.panda.width = TITLE_PANDA_WIDTH;
    this.panda.height = TITLE_PANDA_HEIGHT;
    this.panda.rotation = 10;
    
    Label({
      text: 'ここをおしてね',
      fontSize: 48,
      fill: 'black',
    }).addChildTo(this).setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.4);
  },
  update: function(app) {
    if(app.frame % 30 === 0) {
      this.panda.rotation *= -1;
    }
  },
  onpointstart: function() {
    this.exit();  
  },
});

/*
 * game scene
 */
phina.define("GameScene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit();
    this.backgroundColor = "skyblue";
    // background
    this.imageArea = RectangleShape().addChildTo(this);
    this.imageArea.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.2);
    this.imageArea.width = SCREEN_WIDTH;
    this.imageArea.height = SCREEN_HEIGHT*0.4;
    this.imageArea.fill = "#f5f5f5";
    this.displayArea = RectangleShape().addChildTo(this);
    this.displayArea.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5);
    this.displayArea.width = SCREEN_WIDTH;
    this.displayArea.height = SCREEN_HEIGHT*0.2;
    this.displayArea.fill = "#f5f5f5";
    this.inputArea = RectangleShape().addChildTo(this);
    this.inputArea.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.8);
    this.inputArea.width = SCREEN_WIDTH;
    this.inputArea.height = SCREEN_HEIGHT*0.4;
    this.inputArea.fill = "#f5f5f5";
  },
});

/*
 * question images
 */
phina.define("QuestionImage", {
  superClass: "Sprite",
  init: function() {
    this.superInit();
  },
  loading: function() {
    
  },
})

/*
 * main function
 */
phina.main(function() {
  // create application
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
    startLabel: 'title',
    scenes: [
      {
        label: "title",
        className: "TitleScene",
        nextLabel: "game",
      },
      {
        label: "game",
        className: "GameScene",
        nextLabel: "title",
      },
    ]
  });
  
  // a dummy function that sound(s) can play with smartphone(s)
  app.domElement.addEventListener('touchend', function dummy() {
    var s = phina.asset.Sound();
    s.loadFromBuffer();
    s.play().stop();
    app.domElement.removeEventListener('touchend', dummy);
  });

  // enable FPS
  app.enableStats();
  
  app.run();
});
