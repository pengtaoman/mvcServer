<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>applicationPages</title>
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
<script >
var appName;
var appId;
Ext.onReady(function(){
	var WEB_APP_NAME = window.opener.document.getElementById('path').value;
	Ext.BLANK_IMAGE_URL = WEB_APP_NAME+'/unieap/pages/workflow/webdesign/ext-1.1.1/resources/images/shared/s.gif';
	Ext.QuickTips.init(); 
	var xt = Ext.tree;


	var leftTreePanel = new xt.TreePanel('leftTreePanel', {
		animate:false,
       // enableDD:true,
        containerScroll: true,
        //lines:false,
        loader: new xt.TreeLoader({dataUrl:WEB_APP_NAME+'/application.do',
       							   baseParams:{'nodeType':'root','id':'root'}}),
		rootVisible: true
    });

    var leftTreeRootNode = new xt.AsyncTreeNode({
        text: '全局',
        iconCls:'app',
        draggable:false,               
        id:'source'
    });
    leftTreePanel.setRootNode(leftTreeRootNode);
    leftTreePanel.render();
    leftTreeRootNode.expand();

    leftTreePanel.loader.on("beforeload", function(treeLoader, node) {   	
	    	var nodeType = node.attributes.nodeType 
	        treeLoader.baseParams.nodeType = nodeType;
	        treeLoader.baseParams.id = node.attributes.id;
	    });
	    
	//left tree select node
	var selectModel = leftTreePanel.getSelectionModel();
 	selectModel.on("selectionchange",function(){
	
	//get select node
	var node = selectModel.getSelectedNode();
	var type = node.attributes.nodeType;
	var id = node.attributes.id;
	var text = node.attributes.text;
	appName = text;
	appId=id;
	});
	
});	

Ext.onReady(function(){
	var WEB_APP_NAME = window.opener.document.getElementById('path').value;
	Ext.BLANK_IMAGE_URL = WEB_APP_NAME+'/unieap/pages/workflow/webdesign/ext-1.1.1/resources/images/shared/s.gif';
	Ext.QuickTips.init(); 
	var xt = Ext.tree;


	var leftTreePanel = new xt.TreePanel('locleftTreePanel', {
		animate:false,
       // enableDD:true,
        containerScroll: true,
        //lines:false,
        loader: new xt.TreeLoader({dataUrl:WEB_APP_NAME+'/locapplication.do',
       							   baseParams:{'nodeType':'root','id':'root'}}),
		rootVisible: true
    });

    var leftTreeRootNode = new xt.AsyncTreeNode({
        text: '局部',
        draggable:false,
        iconCls:'app',               
        id:'source'
    });
    leftTreePanel.setRootNode(leftTreeRootNode);
    leftTreePanel.render();
    leftTreeRootNode.expand();

    leftTreePanel.loader.on("beforeload", function(treeLoader, node) {   	
	    	var nodeType = node.attributes.nodeType 
	        treeLoader.baseParams.nodeType = nodeType;
	        treeLoader.baseParams.id = node.attributes.id;
	    });
	    
	//left tree select node
	var selectModel = leftTreePanel.getSelectionModel();
 	selectModel.on("selectionchange",function(){
	
	//get select node
	var node = selectModel.getSelectedNode();
	var type = node.attributes.nodeType;
	var id = node.attributes.id;
	var text = node.attributes.text;
	appName = text;
	appId=id;
	});
	
});	

function commitValue(){
	var name='<%=request.getParameter("applicationPageName")%>'
	switch(name){
		case "openAutoNodeApplication":window.opener.document.autoNodeForm.application.value = appName;break;
		case "openDelayApplication": window.opener.document.getElementById("delayApplication").value = appName;
									 window.opener.document.getElementById("actionApplication").value = appId; break;
		case "openAlertApplication": window.opener.document.getElementById("alertApplication").value = appName;
									 window.opener.document.getElementById("alertActionApplication").value = appId;	break;
		default: window.opener.document.manualNodeForm.applicationName.value = appName;
		         window.opener.document.manualNodeForm.application.value = appId;
		         alert(appId)
	}
	window.close();
}
</script>

</head>
<body onload="">
<br>
   <div class="main_label_outline" style="width:310px">
<fieldset style="width:300px;">
<legend>应用程序</legend>
<table>
<tr>
	<td  valign="top">
		<!-- span style="border:1px solid #C0C0C0;width:80">应用程序</span-->
		        <div id="leftTreePanel" style="align:top" />
		        <div id="locleftTreePanel" style="align:bottom" />
	</td>
</tr>
</table>
</fieldset>
<br>
<table style="width:310px" class="main_button">
       <tr>
           <td align="right" style="width:310px">
             <input type="button" value="提交" class="button_normal" onclick="commitValue()"/>&nbsp;
             <input type="button" value="取消" class="button_normal" onclick="window.close()"/>  
           </td>
       </tr>
</table> 
</body>
</html>