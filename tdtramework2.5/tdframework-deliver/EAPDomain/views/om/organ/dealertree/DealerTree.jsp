<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%
	String webpath=request.getContextPath();
	String nullTree  = NullProcessUtil.nvlToString((String)request.getAttribute("nullTree"),"");
	String message   = NullProcessUtil.nvlToString((String)request.getAttribute("message"),"");
	String ifOpenWin = NullProcessUtil.nvlToString((String)request.getParameter("ifOpenWin"),"false");
	
	//System.out.println("MSG:"+message);
%>
<html>
<head>
   <title>ÇþµÀÐÅÏ¢</title>
   <base target="_self">
   <script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/treehandle.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
   <script  language=javascript src="<%=webpath%>/unieap/js/treeAPI.js"> </script>   
   <script  language=javascript src="<%=webpath%>/common/js/tree/fw_menu.js"></script>
   <script  language=javascript src="<%=webpath%>/common/js/tree/fw_menuEvent.js"> </script>
   <script  language=javascript> 
   function clickMethod(obj1, obj2){
        var dealerId = obj2;
        var webpath = document.getElementById('webpath').value;
		parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value= "organ";
		parent.organdisplayhidden.document.myform.CurrentSelectDealerId.value= obj2;
		parent.employeemaintance.location.href = webpath+"/views/om/blank.html"
		parent.employeelist.location.href = webpath+"/om/EmployeeQueryAction.do?OrganKind='organ'&DealerId=" + obj2 + "&OperType=dealerEmpList";
		parent.employeebutton.myform.bAdd.disabled = false;
   }
   
   function showDealerTree(obj1, obj2){
   		var dealerName = getNode(obj1, obj2).nodename;
   		//alert(dealerName);
        var dealerInfo = dealerName+':'+obj2;
		window.returnValue = dealerInfo;
		window.close();
   }
   
   function init(msg){
        var ifHaveInfo = document.getElementById('ifHaveInfo').value;
        if(ifHaveInfo!='false' && msg!=''){
        	 alert(msg);
        	 window.close();
        }
   }
   </script>
<style>
.TreeNode {
	padding:0px;
	margin:0px;
}
.TreeNode img { 
	border:0px
}
.TreeNode a:link {COLOR: Black; TEXT-DECORATION: none}
.TreeNode a:hover {COLOR: Yellow!important; TEXT-DECORATION: underline}
.TreeNode a:visited {COLOR: Black; TEXT-DECORATION: none}
.TreeNode a:active {COLOR: Green; TEXT-DECORATION: none}
</style>
</head>
<body onload="init('<%=message%>')">
<form>
<%if(message.trim().equals("")){%>
<%	if(ifOpenWin.trim().equals("true")) {%>
		<unieap:tree  tree='dealerTree' includeRootNode="false" readOnly="true"  needCheckBox='false' textClass="TreeNode" 
	                                                 checkboxLogical="1" jsMethodForOnclick='showDealerTree'/> 
	    <input type='hidden' name='OperType' value='setNewDealerID'/>
<%	}else if(nullTree.trim().equals("false")) {%>
	<unieap:tree  tree='dealerTree' includeRootNode="false" readOnly="true"  needCheckBox='false' textClass="TreeNode" 
	                                                 checkboxLogical="1" jsMethodForOnclick='clickMethod'/> 
<%
	}
 }else{
%> 
	<!--table width="100%" border="0" cellpadding="0" cellspacing="0" >
		<tr>
			<td align="center">
				<span style="font-size:20px;color:red;"><%=message%></span>
			</td>
		</tr>
	</table-->
<%
 }
%> 
<input type='hidden' name='webpath' value=<%=webpath%> />
<input type='hidden' name='ifHaveInfo' value=<%=nullTree%> />                                                                                                     
</form>
</body>
</html>