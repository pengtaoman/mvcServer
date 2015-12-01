

/**
 * 销售品选择页面左右页面切换处理
 * @param {} theOb
 * @param {} ob2
 */ 
function switchLeft(theOb,ob2)
{
    var ob2=eval(ob2);
	var contextPath =  BusCard.path.contextPath;   
	if(theOb.src.indexOf("_1")>-1)
	{
		theOb.src=contextPath +"/common/dx20/images/toleft_2.gif";
		ob2.style.display="none";		
	}
	else if(theOb.src.indexOf("_2")>-1)
	{
		theOb.src=contextPath + "/common/dx20/images/toleft_1.gif";
		ob2.style.display="block";		
	}
}



/**
 * 主销售品树展现页面tab页切换
 * @param {} showContent
 * @param {} selfObj
 * @param {} tagId
 * @param {} className
 */
function selectTagForNew(showContent,selfObj,tagId,className){

	var tag = document.getElementById(tagId).getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = className;
	var tgc = showContent.substring(0,showContent.length-1);
	for(i=0; j=document.getElementById(tgc+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
}