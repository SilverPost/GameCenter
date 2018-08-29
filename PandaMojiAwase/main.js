/*
 * Panda moji awase
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 640;
var SCREEN_HEIGHT = 960;
var TITLE_PANDA_WIDTH   = 611;
var TITLE_PANDA_HEIGHT  = 575;
var QUESTION_IMAGE_WIDTH   = 288;
var QUESTION_IMAGE_HEIGHT  = 216;
var LETTER_RECT_WIDTH = 120;
var LETTER_RECT_HEIGHT = 120;
var LETTER_FONT_SIE = 64;

// answer information
var ANSWER_SET = [
  'はやぶさ', 'こまち', 'かがやき', 'つばさ', 
  'とよた', 'ほんだ', 'すばる', 'まつだ'
];

var ASSETS = {
  sound: {
    'bgm': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/sound/bgm.mp3',
    'ok': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/sound/correct.mp3',
    'ng': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/sound/blip.mp3',
  },
  image: {
    'panda': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/title_panda.png',
    '50on': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/50on.png',
    'question': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/questions.png',
  },
  spritesheet: {
    'question_ss':
    {
      "frame": {
        "width": QUESTION_IMAGE_WIDTH,
        "height": QUESTION_IMAGE_HEIGHT,
        "cols": 4,
        "rows": 2,
      },
      "animations" : {
      }
    },
  }
};

/*
 * title scene
 */
phina.define("TitleScene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit();
    this.backgroundColor = 'skyblue';
    
    SoundManager.playMusic('bgm');

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
    SoundManager.play('ok');
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
    // question image
    this.question_image = QuestionImage().addChildTo(this);
    this.question_image.loading(this.imageArea);
    this.question_image.showing(0); // for unit test
    // display letter(s)
    this.displayLettersGroup = DisplayElement().addChildTo(this);
    this.displayLetters = DisplayLetters(this.displayLettersGroup);
    this.displayLetters.loading(this.displayLettersGroup, this.displayArea, 0);
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
    this.superInit('question');
  },
  loading: function(area) {
    this.setPosition(area.x, area.y);
    this.width = QUESTION_IMAGE_WIDTH;
    this.height = QUESTION_IMAGE_HEIGHT;
    var ss = FrameAnimation('question_ss');
    ss.attachTo(this);
    this.alpha = 0;
  },
  showing: function(index) {
    this.frameIndex = index;
    var tween1 = Tweener().fadeIn(1000);
    var tween2 = Tweener().scaleTo(1.6, 1000);
    tween1.attachTo(this);
    tween2.attachTo(this);
  },
});

/*
 * letters inputed by user(s)
 */
phina.define("DisplayLetters", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
  },
  loading: function(group, area, index) {
    var letter_num = ANSWER_SET[index].length;
    this.letters = [];
    var x = area.left + area.width/letter_num/2;
    for(var i=0; i<letter_num; i++) {
      this.letters[i]  = DisplayLetter();
      this.letters[i].loading(group, "？", x, area.y);
      x += area.width/letter_num;
    }
  },
});

phina.define("DisplayLetter", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
  },
  loading: function(group, letter, x, y) {
    this.rect = this.rect(x, y);
    this.rect.addChildTo(group);
    this.letter = this.letter(letter, x, y);
    this.letter.addChildTo(group);
  },
  rect: function(x, y) {
    var rect = RectangleShape();
    rect.setPosition(x, y);
    rect.width = LETTER_RECT_WIDTH;
    rect.height = LETTER_RECT_HEIGHT;
    rect.fill = 'skyblue';
    return rect;
  },
  letter: function(letter, x, y) {
    var label = Label({
      text:letter,
      fontSize:LETTER_FONT_SIE,
    });
    label.setPosition(x, y);
    return label;
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
