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
<%@page import="com.neusoft.om.dao.employee.EmployeeVO"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%
	String path = request.getContextPath();
    String showDealerTree  = "<img src='"+path+"/common/images/icon/search.gif' border=no style='vertical-align:middle' title='������Ϣ'/>";
	
	String authId = (String)request.getAttribute("optId");
	String ownerName = (String)request.getAttribute("ownerName");
	String dealerId = (String)request.getAttribute("dealerId");
	String dealerName = (String)request.getAttribute("dealerName");
	String comeFrom = (String)request.getAttribute("comeFrom");
	EmployeeVO vo = (EmployeeVO)request.getAttribute("EmployeeVO");
	if (vo == null) {
		vo = new EmployeeVO();
	}
	//�õ�ҳ������Ҫ����������Ϣ
	ParamObjectCollection dutyParamColl = (ParamObjectCollection)request.getAttribute("DutyParamColl"); //ְ��
	ParamObjectCollection busDutyColl =(ParamObjectCollection)request.getAttribute("BusDutyColl");//ְλ
	ParamObjectCollection genderColl = (ParamObjectCollection)request.getAttribute("GenderColl");//�Ա�
	ParamObjectCollection educateLevelColl = (ParamObjectCollection)request.getAttribute("EducateLevelColl");//����ˮƽ
	ParamObjectCollection incomeColl = (ParamObjectCollection)request.getAttribute("IncomeColl");//����
	ParamObjectCollection marriageStatusColl = (ParamObjectCollection)request.getAttribute("MarriageStatusColl");//����״��
	ParamObjectCollection personLevelColl = (ParamObjectCollection)request.getAttribute("PersonLevelColl");//�û�����
	ParamObjectCollection organEmployeeColl = (ParamObjectCollection)request.getAttribute("OrganEmployeeColl");//����������Ա�б���Ϣ���ϼ���Ϣ������
	ParamObjectCollection areaColl = (ParamObjectCollection)request.getAttribute("AreaColl");//����
	ParamObjectCollection organColl = (ParamObjectCollection)request.getAttribute("OrganColl");//��֯����
	ParamObjectCollection operLevelColl = (ParamObjectCollection)request.getAttribute("OperLevelColl");//��������
	//����������ǰѡ��ֵ
	String currentSelectArea = (String)request.getAttribute("BelongArea");
	//��֯������������ǰӦѡ��ֵ
	String currentSelectOrgan = (String)request.getAttribute("OrganId");
	//��ȡ��ǰ����
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
		<title>����ְԱ��Ϣ</title>
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
		 *�رշ���
		 */
		function bBackClick()
		{
			if (!confirm('��ȷ���ر�ô��')) 
				return false;
			window.close();
		}
		/*
		 *���÷���
		 */
		function bResetClick()
		{
			if (!confirm('��ȷ��Ҫ����ô��')) 
				return false;
			EAPForm.reset();
		}
		/*
		 *������Ϣ
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
					alert("������д��¼����");
					EAPForm.workPwd.focus();
					return false;
				}else if(workPwd.length < pwdMinLength || workPwd.length > pwdMaxLength){
					alert("���볤��Ҫ����"+pwdMinLength+"λ��"+pwdMaxLength+"λ֮��,��������д");
					EAPForm.workPwd.focus();
					return false;
				}
				else if (workPwd != workPwdConfirm)
				{
					alert("������������벻���");
					return false;
				}
			}
			if (EAPForm.employeeName.value == '')
			{
				alert("����д����");
				return false;
			}
		    EAPForm.OperType.value='add';//����
		    EAPForm.action=webpath+ '/om/EmployeeMaintanceAction.do';
		    //EAPForm.target='_self';
		    EAPForm.submit();
		}
		/*
		 *ҳ���ʼ������
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
				document.getElementById("birthday").focus();
				return true;
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
									�Զ�����
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��&#160;&#160;��&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="EmployeeName" name="employeeName" prompt="����" 
										maxlength="32" isnullable="true" classname="textType" value="<%=employeeName%>" onblur="setWorkNo()"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=areaColl%>" selectvalue="<%=currentSelectArea%>" selectFlag="" 
										tagName="areaId" title="��������"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��֯����&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=organColl%>" selectvalue="<%=currentSelectOrgan%>" selectFlag="" 
										tagName="organId" title="ְλ"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��¼�˺�&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
								<%if(uniAuth != null && uniAuth.equals("true")){ %>
									<unieap:input tcname="Text" id="WorkNo" name="workNo" prompt="��½�˺�" maxlength="18" isnullable="true" readonly="true"/>
								<%} else{%>
									<unieap:input tcname="Text" id="WorkNo" name="workNo" prompt="��½�˺�" maxlength="18" isnullable="true" value=""/>
								<%} %>
									<%if(uniAuth != null && uniAuth.equals("true")){ %>
									 
									<!--  button class="searchImgButton" id="findWorkNo" name="findWorkNo" onclick="return doFindWorkNo('');" -->														
            						<unieap:innertree requestid="empReq" id="empReq" display="true" buttonCssClass="searchImgButton" valueBackInput="workPwd" 
            							textBackInput="WorkNo" multiSelect="false"  treeImagePath="<%=path%>" laterFunction="cilckTree()"/>
									
									<%} %>
								</td>	
								<td align="left" class="formLabel" style="width:20%">
									ְ&#160;&#160;��&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=dutyParamColl%>" selectvalue="" selectFlag="" tagName="dutyId" title="ְ��"/>
								</td>								
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��¼����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Password" id="workPwd" name="workPwd" prompt="��½����" maxlength="<%=pwdMaxLength %>" 
										isnullable="true" value=""/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									ȷ������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Password" id="workPwdConfirm" name="workPwdConfirm" prompt="ȷ������" maxlength="<%=pwdMaxLength %>" 
										isnullable="true" value=""/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									ְ&#160;&#160;λ&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=busDutyColl%>" selectvalue="" selectFlag="" tagName="busDutyId" title="ְλ"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									�ϼ�����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=organEmployeeColl%>" selectvalue="" selectFlag="true" tagName="parentEmployeeId" title="�ϼ�����"/>
								</td>								
							</tr>	
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=operLevelColl%>" selectvalue="" selectFlag="" tagName="operLevel" title="��������"/>
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
									<td:SelectTag selectColl="<%=personLevelColl%>" selectvalue="" selectFlag="" tagName="personLevel" title="�û�����"/>
								</td>
							</tr>							
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" id="DealerIdValue" name="DealerIdValue" title="��������" maxlength="15" style="widthd:200px" value="<%=dealerName%>"/>
									<a href='#' onclick="showDealerTree('<%=path%>')" style="display:inline"><%=showDealerTree%></a>
									<input type='hidden' id="dealerId" name='dealerId' value='<%=dealerId%>'/>
									<input type='hidden' id="oldDealerId" name='oldDealerId' value='<%=dealerId%>'/>
								</td>
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
									<td:SelectTag selectColl="<%=educateLevelColl%>" selectvalue="" selectFlag="" tagName="educateLevel" title="�����̶�"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="birthday" id="birthday" value="" onchange="birthdayCheck()"/>
									<button class="calendarImgButton" id="birthdayDate" ></button>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��&#160;&#160;��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=genderColl%>" selectvalue="" selectFlag="" tagName="gender" title="�û�����"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									н�ʷ�Χ&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=incomeColl%>" selectvalue="" selectFlag="" tagName="income" title="н�ʷ�Χ"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									����״��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectColl="<%=marriageStatusColl%>" selectvalue="" selectFlag="" tagName="marriageStatus" title="����״��"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��ְ����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="hiredDate" id="hiredDate" value=""/>
									<button class="calendarImgButton" id="hiredDateDate" ></button>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									ת������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="contractDate" id="contractDate" value="" />
									<button class="calendarImgButton" id="contractDateDate" ></button>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��ְ����&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="resignedDate" id="resignedDate" value="" />
									<button class="calendarImgButton" id="resignedDateDate" ></button>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��ʾ˳��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Number" id="order" name="order" prompt="��ʾ˳��" maxlength="8" isnullable="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��½IP1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="LoginIp" name="loginIp" prompt="��½IP" maxlength="32" isnullable="true"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC��ַ1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="Mac" name="mac" prompt="MAC��ַ" maxlength="32" isnullable="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��½IP2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="LoginIp2" name="loginIp2" prompt="��½IP2" maxlength="32" isnullable="true"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC��ַ2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="Mac2" name="mac2" prompt="MAC��ַ2" maxlength="32" isnullable="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�����ʼ�1&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Email" id="Email" name="email" prompt="�����ʼ�" isnullable="true"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									�����ʼ�2&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Email" id="Email2" name="email2" prompt="�����ʼ�" isnullable="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�칫�绰&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="WorkTelephone" name="workTelephone" prompt="�칫�绰" maxlength="32" isnullable="true"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��&#160;&#160;��&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="Fax" name="fax" prompt="Text����" maxlength="15" isnullable="true"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�ƶ��绰&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Number" id="Mobile" name="mobile" prompt="�ƶ��绰" maxlength="11" isnullable="true"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��ͥ�绰&#160;
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input tcname="Text" id="HomeTelephone" name="honeTelephone" prompt="��ͥ�绰" isnullable="true"/>
								</td>								
							</tr>							
							<tr>									
								<td align="left" class="formLabel" style="width:20%">
									ְԱ��������&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<%=nowDate%>
									<input type="hidden" name="updateDate" id="updateDate" value="<%=nowDate%>" />
								</td>								
								<td align="left" class="formLabel" style="width:20%">
									�ϴ��޸���������&#160;
								</td>
								<td align="left" class="formField" style="width:30%">&#160;</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�칫��ַ&#160;
								</td>
								<td align="left" class="formField" style="width:30%" colspan="3">
									<unieap:input tcname="TextArea" id="WorkAddress" name="workAddress" prompt="�칫��ַ" maxlength="256" rows="2"
										cols="64" isnullable="true" style="width:410"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��ͥ��ַ&#160;
								</td>
								<td align="left" class="formField" style="width:30%" colspan="3">
									<unieap:input tcname="TextArea" id="HomeAddress" name="homeAddress" prompt="��ͥ��ַ" maxlength="256" rows="2" 
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
					��&#160;&#160;��
				</button>
				<button class="formButton" id="bReset" name="bReset" onclick="return bResetClick();">
					��&#160;&#160;��
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick();">
					��&#160;&#160;��
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
