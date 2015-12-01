<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%
	String webpath = request.getContextPath();
%>
<html>
<head>
<base target="_self">
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<!-- 禁止 windows 主题风格 -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- 禁止缓存 headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<!-- end 禁止缓存 headers --> 
		
<title></title>
<contextPath value="<%=webpath%>"/>
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script language="javascript" src="<%=webpath%>/common/js/td_common.js"> </script>
<script  language="javascript" src="<%=webpath%>/common/js/waitingbar.js" ></script>
<script  language="javascript">
	/*
	*显示等待条
	*/
	function showWaitingBar(){
		//WaitingBar.setMsg("系统运行中，请稍等");
		WaitingBar.showMe();  //显示等待条
		//WaitingBar.hideMe();
	}
</script>
</head>
<body onload="" class="mainBody">
<unieap:form method="post" action="">	
	<div id="hiddenCheckDiv" style="display:none">
		<input type="hidden" id="ifValidId" name="ifValidId" value="false"/>
	</div>			 	
</unieap:form>
</body>
</html>
