<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>工作日历</title>
<jsp:include page="/unieap/pages/workflow/stylesheet/style2009/3levelMenuShared.jsp"></jsp:include>
</head>
<body>
<script language="javascript">
	
	var _selected_org_tree_node_id = "";

	function refreshDayPartInfo()
	{
		var url2="<%=request.getContextPath()%>/defaultworktimelist.do?categoryId="+_selected_org_tree_node_id;
		document.getElementById("dayPartInfo").src=url2;
	}
	function refreshWorkdayInfo()
	{
		var url1="<%=request.getContextPath()%>/schedule.do?workdaycategoryId=" + _selected_org_tree_node_id;
		document.getElementById("workdayInfo").src=url1;
	}
</script>
<uniflow:m_table style="main_list_workcalendar">
<tr>
	<td rowspan="2" valign="top" style="border:0px solid;  padding-top:10px" height="330" width="240px">
	<fieldset style="margin-top:0px;margin-left:5px;border:1px solid #9999CC;height:100%"  >
		<legend style="font-size:16px">组织机构</legend>
		<div style="width:100%;height:96%;overflow:auto">
		<%@include file="workdaycategorytree.jsp" %> 
		</div >
	</fieldset>
	</td>
	<td valign="top" style="border:0px solid ;padding-top:10px;padding-left:5px; margin-rigth:10px;" >
	<fieldset style="border:1px solid #9999CC; padding-left:0px;">
	<legend style="font-size:16px">作息时间</legend>
		<iframe id="dayPartInfo" src="<%=request.getContextPath()%>/defaultworktimelist.do?categoryId="; width="100%" 
				height="190" scrolling="auto" frameBorder="no"></iframe>
	</fieldset>
	</td>
</tr>
<tr>
	<td style="border:0px solid ;padding-left:5px; margin-right:10px;" >
	<fieldset style="border:1px solid #9999CC;">
	<legend style="font-size:16px">日程设置</legend>
		<iframe id="workdayInfo" src="<%=request.getContextPath()%>/schedule.do?workdaycategoryId=" width="100%" 
				height="300" scrolling="auto" frameBorder="no"></iframe>
	</fieldset>
	</td>
</tr>
</uniflow:m_table>
</body>
</html>