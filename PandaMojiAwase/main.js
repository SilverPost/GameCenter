/*
 * Panda moji awase
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 960;
var SCREEN_HEIGHT = 1280;

var ASSETS = {
  image: {
    '50on': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/50on.png',
    'hayabusa': 'http://www.shinkalion.com/wp/wp-content/themes/shinkalion/image/anime/shinkarion/e5/img.png',
    'komachi': 'http://www.shinkalion.com/wp/wp-content/themes/shinkalion/image/anime/shinkarion/e6/img.png',
    'kagayaki': 'http://www.shinkalion.com/wp/wp-content/themes/shinkalion/image/anime/shinkarion/e7/img.png',
    'subaru': 'http://car-moby.jp/wp-content/uploads/2016/11/30b08ed771414ef523728b9bbb52116e.jpg',
    'honda': 'http://car-moby.jp/wp-content/uploads/2016/11/3b01fa6d218455c3e18ad496c02a9db8.jpg',
    'mazda': 'http://car-moby.jp/media?id=237008&post=60984&num=8',
  },
};

/*
 * title scene
 */
phina.define("TitleScene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit();
  },
});

/*
 * game scene
 */
phina.define("Gamecene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit();
  },
});

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
