<%--
/***************************************************************
* 程序名: EmployeeMaintance.jsp
* 日期  : 2007-8-11 
* 作者  : yanglm@neusoft.com
* 模块  : 
* 描述  : 
* 备注  : 
* ------------------------------------------------------------
* 修改历史
* 序号  日期  修改人   修改原因
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
	//得到页面所需要的下拉框信息
	ParamObjectCollection dutyParamColl = (ParamObjectCollection)request.getAttribute("DutyParamColl"); //职务
	ParamObjectCollection busDutyColl =(ParamObjectCollection)request.getAttribute("BusDutyColl");//职位
	ParamObjectCollection genderColl = (ParamObjectCollection)request.getAttribute("GenderColl");//性别
	ParamObjectCollection educateLevelColl = (ParamObjectCollection)request.getAttribute("EducateLevelColl");//教育水平
	ParamObjectCollection incomeColl = (ParamObjectCollection)request.getAttribute("IncomeColl");//收入
	ParamObjectCollection marriageStatusColl = (ParamObjectCollection)request.getAttribute("MarriageStatusColl");//婚姻状况
	ParamObjectCollection personLevelColl = (ParamObjectCollection)request.getAttribute("PersonLevelColl");//用户级别
	//所属机构人员列表信息，上级信息下拉框
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
		<title>职员信息维护</title>
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
		 *页面初始化方法
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
		 *返回方法
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
								<td class="tableTitle2">职员信息</td>
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
									职员编码&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=employeeVO.getEmployeeId()%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									姓&#160;&#160;名&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=employeeVO.getEmployeeName()%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									所属区域&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getAreaName())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									组织机构&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getOrganName())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									登陆账号&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=employeeVO.getWorkNo()%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									职&#160;&#160;务&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=dutyParamColl%>" selectvalue="<%=String.valueOf(employeeVO.getDutyId())%>" 
												  selectFlag="" tagName="dutyId" title="职务"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									职&#160;&#160;位&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=busDutyColl%>" selectvalue="<%=String.valueOf(employeeVO.getBusDutyId())%>" 
												  selectFlag="" tagName="busDutyId" title="职位"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									上级主管&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=organEmployeeColl%>" selectvalue="<%=String.valueOf(employeeVO.getParentEmployeeId())%>" 
												  selectFlag="" tagName="parentEmployeeId" title="上级主管" myOptionValue="未知"/>
								</td>								
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									创建者&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=ownerName%>
									<input type="hidden" id="owner" name="owner" value="<%=authId%>"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									职员状态&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<select name="status" id="status" onkeydown="nas_enter();">
										<option value="0">正常</option>
										<option value="1">停用</option>
								  	</select>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									管理员类型&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<select name="adminType" id="adminType" onkeydown="nas_enter();">
										<option value="0">普通操作员</option>
										<option value="1">特权管理员</option>
										<option value="2">普通管理员</option>
								  	</select>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									用户级别&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=personLevelColl%>" selectvalue="<%=String.valueOf(employeeVO.getPersonLevel())%>" 
												  selectFlag="" tagName="personLevel" title="用户级别"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									所属渠道&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=dealerName%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									政策审批权限&#160;
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
								<input type="button" class="formButton" id="showHiddenButton" name="showHiddenButton" onclick="showHiddenField()" value='更多信息...'/>																	
								<input type="button" class="formButton" id="hiddenFieldButton" name="hiddenFieldButton" onclick="hiddenFieldFun()" value='精简显示...' style="display:none"/>
								</td>
							</tr>
							<tbody id="hiddenBody" style="display:none">
							
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									员工类型&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<select name="employeeType" id="employeeType" onkeydown="nas_enter();">
										<option value="1">正式工</option>
										<option value="2">合同工</option>
										<option value="3">临时工</option>
										<option value="4">大客户经理</option>
								  	</select>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									教育程度&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=educateLevelColl%>" selectvalue="<%=String.valueOf(employeeVO.getEducateLevel())%>" 
												  selectFlag="" tagName="educateLevel" title="教育程度"/>
								</td>
							</tr>
							
							<tr>								
								<td align="left" class="formLabel" style="width:20%">
									出生日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getBirthday())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									性&#160;&#160;别&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=genderColl%>" selectvalue="<%=String.valueOf(employeeVO.getGender())%>" 
												  selectFlag="" tagName="gender" title="用户级别"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									薪资范围&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=incomeColl%>" selectvalue="<%=incomeDefault%>" 
												  selectFlag="" tagName="income" title="用户级别"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									婚姻状况&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=marriageStatusColl%>" selectvalue="<%=String.valueOf(employeeVO.getMarriageStatus())%>" 
												  selectFlag="" tagName="marriageStatus" title="用户级别"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									入职日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getHiredDate())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									转正日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getContractDate())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									辞职日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getResignedDate())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									显示顺序&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getOrder())%>
								</td>									
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									登陆IP1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getLoginIp())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC地址1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getMac())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									登陆IP2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getLoginIp2())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC地址2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getMac2())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									电子邮件1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getEmail())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									电子邮件2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getEmail2())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									办公电话&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getWorkTelephone())%>
								</td>	
								<td align="left" class="formLabel" style="width:20%">
									传&#160;&#160;真&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getFax())%>
								</td>							
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									移动电话&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getMobile())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									家庭电话&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getHoneTelephone())%>
								</td>								
							</tr>							
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									职员创建日期&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getUpdateDate())%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									上次修改密码日期&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=String.valueOf(employeeVO.getPwdUpdate())%>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									办公地址&#160;
								</td>
								<td align="left" class="formField" style="width:30%" colspan="3">
									<unieap:input tcname="TextArea" id="WorkAddress" name="workAddress" prompt="办公地址" maxlength="256" rows="2"
										cols="64" isnullable="true" style="width:410" value="<%=String.valueOf(employeeVO.getWorkAddress())%>" readonly="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									家庭地址&#160;
								</td>
								<td align="left" class="formField" style="width:30%" colspan="3">
									<unieap:input tcname="TextArea" id="HomeAddress" name="HomeAddress" prompt="家庭地址" maxlength="256" rows="2" 
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
								<td class="tableTitle2">组织机构及职务信息</td>
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
									<td class="tableHeader" >序号</td>
									<td class="tableHeader" >组织机构</td>
									<td class="tableHeader" >职务</td>
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
								<td class="tableTitle2">角色信息</td>
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
									<td class="tableHeader" >序号</td>
									<td class="tableHeader" >角色名称</td>
									<td class="tableHeader" >是否创建者</td>
									<td class="tableHeader" >使用权</td>
									<td class="tableHeader" >管理权</td>
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
					关&#160;&#160;闭
				</button>
			</div>
		</unieap:form>
	</body>
</html>
