<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ page import="com.neusoft.tdframework.common.util.HttpObjectUtil" %>
<!-- 在本页要用到jstl-->
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%
	String webpath=request.getContextPath();
	String appName=HttpObjectUtil.getAppName(request);
	String name = (String)request.getAttribute("id");
	//String organtree="/om/OrganDisplayAction.do?OperType=createTree";
	//String organtree ="/views/om/organ/log/LogOrganDealerTree.jsp";
	String menuTree="/om/LogQueryAction.do?OperType=showMenuTree";
%>
<html>
<head>
<title>用户信息</title>
<link rel="stylesheet" href="<%=webpath%>/unieap/css/tab/unieapTab.css" type="text/css"></link>
<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_tab.css" type="text/css"></link>
<script type="text/javascript" src="<%=webpath%>/unieap/js/tab/tabApi.js"></script>
<script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"></script>
<script  language=javascript src="<%=webpath%>/unieap/js/tab/unieapTab.js"></script>
<script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="JavaScript">
  /**
	*清除session中的menuTree
	*/
	function funload(){
        var treeFlag="menuTree";
        executeRequest('eaptree','removeTreeFromSession','remove=true'+'&treeFlag='+treeFlag);
    }
</script>
</head>

<body style="margin:0px;" onunload="funload();">
<form id="tabForm" name="tabForm" action=""  method="post" >
<unieap:Tab name="tab" width="100%">
    <unieap:TabPage text="菜单信息" title="菜单信息" url="<%=menuTree%>" height="100%" active="true"/>
</unieap:Tab>
</form>
</body>
</html>

