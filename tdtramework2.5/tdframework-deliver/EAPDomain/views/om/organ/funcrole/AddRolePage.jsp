<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>功能角色维护</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    
    <link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
    <script language="JavaScript">
    <!--
    	function Button1_OnClick()
		{
		    var priRoleName = form1.priRoleName.value;
			var roleName=form1.roleName.value;
			var roleDesc = form1.roleDesc.value;
			var valid = checkValues();
			if (valid != '') {
				alert(valid);
				return false;
			}
			
			if (roleName.length==0){
				alert ('您必须输入一个名称');
				return false;
			}
			window.returnValue=roleName+'`'+roleDesc+'`'+priRoleName;
			window.close();
		}
		
		function nas_enter(){
			var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
			if(scode == 13){
				//event.keyCode = 9;
				Button1_OnClick();
			}
		}
		
		function load()
		{
		    var nameDesc = window.dialogArguments;
		    var nameDescAry = nameDesc.split('`');
		    var newNewRoleName = nameDescAry[0];
		    var roleDesc = nameDescAry[1];
		    if(roleDesc == 'undefined' || roleDesc == undefined){
		    	roleDesc = '';
		    }
			form1.roleName.value=newNewRoleName;
			form1.roleDesc.value = roleDesc;
			form1.priRoleName.value = newNewRoleName;
		}
		
		function wClose()
		{
			window.close();
		}
		
		function checkValues()
		{
			var msg = '';
			var roleName = document.getElementById('ss_NewFolder').value;
			var roleDesc = document.getElementById('roleDesc').value;
			if (roleName.indexOf('\'') >= 0) {
				msg = '名称中不允许出现非法字符';
			}
			if (roleName.indexOf('\"') >= 0) {
				msg = '名称中不允许出现非法字符';
			}
			if (roleName.indexOf('\\') >= 0) {
				msg = '名称中不允许出现非法字符';
			}
			if (roleDesc.indexOf('\'') >= 0) {
				msg = '描述中不允许出现非法字符';
			}
			if (roleDesc.indexOf('\"') >= 0) {
				msg = '描述中不允许出现非法字符';
			}
			if (roleDesc.indexOf('\\') >= 0) {
				msg = '描述中不允许出现非法字符';
			}
			return msg;
		}
	-->
	</script>
  </head>
  
	<body onload="load();" class="mainBody">
		<form name="myform" id="form1">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
			 <tr class="tableTitleTR2">
				<td colspan="4" >
					<table width="100%" border="0" cellpadding="0" cellspacing="0" >
			            <tr>
						<td class="tableTitleLeft2" >&#160;</td>
						<td class="tableTitle2">功能角色维护</td>
						<td class="tableTitleRight2" >&#160;</td>
						</tr>
					 </table>
				 </td>
			</tr>
			<tr> 
		       <td class="formTableL" >&#160;</td>
		       <td class="formTableC">		 	 			
					<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
						<tr>
							<td class="formLabel" align="left">
								角色名称&#160;<span class="formRequested" >*</span>
							</td>
							<td align="center" class="formField" >
								<input id="ss_NewFolder" name="roleName" type="text" class="textType" maxlength="32" value="" onkeydown="nas_enter();">
							</td>			
							<td class="formField">&#160;</td>
							<td class="formField">&#160;</td>            
					    </tr>
					    <tr>
							<td class="formLabel" align="left">角色描述&#160;</td>
							<td align="center" class="formField" >
								<input id="roleDesc" name="roleDesc" type="text" class="textType" maxlength="256" value="" onkeydown="nas_enter();">
							</td>			
							<td class="formField">&#160;</td>
							<td class="formField">&#160;</td>            
					    </tr>			
					</table>
			   </td>
		       <td class="formTableR" >&#160;</td>
		    </tr> 
		    <tr> 
			   <td class="formTableLB">&#160;</td>
			   <td class="formTableB">&#160;
			   	   <input type="hidden" name="priRoleName" value=""/>
			   </td>
			   <td class="formTableRB">&#160;</td>
		    </tr>
		 </table>
		 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
			<input type="button" id="Button1" value="确  定" class="formButton" onClick="return Button1_OnClick();">
			<input type="button" id="Button2" value="取  消" class="formButton" onClick="wClose();">
		 </div>
		</form>
	</body> 
</html>
