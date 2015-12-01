<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%
	String webpath=request.getContextPath();
	String nullTree = NullProcessUtil.nvlToString((String)request.getSession().getAttribute("nullTree"),"");
	
	//System.out.println("Tree:"+nullTree);
%>
<html>
<head>
   <title>权限信息</title>
   <script  language=javascript src="<%=webpath%>/common/js/td_common.js"></script>
   <!-- script  language=javascript src="<%=webpath%>/common/js/waitingbar.js"></script-->
   <script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/treehandle.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/treeAPI.js"> </script>   
   <script  language=javascript src="<%=webpath%>/common/js/tree/fw_menu.js"></script>
   <script  language=javascript src="<%=webpath%>/common/js/tree/fw_menuEvent.js"> </script>
   <script  language=javascript> 
   function clickMethod(obj1, obj2){
        var dealerId = obj2;
        var nodeName = getNode(obj1, obj2).nodename;
        var webpath = document.getElementById('webpath').value;
        parent.parent.parent.employeelist.showWaitingBar();
        parent.parent.parent.employeebutton.showDealerMsg(nodeName);
		parent.parent.parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value= "organ";
		parent.parent.parent.organdisplayhidden.document.myform.CurrentSelectDealerId.value= obj2;
		parent.parent.parent.employeemaintance.location.href = webpath+"/views/om/blank.html"
		parent.parent.parent.employeelist.location.href = webpath+"/om/EmployeeQueryAction.do?OrganKind='organ'&DealerId=" + obj2 + "&OperType=dealerEmpList";
		parent.parent.parent.employeebutton.myform.bAdd.disabled = false;
   }
   /**
    *显示等待条
    */
   function showWaitingBar(){
		//WaitingBar.setMsg("正在查询员工信息，请稍等");
		WaitingBar.showMe();  //显示等待条
		//WaitingBar.hideMe();
   }
   </script>
<style>
.TreeNode {padding:0px;margin:0px;}
.TreeNode img {border:0px}
.TreeNode a:link {COLOR: Black; TEXT-DECORATION: none}
.TreeNode a:hover {COLOR: Yellow!important; TEXT-DECORATION: underline}
.TreeNode a:visited {COLOR: purple; TEXT-DECORATION: none}
.TreeNode a:active {COLOR: Green; TEXT-DECORATION: none}
</style>
</head>
<body>
<form>
<%if(nullTree.trim().equals("false")) {%>
<table width="100%" border="0" cellpadding="0" cellspacing="0" >
	<tr>
		<td align="center">
			<span style="color:red;">渠道信息按渠道名称排序</span>
		</td>
	</tr>
</table>
<unieap:tree  tree='dealerTree' includeRootNode="false" readOnly="true"  needCheckBox='false' textClass="TreeNode" 
                                                 checkboxLogical="1" jsMethodForOnclick='clickMethod'/>  
<%}else{%> 
<table width="100%" border="0" cellpadding="0" cellspacing="0" >
	<tr>
		<td align="center">
			<span style="font-size:20px;color:red;">没有可用的渠道信息</span>
		</td>
	</tr>
</table>
<%}%>     
<input type='hidden' name='webpath' value=<%=webpath%> />                                                                                                     
</form>
</body>
</html>