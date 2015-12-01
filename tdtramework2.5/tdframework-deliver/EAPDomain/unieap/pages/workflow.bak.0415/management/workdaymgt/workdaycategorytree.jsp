
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
		_selected_org_tree_node_id = nodeId;
		refreshDayPartInfo();
		refreshWorkdayInfo();
	}
</script>

<div id="leftTreePanel" style="align:top" />
<input type="hidden" value='<%=request.getContextPath()%>' id="path" />