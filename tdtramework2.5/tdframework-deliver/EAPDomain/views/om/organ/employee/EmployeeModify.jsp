<%--
/***************************************************************
* ������: EmployeeModify.jsp
* ����  : 2007-8-11 
* ����  : yanglm@neusoft.com
* ģ��  : 
* ����  : 
* ��ע  : 
* ------------------------------------------------------------
* �޸���ʷ
* ���  ����  �޸���   �޸�ԭ��
* 1
* 2
***************************************************************/
--%>
<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.om.dao.employee.EmployeeVO" %>

<%
	String path = request.getContextPath();
    String showDealerTree  = "<img src='"+path+"/common/images/icon/search.gif' border=no style='vertical-align:middle' title='������Ϣ'/>";
	
	EmployeeVO employeeVO = (EmployeeVO)request.getAttribute("EmployeeVO");
	
	String authId = (String)request.getAttribute("operId");
	String ownerName = (String)request.getAttribute("ownerName");
	String dealerName = (String)request.getAttribute("dealerName");
	//�õ�ҳ������Ҫ����������Ϣ
	ParamObjectCollection dutyParamColl = (ParamObjectCollection)request.getAttribute("DutyParamColl"); //ְ��
	ParamObjectCollection busDutyColl =(ParamObjectCollection)request.getAttribute("BusDutyColl");//ְλ
	ParamObjectCollection genderColl = (ParamObjectCollection)request.getAttribute("GenderColl");//�Ա�
	ParamObjectCollection educateLevelColl = (ParamObjectCollection)request.getAttribute("EducateLevelColl");//����ˮƽ
	ParamObjectCollection incomeColl = (ParamObjectCollection)request.getAttribute("IncomeColl");//����
	ParamObjectCollection marriageStatusColl = (ParamObjectCollection)request.getAttribute("MarriageStatusColl");//����״��
	ParamObjectCollection personLevelColl = (ParamObjectCollection)request.getAttribute("PersonLevelColl");//�û�����
	ParamObjectCollection operLevelColl = (ParamObjectCollection)request.getAttribute("OperLevelColl");//��������
	//����������Ա�б���Ϣ���ϼ���Ϣ������
	ParamObjectCollection organEmployeeColl = null ;
	if (employeeVO != null){
	 	organEmployeeColl = (ParamObjectCollection)request.getAttribute("OrganEmployeeColl");
	}
	
	String income = String.valueOf(employeeVO.getIncome());
	String incomeDefault = income.substring(0,income.indexOf("."));	

	String message = (String)request.getAttribute("Message");
	if(message == null){
		message = "";
	}
	String canDel = (String)request.getAttribute("canDel");
	String ulp = (String) request.getAttribute("ulp");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>�޸�ְԱ��Ϣ</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
		
		<script  language=javascript src="<%=path%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/BaseObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/EAPObjsMgr.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/NumberObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/IDCardObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/IntegerObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/MoneyObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/PasswordConfirmObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/PasswordObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/PosIntegerObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/ReadOnlyFieldObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/ReadOnlyObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/TextObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/TextAreaObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/EmailObj.js"> </script>
		
		<script language="javascript" src="<%=path%>/common/js/td_date.js"></script>
		<script language="javascript" src="<%=path%>/common/js/titlebar.js"> </script>
		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>

		<script language="javascript">
		/*
		 *ҳ���ʼ������
		 */
		function init(employeeType,adminType,status)
		{			
			DateUtil.addDateArea("birthday","birthdayDate",false);
			DateUtil.addDateArea("hiredDate","hiredDateDate",false);
			DateUtil.addDateArea("contractDate","contractDateDate",false);
			DateUtil.addDateArea("resignedDate","resignedDateDate",false);
			
			if(employeeType!=null)
				document.getElementById("employeeType").value = employeeType;
			if(adminType != null)
				document.getElementById("adminType").value = adminType;
			if(status != null)
				document.getElementById("status").value = status;
		}
		/*
		 *����ְԱ�޸���Ϣ
		 */
		function bSaveClick(webpath){
		    EAPForm.OperType.value = 'modify';
		    EAPForm.action = webpath+ '/om/EmployeeMaintanceAction.do';
		    
			if (EAPForm.employeeName.value == '')
			{
				alert("����д����");
				return false;
			}
			if(birthdayCheck()){
				document.getElementById("birthday").focus();
			}
			var canDel = document.getElementById("canDel").value;
			var status = document.getElementById("status").value;
			if(status == 1 && canDel == 1){
				alert("��ְԱ�ڲ�Ʒ�������д���δ��ɹ���������޸�Ϊͣ��");
				document.getElementById("status").focus();
				return;
			}
		    EAPForm.submit();
		}
		/*
		 *�رշ���
		 */
		function bBackClick(webpath)
		{
			if (!confirm('��ȷ���ر�ô��')) 
				return false;
			window.close();
		}
		/*
		 *���÷���
		 */
		function bResetClick(webpath)
		{
			if (!confirm('��ȷ��Ҫ����ô��')) 
				return false;
			EAPForm.reset();
		}
		/*
		 *�������գ����ܺ͵�ǰʱ����ͬһ��
		 */
		function birthdayCheck(){
			var birthday = document.getElementById("birthday").value;
			splitone='-';
			var days = birthday.split(splitone);
			var year = days[0];
			var today = new Date();
			var thisYear = today.getYear();
			if(thisYear <= year){
				alert("��ȷ���������յ���ȷ��");
				return true;
				//document.getElementById("birthday").focus();
			}else{
				return false;
			}
		}
		/*
		 *����������Ϣ
		 */
		function showDealerTree(webPath){
			var organId = document.getElementById("organId").value;
			var url = webPath+'/views/om/organ/dealertree/DealerTree.jsp?ifOnlyShow=true';
			var result = showModalDialog(webPath+"/om/EmployeeQueryAction.do?OrganId=" + organId + "&ifOpenWin=true&OperType=treeDisplay",window,
							'DialogWidth:200px;DialogHeight:400px;status:no;scrolling:auto;resizable:yes;unadorned:yes');
			if(result!=null && result!=''){
				var randc = result.split(":");
				if(randc[1]!='' && randc[1].length>3){
					document.getElementById("dealerId").value = randc[1];
					document.getElementById("dealerIdValue").value = randc[0];
				}
			}
		}
		function showHiddenField(){
			document.getElementById("hiddenBody").style.display="";
			document.getElementById("hiddenFieldButton").style.display="";
			document.getElementById("showHiddenButton").style.display="none";
		}
		function hiddenFieldFun(){
			document.getElementById("hiddenBody").style.display="none";
			document.getElementById("showHiddenButton").style.display="";
			document.getElementById("hiddenFieldButton").style.display="none";
		}
		
		</script>
	</head>
	<body class="mainBody" onload="init(<%=employeeVO.getEmployeeType()%>,<%=employeeVO.getAdminType()%>,<%=employeeVO.getStatus()%>)">
		<unieap:form action="" method="post">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">ְԱ��Ϣ</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">
						<input type="hidden" id="tableNames" name="tableNames" />
					</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									ְԱ����&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=employeeVO.getEmployeeId()%>
									<input type="hidden" id="employeeId" name="employeeId" value="<%=employeeVO.getEmployeeId()%>"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��&#160;&#160;��&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
								<%if(ulp != null && ulp.equals("true")){ %>
									<unieap:input  tcname="Text" id="EmployeeName" name="employeeName" prompt="����" readonly="true"
										maxlength="32" isnullable="true" classname="textType" value="<%=employeeVO.getEmployeeName()%>"/>
								<%}else{ %>
									<unieap:input  tcname="Text" id="EmployeeName" name="employeeName" prompt="����" 
										maxlength="32" isnullable="true" classname="textType" value="<%=employeeVO.getEmployeeName()%>"/>
								<%} %>
									
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getAreaName())%>
									<input type="hidden" id="areaId" name="areaId" value="<%=String.valueOf(employeeVO.getAreaId())%>">
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��֯����&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getOrganName())%>
									<input type="hidden" id="organId" name="organId" value="<%=String.valueOf(employeeVO.getOrganId())%>"/>
								</td>
							</tr>
							<tr>								
								<td align="left" class="formLabel" style="width:20%">
									��½�˺�&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
								<%if(ulp != null && ulp.equals("true")){ %>
									<unieap:input tcname="Text" id="WorkNo" name="workNo" prompt="��½�˺�" maxlength="18"  readonly="true"
										isnullable="true" value="<%=employeeVO.getWorkNo()%>"/>
								<%}else{ %>
									<unieap:input tcname="Text" id="WorkNo" name="workNo" prompt="��½�˺�" maxlength="18" 
										isnullable="true" value="<%=employeeVO.getWorkNo()%>"/>
								<%} %>
									
									<input type="hidden" id="oldWorkNo" name="oldWorkNo" value="<%=employeeVO.getWorkNo()%>" />
								</td>
								<td align="left" class="formLabel" style="width:20%">
									ְ&#160;&#160;��&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=dutyParamColl%>" selectvalue="<%=String.valueOf(employeeVO.getDutyId())%>" 
												  selectFlag="" tagName="dutyId" title="ְ��"/>
									<input type="hidden" id="OldDutyId" name="OldDutyId" value="<%=String.valueOf(employeeVO.getDutyId())%>"/>
								</td>
							</tr>
							<tr>	
								<td align="left" class="formLabel" style="width:20%">
									ְ&#160;&#160;λ&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=busDutyColl%>" selectvalue="<%=String.valueOf(employeeVO.getBusDutyId())%>" 
												  selectFlag="" tagName="busDutyId" title="ְλ"/>
									<%--<input type="hidden" id="OldBusDutyId" name="OldBusDutyId" value="<%=String.valueOf(employeeVO.getBusDutyId())%>"/>--%>
								</td>
								
								<td align="left" class="formLabel" style="width:20%">
									�ϼ�����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=organEmployeeColl%>" selectvalue="<%=String.valueOf(employeeVO.getParentEmployeeId())%>" 
												  selectFlag="true" tagName="parentEmployeeId" title="�ϼ�����"/>
									<%--<input type="hidden" id="oldParentEmployeeId" name="oldParentEmployeeId" value="<%=String.valueOf(employeeVO.getParentEmployeeId())%>"/>--%>
								</td>			
							</tr>							
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=operLevelColl%>" selectFlag="" tagName="operLevel" title="��������"
									selectvalue="<%=String.valueOf(employeeVO.getOperLevel())%>" />
								</td>
								<td align="left" class="formLabel" style="width:20%">
									ְԱ״̬&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<select name="status" id="status" onkeydown="nas_enter();">
										<option value="0">����</option>
										<option value="1">ͣ��</option>
								  	</select>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									����Ա����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<select name="adminType" id="adminType" onkeydown="nas_enter();">
										<option value="0">��ͨ����Ա</option>
										<option value="1">��Ȩ����Ա</option>
										<option value="2">��ͨ����Ա</option>
								  	</select>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									�û�����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=personLevelColl%>" selectvalue="<%=String.valueOf(employeeVO.getPersonLevel())%>" 
												  selectFlag="" tagName="personLevel" title="�û�����"/>
									<%--<input type="hidden" id="oldPersonLevel" name="oldPersonLevel" value="<%=String.valueOf(employeeVO.getPersonLevel())%>"/>--%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" id="DealerIdValue" name="DealerIdValue" title="��������" maxlength="15" style="widthd:160px" value="<%=dealerName%>"/>
									<a href='#' onclick="showDealerTree('<%=path%>')" style="display:inline"><%=showDealerTree%></a>
									<input type='hidden' id="dealerId" name='dealerId' value='<%=employeeVO.getDealerId()%>'/>
									<input type='hidden' id="oldDealerId" name='oldDealerId' value='<%=employeeVO.getDealerId()%>'/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��������Ȩ��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%String pageLink = path+"/om/EmployeeMaintanceAction.do?OperType=doShowAuditLimitPage&employeeId="+employeeVO.getEmployeeId();%>
									<IFRAME src="<%=pageLink%>" scrolling="no" height="20" width="135" frameborder="0" marginwidth="0" marginheight="0"></IFRAME>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=ownerName%>
									<input type="hidden" id="owner" name="owner" value="<%=authId%>"/>
								</td>
							</tr>
							<tr>
								<td >
								<input type="button" class="formButton" id="showHiddenButton" name="showHiddenButton" onclick="showHiddenField()" value='������Ϣ...'/>																	
								<input type="button" class="formButton" id="hiddenFieldButton" name="hiddenFieldButton" onclick="hiddenFieldFun()" value='������ʾ...' style="display:none"/>
								</td>
							</tr>
							<tbody id="hiddenBody" style="display:none">

							<tr>
								<td align="left" class="formLabel" style="width:20%">
									Ա������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<select name="employeeType" id="employeeType" onkeydown="nas_enter();">
										<option value="1">��ʽ��</option>
										<option value="2">��ͬ��</option>
										<option value="3">��ʱ��</option>
										<option value="4">��ͻ�����</option>
								  	</select>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									�����̶�&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=educateLevelColl%>" selectvalue="<%=String.valueOf(employeeVO.getEducateLevel())%>" 
												  selectFlag="" tagName="educateLevel" title="�����̶�"/>
									<%--<input type="hidden" id="oldEducateLevel" name="oldEducateLevel" value="<%=String.valueOf(employeeVO.getEducateLevel())%>" />--%>
								</td>
							</tr>
							<tr>								
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="birthday" id="birthday" value="<%=String.valueOf(employeeVO.getBirthday())%>" onBlur="birthdayCheck()"/>
									<button class="calendarImgButton" id="birthdayDate" ></button>
									<%--<input type="hidden" id="oldBirthday" name="oldBirthday" value="<%=String.valueOf(employeeVO.getBirthday())%>"/>--%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��&#160;&#160;��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=genderColl%>" selectvalue="<%=String.valueOf(employeeVO.getGender())%>" 
												  selectFlag="" tagName="gender" title="�Ա�"/>
									<input type="hidden" id="oldGender" name="oldGender" value="<%=String.valueOf(employeeVO.getGender())%>"/>
								</td>
								
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									н�ʷ�Χ&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=incomeColl%>" selectvalue="<%=incomeDefault%>" 
												  selectFlag="" tagName="income" title="н�ʷ�Χ"/>
									<%--<input type="hidden" id="oldIncome" name="oldIncome" value="<%=incomeDefault%>"/>--%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									����״��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=marriageStatusColl%>" selectvalue="<%=String.valueOf(employeeVO.getMarriageStatus())%>" 
												  selectFlag="" tagName="marriageStatus" title="����״��"/>
									<%--<input type="hidden" id="oldMarriageStatus" name="oldMarriageStatus" value="<%=String.valueOf(employeeVO.getMarriageStatus())%>"/>--%>
								</td>
							</tr>
							
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��ְ����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="hiredDate" id="hiredDate" value="<%=String.valueOf(employeeVO.getHiredDate())%>"/>
									<button class="calendarImgButton" id="hiredDateDate" ></button>
									<%--<input type="hidden" id="oldHiredDate" name="oldHiredDate" value="<%=String.valueOf(employeeVO.getBirthday())%>"/>--%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									ת������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="contractDate" id="contractDate" value="<%=String.valueOf(employeeVO.getContractDate())%>" />
									<button class="calendarImgButton" id="contractDateDate" ></button>
									<%--<input type="hidden" id="oldContractDate" name="oldContractDate" value="<%=String.valueOf(employeeVO.getContractDate())%>"/>--%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��ְ����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="resignedDate" id="resignedDate" value="<%=String.valueOf(employeeVO.getResignedDate())%>" />
									<button class="calendarImgButton" id="resignedDateDate" ></button>
									<%--<input type="hidden" id="oldResignedDate" name="oldResignedDate" value="<%=String.valueOf(employeeVO.getResignedDate())%>"/>--%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��ʾ˳��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="order" name="order" prompt="��ʾ˳��" maxlength="8" isnullable="true" value="<%=String.valueOf(employeeVO.getOrder()) %>"/>
								</td>								
							</tr>	
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��½IP1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="LoginIp" name="loginIp" prompt="��½IP" maxlength="32" 
										isnullable="true" value="<%=String.valueOf(employeeVO.getLoginIp())%>" />
									<%--<input type="hidden" id="oldLoginIp" name="oldLoginIp" value="<%=String.valueOf(employeeVO.getLoginIp())%>"/>--%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC��ַ1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="Mac" name="mac" prompt="MAC��ַ" maxlength="32" 
										isnullable="true" value="<%=String.valueOf(employeeVO.getMac())%>"/>
									<%--<input type="hidden" id="oldMac" name="oldMac" value="<%=String.valueOf(employeeVO.getMac())%>"/>--%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��½IP2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="LoginIp2" name="loginIp2" prompt="��½IP2" maxlength="32" 
										isnullable="true" value="<%=String.valueOf(employeeVO.getLoginIp2())%>" />
									<%--<input type="hidden" id="oldLoginIp" name="oldLoginIp" value="<%=String.valueOf(employeeVO.getLoginIp())%>"/>--%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC��ַ2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="Mac2" name="mac2" prompt="MAC��ַ" maxlength="32" 
										isnullable="true" value="<%=String.valueOf(employeeVO.getMac2())%>"/>
									<%--<input type="hidden" id="oldMac" name="oldMac" value="<%=String.valueOf(employeeVO.getMac())%>"/>--%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�����ʼ�1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Email" id="Email" name="email" prompt="�����ʼ�" 
										isnullable="true" value="<%=String.valueOf(employeeVO.getEmail())%>" />
								</td>
								<td align="left" class="formLabel" style="width:20%">
									�����ʼ�2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Email" id="Email2" name="email2" prompt="�����ʼ�" 
										isnullable="true" value="<%=String.valueOf(employeeVO.getEmail2())%>" />
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�칫�绰&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="WorkTelephone" name="workTelephone" prompt="�칫�绰" maxlength="32" 
										isnullable="true" value="<%=String.valueOf(employeeVO.getWorkTelephone())%>" />
									<%--<input type="hidden" id="oldWorkTelephone" name="oldWorkTelephone" value="<%=String.valueOf(employeeVO.getWorkTelephone())%>"/>--%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��&#160;&#160;��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="Fax" name="fax" prompt="Text����" maxlength="15" 
										isnullable="true" value="<%=String.valueOf(employeeVO.getFax())%>"/>
									<%--<input type="hidden" id="oldFax" name="oldFax" value="<%=String.valueOf(employeeVO.getFax())%>"/>--%>
								</td>								
							</tr>	
							<tr>	
								<td align="left" class="formLabel" style="width:20%">
									�ƶ��绰&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Number" id="Mobile" name="mobile" prompt="�ƶ��绰" maxlength="11" 
										isnullable="true" value="<%=String.valueOf(employeeVO.getMobile())%>" />
									<%--<input type="hidden" id="oldMobile" name="oldMobile" value="<%=String.valueOf(employeeVO.getMobile())%>"/>--%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��ͥ�绰&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="HomeTelephone" name="honeTelephone" prompt="��ͥ�绰" 
										isnullable="true" value="<%=String.valueOf(employeeVO.getHoneTelephone())%>" />
									<%--<input type="hidden" id="oldHomeTelephone" name="oldHomeTelephone" value="<%=String.valueOf(employeeVO.getHoneTelephone())%>"/>--%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									ְԱ��������&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getUpdateDate())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									�ϴ��޸���������&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getPwdUpdate())%>
								</td>	
							</tr>	
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�칫��ַ&#160;
								</td>
								<td align="left" class="formField" style="width:30%" colspan="3">
									<unieap:input tcname="TextArea" id="WorkAddress" name="workAddress" prompt="�칫��ַ" maxlength="256" rows="2"
										cols="64" isnullable="true" style="width:410" value="<%=String.valueOf(employeeVO.getWorkAddress())%>"/>
									<%--<input type='hidden' id="oldWorkAddress" name='oldWorkAddress' value='<%=employeeVO.getWorkAddress()%>'/>--%>
								</td>																
							</tr>							
							<tr>
							<td align="left" class="formLabel" style="width:20%">
									��ͥ��ַ&#160;
								</td>
								<td align="left" class="formField" style="width:30%" colspan="3">
									<unieap:input tcname="TextArea" id="HomeAddress" name="homeAddress" prompt="��ͥ��ַ" maxlength="256" rows="2" 
										cols="64" isnullable="true" style="width:410" value="<%=String.valueOf(employeeVO.getHomeAddress())%>"/>
									<%--<input type='hidden' id="oldHomeAddress" name='oldHomeAddress' value='<%=employeeVO.getHomeAddress()%>'/>--%>
								</td>																
							</tr>
							</tbody>
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;
						<input type="hidden" name="OperType" value="" />
						<input type="hidden" name="canDel" value="<%=canDel%>" />
						<input type="hidden" name="ulp" value="<%=ulp %>"/>
					</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>
			<div class="formButtonDIV" id="formButton">
				<button class="formButton" id="bSave" name="bSave" onclick="return bSaveClick('<%=path%>');">
					��&#160;&#160;��
				</button>
				<button class="formButton" id="bReset" name="bReset" onclick="return bResetClick();">
					��&#160;&#160;��
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick('<%=path%>');">
					��&#160;&#160;��
				</button>
			</div>
		</unieap:form>
	</body>
</html>
