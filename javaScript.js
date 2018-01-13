// create player Object

var player = function(){
  this.name = "";
  this.level = 1;
  this.score = 0;
  this.lives = 3;
  this.winWithoutLose = 0;
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

player.prototype.setWinWithoutLose = function(winWithoutLose){
  this.winWithoutLose = winWithoutLose;
}

player.prototype.getWinWithoutLose = function(){
  return this.winWithoutLose;
}

player.prototype.setPlayerVars = function(type){
  document.getElementById("level"+type).innerHTML = player1.getLevel();
  document.getElementById("score"+type).innerHTML = player1.getScore();
  document.getElementById("lives"+type).innerHTML = player1.getLives();
}

var player1 = new player();


// Get the modalBox
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
var badge = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


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
