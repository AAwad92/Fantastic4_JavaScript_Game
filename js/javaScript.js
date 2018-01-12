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
  }

  btnFunction(){
    document.getElementById(this.pageToHide).setAttribute("style","display:none");
    player1.setPlayerVars("");
    document.getElementById(this.pageToShow).setAttribute("style","display:block");
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
    }
  }
}

var enjoyBtn = new EnjoyBtn("enjoy","preloader","start");
enjoyBtn.btn.addEventListener("click",enjoyBtn.btnFunction.bind(enjoyBtn));


var newGameBtn = new TransferButton("newGame","start","levels");
newGameBtn.btn.addEventListener("click",newGameBtn.btnFunction.bind(newGameBtn));

var easyBtn = new TransferButton("easy","levels","EasyPlayArea");
easyBtn.btn.addEventListener("click",easyBtn.btnFunction.bind(easyBtn));

var mediumBtn = new TransferButton("medium","levels","mediumPlayArea");
mediumBtn.btn.addEventListener("click",mediumBtn.btnFunction.bind(mediumBtn));

var hardBtn = new TransferButton("hard","levels","hardPlayArea");
hardBtn.btn.addEventListener("click",hardBtn.btnFunction.bind(hardBtn));


// the level map pages
class LevelMap{
  constructor(){
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
        //player1.setLevel(player1.getLevel()+1);;
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
