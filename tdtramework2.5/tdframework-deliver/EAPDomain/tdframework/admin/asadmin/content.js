var eccn=new ECCN("ec");

function init(){
//不使用预读取技术，使用传统方式提交form
eccn.doPrep=false;
// 不预读取“前一页”
eccn.doPrepPrev=false;
eccn.init();
}

function showTable(obj){
   if(document.all("helloworld").style.display=="none"){
       document.all("helloworld").style.display = "";
       obj.innerHTML = "hide"
   }
   else{
       document.all("helloworld").style.display = "none";
       obj.innerHTML = "show";
   }
}

function checkValues(){
    var ifHaveChoose = false;
	var allElements = document.body.getElementsByTagName("INPUT");
	for (var i = 0; i < allElements.length; i++) {
		var e = allElements[i];
		if (e.type == 'checkbox') {
			if (e.checked == true) {
			    i = allElements.length;
				ifHaveChoose = true;
			} 
		}
	}
	if (ifHaveChoose == false){
		alert("请选择你要刷新的缓存对象！");
	}
	return ifHaveChoose;
}

/**
 *
 */
function freshCatchObject(){
	if(checkValues()){
	    //alert("catchManager()");
	    document.forms[0].action = "cacheManagerAction.do?method=rsfreshCache";	    	
		document.forms[0].submit();
	}
}
