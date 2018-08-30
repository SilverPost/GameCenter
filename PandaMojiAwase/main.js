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
var LETTER_FONT_SIZE = 64;

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
    SoundManager.setVolumeMusic(0.5);
    
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
    // question index
    this.questionIndex = this.question_index();
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
    this.question_image.showing(this.questionIndex);
    // display letter(s)
    this.displayLettersGroup = DisplayElement().addChildTo(this);
    this.displayLetters = DisplayLetters();
    this.displayLetters.loading(this.displayLettersGroup, this.displayArea, this.questionIndex);
    // input letter(s)
    this.inputLettersGroup = DisplayElement().addChildTo(this);
    this.inputLetters = InputLetters();
    this.inputLetters.loading(this.inputLettersGroup, this.inputArea, this.questionIndex);
  },
  question_index: function() {
    return Math.randint(0, ANSWER_SET.length-1);
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
 * letter panel
 */
phina.define("LetterPanel", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
  },
  loading: function(group, letter, color, x, y) {
    this.rect = this.rect(color, x, y);
    this.rect.addChildTo(group);
    this.letter = this.letter(letter, x, y);
    this.letter.addChildTo(group);
  },
  rect: function(color, x, y) {
    var rect = RectangleShape();
    rect.setPosition(x, y);
    rect.width = LETTER_RECT_WIDTH;
    rect.height = LETTER_RECT_HEIGHT;
    rect.fill = color;
    return rect;
  },
  letter: function(letter, x, y) {
    var label = Label({
      text:letter,
      fontSize:LETTER_FONT_SIZE,
    });
    label.setPosition(x, y);
    return label;
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
      this.letters[i] = LetterPanel();
      this.letters[i].loading(group, "？", '#c1cfff', x, area.y);
      x += area.width/letter_num;
    }
  },
});

/*
 * panels to input answer letter(s)
 */
phina.define("InputLetters", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
  },
  loading: function(group, area, index) {
    var cols = 4;
    var rows = 2;
    this.panels = [];

    var x = area.left + area.width/cols/2;
    var y = area.top + area.height/rows/2;
    for(var i=0; i<rows; i++) {
      for(var j=0; j<cols; j++) {
        this.panels[j] = [];
        this.panels[j][i] = LetterPanel();
        this.panels[j][i].loading(group, "？", '#dbffe5', x, y);
        x += area.width/rows/2;
      }
      x = area.left + area.width/cols/2;
      y += area.height/rows;
    }
    
/*    var x = area.left + area.width/(cols+1);
    var y = area.top + area.height/(rows+1);
    for(var i=0; i<rows; i++) {
      for(var j=0; j<cols; j++) {
        this.panels[j] = [];
        this.panels[j][i] = LetterPanel();
        this.panels[j][i].loading(group, "？", x, y);
        x += area.width/(cols+1);
      }
      x = area.left + area.width/(cols+1);
      y += area.height/(rows+1);
    }*/
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
