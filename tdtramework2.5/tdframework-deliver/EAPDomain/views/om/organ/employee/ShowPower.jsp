<%@ page contentType="text/html;charset=GBK" language="java" %>
<!-- 在本页要用到jstl-->
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%
	String employeeId = (String) request.getAttribute("employeeId");
	String webpath=request.getContextPath();
	String needCheckBox = (String)request.getAttribute("needCheckBox");
	String operType = (String)request.getAttribute("operType");
    String showRolePower = "/om/EmployeeMaintanceAction.do?OperType="+operType+"&employeeId="+employeeId+"&needCheckBox="+needCheckBox;
    String showParamPower = "/om/dataRoleManage.do?oprType=showEmpPower&employeeId="+employeeId;
    String message = (String)request.getAttribute("message");
    String title = (String)request.getAttribute("title");
%>
<html>
<head>
<title><%=title%></title>
<LINK REL="stylesheet" HREF="<%=webpath%>/views/common/css/pubstyle.css" TYPE="text/css"/>
<link rel="stylesheet" href="<%=webpath%>/unieap/css/tab/unieapTab.css" type="text/css"></link>
<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_tab.css" type="text/css"></link>
<script type="text/javascript" src="<%=webpath%>/unieap/js/tab/tabApi.js"></script>
<script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"></script>
<script  language=javascript src="<%=webpath%>/unieap/js/tab/unieapTab.js"></script>
<script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
<script  language=javascript src="<%=webpath%>/views/om/organ/employee/js/ShowPower.js"> </script>
</head>

  <body onload="init()">
	  <form id="tabForm" name="tabForm" action=""  method="post" >
		  <unieap:Tab name="tab_param" tabMode="1" allLoad="false" width="530" design="1">
		    <unieap:TabPage text="功能角色" title="功能角色" url="<%=showRolePower%>" height="350" autoCheckEAP="false" active="true" />
		    <%if(!operType.equals("showAdjustPowerInit")){%>
		    <unieap:TabPage text="数据角色" title="数据角色" url="<%=showParamPower%>" height="350" autoCheckEAP="false"/>
		    <%}%>
		  </unieap:Tab>
		  <%if(needCheckBox!=null && !needCheckBox.trim().equals("") && needCheckBox.equals("true")){%>
		  <input type="button" name="adjustPower" value="提交" class="button2" onclick="doAdjustPower('menuTree')" />
		  <%}%>
		  <input type='hidden' name="webpath" value="<%=webpath%>" />
		  <input type='hidden' name="OperType" value="" />
		  <input type='hidden' name="employeeId" value="<%=employeeId%>" />
		  <input type='hidden' name="message" value="<%=message%>" />
		  
	  </form>
  </body>
</html>

