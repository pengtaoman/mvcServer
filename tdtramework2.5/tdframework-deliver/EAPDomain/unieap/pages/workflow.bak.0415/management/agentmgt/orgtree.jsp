<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<uniflow:style />
<title>组织结构列表</title>
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
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/orgTree.js"></script>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/AsyncTreeNode.js"></script>


<script language="javascript">



function cancle_onclick(){
window.close();
}
</script>
</head>
<body>
<uniflow:m_table style="main_title_table">
<tr height="20"></tr>
<tr>
<td width="280" > 
	<div style="height:200px; width:280px; overflow:auto;border-style:solid;border-width:1pt; border-color:#9ab5cc">
		<div id="leftTreePanel" style="align:top" />
	</div>
</td>
</tr>
</uniflow:m_table>
<uniflow:p_action>
<uniflow:button id="ok" action="javascript:ok_onclick()" name="确定"></uniflow:button>
<uniflow:button  id="cancle" action="javascript:cancle_onclick()" name="取消"></uniflow:button>
</uniflow:p_action>

</body>
</html:html>