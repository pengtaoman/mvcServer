<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>日程设置</title>
<script language="javascript"
	src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/adapter/ext/Ext.js"></script>
<script language="javascript"
	src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/adapter/ext/ext-base.js"></script>
<link rel="stylesheet"
	href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/ext-all.css"
	type="text/css"></link>
<script language="javascript"
	src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/ext-all-debug.js"></script>
<link rel="stylesheet"
	href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/dependency.css"
	type="text/css"></link>
<link rel="stylesheet" 
	href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/css/org_dependency.css" 
	type="text/css"></link>
<LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" rel=stylesheet>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/unitOrgCalendarTree.js"></script>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/CalendarTreeLoader.js"></script>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/AsyncTreeNode.js"></script>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/TreeDragZone.js"></script>
<script type="text/javascript">
	function selected_onclick(nodeId){
		var url1="<%=request.getContextPath()%>/schedule.do?workdaycategoryId=" + nodeId;
		var url2="<%=request.getContextPath()%>/defaultworktimelist.do?categoryId="+nodeId;
		parent.document.getElementById("workdayInfo").src=url1;
		parent.document.getElementById("dayPartInfo").src=url2;
	}
</script>
</head>
<body onload="" class="">
  	   <div id="leftTreePanel" style="align:top" />
  	   	<input type="hidden" value='<%=request.getContextPath()%>' id="path" />
</body>
</html>