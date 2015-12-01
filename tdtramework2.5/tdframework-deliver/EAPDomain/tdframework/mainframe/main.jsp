<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<%@ page import="com.neusoft.tdframework.common.util.DESUtil" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.ArrayList" %>
<%
	
    String remoteAuth = request.getContextPath() + "/tdframework/mainframe/RemoteAuthAJAX.jsp";

	//String navFrameUri = request.getContextPath() + "/navBar.do?method=common";	
	String navFrameUri = request.getContextPath() + "/tdframework/mainframe/nav_info.jsp";	
	String alertMsg = (String)session.getAttribute("alertMsg");
	session.removeAttribute("alertMsg");
	if(alertMsg == null){
		alertMsg = "";
	}	


	AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
	
	if (authorizeVO==null){
		out.println("登录信息发生错误");
		response.sendRedirect(request.getContextPath()+"/");	
		return;	
	}
	String workNo = authorizeVO.getWorkNo();
	String userName = authorizeVO.getEmployeeName();
	//String areaName = authorizeVO.getAreaName();
	String organName = authorizeVO.getOrganName();
	String cityCode =  authorizeVO.getCityCode();
	
	String kbsCity = "";
	if ("186".equals(cityCode)) {
		kbsCity = "510";
	} else if ("188".equals(cityCode)) {
		kbsCity = "511 ";
	}else if ("187".equals(cityCode)) {
		kbsCity = "512";
	}else if ("184".equals(cityCode)) {
		kbsCity = "513";
	}else if ("189".equals(cityCode)) {
		kbsCity = "514";
	}else if ("181".equals(cityCode)) {
		kbsCity = "515";
	}else if ("183".equals(cityCode)) {
		kbsCity = "516";
	}else if ("720".equals(cityCode)) {
		kbsCity = "518";
	}else if ("185".equals(cityCode)) {
		kbsCity = "519";
	}else if ("182".equals(cityCode)) {
		kbsCity = "510";
	}else if ("186".equals(cityCode)) {
		kbsCity = "520";
	}else if ("018".equals(cityCode)) {
		kbsCity = "521";
	}
	
	String kbsURL = "http://136.142.25.83:8082/csp/theThirdPartyLogin.jsp?staffid="+kbsCity+"&password=E99A18C428CB38D5F260853678922E03";
	
	if ("018".equals(cityCode)) {
		cityCode = "188";
	}
	//out.println("================ " + cityCode);
	if(authorizeVO.getDealerName()!=null && authorizeVO.getDealerName().length()>1)
			organName = authorizeVO.getOrganName() + "|"+ authorizeVO.getDealerName();
	else
			organName = authorizeVO.getOrganName();

	String webpath = request.getContextPath();
	
	String isTagFormat =request.getParameter("isTagFormat");
	boolean isTagShowing = true;
	if (isTagFormat != null && "0".equals(isTagFormat)) {
		isTagShowing = false;
	}
	
	String tabUrl = request.getContextPath() + "/tdframework/mainframe/tab.jsp";
	String crmMiddleUrl = request.getContextPath() + "/tdframework/mainframe/crm_middle.jsp";
	String topUrl = request.getContextPath() + "/tdframework/mainframe/ctg_top.jsp";
	String homeCityIfmUrl = request.getContextPath() + "/tdframework/mainframe/home_city.jsp";

	//以下是整合双屏功能的代码
	String d_flag = (String)session.getAttribute("double_flag");
	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	
	String userNameDs = authVO.getWorkNo();
	String passWordDs = (String)request.getSession(true).getAttribute("decodedPass");
	String endpasswordDES = DESUtil.encrypt(passWordDs);
	
	StringBuffer para = new StringBuffer();
    para.append("/assistsell/assistsell/common/d_screen.jsp?STAFFNO=").append(userNameDs).append("&PASSWORD=").append(endpasswordDES).append("&double_flag=").append(d_flag);
	
    String jsParaAutoPara = new StringBuilder("STAFFNO=").append(userNameDs).append("&PASSWORD=").append(endpasswordDES).append("&double_flag=").append(d_flag).toString();
    
    //以下是从application变量中取得间隔时间设置
    java.util.Properties pro = (java.util.Properties)application.getAttribute("ENVCONF");
    String warningTimeInterval = (String)pro.getProperty("note.warning.timeInterval");
    int warningTimeIntervalL = 60000;
    if (warningTimeInterval != null && !"".equals(warningTimeInterval.trim())) {
    	warningTimeIntervalL = Integer.parseInt(warningTimeInterval);
    }
    
	List appNames = (List)request.getSession().getAttribute("appNames");
	String params = "STAFFNO="+workNo+"&PASSWORD="+(String)request.getSession(true).getAttribute("EncriedPwd");
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<META HTTP-EQUIV="Pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache"> 
<META HTTP-EQUIV="Expires" CONTENT="0">
<title>欢迎登录 中国电信 BSS系统</title>
<contextPath value="<%=webpath%>"/>

<OBJECT id="max" type="application/x-oleobject" classid="clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11">
<PARAM name="Command" value="Maximize">
</OBJECT>

<script type="text/javascript">

window.onunload = onbeforeunload_handler;   
//window.onunload = onunload_handler;   

var refreshUrls = [];
function onbeforeunload_handler() {
    //暂时不区分刷新动作
	//if ((document.body.clientWidth-event.clientX)<20 && event.clientY<0 || event.altKey) {
		for (var i=0;i<refreshUrls.length ;i++ ){
            if(refreshUrls[i].indexOf("channel")>0) {
                continue;
            } else {
			    new Ajax.Request( refreshUrls[i],{onComplete: doNothing} );
            }
		}
	//}
}

function getJsParaAutoPara() {
	return "<%=jsParaAutoPara%>";
}

window.moveTo(0, 0);
if (document.all) {
	top.window.resizeTo(screen.availWidth, screen.availHeight);
} else if (document.layers || document.getElementById) {
	window.resizeTo(window.screen.availWidth, window.screen.availHeight);
	if (top.window.outerHeight < screen.availHeight
			|| top.window.outerWidth < screen.availWidth) {
		top.window.outerHeight = screen.availHeight;
		top.window.outerWidth = screen.availWidth;
	}
}

function resizeWindow() {

	if (navigator.userAgent.indexOf("Firefox") > 0) {
		document.getElementById("subframe").width = screen.availWidth;
		//alert(screen.availHeight);
		document.getElementById("subframe").height = getTdTabHeight();
	} 
}

</script>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<%   out.println("<script type='text/javascript'>function getcontext(){var APP_PATH = '"+webpath+"'; return APP_PATH;}</script>");%>
<link href="<%=path%>/common/dx20/css/main_style.css" rel="stylesheet" type="text/css" />
<link href="<%=path%>/common/dx20/css/crm6_main.css" rel="stylesheet" type="text/css" />

<script src="<%=path%>/common/js/jquery.min.js" type="text/javascript"></script>
<script src="<%=path%>/tdframework/mainframe/js/date.js" type="text/javascript"></script>
<script src="<%=path%>/tdframework/mainframe/js/note.js" type="text/javascript"></script>
<%if(isTagShowing) {%>
<script src="<%=path%>/tdframework/mainframe/js/ctg_main.js" type="text/javascript"></script>
<%} else { %>
<script src="<%=path%>/tdframework/mainframe/js/ctg_main_middle.js" type="text/javascript"></script>
<%} %>
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/top_lt.js" ></script>
<script type="text/javascript" src="<%=path%>/common/js/prototypeajax.js" ></script>
<script type="text/javascript">
var changeUserCityLst;
dojo.addOnLoad(function(){
	 resizeWindow();
	 dojo.byId("citySelContent").display="none";
	 var homeCity = "<%=cityCode%>";
	 
	 dojo.rawXhrPost({
			url : APP_PATH + "/login.do?method=getPfNo",
			//parameters:{j_username: "SUPER", j_password: "super0"},
			sync : false,
			load : function(text, args) {
				try {
				    var citylst = eval("(" + text + ")");
				    //alert(citylst);
					if (citylst && citylst != 0) {
					    changeUserCityLst = citylst;
					    changeUserCity(homeCity);
					} else {
					    selCity(homeCity);
					}
				} catch (e) {
					alert("初始化系统失败。");
				}
			}
		});
	 if (homeCity == "188") {
		 try {
	         changeCity("188","石家庄","1");
		 } catch (e) {
			 changeCity("188","石家庄","1");
		 }
	 }
	 var theight = dojo.byId("mainTable").clientHeight;
	 //alert(theight);
	 dojo.byId("tdTab").height=theight-50-23;
	 showBox();
	  
});

var d_flag = "<%=d_flag%>";
//广电测试暂时不要
//window.setInterval('showBox()',<%=warningTimeIntervalL%>);
var int_value = window.setInterval('closeBox()',15000);

function init()
{
	//top.changeWinWidth();
	if(d_flag=="1"){
		var dscreen=document.getElementById("dscreen");	
		dscreen.style.display="inline";
	}
	
	<%
	if (appNames != null) {
	    Iterator it = appNames.iterator();
	    int i=0;
	    while(it.hasNext()) {		
		    String uStr = (String)it.next();	
    %>
	        refreshUrls["<%=i%>"] = "<%=uStr%>";
    <%      i++; 
        }
	}
    %>	
    
    //added for liaoning 20121123
    var isShowWarning = executeRequest("login","isShowWarning");
	if (isShowWarning == "show") {
	    window.open("<%=path%>/warning.jsp","obj",'height=400, width=600, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
	} else {
		
	}

	
}

function openKBS() {
	window.open("<%=kbsURL%>","obj",'height=600, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=no, status=no');
}

function OpenDoubleScreen()
{
	try{
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
</script>

<style type="text/css">
.cityName{
	margin:20px 0 0 200px;
	position:relative;
	width:50px;
}
.cityName a{
	width:60px;
	color:#015880;
	font-size:12px;
}
.bubble_div{
	position: absolute;
	z-index:100000;
	right:5px;
	top:17px;
	overflow:visible;
}
.b_tl{
	background-image: url(images/b_tl.png);
	height: 10px;
	width: 6px;
}
.b_t{
	background-image: url(images/b_t.png);
	background-repeat: no-repeat;
	background-position: right;
}
.b_tr{
	background-image: url(images/b_tr.png);
	height: 10px;
	width: 6px;
}
.b_l{
	background-image: url(images/b_l.png);
	background-repeat:no-repeat;
	height: 68px;
	width: 6px;
	background-position: bottom;
}
.b_bl{
	background-image: url(images/b_bl.png);
	height: 7px;
	width: 6px;
}
.b_c{
	background-color: #f6faff;
}
.b_b_l{
	background-image: url(images/b_b_l.png);
	height: 7px;
	width: 75px;
}
.b_b{
	background-image: url(images/b_b.png);
}
.b_b_r{
	background-image: url(images/b_b_r.png);
	height: 7px;
	width: 75px;
}
.b_br{
	background-image: url(images/b_br.png);
}
.b_r{
	background-image: url(images/b_r.png);
	background-repeat:no-repeat;
	height: 68px;
	width: 6px;
	background-position: bottom;
}
.b_c a{
	color:#7c7c7c;
	margin:14px;
	white-space:nowrap;
	aligh:right;
}
</style>

</head>
<body onLoad="startclock();initTab();queryFavorite();init();" class="unieap" style="overflow-y:hidden;overflow-x:hidden;">
<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" id="mainTable">
  <%
  String requestHead = request.getHeader("User-Agent");
  if (requestHead.indexOf("Firefox") != -1) {
		out.println("<tr height='1px'><td></td></tr>");
	} 
  %>
  
  <tr>
    <td height="50px"><table width="100%" height="50px" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td rowspan="2" id="header_logo" align=right>
             <table>
             <tr><td aligh=right>
	            <div class="cityName" id="selfCity" ><div id="selfCityDiv"></div>
					<div class="bubble_div" id="citySelContent" style="width:160px;display:none" onmouseout="javascript:document.getElementById('citySelContent').style.display='none';" onmouseover="javascript:document.getElementById('citySelContent').style.display='block';">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 160px; table-layout: fixed; word-wrap: break-word;">
						  <tr>
						    <td class="b_tl"></td>
						    <td colspan="3" class="b_t"></td>
						    <td class="b_tr"></td>
						  </tr>
						  <tr>
						   <td class="b_l"></td>
						    <td colspan="3" class="b_c" id="cityOption"></td>
						    <td class="b_r"></td>
						  </tr>
						  <tr>
						    <td class="b_bl"></td>
						    <td class="b_b_l"></td>
						    <td class="b_b"></td>
						    <td class="b_b_r"></td>
						    <td class="b_br"></td>
						  </tr>
						</table>
					</div>
				</div>
				</td>
				<td>
				&nbsp;&nbsp;
				</td>
				</tr>
				</table>
          </td>
          <td id="header_button"><a href="javascript:openKBS();"><img src="<%=path%>/common/dx20/images/main/kbs.gif" width="16" height="16" alt="知识库"></a><a href="javascript:addFristPageTab();"><img src="<%=path%>/common/dx20/images/main/icon_home.gif" width="16" height="16" alt="首页"></a><a href="#" onClick="relogin();return false;"><img src="<%=path%>/common/dx20/images/main/icon_relogin.gif" width="14" height="16" alt="重新登录"></a><a href="javascript:updatePassword();"><img src="<%=path%>/common/dx20/images/main/icon_edit.gif" width="16" height="16" alt="配置"></a><a href="javascript:doAddFavorite();"><img src="<%=path%>/common/dx20/images/main/icon_favori.gif" width="15" height="16" alt="收藏" ></a><a href="#" onClick="help('<%=params %>');return false;"><img src="<%=path%>/common/dx20/images/main/icon_help.gif" width="16" height="16" alt="帮助"></a>&nbsp;&nbsp;&nbsp;</td>
        </tr>
        <tr>
            <td id="header_favori" nowarp><div id="favoriteDiv" width="1px" style="white-space:nowrap;"></div></td>
        </tr>
      </table></td>
  </tr>
  <tr>
    <td id="tdTab"><iframe id="subframe" width="100%" height="100%" frameborder="0" src="<%if(isTagShowing) { out.print(tabUrl);} else { out.print(crmMiddleUrl); } %>"  style="overflow-y:hidden;overflow-x:hidden;"></iframe></td>
  </tr>
  <tr>
    <td height="23px" id="footer">
      <table width="100%" height="23px" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="login_info">您好：<%=organName %> <%=userName %>，欢迎登录！</td>
           <td width="23px" id="dscreen" style="display:none"><input type="submit" class="button_ds" name="ds" value="" onMouseOver= "this.className= 'button_ds_o' " onMouseOut= "this.className= 'button_ds' " onMouseDown= "this.className= 'button_ds_d' " onMouseUp= "this.className= 'button_ds_o'" onclick="OpenDoubleScreen();" ></td>
          <%

          if (requestHead.indexOf("Firefox") == -1) {
          %>
          <td width="23px"><input type="button" class="button_calculator" name="calculator" value="" onMouseOver= "this.className= 'button_calculator_o' " onMouseOut= "this.className= 'button_calculator' " onMouseDown= "this.className= 'button_calculator_d' " onMouseUp= "this.className= 'button_calculator_o';executeWindowsCmd('calc.exe');"></td>
          <td width="23px"><input type="button" class="button_notepad" name="notepad" value="" onMouseOver= "this.className= 'button_notepad_o' " onMouseOut= "this.className= 'button_notepad' " onMouseDown= "this.className= 'button_notepad_d' " onMouseUp= "this.className= 'button_notepad_o'" onclick="executeWindowsCmd('notepad.exe');"></td>
          <td width="23px"><input type="button" class="button_calendar" name="calendar" value="" onMouseOver= "this.className= 'button_calendar_o' " onMouseOut= "this.className= 'button_calendar' " onMouseDown= "this.className= 'button_calendar_d' " onMouseUp= "this.className= 'button_calendar_o'" onclick="executeWindowsCmd('rundll32.exe shell32.dll,Control_RunDLL timedate.cpl,,0');"></td>
          <%
          }
          %>
          <td class="footer_date"><FORM NAME='jsfrm'>
              <INPUT TYPE="text" class="date_show" NAME='face' size=27 value=''>
            </form></td>
        </tr>
      </table></td>
  </tr>
</table>
<!---->
<div id="note_div" style="height:200px;align:right">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td class="note_tl"></td>
      <td class="note_t"></td>
      <td class="note_tr"></td>
    </tr>
    <tr>
      <td class="note_l"></td>
      <td class="note_tc">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="note_tc_title">公告信息</td>
            <td><a class="note_button" onClick="closeBox()"><img src="<%=path%>/common/dx20/images/main/note/note_close.gif" width="5" height="5" alt="关闭"></a></td>
          </tr>
        </table>
        
        </td>
      <td class="note_r"></td>
    </tr>
    <tr>
      <td class="note_l"></td>
      <td class="note_c"><div id="updiv" style="OVERFLOW-Y:scroll;height:150px">欢迎登录本系统！</div></td>
      <td class="note_r"></td>
    </tr>
    <tr>
      <td class="note_bl"></td>
      <td class="note_b"></td>
      <td class="note_br"></td>
    </tr>
  </table>
</div>

<form name='favoForm' id='favoForm' method="post" target="favoSub">
<input type='hidden' id='operType' name='operType'>
<input type='hidden' id='menuId' name='menuId'>
<input type='hidden' id='systemId' name='systemId'>
<input type='hidden' id='pageLink' name='pageLink'>
<input type='hidden' id='webcontext' name='webcontext' value="<%=webpath%>">
</form>

<iframe id="favoSub" name="top_page" width="100%" height="0" frameborder="0" src='<%=topUrl %>'></iframe>
<iframe id="remoteAuth" name="remoteAuth" width="100%" height="0" frameborder="0" src="<%=remoteAuth%>"></iframe>
<iframe id="home_city_ifm" name="home_city_ifm" width="100%" height="0" frameborder="0" src="<%=homeCityIfmUrl%>"></iframe>
</body>
</html>
