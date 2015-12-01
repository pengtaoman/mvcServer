<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page import="com.neusoft.tdframework.common.util.HttpObjectUtil" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%
	String webpath=request.getContextPath();
	String appContextPath=HttpObjectUtil.getApplicationContextPath(request);
	String name = request.getParameter("name");
%>
<html>
<head>
<title></title>
	<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet>
	<link  rel="stylesheet" href="<%=webpath%>/unieap/css/standard/Style.css" type="text/css"></link>
	<link  rel="stylesheet" href="<%=webpath%>/unieap/css/listbox/Style.css" type="text/css"></link>
	<script language="javascript" src="<%=webpath%>/unieap/js/listbox.js"></script>
	<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
	<script language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
	<script>
		function init(){
			alert("onchange_Test_tab3");
		}
		function fn(){
			listBox_up("hello","left");
		}
		function fn2(){
			listBox_down("hello","left",false);
		}
		function fn3(){
			listBox_sort("hello","left");
		}
	</script>
</head>
<body class="main_body_bg">
<form method="post" action="/tdframework/demoPartRefresh.do?method=listbox">
<unieap:ListBox name="hello" isPartRefresh="true" actionName="demoPartRefresh" 
	actionMethod="listbox" width="400" size="15" leftTip="左单元" rightTip="右单元" 
		leftBtnTip="左移" rightBtnTip="右移" multiple="true" >
    <leftBox>
	    <dataOrigin className="com.neusoft.tdframework.demo.common.ListBoxImpl">
	        <param name="name" value="<%=name%>"/>
	        <param name="kind" value="firstAAC005"/>
			<param name="count" value="4"/>
		</dataOrigin>
    </leftBox>
    <rightBox>
 	 	<option value="aaa">座席员/张建军</option>
 	 	<option value="aaa">班长</option>
 	 	<option value="aaa">组长</option>
 	 	<option value="aaa">主任</option>
    </rightBox>
</unieap:ListBox>
<input type="submit" class="formButton">
<input type="button" class="formButton" value=" up " onclick="fn()">
<input type="button" class="formButton" value="down" onclick="fn2()">
<input type="button" class="formButton" value="sort" onclick="fn3()">
</form>
</body>
