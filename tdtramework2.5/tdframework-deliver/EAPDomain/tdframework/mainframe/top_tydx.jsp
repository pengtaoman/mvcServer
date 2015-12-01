<%@ page contentType="text/html;charset=GBK"%>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<%@ page import="com.neusoft.tdframework.portal.config.TDConfigHelper" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.util.ArrayList" %>

<%
	String path = request.getContextPath();
	SystemColl sysColl = (SystemColl)request.getAttribute("sysColl");
	AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
	List appNames = (List)request.getAttribute("appNames");
	if(appNames==null)
		appNames = new ArrayList();
	String workNo = authorizeVO.getWorkNo();
	String inst = TDConfigHelper.getHeaderSearch();
	if(inst==null)
	{
		inst="false";	
	}
	//SystemColl perSysColl = TDConfigHelper.getPermittedSystemColl() ;
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>页面标题</title>
<contextPath value="<%=path%>"/>
<meta http-equiv="MSThemeCompatible" content="no" />
<meta http-equiv="Expires" content="-1" />
<link rel="stylesheet" href="<%=path%>/tdframework/mainframe/css/td_style_top_dx.css" type="text/css" />
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/cookeiutil.js" ></script>
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/mainmenu_dx.js" ></script>
<script type="text/javascript" src="<%=path%>/unieap/js/Globals.js" ></script>
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/top.js" ></script>
<script type="text/javascript" src="<%=path%>/common/js/prototypeajax.js" ></script>

<!-- 页面级js  -->
<script type="text/javascript">
<!--
/*初始化函数*/
function keydown(){
	if ((event.ctrlKey)&&(event.keyCode==78))
	{ 
		event.returnValue=false;
	}
}
function init(){
	//topHeaderControl();
	MenuBar.defaultMenuNum=7;
	MenuBar.cookieId="U_<%=workNo%>";
	<%
		for(int i=0;i<sysColl.getRowCount();i++) {		
			SystemVO vo = (SystemVO)sysColl.getSystem(i);	
	%>
			MenuBar.createTopMenu("System<%=vo.getSystemId()%>","<%=vo.getSystemName()%>");
			<%
			 SystemColl subSysColl = (SystemColl)vo.getSubSystemColl();
  				if(subSysColl!=null){
					for(int j=0;j<subSysColl.getRowCount();j++) {		
						SystemVO subvo = (SystemVO)subSysColl.getSystem(j);	
			%>
							MenuBar.createSubMenu("<%=subvo.getSystemId()%>","<%=subvo.getSystemName()%>","System<%=vo.getSystemId()%>");

			<%
					 }
 
				}

		}
			%>

		MenuBar.loadFromCookie();
		MenuBar.buildTopMenu();
		MenuBar.buildSubMenu();

		if (MenuBar.getTopMenuNum()<=MenuBar.defaultMenuNum){
			$("menutools").style.display="none";
		}

		MenuBar.activeTopMenuByIndex(0);
		initMarquee();
		setWarnTimer();
	<%
		Iterator it = appNames.iterator();
		int i=0;
		while(it.hasNext()) {		
			String uStr = (String)it.next();	
	%>
		refreshUrls["<%=i%>"] = "<%=uStr%>";
	<%   i++; 
	}%>	
}
// -->
// 跳转叶面：  一级菜单id 二级菜单id 目的菜单id
// MenuBar.activeTopMenuById('System87','875','875GE');
</script>
</head>
<body class="mainframeBody" onLoad="init();" onkeydown="keydown();">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr> 
    <td width="221" style=" padding-left:5px;padding-top:2px;">
		<img src="<%=path%>/tdframework/mainframe/images/logo_dx.gif" width="221" height="42" ondrag="return false"/>
    </td>
    <td width="211" valign="top" style="padding-left:10px; padding-top:5px;">
		<img src="<%=path%>/tdframework/mainframe/images/logo.gif" width="211" height="19" ondrag="return false"/>
    	<div id="nav3" style="width:211px;overflow-x:hidden;overflow-y:hidden;"
	onmouseover="window.marqueeMove=false;"
	onmouseout="window.marqueeMove=true;"
		></div>
    </td>
    <td align="left" valign="top" >
	<div id="rightMenu"  >
		<div onmouseover="//showRightMenu2(this)" onmouseout="//hideRightMenu2(this)" style="border:0px;">
				<span style="display:inline;padding-top:0px">&#160;
				<a href="#" 
				onclick="relogin();return false;"><img src="<%=path%>/tdframework/mainframe/images/relogin_top.gif" title="重新登陆" width="22" height="22"/></a>&#160;&#160;<a href="#" 
				onclick="updatePassword();return false;"><img src="<%=path%>/tdframework/mainframe/images/modifile_code.gif" title="修改口令" width="22" height="22"/></a>&#160;&#160;<a href="#" 
				onclick="favoriteAdmin();return false;"><img src="<%=path%>/tdframework/mainframe/images/favori.gif" title="收藏管理" width="22" height="22"/></a>&#160;&#160;<a href="#"
				onclick="help();return false;"><img src="<%=path%>/tdframework/mainframe/images/help.gif" title="帮助信息" width="22" height="22"/></a>&#160;&#160;</span>
		</div>
		<span id="sleft" style="display:inline;padding-bottom:2px;height:16px" >
			<%if(inst.equals("true")){%>
				<input type="text" name="searchValue" id ="searchValue" style="border:1px solid;height:16px ;margin-right:2px">
				<input type="button" value="查询" onclick="instantSearch()" style="border:1px solid ;height:16px;margin-right:2px">
			<%}%>
		</span>
		<span id="sright" style="display:none;padding-top:0px;height:16px" onmouseover="showLeft=false" onmouseout="showLeftBar()">&#160;&#160;&#160;&#160;&#160;&#160;
			<a href="#" onclick="customMenu();">定制</a>
			<span id="menutools">|<a href="#" onclick="showAllMenu();">全部显示</a>|
				<a href="#" onclick="scrollMenu(-1);">左动</a>|
				<a href="#" onclick="scrollMenu(1);">右动</a>
			</span>
		</span>
		<span style="display:inline;height:15px;border:0px;" onmouseover="showRightBar()" onmouseout="showLeftBar()">&#160;<img src="<%=path%>/tdframework/mainframe/images/toolbar_m_dx.gif" width="12" height="15"/></span>
	</div>
      </td>
  </tr>
  <tr>
  <td  colspan="3"  height="4px" bgcolor="#f15a22"></td>
  </tr>
</table>
<!-- ==================================================================  -->
<div id="topMenuDiv"  onmousewheel="scrollMenuW();">
<div style="background-color:#ffffff;border:0px;width:100%;">
<table id="topMenuBar" width="100%" class="topmenubox" border="0" cellpadding="0" cellspacing="1"  >
<tr></tr>
</table>
</div>
</div>
<div id="nav1" style="width:100%;overflow-x:hidden;overflow-y:hidden;" 
onmousewheel="scrollSubMenuW();">
</div>
<div id="testDiv">
</div>
</body>
</html>
