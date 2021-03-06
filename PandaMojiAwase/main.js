/*
 * Panda moji awase
 */

phina.globalize();

// size information
var SCREEN_WIDTH  = 640;
var SCREEN_HEIGHT = 960;
var TITLE_LOGO_WIDTH   = 600;
var TITLE_LOGO_HEIGHT  = 192;
var TITLE_PANDA_WIDTH   = 611;
var TITLE_PANDA_HEIGHT  = 575;
var QUESTION_IMAGE_WIDTH   = 288;
var QUESTION_IMAGE_HEIGHT  = 216;
var LETTER_RECT_WIDTH = 120;
var LETTER_RECT_HEIGHT = 120;
var LETTER_FONT_SIZE = 64;
var RESULT_IMAGE_WIDTH = 600;
var RESULT_IMAGE_HEIGHT = 252;
var HINT_MODAL_WIDTH = 620;
var HINT_MODAL_HEIGHT = 482;

// value information
var TEXT_COLOR_TAPPED = 'lightgray';
var TEXT_COLOR_UNTAPPED = 'black';
var INPUT_RECT_COLOR_TAPPED = 'gray';
var INPUT_RECT_COLOR_UNTAPPED = '#dbffe5';
var DISPLAY_RECT_COLOR = "#c1cfff";
var INPUT_PANEL_COLS = 4;
var INPUT_PANEL_ROWS = 2;

// font information
var FONT_FAMILY = "Verdana, Roboto, 'Droid Sans', 'Hiragino Kaku Gothic ProN', sans-serif";

// hiragana list
var HIRAGANA = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 
                'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 
                'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 
                'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 
                'る', 'れ', 'ろ', 'わ', 'を', 'ん', 'が', 'ぎ', 'ぐ', 'げ', 
                'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 
                'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 
                'ぽ', 'ゃ', 'ゅ', 'ょ', 'っ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
                'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 
                'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 
                'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 
                'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 
                'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン', 'ガ', 'ギ', 'グ', 'ゲ', 
                'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 
                'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 
                'ポ', 'ャ', 'ュ', 'ョ', 'ッ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ー'];

// answer information
var ANSWER_SET = [
  'はやぶさ', 'こまち', 'かがやき', 'つばさ', 'はやぶさ', 'のぞみ', 'つばめ', 'こだま', 'コッシー', 'サボさん',
  'トヨタ', 'ホンダ', 'スバル', 'マツダ', 'ニッサン', 'スズキ', 'ダイハツ', 'レクサス', 'うし', 'うま',
  'アンパンマン', 'ばいきんまん', 'ドキンちゃん', 'バタコさん', 'ダッフィー', 'シェリーメイ', 'ベイマックス', 'ドリー', 'ひつじ', 'さる',
  'ミッキー', 'ミニー', 'ドナルド', 'プーさん', 'バズ', 'ウッディ', 'プルート', 'ニモ', 'いぬ', 'コアラ',
  'デイジー', 'シャショット', 'グーフィー', 'みずほ', 'のぞみ', 'パンダ', 'ライオン', 'ねこ', 'しろくま', 'ペンギン',
  'うさぎ', 'キリン', 'ゴリラ', 'ニワトリ', 'ハムスター', 'ぞう', 'てんとうむし', 'タカラトミー', 'しまうま', 'りんご',
  'ハヤト', 'アキタ', 'ツラヌキ', 'そらジロー', 'くもジロー', 'ぽつリン', 'ワンワン', 'うーたん', 'バナナ', 'すいか',
  'パトカー', 'きしゃ', 'バス', 'タクシー', 'ブルドーザー', 'しょうぼうしゃ', 'バイク', 'じてんしゃ', 'ショベルカー', 'ダンプカー',
  'ひこうき', 'ヘリコプター', 'トラック', 'ドラえもん', 'あり', 'にんじん', 'ブロッコリー', 'じゃがいも', 'だいこん', 'キャベツ',
  'はなかっぱ', 'カレーパンマン', 'しょくぱんまん', 'チーズ', 'イーストアイ', 'ジェイク', 'フック', 'スミー', 'レグ', 'チーバくん',
  'トリニティー', 'イルカ', 'くじら', 'とびばこ', 'クレヨン', 'ツムツム', 'はやぶさ', 'カイサツソード', 'シャリンドリル', 'フミキリガン',
  'カーズ', 'ズートピア', 'くまモン', 'シンカ', 'ジャングルジム', 'おむすびまん', 'カバお', 'メロンパンナ', 'ロールパンナ', 'あかちゃんまん',
  'スパゲッティ', 'ハンバーガー', 'せんべい', 'ラーメン', 'バーベキュー', 'とうもろこし', 'トランプ', 'プール', 'たんぽぽ', 'チューリップ',
  'トーマス', 'パーシー', 'ジェームス', 'カレーライス', 'そうめん', 'ブランコ', 'タイヤ', 'タオル', 'フライパン', 'サンタクロース'
  ];
var HINT_SET = [
  'はやぶさ', 'こまち', 'かがやき', 'つばさ', 'はやぶさ', 'のぞみ', 'つばめ', 'こだま', 'こっしー', 'さぼさん',
  'とよた', 'ほんだ', 'すばる', 'まつだ', 'にっさん', 'すずき', 'だいはつ', 'れくさす', 'うし', 'うま',
  'あんぱんまん', 'ばいきんまん', 'どきんちゃん', 'ばたこさん', 'だっふぃー', 'しぇりーめい', 'べいまっくす', 'どりー', 'ひつじ', 'さる',
  'みっきー', 'みにー', 'どなるど', 'ぷーさん', 'ばず', 'うっでぃ', 'ぷるーと', 'にも', 'いぬ', 'こあら',
  'でいじー', 'しゃしょっと', 'ぐーふぃー', 'みずほ', 'のぞみ', 'ぱんだ', 'らいおん', 'ねこ', 'しろくま', 'ぺんぎん',
  'うさぎ', 'きりん', 'ごりら', 'にわとり', 'はむすたー', 'ぞう', 'てんとうむし', 'たからとみー', 'しまうま', 'りんご',
  'はやと', 'あきた', 'つらぬき', 'そらじろー', 'くもじろー', 'ぽつりん', 'わんわん', 'うーたん', 'ばなな', 'すいか',
  'ぱとかー', 'きしゃ', 'ばす', 'たくしー', 'ぶるどーざー', 'しょうぼうしゃ', 'ばいく', 'じてんしゃ', 'しょべるかー', 'だんぷかー',
  'ひこうき', 'へりこぷたー', 'とらっく', 'どらえもん', 'あり', 'にんじん', 'ぶろっこりー', 'じゃがいも', 'だいこん', 'きゃべつ',
  'はなかっぱ', 'かれーぱんまん', 'しょくぱんまん', 'ちーず', 'いーすとあい', 'じぇいく', 'ふっく', 'すみー', 'れぐ', 'ちーばくん',
  'とりにてぃー', 'いるか', 'くじら', 'とびばこ', 'くれよん', 'つむつむ', 'はやぶさ', 'かいさつそーど', 'しゃりんどりる', 'ふみきりがん',
  'かーず', 'ずーとぴあ', 'くまもん', 'しんか', 'じゃんぐるじむ', 'おむすびまん', 'かばお', 'めろんぱんな', 'ろーるぱんな', 'あかちゃんまん',
  'すぱげってぃ', 'はんばーがー', 'せんべい', 'らーめん', 'ばーべきゅー', 'とうもろこし', 'とらんぷ', 'ぷーる', 'たんぽぽ', 'ちゅーりっぷ',
  'とーます', 'ぱーしー', 'じぇーむす', 'かれーらいす', 'そうめん', 'ぶらんこ', 'たいや', 'たおる', 'ふらいぱん', 'さんたくろーす'
  ];

var DISPLAY_LETTERS = [];

var ASSETS = {
  sound: {
    'bgm': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/sound/bgm.mp3',
    'ok': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/sound/correct.mp3',
    'ng': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/sound/boo.mp3',
    'input': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/sound/input.mp3',
  },
  image: {
    'logo': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/title_logo.png',
    'panda': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/title_panda.png',
    'question': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/questions.png',
    'result': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/answer.png',
    'hint': 'https://raw.githubusercontent.com/SilverPost/GameCenter/master/PandaMojiAwase/image/hint.png',
  },
  spritesheet: {
    'question_ss':
    {
      "frame": {
        "width": QUESTION_IMAGE_WIDTH,
        "height": QUESTION_IMAGE_HEIGHT,
        "cols": 10,
        "rows": 14,
      },
      "animations" : {
      }
    },
    'result_ss':
    {
      "frame": {
        "width": RESULT_IMAGE_WIDTH,
        "height": RESULT_IMAGE_HEIGHT,
        "cols": 2,
        "rows": 1,
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
    
    this.logo = Sprite('logo').addChildTo(this);
    this.logo.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.25);
    this.logo.width = TITLE_LOGO_WIDTH;
    this.logo.height = TITLE_LOGO_HEIGHT;
    
    this.panda = Sprite('panda').addChildTo(this);
    this.panda.setPosition(SCREEN_WIDTH*0.7, SCREEN_HEIGHT*0.8);
    this.panda.width = TITLE_PANDA_WIDTH;
    this.panda.height = TITLE_PANDA_HEIGHT;
    this.panda.rotation = 10;
    
    Label({
      text: 'ここをおしてね',
      fontSize: 48,
      fill: 'black',
      fontFamily: FONT_FAMILY,
    }).addChildTo(this).setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.45);
  },
  update: function(app) {
    this.logo.tweener
      .scaleTo(1.04, 1000)
      .scaleTo(0.98, 1000)
      .play();

    if(app.frame % 30 === 0) {
      this.panda.rotation *= -1;
    }
  },
  onpointstart: function() {
    SoundManager.setVolumeMusic(0.3);
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
    // delete button
    this.deleteButtonGroup = DisplayElement().addChildTo(this);
    this.deleteButton = DeleteButton();
    this.deleteButton.loading(this.deleteButtonGroup, this.imageArea, this.questionIndex);
    // hint button (only all Katakana)
    if(this.isAllHiragana(ANSWER_SET[this.questionIndex]) === false) {
      this.hintButtonGroup = DisplayElement().addChildTo(this);
      this.hintButton = HintButton();
      this.hintButton.loading(this.hintButtonGroup, this.imageArea, this.questionIndex);
    }
  },
  update: function() {
    this.update_display_letters();
    this.check_answer();
  },
  question_index: function() {
    return Math.randint(0, ANSWER_SET.length-1);
  },
  update_display_letters: function() {
    for(var i=0; i<DISPLAY_LETTERS.length; i++) {
      this.displayLetters.insert_letter(i, DISPLAY_LETTERS[i]);
    }
  },
  reset_input_letters: function() {
    DISPLAY_LETTERS = [];
    this.displayLetters.reset_letters(this.questionIndex);
    this.inputLetters.reset_all_tapped_letters();
  },
  check_answer: function() {
    if(DISPLAY_LETTERS.length != ANSWER_SET[this.questionIndex].length) {
      return;
    }
    if(this.displayLetters.is_correct_answer(this.questionIndex)) {
      this.correct();
    } else {
      this.incorrect();
    }
  },
  correct: function() {
    SoundManager.play('ok');
    this.exit({
      result: 'correct',
      questionIndex: this.questionIndex,
    });
  },
  incorrect: function() {
    SoundManager.play('ng');
    this.exit({
      result: 'incorrect',
      questionIndex: this.questionIndex,
    });
  },
  isAllHiragana: function(str) {
    if (str.match(/^[\u3040-\u309F]+$/)) {
      return true;
    } else {
      return false;
    }
  },
});

/*
 * result scene
 */
phina.define("ResultScene", {
  superClass: "DisplayScene",
  init: function(param) {
    this.superInit(param);
    
    // result image
    this.resultSprite = this.result_sprite(param);
    this.resultSprite.addChildTo(this);
    this.result_sprite_animation();
    
    // display area
    this.displayArea = BackgroundArea().addChildTo(this);
    this.displayArea.loading(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5, SCREEN_WIDTH,SCREEN_HEIGHT*0.2);
    this.displayArea.fill = 'transparent';
    this.displayArea.stroke = 'transparent';
    this.displayLettersGroup = DisplayElement().addChildTo(this);
    this.displayLetters = DisplayLetters();
    this.displayLetters.loading(this.displayLettersGroup, this.displayArea, param.questionIndex);
    
    Label({
      text: 'つぎのもんだい にすすむ',
      fontSize: 48,
      fill: 'black',
      fontFamily: FONT_FAMILY,
    }).addChildTo(this).setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.7);
  },
  update: function() {
    this.update_display_letters();
  },
  result_sprite: function(param) {
    var result_image = Sprite('result');
    result_image.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.25);
    result_image.width = RESULT_IMAGE_WIDTH;
    result_image.height = RESULT_IMAGE_HEIGHT;
    result_image.alpha = 0;
    var ss = FrameAnimation('result_ss');
    ss.attachTo(this);
    var image_index = this.is_correct(param.result) ? 0 : 1;
    result_image.frameIndex = image_index;
    return result_image;
  },
  result_sprite_animation: function() {
    var tween1 = Tweener().fadeIn(1000);
    var tween2 = Tweener().scaleTo(1.1, 1000);
    tween1.attachTo(this.resultSprite);
    tween2.attachTo(this.resultSprite);
  },
  is_correct: function(result) {
    return (result == 'correct') ? true : false;
  },
  update_display_letters: function() {
    for(var i=0; i<DISPLAY_LETTERS.length; i++) {
      this.displayLetters.insert_letter(i, DISPLAY_LETTERS[i]);
    }
  },
  reset_question_info: function() {
    DISPLAY_LETTERS = [];
  },
  onpointstart: function() {
    this.reset_question_info();
    this.exit();
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
 * hint button
 */
phina.define("HintButton", {
  superClass: "Button",
  init: function() {
    this.superInit();
  },
  loading: function(group, image_area, answer_index) {
    this.width = image_area.width*0.1;
    this.height = image_area.height*0.8;
    this.setPosition(image_area.width*0.072, image_area.height*0.5);
    this.fill = '#e97062';
    this.stroke = 'brown';
    this.text = '';
    var self = this;
    this.onpointend = function() {
      self.tapped(group, answer_index);
    };
    this.addChildTo(group);
    // string
    this.str = Label({
                  text: 'ヒ\nン\nト',
                  fontSize: 36,
                  fill: 'white',
                  stroke: 'transparent',
                  fontFamily: FONT_FAMILY,
                }).addChildTo(group);
    this.str.setPosition(this.x, this.y);
  },
  tapped: function(group, answer_index) {
    this.hintModal = HintModal();
    this.hintModal.loading(group, answer_index);
  },
});

/*
 * hint modal
 */
phina.define("HintModal", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
    this.width = SCREEN_WIDTH;
    this.height = SCREEN_HEIGHT;
    this.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5);
    this.fill = 'black';
    this.alpha = 0.6;
  },
  loading: function(group, answer_index) {
    this.addChildTo(group);
    // modal rectangle
    this.modal = Sprite('hint').addChildTo(group);
    this.modal.width = HINT_MODAL_WIDTH;
    this.modal.height = HINT_MODAL_HEIGHT;
    this.modal.setPosition(SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.6);
    // hint string
    this.hint_label = Label({
                        text: HINT_SET[answer_index],
                        fontSize: 64,
                        fill: 'blue',
                        fontFamily: FONT_FAMILY,
                      }).addChildTo(group);
    this.hint_label.setPosition(HINT_MODAL_WIDTH*0.5,
                                this.modal.top + HINT_MODAL_HEIGHT*0.64);
    // close Button
    this.close_button = Button({
                          width: HINT_MODAL_WIDTH*0.14,
                          height: HINT_MODAL_WIDTH*0.14,
                          text: '',
                          fill: 'transparent',
                          strokeWidth: 0,
                        }).addChildTo(group);
    this.close_button.setPosition(this.modal.left + HINT_MODAL_WIDTH*0.88,
                                  this.modal.top + HINT_MODAL_HEIGHT*0.28);
    var self = this;
    this.close_button.onpointend = function() {
      self.tapped();
    };
  },
  tapped: function(group, answer_index) {
    this.remove_modal();
  },
  remove_modal: function() {
    this.close_button.remove();
    this.hint_label.remove();
    this.modal.remove();
    this.remove();
  },
});

/*
 * delete button
 */
phina.define("DeleteButton", {
  superClass: "Button",
  init: function() {
    this.superInit();
  },
  loading: function(group, image_area, answer_index) {
    this.width = image_area.width*0.1;
    this.height = image_area.height*0.8;
    this.setPosition(image_area.width*0.928, image_area.height*0.5);
    this.fill = '#7d7dd1';
    this.stroke = 'darkblue';
    this.text = '';
    var self = this;
    this.onpointend = function() {
      self.tapped();
    };
    this.addChildTo(group);
    // string
    this.str = Label({
                  text: 'も\nじ\nを\nけ\nす',
                  fontSize: 36,
                  fill: 'white',
                  stroke: 'transparent',
                  fontFamily: FONT_FAMILY,
                }).addChildTo(group);
    this.str.setPosition(this.x, this.y);
  },
  tapped: function() {
    this.parent.parent.reset_input_letters();
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
      fontFamily: FONT_FAMILY,
    });
    label.setPosition(x, y);
    return label;
  },
  set_letter: function(letter) {
    this.letter.text = letter;
  }
});

/*
 * letters inputed by user(s)
 */
phina.define("DisplayLetters", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
  },
  loading: function(group, area, answer_index) {
    var letter_num = ANSWER_SET[answer_index].length;
    this.letters = [];
    var x = area.left + area.width/letter_num/2;
    for(var i=0; i<letter_num; i++) {
      this.letters[i] = LetterPanel();
      if(DISPLAY_LETTERS.length == 0) {
        this.letters[i].loading(group, "？", DISPLAY_RECT_COLOR, x, area.y);
      } else {
        this.letters[i].loading(group, DISPLAY_LETTERS[i], DISPLAY_RECT_COLOR, x, area.y);
      }
      var self = this;
      x += area.width/letter_num;
    }
  },
  reset_letters: function(answer_index) {
    DISPLAY_LETTERS = [];
    var letter_num = ANSWER_SET[answer_index].length;
    for(var i=0; i<letter_num; i++) {
      this.letters[i].set_letter("？");
    }
  },
  insert_letter: function(index, letter) {
    this.letters[index].letter.text = letter;
  },
  is_correct_answer: function(answer_index) {
    var display_string = '';
    for(var i=0; i<DISPLAY_LETTERS.length; i++) {
      display_string += this.letters[i].letter.text;
    }
    return (display_string == ANSWER_SET[answer_index]) ? true : false;
  },
});

/*
 * panels to input answer letter(s)
 */
phina.define("InputLetter", {
  superClass: "LetterPanel",
  init: function() {
    this.superInit();
  },
  loading: function(group, letter, color, x, y) {
    this.superMethod('loading', group, letter, color, x, y);
  },
  tap_action: function(group) {
    this.inputButton = InputButton(this.rect.width, this.rect.height,
                                   this.rect.x, this.rect.y).addChildTo(group);
    var self = this;
    this.inputButton.onpointend = function() {
      self.tapped(self);
    };
  },
  tapped: function(self) {
    SoundManager.play('input');
    self.rect.fill = INPUT_RECT_COLOR_TAPPED;
    self.letter.fill = TEXT_COLOR_TAPPED;
    DISPLAY_LETTERS.push(self.letter.text);
  },
  untapped: function(self) {
    self.rect.fill = INPUT_RECT_COLOR_UNTAPPED;
    self.letter.fill = TEXT_COLOR_UNTAPPED;
  },
});

phina.define("InputButton", {
  superClass: "Button",
  init: function(w, h, x, y) {
    this.superInit({
      width: w,
      height: h,
      text: '',
      strokeWidth: 0,
    });
    this.setPosition(x, y);
    this.fill = 'transparent';
  },
});

phina.define("InputLetters", {
  superClass: "RectangleShape",
  init: function() {
    this.superInit();
  },
  loading: function(group, area, index) {
    this.panels = [];
    this.already_set_answer = [];
    for(var j=0; j<INPUT_PANEL_COLS; j++) {
      this.panels[j] = [];
      this.already_set_answer[j] = [];
    }
    this.answer_letters = ANSWER_SET[index].split('');
    
    var x = area.left + area.width/INPUT_PANEL_COLS/2;
    var y = area.top + area.height/INPUT_PANEL_ROWS/2;
    for(var i=0; i<INPUT_PANEL_ROWS; i++) {
      for(var j=0; j<INPUT_PANEL_COLS; j++) {
        this.panels[j][i] = InputLetter();
        this.panels[j][i].loading(group, this.random_hiragana(), 
                                  INPUT_RECT_COLOR_UNTAPPED, x, y);
        this.panels[j][i].tap_action(group);
        x += area.width/INPUT_PANEL_ROWS/2;
      }
      x = area.left + area.width/INPUT_PANEL_COLS/2;
      y += area.height/INPUT_PANEL_ROWS;
    }
    this.set_answer_letters(index);
  },
  random_hiragana: function() {
    return HIRAGANA[Math.randint(0, HIRAGANA.length-1)];
  },
  set_answer_letters: function(index) {
    for(var i=0; i<INPUT_PANEL_ROWS; i++) {
      for(var j=0; j<INPUT_PANEL_COLS; j++) {
        this.already_set_answer[j][i] = false;
      }
    }
    for(var k=0; k<this.answer_letters.length; k++) {
      this.set_answer_letter(k);
    }
  },
  set_answer_letter: function(k) {
    var j_index = Math.randint(0, INPUT_PANEL_COLS-1);
    var i_index = Math.randint(0, INPUT_PANEL_ROWS-1);
    if(this.already_set_answer[j_index][i_index] == true) {
      this.set_answer_letter(k);
      return;
    }
    this.panels[j_index][i_index].letter.text = this.answer_letters[k];
    this.already_set_answer[j_index][i_index] = true;
  },
  reset_all_tapped_letters: function() {
    for(var i=0; i<INPUT_PANEL_ROWS; i++) {
      for(var j=0; j<INPUT_PANEL_COLS; j++) {
        this.panels[j][i].untapped(this.panels[j][i]);
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
        nextLabel: "result",
      },
      {
        label: "result",
        className: "ResultScene",
        nextLabel: "game",
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
  
  app.run();
});
