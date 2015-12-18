<%@ page language="java" contentType="text/html;charset=GBK" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<%
	String topUri = request.getContextPath() + "/frameTop.do?method=common";

	String blankUri = request.getContextPath() + "/blank.html";


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
	String areaName = authorizeVO.getAreaName();
	String organName = authorizeVO.getOrganName();
	if(authorizeVO.getDealerName()!=null && authorizeVO.getDealerName().length()>1)
			organName = authorizeVO.getOrganName() + "|"+ authorizeVO.getDealerName();
	else
			organName = authorizeVO.getOrganName();

	String path = request.getContextPath();


	
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>陕西联通新一代BSS系统</title>
<contextpath value="<%=path%>"/>
<script language="JavaScript">
<!--

window.lastMenus=[];
window.maxLastMenus=5;

var APP_PATH="<%=path %>";

window.defaultStatus="登录信息：<%=areaName%> / <%=organName%> / <%=workNo%>";

window.defaultWidth="0,*,0";
window.maxWidth="0,*,0";

///////////////////////////////////

//-->
</script>
<script language="JavaScript" type="text/javascript" src="<%=path%>/tdframework/mainframe/js/main_lt.js"></script>
<!-- script language="JavaScript" type="text/javascript" src="<%=path%>/views/common/js/custviewcommon.js"></script -->
	<script language="JavaScript" type="text/javascript">
	window.$GlobeNav=new GlobeNav();
	</script>
</head>
<form name="myform">
	<input type="hidden" name="alertMsg"  value="<%=alertMsg%>" /> 
	<script language="JavaScript">

		if(document.myform.alertMsg.value != ""){
			alert(document.myform.alertMsg.value);
		}

	</script>
</form>

<form id="favorite" name="favorite" action="<%=path %>/favoriteMenuAdmin.do" target="hide_page_message" method="post" >
<input type="hidden" name="operType" />
<input type="hidden" name="favoriteName" />
<input type="hidden" name="menuId" />
<input type="hidden" name="systemId" />
<input type="hidden" name="pageLink" />
</form>

<frameset id="topframeset" cols="0,*,0" frameborder="NO" border="0" framespacing="0" >
<frame src="<%=blankUri%>"  scrolling="NO" noresize>

<frameset rows="106,*" frameborder="NO" border="0" framespacing="0" id="topFrame" >
  <frame src="<%=topUri%>" name="top_page" scrolling="NO" noresize  >
  <frameset cols="180,8,*"  frameborder="NO" border="0" framespacing="0" id="mainFrame">
    <frame src="<%=blankUri%>" name="mainleft" scrolling="NO" >
	<frame src="to_left.jsp" name="left-rightborder" id="toLeft" scrolling="NO" frameborder="NO">
    <frameset rows="34,*,0,0,0,0,0" frameborder="NO" border="0" framespacing="0"> 
	  <frame src="<%=navFrameUri%>" name="work_items" scrolling="NO"  >
 	  <frame src="<%=blankUri%>" name="main">
  	  <frame src="<%=blankUri%>" name="hide_page" scrolling="NO" >
      <frame name="notify_message"  src="<%=blankUri%>">
	  <Frame name="hide_page_message"  src="<%=blankUri%>">
	  <Frame name="info_board"  src="<%=blankUri%>">
	  <Frame name="remoteAuth"  src="<%=remoteAuth%>">
	</frameset>
  </frameset>
	<noframes>
	  <body>
		<p>此网页使用了框架，但您的浏览器不支持框架，请升级您的浏览器。</p>
	  </body>
	</noframes> 
</frameset>
<frame src="<%=blankUri%>"  scrolling="NO" noresize>
</frameset>

</html>
