
<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>RoleManage.jsp</title>
    <link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <script language="JavaScript">
    <!--
    	var myform;
    	// ҳ���ʼ������
	    function load() 
	    {
	    	var arrayBtn=new Array(EAPForm.bAdd,EAPForm.bModify,EAPForm.bDelete,EAPForm.bGrant,EAPForm.bView,EAPForm.bQuery);
		    for (var i=0;i<arrayBtn.length;i++)
		    {
			/*
				arrayBtn[i].className="btn3_mouseout";
				arrayBtn[i].onmouseover=function(){this.className="btn3_mouseover"};
				arrayBtn[i].onmouseout=function(){this.className="btn3_mouseout"};
				arrayBtn[i].onmousedown=function(){this.className="btn3_mousedown"};
				arrayBtn[i].onmouseup=function(){this.className="btn3_mouseup"};
			*/
				if (arrayBtn[i].name=='bAdd')
					arrayBtn[i].disabled=false;
				else if (arrayBtn[i].name=='bQuery')
					arrayBtn[i].disabled=false;
				else
					arrayBtn[i].disabled=true;
		    }
		}
		
		function makeMyForm(){
		    myform = parent.ParamRoleList.myform;
		}
		
		/**
		 * ���Ӱ�ť
		 */
		function bAddClick(webpath)
		{
			makeMyForm();
			var newNewRoleName=window.showModalDialog(webpath + '/views/om/organ/ParamRoleManage/InputWindow.jsp','', 'status:no;dialogWidth:300px;dialogHeight:160px');
			if(newNewRoleName!=undefined) {
			    myform.roleName.value = newNewRoleName;
			    myform.target = "ParamRoleList";
			    myform.OperType.value = "add";
			    myform.action = "ParamRoleManage.do";
			    myform.submit();
			}
		}
		
		/**
		 * �޸İ�ť
		 */
		function bModifyClick(webpath)
		{
			makeMyForm();
			var roleName = myform.roleName.value;
			var newNewRoleName=window.showModalDialog(webpath + '/views/om/organ/ParamRoleManage/InputWindow.jsp',roleName, 'status:no;dialogWidth:350px;dialogHeight:180px');
			if(newNewRoleName!=undefined) {
			    myform.roleName.value = newNewRoleName;
			    myform.target = "ParamRoleList";
			    myform.OperType.value = "modify";
			    myform.action = "ParamRoleManage.do";
			    myform.submit();
			}
		}
		
		/**
		 * ɾ����ť
		 */
		function bDeleteClick(webpath)
		{
			if (!confirm('��ȷ��ɾ��ô��'))
				return false;
			makeMyForm();
			myform.target = 'ParamRoleList';
			myform.OperType.value = "delete";
			myform.action = "ParamRoleManage.do";
			myform.submit();
		}
		
		/**
		 * ��Ȩ��ť
		 */
		function bGrantClick(webpath)
		{
			makeMyForm();
			myform.view.value='false';		
			myform.target = "ParamRoleAdjust";
			myform.ifCreater.value = 'true';
			myform.action = "../dataRoleManage.do";
			myform.submit();
		}
		
		/**
		 * �鿴Ȩ�ް�ť
		 */
		function bViewClick(webpath)
		{		    
			makeMyForm();
			myform.view.value='true';		
			myform.target = "ParamRoleAdjust";
			myform.ifCreater.value = 'false';
			myform.action = "../dataRoleManage.do";
			myform.submit();
		}
		
		/**
		 * ���Ұ�ť
		 */
		function bQueryClick()
		{
			makeMyForm();
			myform.queryName.value = EAPForm.ParamRoleName.value;
			myform.OperType.value = "search";
			myform.action = "ParamRoleManage.do";
			myform.submit();
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
  <body onload="load()">
	<form method="POST" id="EAPForm" name="EAPForm">
		<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
			 <tr class="tableTitleTR2">
				<td colspan="4" >
					<table width="100%" border="0" cellpadding="0" cellspacing="0" >
			            <tr>
						<td class="tableTitleLeft2" >&#160;</td>
						<td class="tableTitle2">���ݽ�ɫά��</td>
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
			   <td class="formTableB">&#160;</td>
			   <td class="formTableRB">&#160;</td>
		    </tr>
		 </table>
		 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
			<button class="formButton" name="bQuery" onClick="bQueryClick();return false;">��&#160;&#160;��</button>
			<button class="formButton" name="bAdd" onClick="bAddClick('<%=path%>');return false;">��&#160;&#160;��</button>
			<button class="formButton" name="bDelete" onClick="bDeleteClick('<%=path%>');return false;">ɾ&#160;&#160;��</button>
		 </div>
		 <div class="formButtonDIV" id="filebutton2" style="display:block"> 
		 	<button class="formButton" name="bModify" onclick="bModifyClick('<%=path%>');return false;">��&#160;&#160;��</button>
			<button class="formButton" name="bGrant" onclick="bGrantClick('<%=path%>');return false;">��&#160;&#160;Ȩ</button>
			<button class="formButton" name="bView" onClick="bViewClick('<%=path%>');return false;">�鿴Ȩ��</button>
		 </div>
	</form>
	</body>
</html>
