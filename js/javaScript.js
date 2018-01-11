
// setting the game logic

class Levels {
  constructor(){
    this.tempPattern = 0;
    this.numOfMoves = 0;
    this.quitFlag = 0;
    this.showMode = true;
    this.playMode = false;
    this.threadMode = false;
    this.imageShow = "<img id = 'player' src='images/penguin.png'>";
    this.imagePlay = "<img id = 'player' src='images/3d_ball_4.png'>";
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
    }
  }

  callBackPlay(){
      if(!this.getPlayMode() && this.getThreadMode()){
        document.getElementById(this.getTempId()).innerHTML = "";
        document.getElementById("easy_btn5").innerHTML = this.getImagePlay();
        this.setDefault();
        this.setPlayMode(true);
        document.getElementById("moves").innerHTML = player1.getLevel() + 1 -easy_level.getNumOfMoves();
      }
  }

  looser(){
    setTimeout(function(){
      document.getElementById("EasyPlayArea").setAttribute("style","display : none");
      document.getElementById("looser").setAttribute("style","display : block");
      setTimeout(function(){
        document.getElementById("looser").setAttribute("style","display : none");
        document.getElementById("start").setAttribute("style","display : block");
      },2000)
    },500);
  }

}

var easy_level = new easyLevel();


var playFunc = function(){
  console.log("enter");
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
        player1.setScore(player1.getScore()+(player1.getLevel()*500));
        player1.setLevel(player1.getLevel()+1);
        player1.setPlayerVars("");
        if(player1.getLevel() == 5){
          badge();
        }
        setTimeout(function(){
          document.getElementById("EasyPlayArea").setAttribute("style","display:none");
          document.getElementById("map").setAttribute("style","display:block");
          setTimeout(map_for_levels.character_transfer.bind(map_for_levels),500);
          setTimeout(function(){
            document.getElementById("EasyPlayArea").setAttribute("style","display:block");
            document.getElementById("map").setAttribute("style","display:none");
          },2500)
        },500)

    }
    else{
        document.getElementById("result").innerHTML = "Lose";
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
