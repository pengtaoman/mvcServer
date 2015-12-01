<%--
/***************************************************************
* 程序名: EmployeeModify.jsp
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
<%@page import="com.neusoft.om.dao.employee.EmployeeVO"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%
	String path = request.getContextPath();
    String showDealerTree  = "<img src='"+path+"/common/images/icon/search.gif' border=no style='vertical-align:middle' title='渠道信息'/>";
	
	String authId = (String)request.getAttribute("optId");
	String ownerName = (String)request.getAttribute("ownerName");
	String dealerId = (String)request.getAttribute("dealerId");
	String dealerName = (String)request.getAttribute("dealerName");
	String comeFrom = (String)request.getAttribute("comeFrom");
	EmployeeVO vo = (EmployeeVO)request.getAttribute("EmployeeVO");
	if (vo == null) {
		vo = new EmployeeVO();
	}
	//得到页面所需要的下拉框信息
	ParamObjectCollection dutyParamColl = (ParamObjectCollection)request.getAttribute("DutyParamColl"); //职务
	ParamObjectCollection busDutyColl =(ParamObjectCollection)request.getAttribute("BusDutyColl");//职位
	ParamObjectCollection genderColl = (ParamObjectCollection)request.getAttribute("GenderColl");//性别
	ParamObjectCollection educateLevelColl = (ParamObjectCollection)request.getAttribute("EducateLevelColl");//教育水平
	ParamObjectCollection incomeColl = (ParamObjectCollection)request.getAttribute("IncomeColl");//收入
	ParamObjectCollection marriageStatusColl = (ParamObjectCollection)request.getAttribute("MarriageStatusColl");//婚姻状况
	ParamObjectCollection personLevelColl = (ParamObjectCollection)request.getAttribute("PersonLevelColl");//用户级别
	ParamObjectCollection organEmployeeColl = (ParamObjectCollection)request.getAttribute("OrganEmployeeColl");//所属机构人员列表信息，上级信息下拉框
	ParamObjectCollection areaColl = (ParamObjectCollection)request.getAttribute("AreaColl");//区域
	ParamObjectCollection organColl = (ParamObjectCollection)request.getAttribute("OrganColl");//组织机构
	ParamObjectCollection operLevelColl = (ParamObjectCollection)request.getAttribute("OperLevelColl");//操作级别
	//地市下拉框当前选中值
	String currentSelectArea = (String)request.getAttribute("BelongArea");
	//组织机构下拉况当前应选中值
	String currentSelectOrgan = (String)request.getAttribute("OrganId");
	//获取当前日期
	String nowDate = (String)request.getAttribute("nowDate")==null?"":(String)request.getAttribute("nowDate");
	String pwdMinLength = (String)request.getAttribute("pwdMinLength");
	String pwdMaxLength = (String)request.getAttribute("pwdMaxLength");
	String message = (String)request.getAttribute("Message")==null?"":(String)request.getAttribute("Message");
	String newEmployeeId = (String)request.getAttribute("newEmployeeId")==null?"":(String)request.getAttribute("newEmployeeId");
	
	String uniAuth = (String)request.getAttribute("uniAuth");
	String employeeName = vo.getEmployeeName()==null?"":vo.getEmployeeName() ;
	String workNo = vo.getWorkNo()==null?"":vo.getWorkNo();
	String autoWorkNo = (String)request.getAttribute("autoWorkNo");
	boolean ifAutoWorkNo = (Boolean)request.getAttribute("ifAutoWorkNo");
	boolean needEmpName  = (Boolean)request.getAttribute("needEmpName");
	boolean needCitySortName = (Boolean)request.getAttribute("needCitySortName");
%>
<html>
	<head>
	<base target="_self">
	<unieap:base />
		<title>新增职员信息</title>
		<contextPath value="<%=path%>"/>
		<LINK REL="stylesheet" HREF="<%=path%>/views/common/css/pubstyle.css" TYPE="text/css"/>
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
		<script language="JavaScript" src="<%=path%>/unieap/js/Globals.js"></script>
 		<script language="JavaScript" src="<%=path%>/unieap/js/Common.js"></script>
 		<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>
		<script language="javascript" src="<%=path%>/views/common/js/nas_date_compare.js"></script>
		<script language="javascript" src="<%=path%>/common/js/td_common.js" ></script>
		<script language="javascript" src="<%=path%>/common/js/td_date.js" ></script>
		<script language="javascript" src="<%=path%>/unieap/js/EAPObjsMgr.js"> </script>
		<script language="javascript" src="<%=path%>/unieap/js/TextObj.js"> </script>
		<script language="javascript" src="<%=path%>/unieap/js/TextAreaObj.js"> </script>
		<script language="javascript" src="<%=path%>/unieap/js/BaseObj.js"> </script>	
		<script language="javascript" src="<%=path%>/unieap/js/PasswordObj.js"> </script>
		<script language="javascript" src="<%=path%>/unieap/js/EmailObj.js"> </script>
		<script language="javascript" src="<%=path%>/unieap/js/NumberObj.js"> </script>
		<script language="javascript" src="<%=path%>/views/om/organ/employee/getPinyin.js"> </script>
		<SCRIPT language="JavaScript">
		/*
		 *关闭方法
		 */
		function bBackClick()
		{
			if (!confirm('您确定关闭么？')) 
				return false;
			window.close();
		}
		/*
		 *重置方法
		 */
		function bResetClick()
		{
			if (!confirm('您确定要重置么？')) 
				return false;
			EAPForm.reset();
		}
		/*
		 *保存信息
		 */
		function bSaveClick(webpath){
			var workNo = EAPForm.workNo.value;
			var workPwd = EAPForm.workPwd.value;
			var workPwdConfirm = EAPForm.workPwdConfirm.value;
			var pwdMinLength = Number(document.getElementById("pwdMinLength").value);
			var pwdMaxLength = Number(document.getElementById("pwdMaxLength").value);
			if (workNo != '')
			{
				if (workPwd == '')
				{
					alert("必须填写登录密码");
					EAPForm.workPwd.focus();
					return false;
				}else if(workPwd.length < pwdMinLength || workPwd.length > pwdMaxLength){
					alert("密码长度要求在"+pwdMinLength+"位和"+pwdMaxLength+"位之间,请重新填写");
					EAPForm.workPwd.focus();
					return false;
				}
				else if (workPwd != workPwdConfirm)
				{
					alert("两次输入的密码不相符");
					return false;
				}
			}
			if (EAPForm.employeeName.value == '')
			{
				alert("请填写姓名");
				return false;
			}
		    EAPForm.OperType.value='add';//增加
		    EAPForm.action=webpath+ '/om/EmployeeMaintanceAction.do';
		    //EAPForm.target='_self';
		    EAPForm.submit();
		}
		/*
		 *页面初始化方法
		 */
		function init(){
			var message = '<%=message %>';
			var newEmployeeId = '<%=newEmployeeId %>';
			if (message != '') {
				alert(message);
				window.returnValue=newEmployeeId;
				window.close();
			}
			DateUtil.addDateArea("birthday","birthdayDate",false);
			DateUtil.addDateArea("hiredDate","hiredDateDate",false);
			DateUtil.addDateArea("contractDate","contractDateDate",false);
			DateUtil.addDateArea("resignedDate","resignedDateDate",false);				
		}
		/*
		 *检验生日，不能和当前时间在同一年
		 */
		function birthdayCheck(){
			var birthday = document.getElementById("birthday").value;
			splitone='-';
			var days = birthday.split(splitone);
			var year = days[0];
			var today = new Date();
			var thisYear = today.getYear();
			if(thisYear <= year){
				alert("请确认输入生日的正确性");
				document.getElementById("birthday").focus();
				return true;
			}else{
				return false;
			}
		}
		/*
		 *生成渠道信息
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
		
		function doFindWorkNo(){
			var url = webpath+'/om/EmployeeMaintanceAction.do?OperType=findWorkNo';
			var width =550;
			var height = 580;
			var wleft=(screen.width-width)/2;
			var wtop=(screen.availHeight-height)/2-20;
			dimensions="width="+width+",height="+height+",left="+wleft+",top="+wtop+",scrollbars";
			window.open(url,'markpage',dimensions);
		}
		function cilckTree(){
			var password = document.getElementById("workPwd").value;
			document.getElementById("workPwdConfirm").value=password;
		}
		function setWorkNo(){
			var ifAutoWorkNo = document.getElementById("ifAutoWorkNo").value;
			var needEmpName = document.getElementById("needEmpName").value;
			var autoWorkNo = document.getElementById("autoWorkNo").value;
			var needCitySortName= document.getElementById("needCitySortName").value; 
			var new_work_no = spell($('EmployeeName').value);
			
			if(ifAutoWorkNo == "true" ){
				if(needCitySortName == "true"){
					if(needEmpName == "true"){						
						new_work_no = autoWorkNo+"_"+new_work_no;
					}else{
						new_work_no = autoWorkNo;
					}						
				}else{
					if(needEmpName == "true"){						
						new_work_no = new_work_no;
					}else{
						new_work_no = autoWorkNo;
					}
				}
				$('WorkNo').value = new_work_no;				
			}
		}
		</SCRIPT>
	</head>
	<body class="mainBody" onload="init()">
		<unieap:form action="" method="post">
		<%
			if (comeFrom != null && comeFrom.intern() == "channelAddEmp".intern()) {
		%>
		<div id="tableDiv" style="display:none">
		<%
			}
		%>
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable" name="bodyTable" >
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
									自动生成
								</td>
								<td align="left" class="formLabel" style="width:20%">
									姓&#160;&#160;名&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="EmployeeName" name="employeeName" prompt="姓名" 
										maxlength="32" isnullable="true" classname="textType" value="<%=employeeName%>" onblur="setWorkNo()"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									所属区域&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=areaColl%>" selectvalue="<%=currentSelectArea%>" selectFlag="" 
										tagName="areaId" title="所属区域"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									组织机构&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=organColl%>" selectvalue="<%=currentSelectOrgan%>" selectFlag="" 
										tagName="organId" title="职位"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									登录账号&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
								<%if(uniAuth != null && uniAuth.equals("true")){ %>
									<unieap:input tcname="Text" id="WorkNo" name="workNo" prompt="登陆账号" maxlength="18" isnullable="true" readonly="true"/>
								<%} else{%>
									<unieap:input tcname="Text" id="WorkNo" name="workNo" prompt="登陆账号" maxlength="18" isnullable="true" value=""/>
								<%} %>
									<%if(uniAuth != null && uniAuth.equals("true")){ %>
									 
									<!--  button class="searchImgButton" id="findWorkNo" name="findWorkNo" onclick="return doFindWorkNo('');" -->														
            						<unieap:innertree requestid="empReq" id="empReq" display="true" buttonCssClass="searchImgButton" valueBackInput="workPwd" 
            							textBackInput="WorkNo" multiSelect="false"  treeImagePath="<%=path%>" laterFunction="cilckTree()"/>
									
									<%} %>
								</td>	
								<td align="left" class="formLabel" style="width:20%">
									职&#160;&#160;务&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=dutyParamColl%>" selectvalue="" selectFlag="" tagName="dutyId" title="职务"/>
								</td>								
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									登录密码&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Password" id="workPwd" name="workPwd" prompt="登陆密码" maxlength="<%=pwdMaxLength %>" 
										isnullable="true" value=""/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									确认密码&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Password" id="workPwdConfirm" name="workPwdConfirm" prompt="确认密码" maxlength="<%=pwdMaxLength %>" 
										isnullable="true" value=""/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									职&#160;&#160;位&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=busDutyColl%>" selectvalue="" selectFlag="" tagName="busDutyId" title="职位"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									上级主管&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=organEmployeeColl%>" selectvalue="" selectFlag="true" tagName="parentEmployeeId" title="上级主管"/>
								</td>								
							</tr>	
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									操作级别&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=operLevelColl%>" selectvalue="" selectFlag="" tagName="operLevel" title="操作级别"/>
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
									<td:SelectTag selectColl="<%=personLevelColl%>" selectvalue="" selectFlag="" tagName="personLevel" title="用户级别"/>
								</td>
							</tr>							
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									所属渠道&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" id="DealerIdValue" name="DealerIdValue" title="所属渠道" maxlength="15" style="widthd:200px" value="<%=dealerName%>"/>
									<a href='#' onclick="showDealerTree('<%=path%>')" style="display:inline"><%=showDealerTree%></a>
									<input type='hidden' id="dealerId" name='dealerId' value='<%=dealerId%>'/>
									<input type='hidden' id="oldDealerId" name='oldDealerId' value='<%=dealerId%>'/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									创建者&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=ownerName%>
									<input type="hidden" id="owner" name="owner" value="<%=authId%>"/>
								</td>								
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
									<td:SelectTag selectColl="<%=educateLevelColl%>" selectvalue="" selectFlag="" tagName="educateLevel" title="教育程度"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									出生日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="birthday" id="birthday" value="" onchange="birthdayCheck()"/>
									<button class="calendarImgButton" id="birthdayDate" ></button>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									性&#160;&#160;别&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=genderColl%>" selectvalue="" selectFlag="" tagName="gender" title="用户级别"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									薪资范围&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=incomeColl%>" selectvalue="" selectFlag="" tagName="income" title="薪资范围"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									婚姻状况&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=marriageStatusColl%>" selectvalue="" selectFlag="" tagName="marriageStatus" title="婚姻状况"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									入职日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="hiredDate" id="hiredDate" value=""/>
									<button class="calendarImgButton" id="hiredDateDate" ></button>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									转正日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="contractDate" id="contractDate" value="" />
									<button class="calendarImgButton" id="contractDateDate" ></button>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									辞职日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="resignedDate" id="resignedDate" value="" />
									<button class="calendarImgButton" id="resignedDateDate" ></button>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									显示顺序&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Number" id="order" name="order" prompt="显示顺序" maxlength="8" isnullable="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									登陆IP1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="LoginIp" name="loginIp" prompt="登陆IP" maxlength="32" isnullable="true"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC地址1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="Mac" name="mac" prompt="MAC地址" maxlength="32" isnullable="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									登陆IP2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="LoginIp2" name="loginIp2" prompt="登陆IP2" maxlength="32" isnullable="true"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC地址2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="Mac2" name="mac2" prompt="MAC地址2" maxlength="32" isnullable="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									电子邮件1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Email" id="Email" name="email" prompt="电子邮件" isnullable="true"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									电子邮件2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Email" id="Email2" name="email2" prompt="电子邮件" isnullable="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									办公电话&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="WorkTelephone" name="workTelephone" prompt="办公电话" maxlength="32" isnullable="true"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									传&#160;&#160;真&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="Fax" name="fax" prompt="Text类型" maxlength="15" isnullable="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									移动电话&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Number" id="Mobile" name="mobile" prompt="移动电话" maxlength="11" isnullable="true"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									家庭电话&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="HomeTelephone" name="honeTelephone" prompt="家庭电话" isnullable="true"/>
								</td>								
							</tr>							
							<tr>									
								<td align="left" class="formLabel" style="width:20%">
									职员创建日期&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=nowDate%>
									<input type="hidden" name="updateDate" id="updateDate" value="<%=nowDate%>" />
								</td>								
								<td align="left" class="formLabel" style="width:20%">
									上次修改密码日期&#160;
								</td>
								<td align="left" class="formField" style="width:30%">&#160;</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									办公地址&#160;
								</td>
								<td align="left" class="formField" style="width:30%" colspan="3">
									<unieap:input tcname="TextArea" id="WorkAddress" name="workAddress" prompt="办公地址" maxlength="256" rows="2"
										cols="64" isnullable="true" style="width:410"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									家庭地址&#160;
								</td>
								<td align="left" class="formField" style="width:30%" colspan="3">
									<unieap:input tcname="TextArea" id="HomeAddress" name="homeAddress" prompt="家庭地址" maxlength="256" rows="2" 
										cols="64" isnullable="true" style="width:410"/>
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
						<input type="hidden" name="pwdMinLength" value="<%=pwdMinLength %>" />
						<input type="hidden" name="pwdMaxLength" value="<%=pwdMaxLength %>" />
						<input type="hidden" name="comeFrom" value="<%=comeFrom %>" />
						<input type="hidden" name="ifAutoWorkNo" value="<%=ifAutoWorkNo %>" />
						<input type="hidden" name="needEmpName" value="<%=needEmpName %>" />
						<input type="hidden" name="autoWorkNo" value="<%=autoWorkNo %>" />
						<input type="hidden" name="needCitySortName" value="<%=needCitySortName %>" />								
					</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>			
			<div class="formButtonDIV" id="formButton">
				<button class="formButton" id="bSave" name="bSave" onclick="return bSaveClick('<%=path%>');">
					保&#160;&#160;存
				</button>
				<button class="formButton" id="bReset" name="bReset" onclick="return bResetClick();">
					重&#160;&#160;置
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick();">
					关&#160;&#160;闭
				</button>
			</div>
			<%
				if (comeFrom != null && comeFrom.intern() == "channelAddEmp".intern()) {
			%>
			</div>
			<%
				}
			%>
		</unieap:form>
	</body>
</html>
