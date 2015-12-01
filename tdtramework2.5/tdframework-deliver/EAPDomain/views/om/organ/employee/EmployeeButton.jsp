<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%
String webpath = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+webpath+"/";
	ParamObjectCollection dutyColl = (ParamObjectCollection)request.getAttribute("dutyColl");
	ParamObjectCollection roleColl = (ParamObjectCollection)request.getAttribute("roleColl");
	String message = (String)request.getAttribute("message");
	//String uniAuth = (String)request.getAttribute("uniAuth");
	String ulp = (String) request.getAttribute("ulp");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>ְԱά��</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link   href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script language="javascript" src="<%=webpath%>/common/js/td_date.js" ></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>		
<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"> </script>
<script language="javascript" src="<%=webpath%>/views/common/js/nas_check_no_null.js"></script>
<script language="javascript" src="<%=webpath%>/views/common/js/nas_date_compare.js"></script>
<script language="javascript" src="<%=webpath%>/common/js/td_common.js" ></script>
<script language="javascript" src="<%=webpath%>/views/om/organ/employee/js/EmployeeButton.js"> </script>
<script language="javascript">
   var tempitem;
   
   function showDealerMsg(mgr){//�������Ƿ�װ�õĲ����Լ�����
		var obj = document.getElementById('qd_mgr');
		obj.innerHTML = "ְԱά�� " + mgr;
	}	
</script>
</head>
  
<body onload="load();init()">
<form method="POST" name="myform">
	<input type="hidden" id="dealerId" name="dealerId" value="" />
	<input type="hidden" id="dealerId" name="dealerId" value="" />
	<input type="hidden" id="message" name="message" value="<%=message%>" />
	<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
		 <tr class="tableTitleTR2">
			<td colspan="4" >
				<table width="100%" border="0" cellpadding="0" cellspacing="0" >
		            <tr>
					<td class="tableTitleLeft2" >&#160;</td>
					<td class="tableTitle2" id="qd_mgr">ְԱά��</td>
					<td class="tableTitle2" align="right">
						<span id="detailOper" onclick="setParentFrameSetSize()" style="cursor:hand;display:none;" title="��ϸ��ѯ">[��]</span>
						<input type="hidden" id="detailFlag" name="detailFlag" value="0" />
						<span id="hideOper" onclick="setParentFrameSetSize()" style="cursor:hand;" title="���ز�ѯ����">[����]</span>
						<input type="hidden" id="hideFlag" name="hideFlag" value="0" />
					</td>
					<td class="tableTitleRight2" >&#160;</td>
					</tr>
				 </table>
			 </td>
		</tr>
		<tr> 
	       <td class="formTableL" >&#160;</td>
	       <td class="formTableC">		 	 			
				<table border="0" cellpadding="0" cellspacing="2" class="formTableCore" id="QueryCondition">
					<tr>
						<td class="formLabel">
							��½�ʺ�
						</td>
						<td class="formField">
							<input type="text" id="workNo" name="workNo" />
						</td>
						<td class="formLabel">
							ְԱ����
						</td>
						<td class="formField">
							<input type="text" id="employeeName" name="employeeName" />
						</td>
					</tr>
					<tr>
						<td class="formLabel">
							ְԱ���
						</td>
						<td class="formField">
							<input type="text" id="employeeId" name="employeeId" />
						</td>
						<td class="formLabel">
							״̬
						</td>
						<td class="formField">
							<select id="status" name="status">
								<option value="">������</option>
								<option value="0">����</option>
								<option value="1">ͣ��</option>
							</select>
						</td>						
						<td class="formLabel" style="display:none">
							ְ��
						</td>
						<td class="formField" style="display:none">
							<td:SelectTag selectFlag="true" selectColl="<%=dutyColl%>" selectvalue="" tagName="dutyId" title="ְλ" onchange=""/>
						</td>
					</tr>
					<tr style="display:none">
						<td class="formLabel">
							����Ա����
						</td>
						<td class="formField">
							<select id="adminType" name="adminType">
								<option value="">������</option>
								<option value="0">��ͨ����Ա</option>
								<option value="1">��Ȩ����Ա</option>
								<option value="2">��ͨ����Ա</option>
							</select>
						</td>
						<td class="formLabel">
							״̬
						</td>
						<td class="formField">
							<select id="status" name="status">
								<option value="">������</option>
								<option value="0">����</option>
								<option value="1">ͣ��</option>
							</select>
						</td>
					</tr>
					<tr style="display:none">
						<td class="formLabel">
							��ɫ
						</td>
						<td class="formField" colspan="3">
							<td:SelectTag selectFlag="true" fixlength="200" selectColl="<%=roleColl%>" selectvalue="" tagName="roleId" title="��ɫ" onchange=""/>
							<input type="radio" name="flagTypeShow" class="radio" value="adminFlag" checked="checked" onclick="setFlagType(this.value)" />�����ɫ
							<input type="radio" name="flagTypeShow" class="radio" value="usableFlag" onclick="setFlagType(this.value)" />ʹ�ý�ɫ
							<input type="hidden" id="flagType" name="flagType" value="adminFlag" />
						</td>
					</tr>
					<tr style="display:none">
						<td class="formLabel">
							�����޸�ʱ��
						</td>
						<td class="formField" colspan="3">
							<input type="text" id="pwdUpdateDateBegin" name="pwdUpdateDateBegin" />
							<button class="calendarImgButton" id="chooseDate1"></button>
							&nbsp;&nbsp;��&nbsp;&nbsp;
							<input type="text" id="pwdUpdateDateEnd" name="pwdUpdateDateEnd" />
							<button class="calendarImgButton" id="chooseDate2"></button>
						</td>
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
	 	<button class="formButton" name="bSearch" onclick="doSearch('<%=webpath%>')">�� ѯ</button>
	 	<button class="formButton" name="bAdd" onclick="doAdd('<%=webpath%>')" disabled="disabled">�� ��</button>
		<button class="formButton" name="bModify" onclick="doModify('<%=webpath%>')">�� ��</button>
		<button class="formButton" name="bDelete" onclick="doDelete('<%=webpath%>')">ɾ ��</button>
		<button class="formButton" name="bRenewPassword" onclick="doRenewPwd('<%=webpath%>')">��������</button>
		<button class="formButton" name="bShowPermission" onclick="showDuty('<%=webpath%>','false')">�鿴Ȩ��</button>	
	 </div>
	 <div class="formButtonDIV" id="filebutton2" style="display:block"> 
	 	<button class="formButton" name="bGrant" onclick="makeDuty('<%=webpath%>')">���ܸ�Ȩ</button>
		<button class="formButton" name="bGrantParamDuty" onclick="makeParamDuty('<%=webpath%>')">���ݸ�Ȩ</button>
	 	<button class="formButton" name="bInching" onclick="showDuty('<%=webpath%>','true')">����Ȩ��΢��</button>
		<button class="formButton" id="dataPowerAdjust" name="dataPowerAdjust" onclick="dataPowerAdjust3('<%=webpath%>');" disabled="disabled">����Ȩ��΢��</button>
		<button class="formButton" name="bDeliverPower" onclick="deliverPower('<%=webpath%>')">ת������Ȩ</button>
		<button class="formButton" name="bCancelInching" onclick="cancelInching('<%=webpath%>')">ȡ��΢��</button>
		<input type='hidden' id="ifShowTree" name="ifShowTree" value=""/>
		<input type="hidden" id="ulp" name="ulp" value="<%=ulp %>" />
	 </div>
</form>
</body>
</html>
