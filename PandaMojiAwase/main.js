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
    'question': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/questions.png',
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
    this.imageArea = BackgroundArea().addChildTo(this);
    this.imageArea.loading(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.2, SCREEN_WIDTH, SCREEN_HEIGHT*0.4);
    this.displayArea = BackgroundArea().addChildTo(this);
    this.displayArea.loading(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5, SCREEN_WIDTH,SCREEN_HEIGHT*0.2);
    this.inputArea = BackgroundArea().addChildTo(this);
    this.inputArea.loading(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.8, SCREEN_WIDTH, SCREEN_HEIGHT*0.4);
  },
});

/*
 * background of area
 */
phina.define("BackgroundArea", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
  },
  loading: function(x, y, width, height) {
    this.setPosition(x, y);
    this.width = width;
    this.height = height;
    this.fill = '#f5f5f5';
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
