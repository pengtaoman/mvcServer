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
<title>组织机构</title>
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
	                    west: {
	                        split:true,
	                        initialSize: 200,
	                        titlebar: true,
	                        collapsible: false,
	                        minSize: 100,
	                        autoScroll:true,
	                        maxSize: 400
	                    },
	                    center: {
	                        autoScroll: false
	                    }
	                });
	                layout.beginUpdate();
	                
	                layout.add('west', new Ext.ContentPanel('nav', {title: '组织机构', fitToFrame:true,autoScroll:true, closable:false}));
	                var innerLayout = new Ext.BorderLayout('content', {
	                    south: {
	                        split:true,
	                        initialSize: getLayoutHeight(),
	                        minSize: 100,
	                        maxSize: 400,
	                       // autoScroll:true,
	                        collapsible:false,
	                        titlebar: true
	                    },
	                    center: {
	                        autoScroll:true
	                    }
	                });
	                innerLayout.add('south', new Ext.ContentPanel('inner1', "其他条件设置"));
	                innerLayout.add('center', new Ext.ContentPanel('inner2'));
	                layout.add('center', new Ext.NestedLayoutPanel(innerLayout));
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

<div id ="container">
  <div id="nav" class="x-layout-inactive-content">
  	   <div id="leftTreePanel" style="align:top" />
  </div>
  <div id="content" class="x-layout-inactive-content"></div>
  <div id="inner1" class="x-layout-inactive-content">
   
    <table  class="main_label_table">
			    <tr>  <td style="width:10px">&nbsp;</td>
				      <td style="width:50px;">预定义</td> 
					  <td style="width:80px;"><input type="checkbox" id="2" name="define" style="checkbox" value="流程起草人">流程起草人</input></td>
					  <td style="width:110px;"><input type="checkbox" id="3" name="define" style="checkbox" value="流程起草人上级">流程起草人上级</input></td>	   
					  <td style="width:74px;"><input type="checkbox" id="4" name="define" style="checkbox" value="前一节点">前一节点</input></td>
					  <td style="width:98px;"><input type="checkbox" id="5" name="define" style="checkbox" value="前一节点上级" >前一节点上级</input></td>
				</tr>
			</table>
			<table>
				<tr>
					<td style="width:10px">&nbsp;</td>
					<td style="width:150px">节点：</td>
					<td style="width:73px"></td>
					<td style="width:150px">变量：</td>
				</tr>
			</table>
			 <table>
        <tr>
       <td style="width:10px">&nbsp;</td>
         <td style="width:150px">
            <div style="height:100px; width:150px; overflow:auto;border-style:solid;border-width:1pt; border-color:#9ab5cc" id="selectNode">
            
           </div>
         </td>
         <td style="width:70px;"></td>
         <td style="width:150px">
            <div style="height:100px; width:150px; overflow:auto;border-style:solid;border-width:1pt; border-color:#9ab5cc" id="selectVariable">

            </div>
         </td>    
        </tr> 
    </table>
        <table  class="main_label_table" style="width:440px">
         <tr>
					<td   align="right">&nbsp;
						<input type="button" class="button_small" value='<bean:message bundle="uniflow" key="workflow.webdesign.submit"/>' onclick = "commitValue();window.close()"/>&nbsp;
						<input type="button" class="button_small" value='<bean:message bundle="uniflow" key="workflow.webdesign.cancel"/>' onclick = "window.close()"><br> 
					</td>
		 </tr>			
        </table>
  
	</div>	
  <div id="inner2" class="x-layout-inactive-content">
  <table>
  <tr>
  <td style="width:10px"></td>
	<td><table border="0"  cellspacing="0" cellpadding="0">
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

</body>
</html>