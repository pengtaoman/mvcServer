var WaitingBar = new function(){
	var Me=this;
	var WaitingBarObj=null;

	var default_msg="系统运行中,请稍候...";

	var msg="";

		var className_waitingBarBox="waitingBarBox";
		var className_waitingBar="waitingBar";
		var className_waitingBarTD="waitingBarTD";
	
	
	Me.isWaiting=false;
	Me.setMsg=function(newmsg){

		msg=newmsg;
	}

	Me.resetMsg=function(){
		msg=default_msg;
	}

	Me.initMe=function(){

	var temp_obj=$("divWaitingBar");

	if  (isValid(temp_obj)){
		return;
	}

	msg=default_msg;

		WaitingBarObj = document.createElement("div");
		WaitingBarObj.id="divWaitingBar";
		WaitingBarObj.style.display="none";
		WaitingBarObj.className=className_waitingBarBox;
		WaitingBarObj.attachEvent("onblur", Me.alwaysFocus);
		WaitingBarObj.attachEvent("onkeypress", Me.testHotKey);


		var htmlStr="";
			htmlStr+="<table onselectstart=\"return false;\"  cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" valign=\"middle\" height=\"100%\"><tr><td align=\"center\" valign=\"middle\" >";
			htmlStr+="<table class=\""+className_waitingBar+"\" >";
			htmlStr+="<tr><td align=\"center\" id=\"divWaitingBar_Content\" class=\""+className_waitingBarTD+"\"><b>&#160;&#160;&#160;&#160;";
			htmlStr+="<span id=\"waitingBarMsg\"></span></b></td></tr>";
			htmlStr+="</table>";
			htmlStr+="</td></tr></table>";
			htmlStr+="<iframe border=\"0\" frameborder=\"0\" style=\"position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1;border:0px solid #ffffff\" ></iframe>";

		WaitingBarObj.innerHTML=htmlStr;

		document.body.appendChild(WaitingBarObj);

			document.body.attachEvent("onclick", Me.waiting);
		
	}

	Me.alwaysFocus=function(){
		if (WaitingBarObj.style.display!="none"){
			WaitingBarObj.focus();
		}	

	}
	/*专供测试使用*/
	Me.testHotKey=function(){
		if (event.shiftLeft && (event.keyCode==86 || event.keyCode==118 ) ){
			Me.showMe(false);
		}
		
	}
	Me.showMe=function(flag){
		try {
			
		var Yoffset=-10;
		if (!isValid(WaitingBar) ) {
			Me.initMe();
			//	return;
		}
		
		if (!isValid(flag) || flag){
			/* 方案1 居中 */
			$("waitingBarMsg").innerHTML=msg
			WaitingBarObj.style.display="block";
			var t=document.body.scrollTop+(document.body.clientHeight - WaitingBarObj.offsetHeight)/2+Yoffset;
			t=t<1?1:t;
			WaitingBarObj.style.top= parseInt(t)+"px";
			

			/* 方案2 全屏居中 慢*/
			/*
			WaitingBarObj.style.height=document.body.clientHeight+"px";
			WaitingBarObj.style.top="0px";
			WaitingBarObj.style.display="block";
			*/

			/* 方案3 全屏透明图片覆盖页面，禁止操作 */
			/*
				comming soon....
			*/
			WaitingBarObj.focus();
			Me.isWaiting=true;
		}else{
			WaitingBarObj.style.display="none";
			WaitingBarObj.blur();
			Me.isWaiting=false;
		}
		
		}catch (e) {
		}

	}

	Me.hideMe=function(){
		Me.showMe(false);
	}
	
	Me.waiting=function(){
		if (Me.isWaiting){
			event.cancelBubble=true;
			event.returnValue=false;
			return false;
		}

	}
	window.attachEvent("onload", Me.initMe);

}