<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.procForms.ProcForm"%>
<%@ page import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>参与人</title>
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
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/punitOrgTree.js"></script>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/TreeLoader.js"></script>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/AsyncTreeNode.js"></script>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/TreeDragZone.js"></script>
<style type="text/css">
	html, body {
        font:normal 12px verdana;
        margin:0;
        padding:0;
        border:0 none;
        overflow:hidden;
        height:100%;
    }
	#header{
	    background: url(images/header-bar.gif) repeat-x bottom;
	    border-bottom: 1px solid #083772;
	    padding:5px 4px;
	}
	#footer{
	    background: url(images/header-bar.gif) repeat-x bottom;
	    border-top: 1px solid #083772;
	    padding:2px 4px;
	    color:white;
	    font:normal 8pt arial,helvetica;
    }
	#nav {
	}
	#nav, #inner1, #inner2 {
	    padding:10px;
	}
	#content p {
	    margin:5px;
	}
    .x-layout-panel-north, .x-layout-panel-south, #content .x-layout-panel-center{
        border:0px none;
    }
    #content .x-layout-panel-south{
        border-top:1px solid #aca899;
    }
    #content .x-layout-panel-center{
        border-bottom:1px solid #aca899;
    }
    </style>
	<script type="text/javascript">
	Example = function(){
	        return {
	            init : function(){
	               var layout = new Ext.BorderLayout(document.body, {
	                    west: {
	                        split:true,
	                        initialSize: 200,
	                        titlebar: true,
	                        collapsible: false,
	                        minSize: 100,
	                        maxSize: 400,
	                        tabPosition: 'left'   
	                    },
	                    center: {
	                        autoScroll: false
	                    }
	                });
	                layout.beginUpdate();
	                
	                layout.add('west', new Ext.ContentPanel('nav', {title: '组织机构树', fitToFrame:true,autoScroll:true,closable:false}));
	            
	                var innerLayout = new Ext.BorderLayout('content', {
	                    center: {
	                          
	                        autoScroll:true,
                            tabPosition: 'top'                                  
	                    }
	                });
	                innerLayout.add('center', new Ext.ContentPanel('inner2',"More Information1"));
	                layout.add('center', new Ext.NestedLayoutPanel(innerLayout));
	                layout.endUpdate();
	           }
	     };   
	}();
	Ext.EventManager.onDocumentReady(Example.init, Example, true);
	</script>
</head>
<body onload="AddValueToProcSelect()">
<input type="hidden" value=<%=request.getParameter("flag") %> id=cType></input>

<br>
<div class="main_label_outline" style="width:660px">

<bean:message bundle="uniflow" key="workflow.webdesign.unitorgtree.person"/>
<div id ="container">
  <div id="nav" class="x-layout-inactive-content">
		
		        <div id="pleftTreePanel" style="align:top" />
	</div>
	 <div id="content" class="x-layout-inactive-content"></div>
  	<div id="inner2" class="x-layout-inactive-content">
			<table border="0"  cellspacing="0" cellpadding="0">
				<tr>
					<td  align="left" style="width:140px"><bean:message bundle="uniflow" key="workflow.webdesign.selectlist"/></td>
					<td style="width:100px"></td>
					<td   align="left" style="width:140px"><bean:message bundle="uniflow" key="workflow.webdesign.selectedlist"/></td>
				</tr>
				<tr >
					<td  align="center" rowspan="3">
						<SELECT  multiple="true" id="select1" style="width:150px;font-size: 12px;" class="selectFont">
					</td>
					<td align="center" style="height:120px">
						</td>
					<td  align="center" rowspan="3">
						<SELECT multiple="true" style="width:150px;font-size: 12px;"  id="select2" class="selectFont"></td>
				</tr>
				<tr>		
					<td align="center" style="height:120px">
						<input type="button" class="button_normal"  value='<bean:message bundle="uniflow" key="workflow.webdesign.add"/>' onclick="addSelect2Text('select1')"/><br><br>
						<input type="button" class="button_normal"  value='<bean:message bundle="uniflow" key="workflow.webdesign.delete"/>' onclick="removeSelect2Value('select2')"/><br><br>
						<input type="button" class="button_normal" value='<bean:message bundle="uniflow" key="workflow.webdesign.addAll"/>' onclick="addAll('select1')"/><br><br>
						<input type="button" class="button_normal" value='<bean:message bundle="uniflow" key="workflow.webdesign.deleteall"/>' onclick="deleteAll('select2')"/><br><br>
					</td>
				</tr>
				<tr>
					<td align="center" style="height:120px">
					</td>
					
				</tr>
				<tr>
					<td  style="height:30px" align="left">
					</td>
					<td colspan="4" style="height:30px" align="right">&nbsp;
						<input type="button" class="button_normal" value='<bean:message bundle="uniflow" key="workflow.webdesign.submit"/>' onclick = "commitProcessValue();window.close()"/>
						<input type="button" class="button_normal" value='<bean:message bundle="uniflow" key="workflow.webdesign.cancel"/>' onclick = "window.close()"><br> 
					</td>
				</tr>
			</table>
  </div>
</div>
</body>
</html>