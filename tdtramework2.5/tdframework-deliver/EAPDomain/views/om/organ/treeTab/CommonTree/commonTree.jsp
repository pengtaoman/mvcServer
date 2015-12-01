<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%
	String webpath=request.getContextPath();
%>
<html>
	 
	<head>
	<meta http-equiv="pragma" content="no-cache"/>
	<title></title>
	<LINK REL="stylesheet" HREF="<%=webpath%>/views/common/css/crm_style.css" TYPE="text/css"/>
   <title>菜单信息</title>
   <script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/treehandle.js"> </script> 
   <script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
   <script  language=javascript src="<%=webpath%>/views/common/js/treeTab/fw_menu.js"> </script>

</head>
<script>
function jsmethodforonclick(id,value){
//var node=document.all(id+value);
	var curFrame = parent.parent.parent.logquerybanner;
	
	var funcValue = curFrame.document.getElementById("funcmenu") ;
	if(value!='om'){
		funcValue.value = value;
	}
	//alert(curFrame.document.getElementById("funcmenu").value);
	
}
</script>
<body class="BODY">
<table align="center"  border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td width="5%" align="center" valign="top">
					<img src="<%=webpath%>/views/common/images/current2.gif" align="center" width="20" height="20"/>
				</td>
				<td  class="h14">菜单信息</td>
			</tr>
		</table>
		<form method="POST" name="myform" action="">
			<unieap:tree  tree='eap' includeRootNode="true" readOnly="true"  					
					needCheckBox="false"  textClass="TreeNode" checkboxLogical="1"/> 	
		</form>
</body> 
</html>