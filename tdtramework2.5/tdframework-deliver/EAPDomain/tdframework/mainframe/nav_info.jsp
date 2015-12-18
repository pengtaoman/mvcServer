<%@ page language="java" contentType="text/html;charset=GBK" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeVO" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeUtil" %>
<html>
<%
	String path = request.getContextPath();
	String d_flag = (String)session.getAttribute("double_flag");
	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	
	String userName = authVO.getWorkNo();
	String passWord = (String)request.getSession(true).getAttribute("decodedPass");;
	StringBuffer para = new StringBuffer();
    para.append("/assistsell/assistsell/common/d_screen.jsp?j_username=").append(userName).append("&j_password=").append(passWord).append("&double_flag=").append(d_flag);
	
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>导航信息</title>
<style type="text/css">
.STYLE1 {color: #FF6600;}

body {
cursor :default;
margin:0px;
padding:0px;

}
form {
margin:0px;
padding:0px;
}
td {
font-size:12px;
}
#statusid{ width:100%;line-height:34px; color:#D71920; background:url(images/missionInfo_bg.gif) repeat-x left top;border-bottom:1px solid #DCDCDC;}
#statusid a:link {color:#727272;text-decoration: none;}
#statusid a:visited { color:#727272;text-decoration: none;}
#statusid a:hover {color:#F26521;text-decoration: none;}
#statusid a:active {color:#F7941C;text-decoration: none;}

</style>
<script type="text/javascript" src="<%=path%>/unieap/js/Common.js" ></script>
<script type="text/javascript" src="<%=path%>/unieap/js/Globals.js" ></script>
<script type="text/javascript" src="<%=path%>/unieap/js/EAPObjsMgr.js" ></script>

<SCRIPT type="text/javascript">

var APP_PATH="../..";
var d_flag = "<%=d_flag%>";
function init()
{
	//top.changeWinWidth();
	//if(d_flag=="1"){
	if("1"=="1"){
		var dscreen=document.getElementById("dscreen");	
		dscreen.style.display="inline";
	}
}

var windowflag;

var isLeftOpen=true;
function switchSysBar(){
	path=APP_PATH;
 
		if (isLeftOpen){
			//parent.mainFrame.cols="0,*";
			document.myForm.switchPic.src="<%=path%>/tdframework/mainframe/images/u_leftbar_c.gif";
			isLeftOpen=false;
		}
		else{
			//parent.mainFrame.cols="156, *";
			document.myForm.switchPic.src="<%=path%>/tdframework/mainframe/images/u_leftbar_o.gif";
			isLeftOpen=true;
		}
}

var isTopOpen=true;
function switchTopBar(){
	path=APP_PATH;
 
		if (isTopOpen){
			parent.topFrame.rows="0,*";
			document.getElementById("switchPicT").src="<%=path%>/tdframework/mainframe/images/u_topbar_c.gif";
			isTopOpen=false;
		}
		else{
			parent.topFrame.rows="103,*";
			document.getElementById("switchPicT").src="<%=path%>/tdframework/mainframe/images/u_topbar_o.gif";
			isTopOpen=true;
		}
}

function setNav(menuNameArray){
var navbar=document.getElementById("navbar");
var nav=[];
menuNameArray=menuNameArray.reverse();

navbar.innerHTML="&nbsp; 您所在的位置："+menuNameArray.join(" <font color=\"red\">></font> ");

}


function addFavoriteOnClick() {
	top.addToFavorite();
}

function changeTopWinWidth() {
	top.changeWinWidth();
}

function fireExtraIcons(menuId)
{
    var menuIdHidden =document.getElementById("menuId");
    menuIdHidden.value = menuId;
    
	var paramters = "menuId="+menuId;
	var result = executeRequest("subPower","getPower",paramters);
	var resultArray = result.split(";");
	if(resultArray[0]=="isForum")
	{
		var bbsTD=document.getElementById("bbs");	
		bbsTD.style.display="inline";
	}else{
		var bbsTD=document.getElementById("bbs");	
		bbsTD.style.display="none";	
	}
	
	if(resultArray[1]=="isMail")
	{
		var mailTD=document.getElementById("mail");	
		mailTD.style.display="inline";
	}else{
		var mailTD=document.getElementById("mail");	
		mailTD.style.display="none";	
	}
}	

function gotoBBS(){
	var menuIdHidden =document.getElementById("menuId");
	parent.main.location.href = "<%=path%>/bbsAction.do?method=listMenuSpace&menuId="+menuIdHidden.value;
    
}

function subscribeMail(){
    var menuIdHidden =document.getElementById("menuId");
	var result=executeRequest("shareMailAction","doSave","menuId="+menuIdHidden.value);
	if(result=="success") {
		alert("邮件订阅成功!");
	}else {
		alert(result);
	}
}
function OpenDoubleScreen()
{try{
windowflag.focus();
}catch(e){
windowflag=null;
}
if(windowflag){
windowflag.close();
windowflag=null;
}else{
	windowflag=window.showModelessDialog("<%=para.toString()%>","","dialogWidth=120px;dialogHeight=498px;scroll:no;help:no;status:no;dialogLeft:720;dialogTop:210");
}
}

</SCRIPT>
</head>
<body onload="init()">
<form action="" name="myForm">
<table id="statusid" border="0" cellpadding="0" cellspacing="0">
<input type="hidden" name="menuId" ></input>
<tr>
   <td width="100%" id="navbar" valign="bottom" style="padding:1px 0px 2px 0px;">
	&nbsp;
	</td>
  <td id="bbs" style="cursor:pointer;width:10px;display:none" onclick="gotoBBS()" title="跳转到相关论坛">
	  <img  id="bbsPict"  src="<%=path%>/tdframework/mainframe/images/change.gif" style="border:0px;margin-top:3px;margin-right:3px;" />
  </td>
  
  <td id="mail" style="cursor:pointer;width:10px;display:none" onclick="subscribeMail()" title="订阅Mail">
	  <img  id="mailPict"  src="<%=path%>/tdframework/mainframe/images/mail.gif" style="border:0px;margin-top:3px;margin-right:3px;" />
  </td>

    <!-- td style="cursor:pointer;width:10px; " onclick="addFavoriteOnClick()" title="加入收藏夹">
	  <img  id="favPicT" src="<%=path%>/tdframework/mainframe/images/favorite.gif" style="border:0px;margin-top:3px;margin-left:3px;margin-right:5px;" />
  </td-->
  <td id="dscreen" style="cursor:pointer;width:10px;display:none" onClick="OpenDoubleScreen()" title="双屏功能按钮">
	  <img  id="dsPicT"  src="<%=path%>/tdframework/mainframe/images/d_screen.gif" style="border:0px;margin-top:3px;margin-left:3px;margin-right:5px;" />
  </td>

  </tr>
</table>


</form>
</body>
</html>