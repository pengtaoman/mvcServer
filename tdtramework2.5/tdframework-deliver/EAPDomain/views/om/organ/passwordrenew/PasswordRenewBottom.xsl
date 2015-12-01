<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
	<xsl:strip-space elements="*"/>
	<xsl:template match="/">
		<html>
			<head>
				<title>employee</title>
	<LINK REL="stylesheet" HREF="{root/create/path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_select_default.js"></script>
<SCRIPT language="JavaScript">
				<xsl:comment>
				<![CDATA[
//下面的函数销售模块使用
//根据一个列表框的变化来决定另一个列表框显示的内容
//参数:obj1-调用该函数的列表，
//     obj2-根据obj1的变化而变化的列表，
//     obj3-存储obj2所有值的隐藏域，格式为：obj1Value:obj2Value:obj2Text`obj1Value:obj2Value:obj2Text....
function changeRelationSelect3(obj1,obj2,obj3,selectedValue){
  if (obj1.selectedIndex<=0) return;
  //先将关联的列表清空
  obj2.innerHTML = null;

  //获取变化源的值
  var srcValue = obj1[obj1.selectedIndex].title;
//  alert (srcValue);
//  获取相关的所有的值
  var allValue = obj3.value;
  //将值转换成数组，格式为obj1Value:obj2Value:obj2Text
  var allArray = new Array();
  allArray = allValue.split('`');
  var length = allArray.length;
  var obj2Array = new Array();
  for(var i=0;i<length;i++){
    obj2Array = new Array();
    obj2Array = allArray[i].split(':');
//	alert (obj2Array[0]+'\n'+srcValue);
     if(obj2Array[0]==srcValue){
        newOpt=document.createElement("OPTION")
        newOpt.value=obj2Array[1];
        newOpt.text=obj2Array[2];
        obj2.add(newOpt);
          if(selectedValue==obj2Array[1]){
            newOpt.selected = true;
          }
      }
  }
}        
function init(webPath){
		nas_select_default('myform','AreaId','create/EmployeeInfo/AreaId');		
		nas_select_default('myform','BusDutyId','create/BusDuty/selected');
		nas_select_default('myform','DutyId','create/Duty/selected');	
		nas_select_default('myform','Gender','create/Gender/selected');
		nas_select_default('myform','EducateLevel','create/EducateLevel/selected');
		nas_select_default('myform','MarriageStatus','create/MarriageStatus/selected');
		nas_select_default('myform','Income','create/Income/selected');	
		nas_select_default('myform','InnerEmployee','create/InnerEmployee/selected');
		nas_select_default('myform','ParentEmployee','create/ParentEmployee/selected');
		nas_select_default('myform','OrganId','create/Organ/selected');
       //changeRelationSelect3(document.myform.OrganId,document.myform.DutyId,document.myform.hDutyId,"");
	
	if (myform.queryFlag.value != 1){
		parent.banner.myform.bResetPwd.disabled = true;
		this.location.href = webPath+"/views/om/blank.html";
	}else{
		parent.banner.myform.bResetPwd.disabled = false;
	}
	for (var i=0;i<myform.length;i++){
		myform[i].disabled=true;
	}
	if (myform.message.value!=''){
		alert (myform.message.value);
	}
	
}
				]]>
				</xsl:comment>
				</SCRIPT>
			</head>
			<body class="BODY" leftmargin="0" topmargin="0" onload="init('{root/create/path}');">
	<form action="" method="post" name="myform">
				<input type="hidden" value="{root/create/Message}" name="message"/>
				<input type="hidden" value="{root/create/OperType}" name="queryType"/>
				<input type="hidden" value="{root/create/OperFlag}" name="queryFlag"/>
				<xsl:apply-templates select="root/create"/>
				</form>
			</body>
		</html>
	</xsl:template>
<xsl:template match="root/create">
					<table width="93%" border="0" align="center" cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<div id="tabBasicInfo">
									<table border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
										<tr class="trcolorT">
											<td width="17%" class="tdlabelStyle">职员编码 *</td>
											<td class="tdtextStyle">
												<input type="text" name="EmployeeId" maxlength="32" size="20" class="textStyle" value="不填															写">
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/EmployeeId"/>															</xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">姓名 *</td>
											<td class="tdtextStyle">
												<input type="text" name="EmployeeName" class="textStyle" maxlength="32" size="20" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/EmployeeName"/>														</xsl:attribute>
												</input>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td width="17%" class="tdlabelStyle" height="21">职位 *</td>
											<td class="tdtextStyle">
												<select name="BusDutyId" class="dropdownStyle" >
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
												<select name="AreaId" class="dropdownStyle"  disabled="true">
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
										<tr  class="trcolorT">
											<td width="17%" class="tdlabelStyle">组织机构 *</td>
											<td class="tdtextStyle">
												<select name="OrganId" class="dropdownStyle"  onchange="changeOrganId();">
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
												<select name="DutyId" class="dropdownStyle" >
													<option/>
													<xsl:for-each select="Duty/option">
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
												<input type="hidden" name="hDutyId" value="{OrganKindDutyStr}"/>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td width="17%" class="tdlabelStyle">上级主管</td>
											<td class="tdtextStyle">
												<select name="ParentEmployee" class="dropdownStyle" >
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
												<input type="text" name="WorkNo" maxlength="32" class="textStyle" size="20" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/WorkNo"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%" class="tdlabelStyle">密码 *</td>
											<td class="tdtextStyle">
												<input name="WorkPwd" type="password" class="textStyle" value="helloworld" size="15" >
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">确认密码 *</td>
											<td class="tdtextStyle">
												<input name="WorkPwdConfirm" type="password" value="helloworld" class="textStyle" size="15" >
												</input>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td width="17%" class="tdlabelStyle">账号失效日期</td>
											<td class="tdtextStyle">
												<input type="text" name="InactiveDate" maxlength="10" size="20" class="textStyle" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/InactiveDate"/>													</xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">密码失效日期</td>
											<td class="tdtextStyle">
												<input type="text" name="InactivePwdDate" maxlength="10" size="20" class="textStyle" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/InactivePwdDate"/>														</xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%" class="tdlabelStyle">是否内部员工</td>
											<td class="tdtextStyle">
												<select name="InnerEmployee" class="dropdownStyle" >
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
												<select name="EducateLevel" class="dropdownStyle" >
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
											<td width="17%" class="tdlabelStyle" height="22">性别</td>
											<td class="tdtextStyle">
												<select name="Gender" class="dropdownStyle" >
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
												<input type="text" name="Birthday" maxlength="10" size="20" class="textStyle" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/Birthday"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%" class="tdlabelStyle">薪资范围</td>
											<td class="tdtextStyle">
												<select name="Income" class="dropdownStyle" >
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
												<select name="MarriageStatus" class="dropdownStyle" >
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
											<td width="17%" class="tdlabelStyle">入职日期</td>
											<td class="tdtextStyle">
												<input type="text" name="HiredDate" maxlength="10" size="20" class="textStyle" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/HiredDate"/>															</xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">转正日期</td>
											<td class="tdtextStyle">
												<input type="text" name="ContractDate" maxlength="10" size="20" class="textStyle" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/ResignedDate"/>														</xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%" class="tdlabelStyle">辞职日期</td>
											<td class="tdtextStyle">
												<input type="text" name="ResignedDate" maxlength="10" size="20" class="textStyle">
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/ResignedDate"/>														</xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">变更日期</td>
											<td class="tdtextStyle">
												<input type="text" name="UpdateDate" maxlength="10" size="20" class="textStyle">
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/UpdateDate"/>															</xsl:attribute>
												</input>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td width="17%" class="tdlabelStyle">登陆IP</td>
											<td class="tdtextStyle">
												<input type="text" name="LoginIp" maxlength="32" size="20" class="textStyle" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/ResignedDate"/>														</xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">MAC地址</td>
											<td class="tdtextStyle">
												<input type="text" name="Mac" maxlength="32" size="20"  class="textStyle">
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/Mac"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td class="tdlabelStyle">移动电话</td>
											<td class="tdtextStyle">
												<input type="text" name="Mobile" maxlength="15" size="20" class="textStyle" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/Mobile"/></xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">电子邮件</td>
											<td class="tdtextStyle">
												<input type="text" name="Email" maxlength="40" size="20" class="textStyle" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/Email"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr  class="trcolorT">
											<td class="tdlabelStyle">办公电话</td>
											<td class="tdtextStyle">
												<input type="text" name="WorkTelephone" class="textStyle" maxlength="15" size="20" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/WorkTelephone"/>														</xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle">传真</td>
											<td class="tdtextStyle">
												<input type="text" name="Fax" class="textStyle" maxlength="15" size="20" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/Fax"/></xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td class="tdlabelStyle">家庭电话</td>
											<td class="tdtextStyle">
												<input type="text" class="textStyle" name="HoneTelephone" maxlength="15" size="20" >
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/HoneTelephone"/>														</xsl:attribute>
												</input>
											</td>
											<td width="17%" class="tdlabelStyle"/>
											<td/>
										</tr>
										<tr  class="trcolorT">
											<td width="17%" class="tdlabelStyle">办公地址</td>
											<td colspan="3" class="tdtextStyle">
												<input type="text" name="WorkAddress" maxlength="256"  class="longtextStyle">
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/WorkAddress"/>														</xsl:attribute>
												</input>
											</td>
										</tr>
										<tr class="trcolorT">
											<td width="17%" class="tdlabelStyle">家庭地址</td>
											<td colspan="3" class="tdtextStyle">
												<input type="text" name="HomeAddress" maxlength="256" class="longtextStyle">
													<xsl:attribute name="value"><xsl:value-of select="EmployeeInfo/HomeAddress"/>														</xsl:attribute>
												</input>
											</td>
										</tr>
										</table>
							</div>
						</td>
					</tr>
				</table>
	</xsl:template>
</xsl:stylesheet>
