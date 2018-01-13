var img=document.getElementById("minion");
console.log(img.style.left)
var minion_style=getComputedStyle(img).getPropertyValue("left")
console.log(minion_style)

var counter=145
var move_func=function(){
	img.style.left=counter+"px"
	counter++
	if(counter<590){
		setTimeout(move_func,5)
	}else if(590<counter && counter<1050){
		setTimeout(move_func,5)
	}
}

/*addEventListener('click',move_func)*/
/*var move=function(){
	var interval=setInterval(move_func,5)
}*/
/*for (var i=1;i<400;i++){
	setTimeout(move_func(i),20*i)
}*/
/*var move=function(){
	/*var repeat_interval=setInterval(move_func,5)
	if(counter>400){
		
		clearInterval(repeat_interval)*/
		/*if(counter<550){
			counter++
			console.log(counter)
			setTimeout(move_func,30)
			move()
	}
}*/



