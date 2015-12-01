
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<head>
<title>表单列表</title>
 	<link rel="stylesheet" type="text/css" href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/xtheme-aero.css" />
	<link rel="stylesheet" type="text/css" href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/css/appnewmgt/applicationManager.css" />
	<link rel="stylesheet" type="text/css" href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/css/appnewmgt/font.css" />
	<link rel="stylesheet" type="text/css" href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" />
	
	<%@include file="ext-js.jsp" %> 
	<script>
	  var contextPath ="<%=request.getContextPath()%>";
	   if(document.all){
	 		self.resizeTo(260,410); 
	 	}else{
	 		self.resizeTo(260,440); 
	 	}
	
		Ext.onReady(function(){  
		    var tree = Ext.tree;
		    Ext.QuickTips.init();
		    
		    var cview = Ext.DomHelper.append('tree',
        		{cn:[{id:'main-tb'},{id:'cbody'}]}
    		);
    		
			var layout = new Ext.BorderLayout('tree',{
		        center: {    
		            margins:{left:0,right:0,bottom:0,top:0}
		        }
		    });
	
		    layout.beginUpdate();
		    layout.batchAdd({
       				center : {el: cview,autoScroll:true,fitToFrame:true,resizeEl:'cbody'}
    				});
		    var ctree = new tree.TreePanel('cbody', {
				animate:true,
		        containerScroll: true,
		        enableDrag: true,
		        loader: new tree.TreeLoader({dataUrl:'<%=request.getContextPath()%>/formDefList.do',
		       							   baseParams:{'nodeType':'root','id':'root'}}),
				rootVisible: true,
		        autoScroll:true,
		        fitToFrame:true 
	    });
	    
		    var croot = new tree.AsyncTreeNode({
		        allowDrag:false,
		        allowDrop:true,
		        id:'croot',
		        text:'表单',
		        cls:'croot'		
		    });
		 
		   
		    function beforeCollapseHandler(node, deep, anim){		
				node.select();
			}  
		    
		    
		    ctree.on('beforecollapse',beforeCollapseHandler);  
		 
		    ctree.el.on('keypress', function(e){
		        if(e.isNavKeyPress()){
		            e.stopEvent();
		        }
		    });
		  	ctree.setRootNode(croot);
		    ctree.render();
		    croot.expand();
		 	
		  	ctree.on('click',function(){
		  		var parentIdStore;			
		  		var sm = ctree.getSelectionModel();	  	 
		  		var currentNode = sm.getSelectedNode();
		   		
		   		if(currentNode.attributes.id!="croot")
		   		{
			   		appName=currentNode.attributes.text;
					appId=currentNode.attributes.id;
				}	
				else
				{
					appName="";
					appId="";
				}	          					     				   
		 });
		 
		 layout.add("center",ctree);
		 layout.endUpdate();
	  	
		});
	
		var  appName="";
		var   appId="";
		function commitValue(){
		    window.opener.document.appForm.appUrl.value = appId;
			window.opener.document.appForm.appName.value=appName;
			window.close();
		}
  </script> 
</head>

<body >
  <div id="tree" class="categorytreemanager" style="height:310px;width:220px;overflow:auto;left:0">
  </div>
<table style="width:220px" class="main_button">
       <tr>
           <td align="right" style="width:220px">
             <input type="button" value="提交" class="button_small" onclick="commitValue()"/>&nbsp;
             <input type="button" value="取消" class="button_small" onclick="window.close()"/>  
           </td>
       </tr>
</table> 



</body>
</html>