// JavaScript Document
function selectTag(showContent,selfObj,tagId){

	var tag = document.getElementById(tagId).getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
//alert(selfObj.parentNode.className);
	selfObj.parentNode.className = "selectTag";
	
	var tgc = showContent.substring(0,showContent.length-1);//alert(tgc);
	
	for(i=0; j=document.getElementById(tgc+i); i++){
	j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
}