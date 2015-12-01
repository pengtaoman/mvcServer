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
<title>办理人</title>
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
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/unitOrgTree.js"></script>
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
	               		north:{
	               			titlebar: true,
	               			title:'组织机构'
	               		},
	                    west: {
	                        initialSize: 200,
	                        collapsible: false,
	                        minSize: 100,
	                        autoScroll:true,
	                        maxSize: 400
	                    },
	                    center: {
	                        split:true,
	                        initialSize: 200,
	                        titlebar: false,
	                        collapsible: false,
	                        minSize: 100,
	                        autoScroll:true,
	                        maxSize: 400
	                    },
	                    south: {
	                        split:false,
	                        initialSize: 200,
	                        titlebar: true,
	                        title:'动态办理人',
	                        minSize: 100,
	                        maxSize: 400
	                    }
	                    
	                });
	                layout.beginUpdate();
	                
	                layout.add('west', new Ext.ContentPanel('nav', {fitToFrame:true,autoScroll:true, closable:false}));
	               	layout.add('center',new Ext.ContentPanel('inner2', { fitToFrame:true,autoScroll:true, closable:false}));
	               	layout.add('south',new Ext.ContentPanel('inner1', {fitToFrame:true, closable:false}));
	                layout.endUpdate();
	           }
	     };
	       
	}();
	Ext.EventManager.onDocumentReady(Example.init, Example, true);
	</script>
</head>
<body onload="AddValueToSelect()" class="xtheme-gray">
<input type="hidden" value=<%=request.getParameter("flag") %> id=cType></input>
<br>

<!-- 组织机构树 -->
<div id ="container">
  <div id="nav" class="x-layout-inactive-content">
  	   <div id="leftTreePanel" style="align:top" />
  </div>
  
  <!-- 组织结构选择 -->
  <div id="inner2" class="x-layout-inactive-content"> 
	  <table>
		  <tr>
			  <td style="width:10px"></td>
				<td>
					<table border="0"  cellspacing="0" cellpadding="0">
								<tr>
									<td  align="left" style="width:140px"><bean:message bundle="uniflow" key="workflow.webdesign.selectlist"/></td>
									<td style="width:100px"></td>
									<td   align="left" style="width:140px"><bean:message bundle="uniflow" key="workflow.webdesign.selectedlist"/></td>
								</tr>
								<tr >
									<td  align="center" rowspan="3">
									<div>
										<SELECT  multiple="true" id="select1" style="width:150px;font-size: 12px;" class="selectFont">
									</SELECT>
									</div>
									</td>
									<td align="center" style="height:50px">
										</td>
									<td  align="center" rowspan="3">
										<SELECT multiple="true" style="width:150px; font-size: 12px;"  id="select2" class="selectFont"></td>
								</tr>
								<tr>		
									<td align="center" style="height:60px">
										<input type="button" class="button_normal"  value='<bean:message bundle="uniflow" key="workflow.webdesign.add"/>' onclick="addSelect2Text('select1')"/><br><br>
										<input type="button" class="button_normal"  value='<bean:message bundle="uniflow" key="workflow.webdesign.delete"/>' onclick="removeSelect2Value('select2')"/><br><br>
										<input type="button" class="button_normal" value='<bean:message bundle="uniflow" key="workflow.webdesign.addAll"/>' onclick="addAll('select1')"/><br><br>
										<input type="button" class="button_normal" value='<bean:message bundle="uniflow" key="workflow.webdesign.deleteall"/>' onclick="deleteAll('select2')"/><br><br>
									</td>
								</tr>
								<tr>
									<td align="center" style="height:50px">
									</td>	
								</tr>	
				</table>
			</td>
		</tr>
	</table>
				
  </div>
</div>
  
 <!-- 动态办理人 -->
  <div id="inner1" class="x-layout-inactive-content">
    <table  class="main_label_table">
			    <tr>  <td style="width:10px">&nbsp;</td>
					  <td style="width:120px;"><input type="checkbox" id="2" name="define" style="checkbox" value="实例创建者">实例创建者</input></td>
					  <td style="width:130px;"><input type="checkbox" id="3" name="define" style="checkbox" value="实例创建者上级">实例创建者上级</input></td>	   
					  <td style="width:94px;"><input type="checkbox" id="4" name="define" style="checkbox" value="前一节点">前一节点</input></td>
					  <td style="width:118px;"><input type="checkbox" id="5" name="define" style="checkbox" value="前一节点上级" >前一节点上级</input></td>
				</tr>
	</table>
	<div style="height:10px">
		
	</div>
	<table>
		<tr>
			<td style="width:10px">&nbsp;</td>
			<td style="width:150px">节点：</td>
			<td style="width:98px"></td>
			<td style="width:150px">变量：</td>
		</tr>
	</table>
	
	<table>
      <tr>
       	<td style="width:10px">
       		&nbsp;
       	</td>
       	
        <td>
           <div style="height:90px; width:220px; overflow:auto;border-style:solid;border-width:1pt; border-color:#9ab5cc" id="selectNode">
           
          </div>
        </td>
        
        <td style="width:30px;">
        </td>
        
        <td style="width:150px">
           <div style="height:90px; width:220px; overflow:auto;border-style:solid;border-width:1pt; border-color:#9ab5cc" id="selectVariable">

           </div>
        </td>    
      </tr> 
    </table>
    
    <table  class="main_label_table" style="width:100%">
     <tr>
		<td   align="right">&nbsp;
		<input type="button" class="button_small" value='<bean:message bundle="uniflow" key="workflow.webdesign.submit"/>' onclick = "commitValue();window.close()"/>&nbsp;
		<input type="button" class="button_small" value='<bean:message bundle="uniflow" key="workflow.webdesign.cancel"/>' onclick = "window.close()"><br> 
		</td>
     </tr>			
    </table>
  
	</div>
</body>
</html>