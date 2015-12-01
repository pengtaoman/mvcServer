

var TitleBar=new function(){

	var Me =this;

	var TitleBarObj=null;

	var className_titleBarBox="titleBarBox";
	var className_titleBar="titleBar";

	var className_titleBarTD="titleBarTD";

 Me.initMe=function(){

	var temp_obj=$("divTitleBar");

	if  (isValid(temp_obj)){
		return;
	}


	TitleBarObj = document.createElement("div");
	TitleBarObj.id="divTitleBar";
	TitleBarObj.className=className_titleBarBox;


	var htmlStr="";
		htmlStr += "<table border=\"0\" class=\""+className_titleBar+"\" cellpadding=\"0\" cellspacing=\"0\"><tr>";
		htmlStr += "	<td id=\"titleBarTD\" class=\""+className_titleBarTD+"\" ></td>";
		htmlStr += "</tr></table>";
		htmlStr += "<iframe border=\"0\" scrolling=\"no\" frameborder=\"0\" style=\"position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1;border:0px solid #ffffff\" ></iframe>";

	TitleBarObj.innerHTML=htmlStr;

	document.body.appendChild(TitleBarObj);
	
}

Me.addTitleBarByTag=function(tag){

		Me.initMe();
		var numargs = arguments.length;
		for (var nv=0;nv<numargs ;nv++ ){
			tag=arguments[nv];

			var elm=document.getElementsByTagName(tag);
			for (var i=0;i<elm.length ;i++ ){
				elm[i].attachEvent("onmouseover", Me.showTitleBarT);
				elm[i].attachEvent("onmouseout", Me.hideTitleBarT);
				if (tag.toLowerCase()=="select"){
					elm[i].attachEvent("onkeydown", enterJump);
				}
			}
		}
	}

Me.addTitleBarById=function(id){
		Me.initMe();
		var numargs = arguments.length;
		for (var nv=0;nv<numargs ;nv++ ){
			id=arguments[nv];

			var elm=$(id);
			if (isValid(elm)){

				elm.attachEvent("onmouseover", Me.showTitleBarT);
				elm.attachEvent("onmouseout", Me.hideTitleBarT);

			}
		}

	}

Me.addTitleBarByName=function(name){
		Me.initMe();
		var numargs = arguments.length;
		for (var nv=0;nv<numargs ;nv++ ){
			name=arguments[nv];

			var elm	=$$(name);
			if (isValid(elm)){
				for (var i=0;i<elm.length ;i++ ){

					addEvent(elm[i],"onmouseover",Me.showTitleBarT);
					addEvent(elm[i],"onmouseout",Me.hideTitleBarT);
				}
			}
		}
	}


Me.addTitleBar=function(idname){
		Me.initMe();
		var numargs = arguments.length;
		for (var nv=0;nv<numargs ;nv++ ){
			idname=arguments[nv];

			Me.addTitleBarById(idname);
			Me.addTitleBarByName(idname);
		}

	}

Me.showTitleBarT=function(){
		Me.showTitleBar(event.srcElement);
	}
Me.hideTitleBarT=function(){
		Me.hideTitleBar(event.srcElement);
	}

Me.showTitleBar=function(elm){

		try {
			
		var obj=$("divTitleBar");
		var objT=$("titleBarTD");

		if (!isValid(obj)||!isValid(objT)){
			Me.initMe();
		}

		if (!isValid(elm)){
			elm=event.srcElement;

		}


		objT.innerHTML="";

		var tag=elm.tagName.toLowerCase();

		if (tag=="input" || tag=="textarea"){
			objT.innerHTML=elm.value;	
		}else if (tag=="select"){
			for (var i=0;i<elm.options.length ;i++ ){
				if (elm.options[i].selected && elm.options[i].text.length>0){
					objT.innerHTML+=elm.options[i].text+"<br />";	
				//	break;
				}
			}
		}else{
			objT.innerHTML=elm.innerHTML;
		}
		if (objT.innerHTML.length>0){
			obj.style.left=getPosLeft(elm);
			obj.style.top=getPosBottom(elm);
			obj.style.display="block";
		}
		}catch (e) {

		}
	}


Me.hideTitleBar=function(elm){
		
		try {
		var obj=$("divTitleBar");
		if (!isValid(obj)){
			Me.initMe();
		}

		obj.style.display="none";
		//obj.innerText=elm.value;
		//obj.style.left=getPosLeft(elm)+"px";
		//obj.style.top=getPosBottom(elm)+"px";

		}catch (e) {
		}

	}

}