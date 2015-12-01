<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
  <head>
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
	<style type="text/css">
			@import "<%=path%>/unieap/ria3.3/unieap/themes/default/css/unieap-all.css";
	</style>
	<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dojo/dojo.js" djConfig="parseOnLoad: true,locale:'zh'" ></script>
	<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/unieap-all.js" ></script>
	<script type="text/javascript">
		unieap.WEB_APP_NAME = "<%=path%>";
		dojo.require("unieap.dialog.MessageBox");
		function selfDefineIconClass(item,opened, isExpandable)
		{
       		if(item.data.nodeType=="unit") return "unitIcon";
			else return "roleIcon";
		}
		
		function getSelection()
		{
			var node = dijit.byId('orgTree').getCurrentNode();   
			if(!node){
				MessageBox.alert({title:"提示",message:"请选择一个岗位（角色）。",type:"error"},confirmButton.domNode); 
			}
			else
			{
				if(node.item.data.nodeType!='role')
				{
					MessageBox.alert({title:"提示",message:"请选择一个岗位（角色）。",type:"error",width:"280"},confirmButton.domNode); 
				}
				else
				{
					var dialog = unieap.getDialog();
					dialog.setReturn(node.item.data);
					dialog.close();
				}
			}
		}
		
		function close()
		{
		    var dialog = unieap.getDialog();
			dialog.close();
		}
	</script>
	<style type="text/css">
		.unieap .roleIcon{background-image: url("<%=path%>/unieap/pages/workflow/stylesheet/style1/orgtree_img/role.png");width : 16px;}
		.unieap .unitIcon{background-image: url("<%=path%>/unieap/pages/workflow/stylesheet/style1/orgtree_img/unit.gif");width : 16px;}
	</style>
    <title>ResourceCategoryTree</title>  
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
  </head>
  <body class="unieap">
 
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
  	<td style="height:300px; vertical-align:top;padding:5px;">
								<script language="javascript">
								function buildParam(params,item)
								{
									params  = params?params:{"Ajax":"true"};
	    							params.node = this.widget.getBinding().getId(item);
									var temp = item.data.nodeType;
									if(temp==null||temp==undefined) temp="unit";
									params.nodeType = temp;
        							return params;
								}
								</script>
  								<div dojoType="unieap.tree.Tree"    
								id="orgTree"
								label=""    
								loader="{'url':'<%=path%>/orgTree.do', buliderParams: buildParam}"
								getIconClass="selfDefineIconClass"
								binding="{rootNodeId:'OrgTreeRoot','parent':'parentID',query:{name:'parentID',relation:'=',value:'OrgTreeRoot'}}"
								>  
								</div>
  	</td>
  </tr>
  <tr>
	<td style="text-align:center">
		<div dojoType="unieap.form.Button" jsId="confirmButton" label='确定' onClick="getSelection" ></div>&nbsp;&nbsp;
		<div dojoType="unieap.form.Button" label='取消' jsId="toSelect" onClick = "close"></div>
	</td>
  </tr>
  </table>

  </body>
</html>
