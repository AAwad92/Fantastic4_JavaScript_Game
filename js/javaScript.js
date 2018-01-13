window.onload = function(){
  document.getElementById("loading").setAttribute("style","display:none");
  document.getElementById("wholePage").setAttribute("style","display:block");
}

// create player Object

var player = function(){
  this.name = "";
  this.level = 1;
  this.score = 0;
  this.lives = 3;
  this.winWithoutLose = 0;
  this.pageInDisplay = "preloader";
}

player.prototype.setName = function(name){
  this.name = name;
}

player.prototype.getName = function(){
  return this.name;
}

player.prototype.setLevel = function(level){
  this.level = level;
}

player.prototype.getLevel = function(){
  return this.level;
}

player.prototype.setScore = function(score){
  this.score = score;
}

player.prototype.getScore = function(){
  return this.score;
}

player.prototype.setLives = function(lives){
  if(lives >= 0){
  this.lives = lives;
  }
}

player.prototype.getLives = function(){
  return this.lives;
}

player.prototype.setPageInDisplay = function(PageInDisplay){
  this.pageInDisplay = PageInDisplay;
}

player.prototype.getPageInDisplay = function(){
  return this.pageInDisplay;
}

player.prototype.setWinWithoutLose = function(winWithoutLose){
  this.winWithoutLose = winWithoutLose;
}

player.prototype.getWinWithoutLose = function(){
  return this.winWithoutLose;
}

player.prototype.setPlayerVars = function(type){
  document.getElementById("level"+type).innerHTML = this.getLevel();
  document.getElementById("score"+type).innerHTML = this.getScore();
  document.getElementById("lives"+type).innerHTML = this.getLives();
}

player.prototype.backBtn = function(){
  if(this.getPageInDisplay() == "EasyPlayArea" || this.getPageInDisplay() == "mediumPlayArea" || this.getPageInDisplay() == "hardPlayArea" || this.getPageInDisplay() == "map"){

    exitCheck();

  }else{
    document.getElementById(this.pageInDisplay).setAttribute("style","display:none");
    document.getElementById("start").setAttribute("style","display:block");
    this.setPageInDisplay("start");
  }
}

var player1 = new player();

var previous = document.getElementById("prev");
previous.addEventListener("click",player1.backBtn.bind(player1));

// show and hide pages

class magic{
  constructor(elementForMagic){
    this.elementId = elementForMagic;
  }

  show(){
    document.getElementById(this.elementId).style.display = "block";
  }

  hide(){
    document.getElementById(this.elementId).style.display = "none";
  }
}

var preloader = new magic("preloader");
var start = new magic("start");
var selectCharacter = new magic("selectCharacter");
var levels = new magic("levels");
var easy = new magic("EasyPlayArea");
var medium = new magic("mediumPlayArea");
var hard = new magic("hardPlayArea");
var mapLevel = new magic("map");
var looser = new magic("looser");
var badges = new magic("badges");
var transferLevel = new magic("transfer_for_levels");



// setting the game logic

class Levels {
  constructor(){
    this.tempPattern = 0;
    this.numOfMoves = 0;
    this.quitFlag = 0;
    this.showMode = true;
    this.playMode = false;
    this.threadMode = false;
    this.imageShow = "<img id = 'player' src='images/minions/minions-03.png'>";
    this.imagePlay = "";
  }

  setTempPattern(str){this.tempPattern = str;}
  getTempPattern(){return this.tempPattern;}
  setNumOfMoves(str){this.numOfMoves = str;}
  getNumOfMoves(){return this.numOfMoves;}
  setQuitFlag(str){this.quitFlag = str;}
  getQuitFlag(){return this.quitFlag;}
  setShowMode(str){this.showMode = str;}
  getShowMode(){return this.showMode;}
  setPlayMode(str){this.playMode = str;}
  getPlayMode(){return this.playMode;}
  setThreadMode(str){this.threadMode = str;}
  getThreadMode(){return this.threadMode;}
  getImageShow(){return this.imageShow;}
  getImagePlay(){return this.imagePlay}

}


class easyLevel extends Levels{
  constructor(){
    super();
    this.places = [];
    for(let i = 1;i <= 9;i++){
      this.places.push("easy_btn"+i);
    }
    this.pattern = [5];
    this.idToMove = "easy_btn5";
    this.tempId = "easy_btn5";
  }

  getPlaces(){return this.places;}
  getPattern(){return this.pattern;}
  setPattern(str){this.pattern = str;}
  getIdToMove(){return this.idToMove;}
  setIdToMove(str){this.idToMove = str;}
  getTempId(){return this.tempId;}
  setTempId(str){this.tempId = str;}

  setDefault(){
    this.setPattern([5]);
    this.setIdToMove("easy_btn5");
    this.setNumOfMoves(0);
    this.setQuitFlag(0);
  }

  setDefaultNew(){
    document.getElementById(this.getTempId()).innerHTML = "";
    document.getElementById("easy_btn5").innerHTML =this.getImageShow();
    this.setPattern([5]);
    this.setIdToMove("easy_btn5");
    this.setNumOfMoves(0);
    // this.setQuitFlag(0);
    this.setQuitFlag(-1)
    this.setPlayMode(false)
    this.setShowMode(true)
    this.setThreadMode(false)
    document.getElementById("result").innerHTML = "";
    document.getElementsByTagName("table")[0].style.border = "1px solid rgba(255,255,255,0.2)";
    var place = document.getElementsByClassName("place");
    for(let i = 0;i < place.length;i++){
      place[i].style.border = "1px solid rgba(255,255,255,0.2)";
    }
  }

  moveFunc(){
    document.getElementById(this.getIdToMove()).innerHTML = "";
    let currentPos = Math.floor(Math.random()*9+1);
    let lastPlace = this.getPattern()[this.getPattern().length-1];
    if (currentPos != lastPlace && currentPos != this.getPattern()[this.getPattern().length-2]){
      this.getPattern().push(currentPos);
      this.setIdToMove(this.getPlaces()[currentPos-1]);
      document.getElementById(this.getIdToMove()).innerHTML = this.getImageShow();
      this.setQuitFlag(this.getQuitFlag()+1);
      this.go(this.getNumOfMoves());
    }
    else{
      this.moveFunc();
    }
  }

  go(num){
    if(this.getQuitFlag() < num && this.getQuitFlag() >= 0){
        this.setNumOfMoves(num);
        setTimeout(this.moveFunc.bind(easy_level),1000);
    }else if(this.getQuitFlag() == num){
      this.setTempId(this.getIdToMove());
      this.setTempPattern(this.getPattern());
      this.setDefault();
      this.setThreadMode(true);
      setTimeout(this.callBackPlay.bind(easy_level),1000);
    }
    if(this.getQuitFlag() == -1){
      this.setTempId(this.getIdToMove());
      this.setTempPattern(this.getPattern());
      this.setDefault();
      this.go(num);
    }
  }

  callBackShow(){
    if(this.getShowMode()){
      this.setShowMode(false);
      // e.preventDefault();
      document.getElementById(this.getTempId()).innerHTML = "";
      document.getElementById("easy_btn5").innerHTML = this.getImageShow();
      this.go(player1.getLevel()+1);
      document.getElementById("result").innerHTML = "";
      document.getElementsByTagName("table")[0].style.border = "1px solid rgba(255,255,255,0.2)";
      var place = document.getElementsByClassName("place");
      for(let i = 0;i < place.length;i++){
        place[i].style.border = "1px solid rgba(255,255,255,0.2)";
      }
    }
  }

  callBackPlay(){
      if(!this.getPlayMode() && this.getThreadMode()){
        document.getElementById(this.getTempId()).innerHTML = "";
        document.getElementById("easy_btn5").innerHTML =this.getImagePlay();
        this.setDefault();
        this.setPlayMode(true);
        document.getElementById("moves").innerHTML = player1.getLevel() + 1 -easy_level.getNumOfMoves();
      }
  }




  looser(){
    setTimeout(function(){
      player1.setLevel(1);
      player1.setScore(0);
      player1.setLives(3);
      easy_level.setDefaultNew();
      medi_level.setDefaultNew();
      hard_level.setDefaultNew();
      map_for_levels.setDefault();
      transfer_for_levels.setDefault();
      easy.hide();
      badges.hide();
      looser.show();
      setTimeout(function(){
        looser.hide();
        start.show();
      },2000)
    },500);
  }

}

var easy_level = new easyLevel();


var playFunc = function(){
  if(easy_level.getPlayMode() && easy_level.getNumOfMoves() < easy_level.getTempPattern().length-1){
    if(this.id != easy_level.getIdToMove()){
      document.getElementById(easy_level.getIdToMove()).innerHTML = "";
      easy_level.setIdToMove(this.id);
      document.getElementById(easy_level.getIdToMove()).innerHTML = easy_level.getImagePlay();
      easy_level.getPattern().push(parseInt(easy_level.getIdToMove()[8]));
      easy_level.setNumOfMoves(easy_level.getNumOfMoves()+1);
      document.getElementById("moves").innerHTML = player1.getLevel() + 1 -easy_level.getNumOfMoves()
      validateMoves();
        }
    }
}

for(var i = 0;i < easy_level.getPlaces().length;i++){
  document.getElementsByClassName("easy")[i].addEventListener("click",playFunc);
}

var validateMoves = function(){
  if(easy_level.getPattern().length == easy_level.getTempPattern().length){
    var counter = 0;
    for(var i = 0; i < easy_level.getPattern().length;i++){
        if(easy_level.getPattern()[i] == easy_level.getTempPattern()[i]){counter++;}
    }
    if(counter == easy_level.getPattern().length){
        document.getElementById("result").innerHTML = "Win";
        document.getElementById("result").style.color = "green";
        document.getElementsByTagName("table")[0].style.border = "1px solid green";
        var place = document.getElementsByClassName("place");
        for(let i = 0;i < place.length;i++){
          place[i].style.border = "1px solid green";
        }
        player1.setScore(player1.getScore()+(player1.getLevel()*500));
        player1.setLevel(player1.getLevel()+1);
        player1.setPlayerVars("");
        if(player1.getLevel() == 3){
          ironBadge.badge();
          ironBadge.span.onclick = function(){
            ironBadge.modal.style.display = "none";
          }
        }
        setTimeout(function(){
          easy.hide();
          badges.hide();
          if(player1.getLevel() == 11){
            setTimeout(function(){
              levels.show();
              badges.hide();
            },2500)

          }else{
            easy.hide();
            badges.hide();
            mapLevel.show();
            setTimeout(map_for_levels.character_transfer.bind(map_for_levels),500);
            setTimeout(function(){
              mapLevel.hide();
              easy.show();
              badges.show();
            },2500)
        }},500)

    }
    else{
        document.getElementById("result").innerHTML = "Lose";
        document.getElementById("result").style.color = "red";
        document.getElementsByTagName("table")[0].style.border = "1px solid red";
        var place = document.getElementsByClassName("place");
        for(let i = 0;i < place.length;i++){
          place[i].style.border = "1px solid red";
        }
        if(player1.getLives() > 1){
          player1.setLives(player1.getLives()-1);
          player1.setPlayerVars("");
        }else{
          easy_level.looser();
        }
    }
    easy_level.setTempId("easy_btn" + easy_level.getPattern()[easy_level.getPattern().length-1]);
    easy_level.setTempPattern(0)
    easy_level.setQuitFlag(-1)
    easy_level.setPlayMode(false)
    easy_level.setShowMode(true)
    easy_level.setThreadMode(false)
  }
}


var showBtn = document.getElementById("show");

showBtn.addEventListener("click",easy_level.callBackShow.bind(easy_level));

// Medium level Class and soundObject

class mediLevel extends easyLevel{
  constructor(){
    super();
    this.places = [];
    for(let i = 1;i <= 16;i++){
      this.places.push("medi_btn"+i);
    }
    this.pattern = [6];
    this.idToMove = "medi_btn6";
    this.tempId = "medi_btn6";
  }

  setDefault(){
    this.setPattern([6]);
    this.setIdToMove("medi_btn6");
    this.setNumOfMoves(0);
    this.setQuitFlag(0);
  }

  setDefaultNew(){
    document.getElementById(this.getTempId()).innerHTML = "";
    document.getElementById("medi_btn6").innerHTML =this.getImageShow();
    this.setPattern([6]);
    this.setIdToMove("medi_btn6");
    this.setNumOfMoves(0);
    // this.setQuitFlag(0);
    this.setQuitFlag(-1)
    this.setPlayMode(false)
    this.setShowMode(true)
    this.setThreadMode(false)
    document.getElementById("result").innerHTML = "";
    document.getElementById("moves").innerHTML = "";
    document.getElementsByTagName("table")[0].style.border = "1px solid rgba(255,255,255,0.2)";
    var place = document.getElementsByClassName("place");
    for(let i = 0;i < place.length;i++){
      place[i].style.border = "1px solid rgba(255,255,255,0.2)";
    }
  }

  moveFunc(){
    document.getElementById(this.getIdToMove()).innerHTML = "";
    let currentPos = Math.floor(Math.random()*16+1);
    let lastPlace = this.getPattern()[this.getPattern().length-1];
    if (currentPos != lastPlace && currentPos != this.getPattern()[this.getPattern().length-2]){
      console.log(currentPos);
      console.log(lastPlace);
      this.getPattern().push(currentPos);
      this.setIdToMove(this.getPlaces()[currentPos-1]);
      document.getElementById(this.getIdToMove()).innerHTML = this.getImageShow();
      this.setQuitFlag(this.getQuitFlag()+1);
      this.go(this.getNumOfMoves());
    }
    else{
      this.moveFunc();
    }
  }

  go(num){
    if(this.getQuitFlag() < num && this.getQuitFlag() >= 0){
        this.setNumOfMoves(num);
        setTimeout(this.moveFunc.bind(medi_level),1000);
    }else if(this.getQuitFlag() == num){
      this.setTempId(this.getIdToMove());
      this.setTempPattern(this.getPattern());
      this.setDefault();
      this.setThreadMode(true);
      setTimeout(this.callBackPlay.bind(medi_level),1000);
    }
    if(this.getQuitFlag() == -1){
      this.setTempId(this.getIdToMove());
      this.setTempPattern(this.getPattern());
      this.setDefault();
      this.go(num);
    }
  }

  callBackShow(){
    console.log(this.getShowMode());
    if(this.getShowMode()){
      console.log("done");
      this.setShowMode(false);
      document.getElementById(this.getTempId()).innerHTML = "";
      document.getElementById("medi_btn6").innerHTML = this.getImageShow();
      this.go(player1.getLevel()+1);
      document.getElementById("result").innerHTML = "";
      document.getElementsByTagName("table")[0].style.border = "1px solid rgba(255,255,255,0.2)";
      var place = document.getElementsByClassName("place");
      for(let i = 0;i < place.length;i++){
        place[i].style.border = "1px solid rgba(255,255,255,0.2)";
      }
    }
  }

  callBackPlay(){
      if(!this.getPlayMode() && this.getThreadMode()){
        document.getElementById(this.getTempId()).innerHTML = "";
        document.getElementById("medi_btn6").innerHTML = this.getImagePlay();
        this.setDefault();
        this.setPlayMode(true);
        document.getElementById("movesmedi").innerHTML = player1.getLevel() + 1 -easy_level.getNumOfMoves();
      }
  }


  looser(){
    setTimeout(function(){
      medium.hide();
      badges.hide();
      looser.show();
      setTimeout(function(){
        looser.hide();
        start.show();
      },2000)
    },500);
  }

}

var medi_level = new mediLevel();


var playFuncmedi = function(){
  if(medi_level.getPlayMode() && medi_level.getNumOfMoves() < medi_level.getTempPattern().length-1){
    if(this.id != medi_level.getIdToMove()){
      document.getElementById(medi_level.getIdToMove()).innerHTML = "";
      medi_level.setIdToMove(this.id);
      document.getElementById(medi_level.getIdToMove()).innerHTML = medi_level.getImagePlay();
      var temp_container = "";
      if(medi_level.getIdToMove().length == 9){
        temp_container += medi_level.getIdToMove()[8];
      }else{
        temp_container += medi_level.getIdToMove()[8] + medi_level.getIdToMove()[9];
      }
      medi_level.getPattern().push(parseInt(temp_container));
      medi_level.setNumOfMoves(medi_level.getNumOfMoves()+1);
      document.getElementById("movesmedi").innerHTML = player1.getLevel() + 1 -medi_level.getNumOfMoves()
      validateMovesmedi();
        }
    }
}

for(let i = 0;i < medi_level.getPlaces().length;i++){
  document.getElementsByClassName("medi")[i].addEventListener("click",playFuncmedi);
}

var validateMovesmedi = function(){
  if(medi_level.getPattern().length == medi_level.getTempPattern().length){
    var counter = 0;
    for(var i = 0; i < medi_level.getPattern().length;i++){
        if(medi_level.getPattern()[i] == medi_level.getTempPattern()[i]){counter++;}
    }
    if(counter == medi_level.getPattern().length){
        document.getElementById("result_medi").innerHTML = "Win";
        document.getElementsByTagName("table")[0].style.border = "1px solid green";
        var place = document.getElementsByClassName("place");
        for(let i = 0;i < place.length;i++){
          place[i].style.border = "1px solid green";
        }
        player1.setScore(player1.getScore()+(player1.getLevel()*500));
        player1.setLevel(player1.getLevel()+1);
        player1.setPlayerVars("medi");

        setTimeout(function(){
          medium.hide();
          badges.hide();
          if(player1.getLevel() == 11){
            setTimeout(function(){
              levels.show();
              badges.hide();
            },2500)

          }else{
            mapLevel.show();
            setTimeout(map_for_levels.character_transfer.bind(map_for_levels),500);
            setTimeout(function(){
              mapLevel.hide();
              medium.show();
              badges.show();
            },2500)
        }},500)
      }


    else{
        document.getElementById("result_medi").innerHTML = "Lose";
        document.getElementsByTagName("table")[0].style.border = "1px solid red";
        var place = document.getElementsByClassName("place");
        for(let i = 0;i < place.length;i++){
          place[i].style.border = "1px solid red";
        }
        if(player1.getLives() > 1){
          player1.setLives(player1.getLives()-1);
          player1.setPlayerVars("medi");
        }else{
          medi_level.looser();
        }
    }
    medi_level.setTempId("medi_btn" + medi_level.getPattern()[medi_level.getPattern().length-1]);
    console.log("this is temp id")
    console.log(medi_level.getTempId());
    medi_level.setTempPattern(0)
    medi_level.setQuitFlag(-1)
    medi_level.setPlayMode(false)
    medi_level.setShowMode(true)
    medi_level.setThreadMode(false)
  }
}



var showBtnmedi = document.getElementById("show_medi");
showBtnmedi.addEventListener("click",medi_level.callBackShow.bind(medi_level));


// hard level Class and Object

class hardLevel extends easyLevel{
  constructor(){
    super();
    this.places = [];
    for(let i = 1;i <= 25;i++){
      this.places.push("hard_btn"+i);
    }
    this.pattern = [13];
    this.idToMove = "hard_btn13";
    this.tempId = "hard_btn13";
  }

  setDefault(){
    this.setPattern([13]);
    this.setIdToMove("hard_btn13");
    this.setNumOfMoves(0);
    this.setQuitFlag(0);
  }

  setDefaultNew(){
    document.getElementById(this.getTempId()).innerHTML = "";
    document.getElementById("medi_btn6").innerHTML =this.getImageShow();
    this.setPattern([13]);
    this.setIdToMove("hard_btn13");
    this.setNumOfMoves(0);
    this.setQuitFlag(0);
    document.getElementById("result").innerHTML = "";
    document.getElementsByTagName("table")[0].style.border = "1px solid rgba(255,255,255,0.2)";
    var place = document.getElementsByClassName("place");
    for(let i = 0;i < place.length;i++){
      place[i].style.border = "1px solid rgba(255,255,255,0.2)";
    }
  }

  moveFunc(){
    document.getElementById(this.getIdToMove()).innerHTML = "";
    let currentPos = Math.floor(Math.random()*25+1);
    let lastPlace = this.getPattern()[this.getPattern().length-1];
    if (currentPos != lastPlace && currentPos != this.getPattern()[this.getPattern().length-2]){
      console.log(currentPos);
      console.log(lastPlace);
      this.getPattern().push(currentPos);
      this.setIdToMove(this.getPlaces()[currentPos-1]);
      document.getElementById(this.getIdToMove()).innerHTML = this.getImageShow();
      this.setQuitFlag(this.getQuitFlag()+1);
      this.go(this.getNumOfMoves());
    }
    else{
      this.moveFunc();
    }
  }

  go(num){
    if(this.getQuitFlag() < num && this.getQuitFlag() >= 0){
        this.setNumOfMoves(num);
        setTimeout(this.moveFunc.bind(hard_level),1000);
    }else if(this.getQuitFlag() == num){
      this.setTempId(this.getIdToMove());
      this.setTempPattern(this.getPattern());
      this.setDefault();
      this.setThreadMode(true);
      setTimeout(this.callBackPlay.bind(hard_level),1000);
    }
    if(this.getQuitFlag() == -1){
      this.setTempId(this.getIdToMove());
      this.setTempPattern(this.getPattern());
      this.setDefault();
      this.go(num);
    }
  }

  callBackShow(){
    console.log(this.getShowMode());
    if(this.getShowMode()){
      console.log("done");
      this.setShowMode(false);
      document.getElementById(this.getTempId()).innerHTML = "";
      document.getElementById("hard_btn13").innerHTML = this.getImageShow();
      this.go(player1.getLevel()+1);
      document.getElementById("result").innerHTML = "";
      document.getElementsByTagName("table")[0].style.border = "1px solid rgba(255,255,255,0.2)";
      var place = document.getElementsByClassName("place");
      for(let i = 0;i < place.length;i++){
        place[i].style.border = "1px solid rgba(255,255,255,0.2)";
      }
    }
  }

  callBackPlay(){
      if(!this.getPlayMode() && this.getThreadMode()){
        document.getElementById(this.getTempId()).innerHTML = "";
        document.getElementById("hard_btn13").innerHTML = this.getImagePlay();
        this.setDefault();
        this.setPlayMode(true);
        document.getElementById("moveshard").innerHTML = player1.getLevel() + 1 -easy_level.getNumOfMoves();
      }
  }

  looser(){
    setTimeout(function(){
      hard.hide();
      badges.hide();
      looser.show();
      setTimeout(function(){
        looser.hide();
        start.show();
      },2000)
    },500);
  }

}

var hard_level = new hardLevel();


var playFuncHard = function(){
  console.log("enter");
  if(hard_level.getPlayMode() && hard_level.getNumOfMoves() < hard_level.getTempPattern().length-1){
    if(this.id != hard_level.getIdToMove()){
      document.getElementById(hard_level.getIdToMove()).innerHTML = "";
      hard_level.setIdToMove(this.id);
      document.getElementById(hard_level.getIdToMove()).innerHTML = hard_level.getImagePlay();
      var temp_container = "";
      if(hard_level.getIdToMove().length == 9){
        temp_container += hard_level.getIdToMove()[8];
      }else{
        temp_container += hard_level.getI1dToMove()[8] + hard_level.getIdToMove()[9];
      }
      hard_level.getPattern().push(parseInt(temp_container));
      hard_level.setNumOfMoves(hard_level.getNumOfMoves()+1);
      document.getElementById("moveshard").innerHTML = player1.getLevel() + 1 -hard_level.getNumOfMoves()
      validateMovesHard();1
        }
    }
}

for(let i = 0;i < hard_level.getPlaces().length;i++){
  document.getElementsByClassName("hard")[i].addEventListener("click",playFuncHard);
}

var validateMovesHard = function(){
  if(hard_level.getPattern().length == hard_level.getTempPattern().length){
    var counter = 0;
    for(var i = 0; i < hard_level.getPattern().length;i++){
        if(hard_level.getPattern()[i] == hard_level.getTempPattern()[i]){counter++;}
    }
    if(counter == hard_level.getPattern().length){
        document.getElementById("result_hard").innerHTML = "Win";
        document.getElementsByTagName("table")[0].style.border = "1px solid green";
        var place = document.getElementsByClassName("place");
        for(let i = 0;i < place.length;i++){
          place[i].style.border = "1px solid green";
        }
        player1.setScore(player1.getScore()+(player1.getLevel()*500));
        player1.setLevel(player1.getLevel()+1);
        player1.setPlayerVars("hard");
        setTimeout(function(){
          hard.hide();
          badges.hide();
          if(player1.getLevel() == 11){
            setTimeout(function(){
              levels.show();
              badges.hide();
            },2500)

          }else{
          hard.hide();
          badges.hide();
          mapLevel.show();
          setTimeout(map_for_levels.character_transfer.bind(map_for_levels),500);
          setTimeout(function(){
            mapLevel.hide();
            hard.show();
            badges.show();
          },2500)
        }},500)
    }
    else{
        document.getElementById("result_hard").innerHTML = "Lose";
        document.getElementsByTagName("table")[0].style.border = "1px solid red";
        var place = document.getElementsByClassName("place");
        for(let i = 0;i < place.length;i++){
          place[i].style.border = "1px solid red";
        }
        if(player1.getLives() > 1){
          player1.setLives(player1.getLives()-1);
          player1.setPlayerVars("hard");
        }else{
          hard_level.looser();
        }
    }
    hard_level.setTempId("hard_btn" + hard_level.getPattern()[hard_level.getPattern().length-1]);
    console.log("this is temp id")
    console.log(hard_level.getTempId());
    hard_level.setTempPattern(0)
    hard_level.setQuitFlag(-1)
    hard_level.setPlayMode(false)
    hard_level.setShowMode(true)
    hard_level.setThreadMode(false)
  }
}


var showBtnHard = document.getElementById("show_hard");

showBtnHard.addEventListener("click",hard_level.callBackShow.bind(hard_level));



// sound button settings

class soundClass {
  constructor(){
    this.sound = true;
    this.audio = document.getElementById("audio");
    this.soundBtn = document.getElementById("soundTurn");
  }

  setSoundBtnImage(str){
    this.soundBtn.innerHTML = str;
  }

  getSoundBtn(){
    return this.soundBtn;
  }

  setSound(str){
    this.sound = str;
  }

  getSound(){
    return this.sound;
  }

  soundTurn(){
    console.log(this.getSound());
    if (!this.getSound()){
      console.log(this.getSound());
      this.setSoundBtnImage('<img id="sound" src="images/sound_on.png">');
      this.setSound(true);
      audio.play();

    }else{
      this.setSoundBtnImage('<img id="sound" src="images/sound_off.png">');
      this.setSound(false);
      audio.pause();
    }
    console.log(this.getSound());
  }
}


var soundObject = new soundClass();

soundObject.getSoundBtn().addEventListener("click",soundObject.soundTurn.bind(soundObject));


// Preloader page

class TransferButton{
  constructor(btnClicked,pageToHide,pageToShow){
    this.btn = document.getElementById(btnClicked);
    this.pageToHide = pageToHide;
    this.pageToShow = pageToShow;
    this.tempBtn = btnClicked;
  }

  btnFunction(){
    if(this.tempBtn == "easy"){
      player1.setPlayerVars("");
      document.getElementById("levelType").children[0].innerHTML = "Easy";
    }else if(this.tempBtn == "medium") {
      player1.setPlayerVars("medi");
      document.getElementById("levelType").children[0].innerHTML = "Medium";
    }else if(this.tempBtn == "hard") {
      player1.setPlayerVars("hard");
      document.getElementById("levelType").children[0].innerHTML = "Hard";
    }
    document.getElementById(this.pageToHide).setAttribute("style","display:none");
    document.getElementById(this.pageToShow).setAttribute("style","display:block");
    player1.setPageInDisplay(this.pageToShow);
  }

  badgeSection(){
      badges.show();
  }
}

class EnjoyBtn extends TransferButton{
  constructor(btnClicked,pageToHide,pageToShow){
    super(btnClicked,pageToHide,pageToShow);
  }

  btnFunction(){
    var userName = document.getElementById("userName").value;
    if(userName != ""){
      player1.setName(userName);
      document.getElementById(this.pageToHide).setAttribute("style","display:none");
      document.getElementById(this.pageToShow).setAttribute("style","display:block");
      player1.setPageInDisplay(this.pageToShow);
      document.getElementById("prev").setAttribute("style","display:block")
    }
  }
}

var enjoyBtn = new EnjoyBtn("enjoy","preloader","start");
enjoyBtn.btn.addEventListener("click",enjoyBtn.btnFunction.bind(enjoyBtn));


var newGameBtn = new TransferButton("newGame","start","selectCharacter");
newGameBtn.btn.addEventListener("click",newGameBtn.btnFunction.bind(newGameBtn));

var easyBtn = new TransferButton("easy","levels","EasyPlayArea");
easyBtn.btn.addEventListener("click",easyBtn.btnFunction.bind(easyBtn));
easyBtn.btn.addEventListener("click",easyBtn.badgeSection.bind(easyBtn));

var mediumBtn = new TransferButton("medium","levels","mediumPlayArea");
mediumBtn.btn.addEventListener("click",mediumBtn.btnFunction.bind(mediumBtn));
mediumBtn.btn.addEventListener("click",mediumBtn.badgeSection.bind(mediumBtn));

var hardBtn = new TransferButton("hard","levels","hardPlayArea");
hardBtn.btn.addEventListener("click",hardBtn.btnFunction.bind(hardBtn));
hardBtn.btn.addEventListener("click",hardBtn.badgeSection.bind(hardBtn));

// Get the modalBox
class badge{
  constructor(modal,image,num){
    this.modal = document.getElementById(modal);
    this.span = document.getElementsByClassName("close")[num];
    this.image = document.getElementById(image)
  }

  badge() {
      this.modal.style.display = "block";
      this.image.style.filter = "grayscale(0%)";
    }
}

var ironBadge = new badge("IronModal","ironMinion",0);


// the level map pages
class LevelMap{
  constructor(){
    this.counter = 0;
    this.another_counter = 0;
    this.positiveSign = true;
    this.virtualLevel = 1;

  }

  setDefault(){
    document.getElementById("map_character").style.left = "30px";
    document.getElementById("map_character").style.bottom = "100px";
    this.counter = 0;
    this.another_counter = 0;
    this.positiveSign = true;
    this.virtualLevel = 1;
  }

  character_transfer(){
    if(player1.getLevel() != 5 && player1.getLevel() != 9){
      if(this.counter < 340*this.virtualLevel){
        if(this.positiveSign){
          document.getElementById("map_character").style.left = this.counter+30+(player1.getLevel()-this.virtualLevel)*25+"px";
        }else{
          document.getElementById("map_character").style.left = 1180-this.counter+"px";
        }
        this.counter++;
        setTimeout(this.character_transfer.bind(map_for_levels),5);
      }else{
        this.virtualLevel++;
        //player1.setLevel(player1.getLevel()+1);
        this.counter = 350*(this.virtualLevel-1);
      }
    }else{
      if(this.another_counter < 200){
        if(this.positiveSign){
          document.getElementById("map_character").style.bottom = this.another_counter+100+"px";
          if(this.another_counter < 100){
            document.getElementById("map_character").style.left = this.another_counter+1080+"px";
          }
        }else{
          document.getElementById("map_character").style.bottom = this.another_counter+300+"px";
          if(this.another_counter < 100){
            document.getElementById("map_character").style.left = this.another_counter+140+"px";
          }
        }
        this.another_counter++;
        setTimeout(this.character_transfer.bind(map_for_levels),5);
      }else{
        this.virtualLevel++;
        if(this.positiveSign){
          this.positiveSign = false;
          this.counter = 0;
          this.virtualLevel = 1;
          this.another_counter = 0;
        }else{
          this.positiveSign = true;
          this.counter = 0;
          this.virtualLevel = 1;
        }
      }
    }
  }
}

var map_for_levels = new LevelMap();


// transfer

class LevelTransfer{
  constructor(){
    this.counter = 0;
    this.check = 1;
  }

  setDefault(){
    this.counter = 0;
    this.check = 1;
  }

  character_transfer(){
    if(this.check < 3){
      if(this.counter < 400*this.check){
          document.getElementById("transfer_character").style.left = this.counter+200+"px";
          this.counter++;
          setTimeout(this.character_transfer.bind(transfer_for_levels),5);
        }else{
        this.check++;
        this.counter = 400*(this.check-1);
      }
    }
  }
}


var transfer_for_levels = new LevelTransfer();

// Select Charachter

var characterSelect = function(){
  var source = document.getElementById(this.id).src;
  easy_level.imagePlay = "<img id = 'player' src='"+ source +"'>";
  medi_level.imagePlay = "<img id = 'player' src='"+ source +"'>";
  hard_level.imagePlay = "<img id = 'player' src='"+ source +"'>";
  document.getElementById("map_character").src = source;
  document.getElementById("transfer_character").src = source;
  setTimeout(function(){
    selectCharacter.hide();
    levels.show();
    player1.setPageInDisplay("levels")
  },500);

}

for(let i = 0;i < 3;i++){
  document.getElementsByClassName("charImg")[i].addEventListener("click",characterSelect);
}

// end of character select

// modal box for check exit

var exitModal = document.getElementById('ExitModal');

var exitCheck = function() {
    exitModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
document.getElementById("yes").onclick = function() {
    exitModal.style.display = "none";
    document.getElementById(player1.getPageInDisplay()).style.display = "none";
    document.getElementById("badges").style.display = "none";
    start.show();
    player1.setPageInDisplay("start");
    player1.setLevel(1);
    player1.setScore(0);
    player1.setLives(3);
    easy_level.setDefaultNew();
    medi_level.setDefaultNew();
    hard_level.setDefaultNew();
    map_for_levels.setDefault();
    transfer_for_levels.setDefault();

}

document.getElementById("no").onclick = function() {
    exitModal.style.display = "none";
}
