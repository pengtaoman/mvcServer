// weizj 2006-02-14

// “等待信息”相关
var WaittingBar=null;
var initWaittingBar=function(){
WaittingBar = document.createElement("div");
document.body.appendChild(WaittingBar);
WaittingBar.id="divWaittingBar";
WaittingBar.style.cssText="position:absolute;top:0px;left:0px;width:100%;z-index:99;display:none;filter:Alpha(opacity=80);-moz-opacity:0.7;bheight:expression(autoResizeToBody(this));";


var htmlStr="";
	htmlStr+="<table  onblur=\"getFocus(this)\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" height=\"100%\"><tr><td align=\"center\" valign=\"middle\" >";
	htmlStr+="<table style=\"background-color:#e3e9f3;width:200px; height:100px; border:1px solid #335566;\" >";
	htmlStr+="<tr><td align=\"center\" id=\"divWaittingBar_Content\" ><b>正在载入,请您稍候...</b></td></tr>";
	htmlStr+="<!--<tr><td align=\"center\" >&#160;<a  id=\"divWaittingBar_Close\" href=\"#\" onclick=\"showWaittingBar(false);return false\">关闭</a>&#160;</td></tr>-->";
	htmlStr+="</table>";
	htmlStr+="</td></tr></table>";
	htmlStr+="<iframe border=\"0\" frameborder=\"0\" style=\"position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1;border:0px solid #ffffff\" ></iframe>";

	WaittingBar.innerHTML=htmlStr;
	
}
var showWaittingBar=function(flag){
	if (isNull(WaittingBar))
		WaittingBar=$byId("divWaittingBar");
	if (isNull(WaittingBar) || isNull(WaittingBar.style) )
		return;
	
	if (isNull(flag) || flag){
		WaittingBar.style.display="block";
		WaittingBar.focus();
	}else{
		WaittingBar.style.display="none";
		WaittingBar.blur();
	}
}

var hideWaittingBar=function(){
	showWaittingBar(false);
}
//当对象非隐藏状态时 取得焦点.
var getFocus=function(obj){
	if (obj.style.display!="none"){
		obj.focus();
	}
}
