<%--
/***************************************************************
* ������: EmployeeMaintance.jsp
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
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.om.dao.employee.EmployeeVO" %>

<%
	String path = request.getContextPath();
	
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
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>ְԱ��Ϣά��</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
		<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>
		
		<script language="javascript" src="<%=path%>/common/js/titlebar.js"> </script>
		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>
		<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
		<script language="javascript">
		/*
		 *ҳ���ʼ������
		 */
		var eccn=new ECCN("ec");
		
		function init(employeeType,adminType,status)
		{
			eccn.doPrep=false;
			eccn.ajaxSubmit=false;
			eccn.init();
	
			if(employeeType!=null)
				document.getElementById("employeeType").value = employeeType;
			if(adminType != null)
				document.getElementById("adminType").value = adminType;
			if(status != null)
				document.getElementById("status").value = status;
				
			var allElements = document.body.getElementsByTagName("SELECT");
			for (var i = 0; i < allElements.length; i ++) {
				var e = allElements[i];
				e.disabled = "disabled";
			}
		}
		/*
		 *���ط���
		 */
		function bBackClick()
		{
			window.close();
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
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��&#160;&#160;��&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=employeeVO.getEmployeeName()%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getAreaName())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��֯����&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getOrganName())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��½�˺�&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=employeeVO.getWorkNo()%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									ְ&#160;&#160;��&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=dutyParamColl%>" selectvalue="<%=String.valueOf(employeeVO.getDutyId())%>" 
												  selectFlag="" tagName="dutyId" title="ְ��"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									ְ&#160;&#160;λ&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=busDutyColl%>" selectvalue="<%=String.valueOf(employeeVO.getBusDutyId())%>" 
												  selectFlag="" tagName="busDutyId" title="ְλ"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									�ϼ�����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=organEmployeeColl%>" selectvalue="<%=String.valueOf(employeeVO.getParentEmployeeId())%>" 
												  selectFlag="" tagName="parentEmployeeId" title="�ϼ�����" myOptionValue="δ֪"/>
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
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=dealerName%>
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
								</td>
							</tr>
							
							<tr>								
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getBirthday())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��&#160;&#160;��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=genderColl%>" selectvalue="<%=String.valueOf(employeeVO.getGender())%>" 
												  selectFlag="" tagName="gender" title="�û�����"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									н�ʷ�Χ&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=incomeColl%>" selectvalue="<%=incomeDefault%>" 
												  selectFlag="" tagName="income" title="�û�����"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									����״��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=marriageStatusColl%>" selectvalue="<%=String.valueOf(employeeVO.getMarriageStatus())%>" 
												  selectFlag="" tagName="marriageStatus" title="�û�����"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��ְ����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getHiredDate())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									ת������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getContractDate())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��ְ����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getResignedDate())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��ʾ˳��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getOrder())%>
								</td>									
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��½IP1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getLoginIp())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC��ַ1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getMac())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��½IP2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getLoginIp2())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC��ַ2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getMac2())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�����ʼ�1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getEmail())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									�����ʼ�2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getEmail2())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�칫�绰&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getWorkTelephone())%>
								</td>	
								<td align="left" class="formLabel" style="width:20%">
									��&#160;&#160;��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getFax())%>
								</td>							
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�ƶ��绰&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getMobile())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��ͥ�绰&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getHoneTelephone())%>
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
										cols="64" isnullable="true" style="width:410" value="<%=String.valueOf(employeeVO.getWorkAddress())%>" readonly="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��ͥ��ַ&#160;
								</td>
								<td align="left" class="formField" style="width:30%" colspan="3">
									<unieap:input tcname="TextArea" id="HomeAddress" name="HomeAddress" prompt="��ͥ��ַ" maxlength="256" rows="2" 
										cols="64" isnullable="true" style="width:410" value="<%=String.valueOf(employeeVO.getHomeAddress())%>" readonly="true"/>
								</td>
							</tr>
							</tbody>
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>
			
			<c:if test="${employeeDutyRelationSize > 0}">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">��֯������ְ����Ϣ</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">&#160;</td>
					<td class="formTableC">
						<div class="eXtremeTable"  id="ec_main_content_1"  style="width:100%;" >	
							<table id="ec_table_1"  border="0"  cellspacing="0"  cellpadding="0"  class="tableRegion"  width="100%">
								<thead id="ec_table_head_1">
								<tr>
									<td class="tableHeader" >���</td>
									<td class="tableHeader" >��֯����</td>
									<td class="tableHeader" >ְ��</td>
								</tr>
								</thead>
								<tbody id="ec_table_body_1">
									<c:forEach items="${EmployeeDutyRelationList}" var="col" varStatus="status">
									<c:if test="${status.count%2 == 0}">
										<tr class="odd" onclick="ECSideUtil.selectRow('ec',this);">
									</c:if>
									<c:if test="${status.count%2 != 0}">
										<tr class="even" onclick="ECSideUtil.selectRow('ec',this);">
									</c:if>
										<td><c:out value="${status.count}"/></td>
										<td><c:out value="${col.organName}" /></td>
										<td><c:out value="${col.dutyName}"/></td>
									</tr>
									</c:forEach>
								</tbody>
							</table>
						</div>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>
			</c:if>
			
			<c:if test="${employeeRoleSize > 0}">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">��ɫ��Ϣ</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">&#160;</td>
					<td class="formTableC">
						<div class="eXtremeTable"  id="ec_main_content_2"  style="width:100%;" >	
							<table id="ec_table_2"  border="0"  cellspacing="0"  cellpadding="0"  class="tableRegion"  width="100%">
								<thead id="ec_table_head_2">
								<tr>
									<td class="tableHeader" >���</td>
									<td class="tableHeader" >��ɫ����</td>
									<td class="tableHeader" >�Ƿ񴴽���</td>
									<td class="tableHeader" >ʹ��Ȩ</td>
									<td class="tableHeader" >����Ȩ</td>
								</tr>
								</thead>
								<tbody id="ec_table_body_2">
									<c:forEach items="${EmployeeRoleList}" var="col" varStatus="status">
									<c:if test="${status.count%2 == 0}">
										<tr class="odd" onclick="ECSideUtil.selectRow('ec',this);">
									</c:if>
									<c:if test="${status.count%2 != 0}">
										<tr class="even" onclick="ECSideUtil.selectRow('ec',this);">
									</c:if>
										<td>
											<c:out value="${status.count}"/>
										</td>
										<td>
											<c:out value="${col.roleName}"/>
										</td>
										<td>
											<c:if test="${col.owner == 0}">
												<input type="checkbox" disabled="disabled" />
											</c:if>
											<c:if test="${col.owner == 1}">
												<input type="checkbox" checked="checked" disabled="disabled" />
											</c:if>
										</td>
										<td>
											<c:if test="${col.usableFlag == 0}">
												<input type="checkbox" disabled="disabled" />
											</c:if>
											<c:if test="${col.usableFlag == 1}">
												<input type="checkbox" checked="checked" disabled="disabled" />
											</c:if>
										</td>
										<td>
											<c:if test="${col.adminFlag == 0}">
												<input type="checkbox" disabled="disabled" />
											</c:if>
											<c:if test="${col.adminFlag == 1}">
												<input type="checkbox" checked="checked" disabled="disabled" />
											</c:if>
										</td>
									</tr>
									</c:forEach>
								</tbody>
							</table>
						</div>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>
			</c:if>
			<div class="formButtonDIV" id="formButton">
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick();">
					��&#160;&#160;��
				</button>
			</div>
		</unieap:form>
	</body>
</html>
