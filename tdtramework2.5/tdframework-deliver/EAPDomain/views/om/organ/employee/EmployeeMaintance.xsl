<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
	<xsl:strip-space elements="*"/>
	<xsl:template match="/root/create">
		<html>
			<head>
				<title>employee</title>
	<LINK REL="stylesheet" HREF="{/root/create/path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_check_no_null.js"></script>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_check_date.js"/>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_enter_jump.js"></script>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_date_onkey.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/common/js/return_table_arr.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_on_lost.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_select_default.js"></script>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_trim.js"></script>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_ip_onlost.js"></script>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_email_check.js"></script>
	<script language="javascript" src="{/root/create/path}/views/om/organ/employee/dataAction.js"></script> 
	<script language="javascript" src="{/root/create/path}/views/om/organ/employee/calendar.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/om/organ/employee/mouseAction.js"></script> 
	<script language="javascript" src="{/root/create/path}/views/om/organ/employee/dataCheck.js"></script>
	<script language="javascript" src="{/root/create/path}/views/common/js/JSDateFunction.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/common/js/calendar.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/common/js/date.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/om/organ/employee/DutyMake.js"/>	
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_calendar.js"></script>
	<SCRIPT language="JavaScript">
				<xsl:comment>
				<![CDATA[
	 function bBackClick(webpath)//返回
		{
			this.location.href=webpath+"/views/om/blank.html";
		 	parent.mainFrameset.cols="35%,*,0,0,0,0";
		 	return false;
		 }
	//处理调整按钮
	function bAdjustClick(webPath){
			var strRoleId = getRoleIdStr(parent.employeemaintance);
			var employeeId = document.myform.EmployeeId.value;
			if (!confirm('您确定要进行角色调整吗？')) return;
			var link=webPath+'/om/EmployeeMaintanceAction.do?EmployeeId='+employeeId+'&roleIdStr='+strRoleId+'&OperType=adjustRole';
			parent.roleInfoAdjustHidden.location.href=link;
	}
	
	
	//获得角色串
	function getRoleIdStr(objFrame){
		var strRoleId='';
		var myInput=objFrame.document.all.tags("input");
		for (var i=0;i<myInput.length;i++){
			if (myInput[i].type=='checkbox'&&myInput[i].id.indexOf('ckb')==0){
				if (myInput[i].checked){
					strRoleId=strRoleId+myInput[i].id.substring(3)+',';
				}
			}
		}
		return strRoleId;
	}
//初始化表单,设置下拉框的缺省值
	function init(querytype){
		mObj=document.all['tblBasicInfo'];	
		nas_select_default('myform','AreaId','create/Employee/AreaId');		
		nas_select_default('myform','BusDutyId','create/BusDuty/selected');

		nas_select_default('myform','Gender','create/Gender/selected');
		nas_select_default('myform','EducateLevel','create/EducateLevel/selected');
		nas_select_default('myform','MarriageStatus','create/MarriageStatus/selected');
		nas_select_default('myform','Income','create/Income/selected');	
		nas_select_default('myform','InnerEmployee','create/InnerEmployee/selected');
		nas_select_default('myform','ParentEmployeeId','create/ParentEmployee/selected');
		nas_select_default('myform','OrganId','create/Organ/selected');
		parent.employeemaintancehidden.myform.OldOrganId.value=nas_trim(myform.OldOrganId.value);
		parent.employeemaintancehidden.myform.OldDutyId.value=nas_trim(myform.OldDutyId.value);
       changeRelationSelect3(document.myform.OrganId,document.myform.DutyId,document.myform.hDutyId,"");
       	nas_select_default('myform','DutyId','create/OrganKindDutyList/selectedQ');	
	    myform.bModify.disabled=false;
	    myform.bDelete.disabled=false;
	    myform.bBack.disabled=false;	    	    
	    myform.bReset.disabled=false;
	    document.all.CalFrame.style.display="none";
		//var temp=writeDutyInfo();
		//alert(temp);
	}
	
	//获取职务信息串
	function strDutyInfo(){
		var xml_name_arr=new Array("RowNo","OrganId","EmployeeId","DutyId","Kind");
		var xml_name_length=xml_name_arr.length;
		var sup_str = '/root/create/Duty/DutyList';
		var dutyrole=return_table_arr(sup_str,xml_name_arr);
		var strRows='';
		var k=0;
		for (var i=0;i<dutyrole.length/xml_name_length;i++){
			strRows=strRows+'<TR onmouseover="MouseOver(this);" onmouseout="MouseOut(this);" class="trList">';
			for (var j=0;j<xml_name_length;j++){
				switch (j){
					case 0:
						strRows=strRows+'<TD>'+dutyrole[k]+'</TD>';
						break;
					case 1:
						strRows=strRows+'<TD>'+getSltValue(myform.OrganId,dutyrole[k])+'</TD>';
						break;
					case 3:
						//alert(dutyrole[k]);
						strRows=strRows+'<TD>'+getDutyValue(dutyrole[k],dutyrole[k+1])+'</TD>';
						break;
					default :
						break;//strRows=strRows+'<TD>'+dutyrole[k]+'</TD>';
				}
				//alert(strRows);
				k++;
			}
			strRows=strRows+'</TR>';
		}
		return strRows;
	}
	//从页面中的select中获取值 @objSelect select对象;@id 
	//返回select中与value对应的caption值
	function getSltValue(objSelect,id){
		for (var i=0;i<objSelect.length;i++){
			if (objSelect[i].value.toString()==id.toString()){
				return objSelect[i].text;
			}
		}
		return '';
	}
	function getDutyValue(organid,organkind){
		var allValue=document.myform.hDutyId.value;
		var allArray = new Array();
		allArray = allValue.split('`');
		for(var i=0;i<allArray.length;i++){
			obj2Array = new Array();
			obj2Array = allArray[i].split(':');
//			alert(obj2Array[1]);
			if(obj2Array[1]==organid)
				return obj2Array[2];
		}
		return '';
	}
	//删除信息
	function bDeleteClick(webpath){
		if (!confirm('您确定要删除么？')) return false;
		parent.employeemaintancehidden.myform.EmployeeId.value=nas_trim(myform.EmployeeId.value);
		parent.employeemaintancehidden.myform.OperType.value="delete";
	    parent.employeemaintancehidden.myform.action=webpath+ '/om/EmployeeMaintanceAction.do';
	    parent.employeemaintancehidden.myform.submit();
	    return false;
	}
	//修改信息
	function bModifyClick(webpath){
		if (!confirm('您确定要修改么？')) return false;
		if (checkForm()==false)
			return false;	    
		 writeValues();
		 parent.employeemaintancehidden.myform.OperType.value='modify';
	    parent.employeemaintancehidden.myform.action=webpath+ '/om/EmployeeMaintanceAction.do';
	    /*
	    myform.bModify.disabled=true;
	    myform.bDelete.disabled=true;
	    myform.bBack.disabled=true;	    	    
	    myform.bReset.disabled=true;*/	  	    
	    parent.employeemaintancehidden.myform.submit();
	}
	//重置信息
	function bResetClick(){
		if (!confirm('您确定要重置信息么？')) return false;
		myform.reset();
		init();
		return false;	
	}
	//生成角色信息串
	function strRoleInfo(){
		var xml_name_arr=new Array("orgnaKindName","dutyName","DutyId","RoleId","RoleType","RoleName","CreateAreaId","IfDefault","isExit");
		var xml_name_length=xml_name_arr.length
		var sup_str = '/root/create/roleTest/RoleInfo';
		var dutyrole=return_table_arr(sup_str,xml_name_arr);
		var strRows='';
		var strCheck='';
		var strAll ='';
		var k=0;
		for (var i=0;i<dutyrole.length/xml_name_length;i++){
			strAll=strAll+'<TR onmouseover="MouseOver(this);" onmouseout="MouseOut(this);" class="trList">';
			//strRows=strRows+'<TD><input type ="checkbox" id="ckb'+dutyrole[3]+'" checked= "dutyrole[8]" /></TD>';
			for (var j=0;j<xml_name_length;j++){
				switch (j){	
					case 0:
						strRows=strRows+'<TD>'+dutyrole[k]+'</TD>';
						break;
					case 1:
						strRows=strRows+'<TD>'+dutyrole[k]+'</TD>';
						break;
					case 3:
						strCheck = '<TD><input type="checkbox" id="ckb'+dutyrole[k]+'"';
						break;
					case 5:
						strRows=strRows+'<TD>'+dutyrole[k]+'</TD>';
						break;
					case 8:
						if(dutyrole[k]=="true"){
							strCheck=strCheck+' checked /></TD>';
						}else{
							strCheck=strCheck+' /></TD>';
						}
						break;
					default :
						break;
				}
				k++;
			}
			strAll=strAll+strCheck+strRows+'</TR>';
			strRows='';
			strCheck='';
		}
		return strAll;
	}
]]>
				</xsl:comment>
				</SCRIPT>
			</head>
			<body onload="init();" class="BODY">
      <IFRAME id="CalFrame"
      style="DISPLAY: none; Z-INDEX: 100; WIDTH: 148px; POSITION: absolute; HEIGHT: 194px" 
      marginWidth="0" marginHeight="0" src="{/root/create/path}/views/common/htm/calendar.htm" 
      frameBorder="0" scrolling="no"></IFRAME>

<form action="" method="post" name="myform">

<input type="hidden" name="OldOrganId" value="{Employee/OrganId}"></input>
<input type="hidden" name="OldDutyId"  value="{Employee/DutyId}"></input>
<input type="hidden" name="query" value="{OperType}"></input>
				<table width="93%" border="0" align="center" cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
								<tr>
									<td width="90">
										<table width="90" border="0" cellpadding="0" cellspacing="0" class="info_on" style="cursor:pointer" id="tblBasicInfo" onclick="clickTab(this,'{root/create/path}');" onmouseover="mouseOverTab(this);" onmouseout="mouseOutTab(this);">
											<tr>
												<td>
													<div align="center">基本信息</div>
												</td>
											</tr>
										</table>
									</td>
									<td width="90">
										<table width="90" border="0" cellpadding="0" cellspacing="0" class="info_off" style="cursor:hand" id="tblDutyInfo"  onclick="clickTab(this,'{root/create/path}');" onmouseover="mouseOverTab(this);" onmouseout="mouseOutTab(this);">
											<tr>
												<td>
													<div align="center">职务信息</div>
												</td>
											</tr>
										</table>
									</td>
									<td width="90">
										<table width="90" border="0" cellpadding="0" cellspacing="0" class="info_off" style="cursor:hand" id="tblRoleInfo"  onclick="clickTab(this,'{root/create/path}');" onmouseover="mouseOverTab(this);" onmouseout="mouseOutTab(this);">
											<tr>
												<td>
													<div align="center">角色信息</div>
												</td>
											</tr>
										</table>
									</td>
									<!--
									<td width="90">
									<table width="90" border="0" cellpadding="0" cellspacing="0" style="cursor:hand" onclick="return back_click();" >
											<tr>
												<td>
													<img src="{/root/create/path}/views/common/images/back.jpg" alt="返回"></img>
												</td>
											</tr>
										</table>
									</td>
									-->									
									<td class="info_line"><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
								</tr>
							</table>
							<div id="tabBasicInfo">
									<table width="100%" border="0" cellspacing="3" cellpadding="0" class="tab_info">
										<tr>
											<td width="17%" class="tdlabelStyle">职员编码 </td>
											<td class="tdtextStyle">
												<input type="text" name="EmployeeId" maxlength="32" size="20" class="textStyle" disabled="true" value="不填写">
													<xsl:attribute name="value"><xsl:value-of select="Employee/EmployeeId"/></xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">姓名 *</td>
											<td class="tdtextStyle">
												<input type="text" name="EmployeeName" class="textStyle" maxlength="32" size="20" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/EmployeeName"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">职位 *</td>
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
											<td width="17%" class="tdlabelStyle">所属区域 *</td>
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
										<tr>
											<td width="17%" class="tdlabelStyle">组织机构 *</td>
											<td class="tdtextStyle">
												<select name="OrganId" class="dropdownStyle" onkeydown="nas_enter();" disabled="true" onchange="changeOrganId();">
													<option/>
													<xsl:for-each select="Organ/option">
														<option>
															<xsl:attribute name="title"><xsl:value-of select="kind"/></xsl:attribute>
															<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
															<xsl:value-of select="caption"/>
															<!--
															增加kind属性
															-->

														</option>
													</xsl:for-each>
												</select>

											</td>
											<td width="17%" class="tdlabelStyle">职务 *</td>
											<td class="tdtextStyle">
												<select name="DutyId" class="dropdownStyle" onkeydown="nas_enter();">
													<option/>
												</select>
												<input type="hidden" name="hDutyId" value="{OrganKindDutyStr}"/>
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">上级主管</td>
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
											<td width="17%" class="tdlabelStyle">登陆账号 *</td>
											<td class="tdtextStyle">
												<input type="text" name="WorkNo" maxlength="3" class="textStyle" size="20" onkeydown="nas_enter();" style="ime-mode:disabled" disabled="true">
													<xsl:attribute name="value"><xsl:value-of select="Employee/WorkNo"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">密码 *</td>
											<td class="tdtextStyle">
												<input name="WorkPwd" type="password" disabled="true" class="textStyle" size="15" onkeydown="nas_enter();" value="helloworld">
													
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">确认密码 *</td>
											<td class="tdtextStyle">
												<input name="WorkPwdConfirm" type="password" disabled="true"  class="textStyle" size="15" onkeydown="nas_enter();" value="helloworld">
												</input>
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">账号失效日期</td>
											<td class="tdtextStyle">
												<input type="text" name="InactiveDate" id="InactiveDate" maxlength="10" size="20" class="textStyle" onkeydown="nas_date_onkey(event,InactiveDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/InactiveDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('InactiveDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
												
											</td>
											<td width="17%" class="tdlabelStyle">密码失效日期</td>
											<td class="tdtextStyle">
												<input type="text" name="InactivePwdDate" id="InactivePwdDate" maxlength="10" size="20" class="textStyle" onkeydown="nas_date_onkey(event,InactivePwdDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/InactivePwdDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('InactivePwdDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
												
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">是否内部员工</td>
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
											<td width="17%" class="tdlabelStyle">教育程度</td>
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
										<tr>
											<td width="17%" class="tdlabelStyle">性别</td>
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
											<td width="17%" class="tdlabelStyle">出生日期</td>
											<td class="tdtextStyle">
												<input type="text" name="Birthday" id="Birthday" maxlength="10" size="20" class="textStyle" onkeydown="nas_date_onkey(event,Birthday,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/Birthday"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('Birthday','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
												
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">薪资范围</td>
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
											<td width="17%" class="tdlabelStyle">婚否</td>
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
										<tr>
											<td width="17%" class="tdlabelStyle">入职日期</td>
											<td class="tdtextStyle">
												<input type="text" name="HiredDate" id="HiredDate" maxlength="10" size="20" class="textStyle" onkeydown="nas_date_onkey(event,HiredDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/HiredDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('HiredDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
												
											</td>
											<td width="17%" class="tdlabelStyle">职员创建日期</td>
											<td class="tdtextStyle">
												<input type="text" name="ContractDate" id="ContractDate" maxlength="10" size="20" class="textStyle" onkeydown="nas_date_onkey(event,ContractDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/ResignedDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('ContractDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">辞职日期</td>
											<td class="tdtextStyle">
												<input type="text" name="ResignedDate" id="ResignedDate" maxlength="10" size="20" class="textStyle" onkeydown="nas_date_onkey(event,ResignedDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/ResignedDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('ResignedDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
												
											</td>
											<td width="17%" class="tdlabelStyle">变更日期</td>
											<td class="tdtextStyle">
												<input type="text" name="UpdateDate" id="UpdateDate" maxlength="10" size="20" class="textStyle" onkeydown="nas_date_onkey(event,UpdateDate,'-',0);">
													<xsl:attribute name="value"><xsl:value-of select="Employee/UpdateDate"/></xsl:attribute>
												</input>
												<a href="javascript:showCalendar('UpdateDate','{/root/create/path}');">
													<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
												</a>
												
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">登陆IP</td>
											<td class="tdtextStyle">
												<input type="text" name="LoginIp" maxlength="32" size="20" class="textStyle" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/LoginIp"/></xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">MAC地址</td>
											<td class="tdtextStyle">
												<input type="text" name="Mac" maxlength="32" size="20" onkeydown="nas_enter();" class="textStyle">
													<xsl:attribute name="value"><xsl:value-of select="Employee/Mac"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">移动电话</td>
											<td class="tdtextStyle">
												<input type="text" name="Mobile" maxlength="15" size="20" class="textStyle" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/Mobile"/></xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">电子邮件</td>
											<td class="tdtextStyle">
												<input type="text" name="Email" maxlength="40" size="20" class="textStyle" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/Email"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">办公电话</td>
											<td class="tdtextStyle">
												<input type="text" name="WorkTelephone" class="textStyle" maxlength="15" size="20" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/WorkTelephone"/></xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">传真</td>
											<td class="tdtextStyle">
												<input type="text" name="Fax" class="textStyle" maxlength="15" size="20" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/Fax"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">家庭电话</td>
											<td class="tdtextStyle">
												<input type="text" class="textStyle" name="HoneTelephone" maxlength="15" size="20" onkeydown="nas_enter();">
													<xsl:attribute name="value"><xsl:value-of select="Employee/HoneTelephone"/></xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle"/>
											<td/>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">办公地址</td>
											<td colspan="3" class="tdtextStyle">
												<input type="text" name="WorkAddress" maxlength="256" size="80" onkeydown="nas_enter();" class="textStyle">
													<xsl:attribute name="value"><xsl:value-of select="Employee/WorkAddress"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr>
											<td width="17%" class="tdlabelStyle">家庭地址</td>
											<td colspan="3" class="tdtextStyle">
												<input type="text" name="HomeAddress" maxlength="256" size="80" onkeydown="nas_enter();" class="textStyle">
													<xsl:attribute name="value"><xsl:value-of select="Employee/HomeAddress"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr>
												<td colspan="4">
													<table border="0" align="right" cellpadding="0" cellspacing="5">
														<tr>
															<td>
																<input type="button" name="bModify" value="修 改"  onclick="bModifyClick('{/root/create/path}');return false;" class="btn3_mouseout" nmouseover="this.className='btn3_mouseover'"
 onmouseout="this.className='btn3_mouseout'" onmousedown="this.className='btn3_mousedown'"  onmouseup="this.className='btn3_mouseup'"
 disabled="true"/>
															</td>
															<td>
																<input type="button" name="bDelete" value="删 除" onclick="return bDeleteClick('{/root/create/path}');" class="btn3_mouseout" nmouseover="this.className='btn3_mouseover'"
 onmouseout="this.className='btn3_mouseout'" onmousedown="this.className='btn3_mousedown'"  onmouseup="this.className='btn3_mouseup'"
 disabled="true"/>
															</td>															<td>
																<input type="button" name="bReset" value="重 置"   class="btn3_mouseout" nmouseover="this.className='btn3_mouseover'"
 onmouseout="this.className='btn3_mouseout'" onmousedown="this.className='btn3_mousedown'"  onmouseup="this.className='btn3_mouseup'"
 onclick="return bResetClick();" disabled="true"/>
															</td>
															<td>
																<input type="reset" name="bBack" value="返 回" class="btn3_mouseout" nmouseover="this.className='btn3_mouseover'"
 onmouseout="this.className='btn3_mouseout'" onmousedown="this.className='btn3_mousedown'"  onmouseup="this.className='btn3_mouseup'"
 onclick="return bBackClick('{/root/create/path}');" disabled="true"/>
															</td>															
														</tr>
													</table>
												</td>
											</tr>
										</table>

							</div>
							<div id="tabDutyInfo" style="display:none;">
							<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tab_info" id="tblDutyInfo">
								<tr>
									<td height="300" valign="top">
										<table width="100%" border="0" cellspacing="1" cellpadding="0" align="center" height="18">
											<tr>
												<td></td>
												</tr></table>

										<table border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
											<tr class="info">
												<td width="25%" class="tdfontstyle">序号</td>
												<td width="40%" class="tdfontstyle">组织机构</td>
												<td width="35%" class="tdfontstyle">担任职务</td>
											</tr>
	<SCRIPT language="JavaScript">
		document.write(strDutyInfo());
	</SCRIPT>
										</table>
									
							</td></tr></table>
							</div>
							<div id="tabRoleInfo" style="display:none;">
								<select style="display:none;" name="RoleKindList" class="dropdownStyle">
									<xsl:for-each select="RoleKindList/option">
									<option>
										<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
											<xsl:value-of select="caption"/>
									</option>
									</xsl:for-each>
								</select>
							<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="tab_info" id="tblRoleInfo">
								<tr>
									<td height="300" valign="top">
									<table width="100%" border="0" cellspacing="1" cellpadding="0" align="center" height="18">
											<tr>
												<td></td>
												</tr></table>
										<table  border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
											<tr class="info">
												<td width="10%"  class="tdfontstyle">选择</td>
												<td width="15%" class="tdfontstyle">组织机构</td>
												<td width="40%" class="tdfontstyle">职务</td>
												<td width="35%" class="tdfontstyle">角色</td>
											</tr>
											
	<SCRIPT language="JavaScript">
			document.write(strRoleInfo());
	</SCRIPT>
											<tr class="trmore">
												<td colspan="4" class="tdfontstyle">
													<table border="0" align="right" cellpadding="0" cellspacing="5" >
														<tr >
												<input type="button" name="bAdjust" value="角色调整"  onclick="bAdjustClick('{/root/create/path}');return false;" class="btn3_mouseout" 
 onmouseout="this.className='btn3_mouseout'" onmousedown="this.className='btn3_mousedown'"  onmouseup="this.className='btn3_mouseup'"/>										</tr>
 													</table>
												</td>
											</tr>
										</table>
									</td></tr></table>
							</div>							
						</td>
					</tr>
				</table>
				</form>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
