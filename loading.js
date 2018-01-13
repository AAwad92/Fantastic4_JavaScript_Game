var inner=document.getElementById("inner")
var counter=0;
var move=function(){
	inner.style.width=counter+"px";
	counter++;
	if(counter<400){
		setTimeout(move,5);
	}
	/*else if(counter>400 && counter<100){
		setTimeout(move,5);
	}*/

}
// var mymove=function(){
// 	setInterval(move,5);
// }