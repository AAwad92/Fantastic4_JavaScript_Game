
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
      document.getElementById("mediumPlayArea").setAttribute("style","display : none");
      document.getElementById("looser").setAttribute("style","display : block");
      setTimeout(function(){
        document.getElementById("looser").setAttribute("style","display : none");
        document.getElementById("start").setAttribute("style","display : block");
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
        player1.setScore(player1.getScore()+(player1.getLevel()*500));
        player1.setLevel(player1.getLevel()+1);
        player1.setPlayerVars("medi");

        setTimeout(function(){
          document.getElementById("mediumPlayArea").setAttribute("style","display:none");
          document.getElementById("map").setAttribute("style","display:block");
          setTimeout(map_for_levels.character_transfer.bind(map_for_levels),500);
          setTimeout(function(){
            document.getElementById("mediumPlayArea").setAttribute("style","display:block");
            document.getElementById("map").setAttribute("style","display:none");
          },2500)
        },500)
    }
    else{
        document.getElementById("result_medi").innerHTML = "Lose";
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
      document.getElementById("hardPlayArea").setAttribute("style","display : none");
      document.getElementById("looser").setAttribute("style","display : block");
      setTimeout(function(){
        document.getElementById("looser").setAttribute("style","display : none");
        document.getElementById("start").setAttribute("style","display : block");
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
        temp_container += hard_level.getIdToMove()[8] + hard_level.getIdToMove()[9];
      }
      hard_level.getPattern().push(parseInt(temp_container));
      hard_level.setNumOfMoves(hard_level.getNumOfMoves()+1);
      validateMovesHard();
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
        player1.setScore(player1.getScore()+(player1.getLevel()*500));
        player1.setLevel(player1.getLevel()+1);
        player1.setPlayerVars("hard");
        setTimeout(function(){
          document.getElementById("hardPlayArea").setAttribute("style","display:none");
          document.getElementById("map").setAttribute("style","display:block");
          setTimeout(map_for_levels.character_transfer.bind(map_for_levels),500);
          setTimeout(function(){
            document.getElementById("hardPlayArea").setAttribute("style","display:block");
            document.getElementById("map").setAttribute("style","display:none");
          },2500)
        },500)
    }
    else{
        document.getElementById("result_hard").innerHTML = "Lose";
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

