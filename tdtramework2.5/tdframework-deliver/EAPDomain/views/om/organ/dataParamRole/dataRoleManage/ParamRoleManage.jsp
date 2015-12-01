<%@ page contentType="text/html; charset=gb2312"%>
<%@ page import="java.util.List"%>
<%
	String path = request.getContextPath();
%>
<html>
  <head>
    <title>RoleManage.jsp</title>
    <link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
    <script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <script language="JavaScript">
    <!--
    	var myform;
    	// ҳ���ʼ������
	    function load() {
	    	document.EAPForm.bModify.disabled = "true";
            document.EAPForm.bDelete.disabled = "true";
            document.EAPForm.bGrant.disabled  = "true";
            document.EAPForm.bView.disabled   = "true"; 
		}
		
		function makeMyForm(){
		    myform = parent.ParamRoleList.myform;
		}
		
		/**
		 * ���Ӱ�ť
		 */
		function bAddClick(webpath){
			var newNewRoleName=window.showModalDialog(webpath + '/views/om/organ/dataParamRole/dataRoleManage/addRolePage.jsp','', 'status:no;dialogWidth:300px;dialogHeight:160px');
			if(newNewRoleName!=undefined) {
			    document.getElementById("roleName").value = newNewRoleName;
			    
			    document.EAPForm.target = "ParamRoleList";
			    document.EAPForm.action = webpath+"/om/ParamRoleManage.do?OperType=add";
			    document.EAPForm.submit();
			}
		}
		
		/**
		 * �޸İ�ť
		 */
		function bModifyClick(webpath){
			var roleName = myform.roleName.value;
			var newNewRoleName=window.showModalDialog(webpath + '/views/om/organ/dataParamRole/dataRoleManage/addRolePage.jsp',roleName, 'status:no;dialogWidth:350px;dialogHeight:180px');
			if(newNewRoleName!=undefined) {
			    document.getElementById("roleName").value = newNewRoleName;
			    
			    document.EAPForm.target = "ParamRoleList";
			    document.EAPForm.action = webpath+"/om/ParamRoleManage.do?OperType=modify";
			    document.EAPForm.submit();
			}
		}
		
		/**
		 * ɾ����ť
		 */
		function bDeleteClick(){
			parent.ParamRoleList.bDeleteClick();
		}
		
		/**
		 * ��Ȩ��ť
		 */
		function bGrantClick(){
			document.EAPForm.target = "ParamRoleAdjust";
			document.EAPForm.action = "<%=path%>/om/dataparammanage.do?method=queryRoleTable&operType=grant";
			document.EAPForm.submit();
		}
		
		/**
		 * �鿴Ȩ�ް�ť
		 */
		function bViewClick(){
			document.EAPForm.target = "ParamRoleAdjust";
			document.EAPForm.action = "<%=path%>/om/dataparammanage.do?method=queryRoleTable&operType=view";
			document.EAPForm.submit();
		}
		
		/**
		 * ���Ұ�ť
		 */
		function bQueryClick(){		
			document.EAPForm.bModify.disabled = "false";
            document.EAPForm.bDelete.disabled = "false";
            document.EAPForm.bGrant.disabled  = "false";
            document.EAPForm.bView.disabled   = "false";   
             
		    document.EAPForm.target = "ParamRoleList";
		    document.EAPForm.action = "<%=path%>/om/ParamRoleManage.do?OperType=search";
		    document.EAPForm.submit();
		}
		
		/**
		 * ���һس�����
		 */
		function nas_enter()
		{
			var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
			if(scode == 13){
				bQueryClick();
			}
		}
	-->
	</script>
  </head>
  <body onload="load()" class="mainBody">
	<form method="post" id="EAPForm" name="EAPForm">
		<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
			 <tr class="tableTitleTR2">
				<td colspan="4" >
					<table width="100%" border="0" cellpadding="0" cellspacing="0" >
			            <tr>
						<td class="tableTitleLeft2" >&#160;</td>
						<td class="tableTitle2">���ݽ�ɫ��Ϣ</td>
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
							<td class="formLabel" align="left">��ɫ����&#160;&#160;</td>
							<td align="center" class="formField" >
								<input type="text" id="ParamRoleName" name="paramRoleName" onkeydown="nas_enter();" class="textType"/>
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
			   	   <input type="hidden" name="roleId" id="roleId" value=""/>
			   	   <input type="hidden" name="roleName" id="roleName" value=""/>
			   </td>
			   <td class="formTableRB">&#160;</td>
		    </tr>
		 </table>
		 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
			<button class="formButton" name="bQuery" onClick="bQueryClick();return false;">��&#160;&#160;��</button>
			<button class="formButton" name="bAdd" onClick="bAddClick('<%=path%>');return false;">��&#160;&#160;��</button>
			<button class="formButton" name="bDelete" onClick="bDeleteClick();return false;">ɾ&#160;&#160;��</button>
		 </div>
		 <div class="formButtonDIV" id="filebutton2" style="display:block"> 
		 	<button class="formButton" name="bModify" onclick="bModifyClick('<%=path%>');return false;">��&#160;&#160;��</button>
			<button class="formButton" name="bGrant" onclick="bGrantClick();return false;">��&#160;&#160;Ȩ</button>
			<button class="formButton" name="bView" onClick="bViewClick();return false;">�鿴Ȩ��</button>
		 </div>
	</form>
	</body>
</html>
