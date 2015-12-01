<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
	<xsl:strip-space elements="*"/>
	<xsl:template match="/root/create">
		<html>
			<head>
				<title>employee</title>
				<LINK REL="stylesheet" HREF="{/root/create/path}/views/common/css/crm_style.css" TYPE="text/css"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_check_no_null.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_check_date.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_enter_jump.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_date_onkey.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_on_lost.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_date_compare.js"></script> 	
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_select_default.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_trim.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_ip_onlost.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_email_check.js"/>
				<script language="javascript" src="{/root/create/path}/views/om/organ/employee/dataAction.js"/>
				<script language="javascript" src="{/root/create/path}/views/om/organ/employee/mouseAction.js"/>
				<script language="javascript" src="{/root/create/path}/views/om/organ/employee/dataCheck.js"/>
				<script language="javascript" src="{/root/create/path}/views/om/organ/employee/DutyMake.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/JSDateFunction.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/calendar.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/date.js"/>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_calendar.js"></script>
				<SCRIPT language="JavaScript">
					<xsl:comment><![CDATA[
function bBackClick(webpath)//����
{
	//this.location.href=webpath+"/views/om/blank.html";
	//parent.mainFrameset.cols="35%,*,0,0";
		OrganKind=parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value;
		OrganId=parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
		DutyId=parent.organdisplayhidden.document.myform.CurrentSelectDutyId.value;
		BelongArea=parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
        if(OrganKind =="area"){
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='area'"+"&BelongArea="+BelongArea+"&AreaId= " + OrganId + "&OperType=employeeList";
        }else if(OrganKind =="organ"){
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='organ'"+"&BelongArea="+BelongArea+"&OrganId=" + OrganId + "&OperType=employeeList";
        }
        else{
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='duty'"+"&BelongArea="+BelongArea+"&OrganId= " + OrganId + "&DutyId= " +DutyId + "&OperType= employeeList";
        }
	    parent.mainFrameset.cols="35%,*,0,0,0,0";
}
//������Ϣ
	function bResetClick(){
		if (!confirm('��ȷ��Ҫ������Ϣô��')) return false;
		myform.reset();
		init();
		return false;	
	}		
	function selectDefault(obj,strValue){
		for (var i=0;i<obj.options.length;i++){
			if (strValue == obj.options[i].value){
				obj.selectedIndex=i;
				return;
			}
		}
	}

//��ʼ����,�����������ȱʡֵ
	function init(){
		mObj=document.all['tblBasicInfo'];
		var defaultDutyId=parent.organdisplayhidden.document.myform.CurrentSelectDutyId.value;
		nas_select_default('myform','AreaId','create/Area/selected');
		nas_select_default('myform','BusDutyId','create/BusDuty/selected');
		nas_select_default('myform','Gender','create/Gender/selected');
		nas_select_default('myform','EducateLevel','create/EducateLevel/selected');
		nas_select_default('myform','MarriageStatus','create/MarriageStatus/selected');
		nas_select_default('myform','Income','create/Income/selected');	
		nas_select_default('myform','InnerEmployee','create/InnerEmployee/selected');
		nas_select_default('myform','ParentEmployeeId','create/ParentEmployee/selected');
		nas_select_default('myform','OrganId','create/Organ/selected');
	   changeRelationSelect3(document.myform.OrganId,document.myform.DutyId,document.myform.hDutyId,"");
		selectDefault(myform.DutyId,defaultDutyId);
		document.all.CalFrame.style.display="none";	
		myform.bSave.disabled=false;
	    myform.bBack.disabled=false;	    	    
	    myform.bReset.disabled=false;
	}
	//������Ϣ
	function bSaveClick(webpath){
		if (checkForm()==false)
			return false;	 
		if (!confirm('��ȷ��Ҫ��������ô��')) return false;
			
//��������ҳ��Ĳ������ύ
		writeValues();
	    parent.employeemaintancehidden.myform.OperType.value='add';//����
	    parent.employeemaintancehidden.myform.action=webpath+ '/om/EmployeeMaintanceAction.do';
	    parent.employeemaintancehidden.myform.submit();
	    myform.bSave.disabled=true;
	    myform.bReset.disabled=true;
	    myform.bBack.disabled=true;
	    return false;
	}
				]]></xsl:comment>
				</SCRIPT>
			</head>
			<body leftmargin="0" topmargin="0" onload="init();" class="BODY">
				<form action="" method="post" name="myform">
					<IFRAME id="CalFrame" style="DISPLAY: none; Z-INDEX: 100; WIDTH: 148px; POSITION: absolute; HEIGHT: 194px" marginWidth="0" marginHeight="0" src="{/root/create/path}/views/common/htm/calendar.htm" frameBorder="0" scrolling="no"/>
								<div id="tabBasicInfo">
									<table border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
										<tr class="trcolorT">
											<td width="17%"  class="tdlabelStyle">ְԱ���� </td>
											<td class="tdtextStyle">
												<input type="text" name="EmployeeId" maxlength="32" size="20" class="textStyle" onkeydown="nas_enter();" disabled="true" value="����д">
													<xsl:attribute name="value"><xsl:value-of select="EmployeeId"/></xsl:attribute>
												</input>
											</td>
											<td width="17%"  class="tdlabelStyle">���� *</td>
											<td class="tdtextStyle">
												<input type="text" name="EmployeeName" class="textStyle" maxlength="32" size="20" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/EmployeeName"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td width="17%"  class="tdlabelStyle" height="21">ְλ *</td>
											<td class="tdtextStyle">
												<select name="BusDutyId" class="dropdownStyle" onkeydown="nas_enter();">
													<option/>
													<xsl:for-each select="BusDuty/option">
														<option>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
														</option>
													</xsl:for-each>
												</select>
											</td>
											<td width="17%"  class="tdlabelStyle">�������� *</td>
											<td class="tdtextStyle">
												<select name="AreaId" class="dropdownStyle" onkeydown="nas_enter();" disabled="true">
													<option/>
													<xsl:for-each select="Area/option">
														<option>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
														</option>
													</xsl:for-each>
												</select>
											</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%"  class="tdlabelStyle">��֯���� *</td>
											<td class="tdtextStyle">
												<select name="OrganId" class="dropdownStyle" disabled="true" onkeydown="nas_enter();" onchange="changeOrganId();">
													<option/>
													<xsl:for-each select="Organ/option">
														<option>
															<xsl:attribute name="title"><xsl:value-of select="kind"/></xsl:attribute>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
															<!--
															����kind����
															-->

														</option>
													</xsl:for-each>
												</select>
											</td>
											<td width="17%"  class="tdlabelStyle">ְ�� *</td>
											<td class="tdtextStyle">
												<select name="DutyId" class="dropdownStyle" onkeydown="nas_enter();">
													<option/>
													<xsl:for-each select="DutyList/option">
														<option>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
														</option>
													</xsl:for-each>
												</select>
												<input type="hidden" name="hDutyId" value="{OrganKindDutyStr}"/>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td width="17%"  class="tdlabelStyle">�ϼ�����</td>
											<td class="tdtextStyle">
												<select name="ParentEmployeeId" class="dropdownStyle" onkeydown="nas_enter();">
													<option/>
													<xsl:for-each select="ParentEmployee/option">
														<option>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
														</option>
													</xsl:for-each>
												</select>
											</td>
											<td width="17%"  class="tdlabelStyle">��½�˺� *</td>
											<td class="tdtextStyle">
												<input type="text" name="WorkNo" maxlength="18" class="textStyle" onkeydown="nas_enter();" style="ime-mode:disabled">
													<xsl:attribute name="value"><xsl:value-of select="Employee/WorkNo"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%"  class="tdlabelStyle">���� *</td>
											<td class="tdtextStyle">
												<input name="WorkPwd" type="password" class="textStyle" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/WorkPwd"/></xsl:attribute>
												</input>
											</td>
											<td width="17%"  class="tdlabelStyle">ȷ������ *</td>
											<td class="tdtextStyle">
												<input name="WorkPwdConfirm" type="password" class="textStyle"  onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/WorkPwd"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td width="17%"  class="tdlabelStyle">�˺�ʧЧ����</td>
											<td class="tdtextStyle">
												<input type="text" name="InactiveDate" maxlength="10" class="textStyle" id="InactiveDate" onkeydown="nas_date_onkey(event,InactiveDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/InactiveDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('InactiveDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
											</td>
											<td width="17%"  class="tdlabelStyle">����ʧЧ����</td>
											<td class="tdtextStyle">
												<input type="text" name="InactivePwdDate" maxlength="10" class="textStyle" id="InactivePwdDate"  onkeydown="nas_date_onkey(event,InactivePwdDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/InactivePwdDate"/></xsl:attribute>
												</input>
													<a href="javascript:showCalendar('InactivePwdDate','{/root/create/path}');">
														<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
													</a>
												</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%"  class="tdlabelStyle">�Ƿ��ڲ�Ա��</td>
											<td class="tdtextStyle">
												<select name="InnerEmployee" class="dropdownStyle" onkeydown="nas_enter();">
													<option/>
													<xsl:for-each select="InnerEmployee/option">
														<option>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
														</option>
													</xsl:for-each>
												</select>
											</td>
											<td width="17%"  class="tdlabelStyle">�����̶�</td>
											<td class="tdtextStyle">
												<select name="EducateLevel" class="dropdownStyle" onkeydown="nas_enter();">
													<option/>
													<xsl:for-each select="EducateLevel/option">
														<option>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
														</option>
													</xsl:for-each>
												</select>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td width="17%"  class="tdlabelStyle" height="22">�Ա�</td>
											<td class="tdtextStyle">
												<select name="Gender" class="dropdownStyle" onkeydown="nas_enter();">
													<option/>
													<xsl:for-each select="Gender/option">
														<option>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
														</option>
													</xsl:for-each>
												</select>
											</td>
											<td width="17%"  class="tdlabelStyle">��������</td>
											<td class="tdtextStyle">
												<input type="text" name="Birthday" id="Birthday" maxlength="10" size="20" class="textStyle"  onkeydown="nas_date_onkey(event,Birthday,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/Birthday"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('Birthday','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
												</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%"  class="tdlabelStyle">н�ʷ�Χ</td>
											<td class="tdtextStyle">
												<select name="Income" class="dropdownStyle" onkeydown="nas_enter();">
													<option/>
													<xsl:for-each select="Income/option">
														<option>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
														</option>
													</xsl:for-each>
												</select>
											</td>
											<td width="17%"  class="tdlabelStyle">���</td>
											<td class="tdtextStyle">
												<select name="MarriageStatus" class="dropdownStyle" onkeydown="nas_enter();">
													<option/>
													<xsl:for-each select="MarriageStatus/option">
														<option>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
														</option>
													</xsl:for-each>
												</select>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td width="17%"  class="tdlabelStyle">��ְ����</td>
											<td class="tdtextStyle">
												<input type="text" name="HiredDate" id="HiredDate" maxlength="10" size="20" class="textStyle"  onkeydown="nas_date_onkey(event,HiredDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/HiredDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('HiredDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
												</td>
											<td width="17%"  class="tdlabelStyle">ת������</td>
											<td class="tdtextStyle">
												<input type="text" name="ContractDate" id="ContractDate" maxlength="10" size="20" class="textStyle" onkeydown="nas_date_onkey(event,ContractDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/ResignedDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('ContractDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
											</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%"  class="tdlabelStyle">��ְ����</td>
											<td class="tdtextStyle">
												<input type="text" name="ResignedDate" id="ResignedDate" maxlength="10" size="20" class="textStyle" onkeydown="nas_date_onkey(event,ResignedDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/ResignedDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('ResignedDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
											</td>
											<td width="17%"  class="tdlabelStyle">�������</td>
											<td class="tdtextStyle">
												<input type="text" name="UpdateDate" id="UpdateDate" maxlength="10" size="20" class="textStyle" onkeydown="nas_date_onkey(event,UpdateDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/UpdateDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('UpdateDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
													</td>
										</tr>
										<tr  class="trcolorT">
											<td width="17%"  class="tdlabelStyle">��½IP</td>
											<td class="tdtextStyle">
												<input type="text" name="LoginIp" maxlength="32" size="20" class="textStyle" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/ResignedDate"/></xsl:attribute>
												</input>
											</td>
											<td width="17%"  class="tdlabelStyle">MAC��ַ</td>
											<td class="tdtextStyle">
												<input type="text" name="Mac" maxlength="32" size="20" onkeydown="nas_enter();" class="textStyle">
													<xsl:attribute name="value"><xsl:value-of select="Employee/Mac"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td class="tdlabelStyle">�ƶ��绰</td>
											<td class="tdtextStyle">
												<input type="text" name="Mobile" maxlength="15" size="20" class="textStyle" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/Mobile"/></xsl:attribute>
												</input>
											</td>
											<td width="17%"  class="tdlabelStyle">�����ʼ�</td>
											<td class="tdtextStyle">
												<input type="text" name="Email" maxlength="40" size="20" class="textStyle" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/Email"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td class="tdlabelStyle">�칫�绰</td>
											<td class="tdtextStyle">
												<input type="text" name="WorkTelephone" class="textStyle" maxlength="15" size="20" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/WorkTelephone"/></xsl:attribute>
												</input>
											</td>
											<td width="17%"  class="tdlabelStyle">����</td>
											<td class="tdtextStyle">
												<input type="text" name="Fax" class="textStyle" maxlength="15"  onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/Fax"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td class="tdlabelStyle">��ͥ�绰</td>
											<td class="tdtextStyle">
												<input type="text" class="textStyle" name="HoneTelephone" maxlength="15" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/HoneTelephone"/></xsl:attribute>
												</input>
											</td>
											<td width="17%"  class="tdlabelStyle"/>
											<td/>
										</tr>
										<tr  class="trcolorT">
											<td width="17%"  class="tdlabelStyle">�칫��ַ</td>
											<td colspan="3" class="tdtextStyle">
												<input type="text" name="WorkAddress" maxlength="256" size ="80" onkeydown="nas_enter();" class="longtextStyle">
													<xsl:attribute name="value"><xsl:value-of select="Employee/WorkAddress"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%"  class="tdlabelStyle">��ͥ��ַ</td>
											<td colspan="3" class="tdtextStyle">
												<input type="text" name="HomeAddress" maxlength="256"  size ="80" onkeydown="nas_enter();" class="longtextStyle">
													<xsl:attribute name="value"><xsl:value-of select="Employee/HomeAddress"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td colspan="4">
												<table border="0" align="right" cellpadding="0" cellspacing="5">
													<tr>
														<td>
															<input type="button" name="bSave" value="�� ��"  onclick="return bSaveClick('{/root/create/path}');" class="btn1_mouseout" onmouseover="this.className='btn1_mouseover'"
 onmouseout="this.className='btn1_mouseout'" onmousedown="this.className='btn1_mousedown'"  onmouseup="this.className='btn1_mouseup'"
 disabled="true"/>
														</td>
														<td>
															<input type="button" name="bReset" value="�� ��" class="btn1_mouseout" onmouseover="this.className='btn1_mouseover'"
 onmouseout="this.className='btn1_mouseout'" onmousedown="this.className='btn1_mousedown'"  onmouseup="this.className='btn1_mouseup'"
 onclick="return bResetClick();" disabled="true"/>
														</td>
														<td>
															<input type="reset" name="bBack" value="�� ��" class="btn1_mouseout" onmouseover="this.className='btn1_mouseover'"
 onmouseout="this.className='btn1_mouseout'" onmousedown="this.className='btn1_mousedown'"  onmouseup="this.className='btn1_mouseup'"
 onclick="return bBackClick('{/root/create/path}');" disabled="true"/>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</div>
				</form>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
