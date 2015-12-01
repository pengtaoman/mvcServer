<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312" />
	<xsl:strip-space elements="*" />
	<xsl:template match="/">
		<html>

			<head>
				<title></title>
				<LINK REL="stylesheet" HREF="{root/create/path}/views/common/css/pubstyle.css" TYPE="text/css" />
				<link href="{root/create/path}/common/css/td_style.css" rel="stylesheet" type="text/css" />
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_select_default.js"></script>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_check_no_null.js"></script>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_check_no_null.js"></script>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_date_compare.js"></script>
				<script language="javascript" src="{/root/create/path}/views/common/js/date.js"></script>
				<script language="javascript" src="{/root/create/path}/views/common/js/nas_calendar.js"></script>
				<script language="javascript">
					<xsl:comment>
						<![CDATA[
function init(){
var arrayBtn=new Array(myform.bSubmit);
	
	nas_select_default('myform','OrganStatus','create/OrganStatus/selected');//组织机构状态
	nas_select_default('myform','AreaId','create/AreaList/selected');//所属区域
	nas_select_default('myform','InnerDuty','create/InnerDuty/selected');//是否内部组织机构
	nas_select_default('myform','OrganKind','create/OrganKind/selected');//组织机构类型
	nas_select_default('myform','dutyParent','create/DutyOrganId');
	nas_select_default('myform','ParentOrganId','create/OrganList/selected');
	

	//不允许交互操作
	for (var i=0;i<myform.length;i++){
		myform[i].disabled=true;
	}
	//日期控件不显示
	document.all['ActiveDateImg'].style.display="none";
	document.all['InactiveDateImg'].style.display="none";
	document.getElementById('bReload').disabled = false;
	document.getElementById('bSubmit').disabled = false;
	
	parent.organmainbuttons.document.getElementById('main').style.display='';
	parent.organmainbuttons.document.getElementById('tail').style.display='none';
	
}

function nas_select_value(selObj,strValue){
	for (var i=0;i<selObj.length;i++){
		if (selObj[i].value==strValue){
			selObj[i].selected=true;
			return;
		}
	}
}

function checkOrganName(strValue){
	if (strValue.length>0)
		myform.bSubmit.disabled=false;
}
function bSubmitClick(webPath)
	{
	//校验
	CurrentSelectOrganId=parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
	CurrentSelectBelongArea=parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
	if (CurrentSelectOrganId.length==0||CurrentSelectBelongArea==0){
		alert ('您必须选中某一节点进行操作');
		return ;
	}
	OrganName=document.myform.OrganName.value;//组织机构名称
	if(nas_check_no_null('组织机构名称',myform.OrganName,0)==false)
	  return;
	 
	var comResult=nas_date_compare(myform.ActiveDate,myform.InactiveDate,'失效日期应大于生效日期')
	if(comResult.status==false){
			alert (comResult.message);
			return;
	}
	//写值
		document.addIframe.document.myform.OperType.value="modify";
	//	document.addIframe.document.myform.OrganId.value="";
		document.addIframe.document.myform.OrganName.value=OrganName;
		document.addIframe.document.myform.priOrganName.value=OrganName;
		document.addIframe.document.myform.OrganId.value=document.myform.OrganId.value;
		document.addIframe.document.myform.OrganStatus.value=document.myform.OrganStatus.value;
		document.addIframe.document.myform.OrganKind.value = document.myform.OrganKind.value;
		//上级组织机构
		document.addIframe.document.myform.ParentOrganId.value = document.myform.ParentOrganId.value;
		document.addIframe.document.myform.dutyParent.value = document.myform.dutyParent.value;
		//所属地市
		document.addIframe.document.myform.AreaId.value = CurrentSelectBelongArea;
		document.addIframe.document.myform.InnerDuty.value = document.myform.InnerDuty.value;
		document.addIframe.document.myform.Principal.value = document.myform.Principal.value;	
		document.addIframe.document.myform.ActiveDate.value = document.myform.ActiveDate.value;			
		document.addIframe.document.myform.InactiveDate.value = document.myform.InactiveDate.value;
		document.addIframe.document.myform.OrganDesc.value = document.myform.OrganDesc.value;
		document.addIframe.document.myform.order.value = document.myform.order.value;
		document.addIframe.document.myform.target = "_self";
		//alert(document.addIframe.document.myform.OperType.value);
		document.addIframe.document.myform.action = webPath + "/om/OrganMaintanceAction.do";
		document.addIframe.document.myform.submit();
	}
	
	function doReload()
	{
		myform.reset();
		init();
	}
  ]]>
					</xsl:comment>
				</script>
			</head>
			<body onload="init()" class="mainbody">
				<IFRAME id="CalFrame" style="DISPLAY: none; Z-INDEX: 9; WIDTH: 148px; POSITION: absolute;visibility:inherit;filter='progid:DXImageTransform.Microsoft.Alphastyle=0,opacity=0'; HEIGHT: 194px;" marginWidth="0" marginHeight="0"
					src="{/root/create/path}/views/common/htm/calendar.htm" frameBorder="0" scrolling="no">
				</IFRAME>
				<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
					<tr class="tableTitleTR2">
						<td colspan="3" >
						<table width="100%" border="0" cellpadding="0" cellspacing="0" >
			                <tr>
							<td class="tableTitleLeft2" >&#160;</td>
							<td class="tableTitle2">组织机构信息</td>
							<td class="tableTitleRight2" >&#160;</td>
							</tr>
						 </table>
						 </td>
					</tr>
					<tr>
						<td class="formTableL">&#160;</td>
						<td class="formTableC">
							<form method="POST" name="myform" action="">
								<xsl:apply-templates select="root/create" />
							</form>
						</td>
						<td class="formTableR">&#160;</td>
					</tr>
					<tr>
						<td class="formTableLB">&#160;</td>
						<td class="formTableB">&#160;</td>
						<td class="formTableRB">&#160;</td>
					</tr>
				</table>
				<iframe name="addIframe" id="addIframe" FRAMEBORDER="0" SCROLLING="yes" marginwidth="0" marginheight="0" height="100" allowtransparency="ture" src="{//create/path}/views/om/organ/organ/OrganMaintanceHidden.jsp" />
			</body>
		</html>
	</xsl:template>

	<xsl:template match="root/create">

		<table width="100%" border="0" cellpadding="0" cellspacing="0" class="formTableCore">
			<tr>
				<td class="formLabel">组织机构编号</td>
				<td class="formField">
					<input type="text" name="OrganId" class="textfield" maxlength="32"  onkeypress="" disabled="true" value="{Organ/OrganId}"></input>
				</td>
				<td class="formLabel">组织机构名称*</td>
				<td class="formField">
					<input type="text" name="OrganName" class="textfield" maxlength="32" onkeypress="checkOrganName(this.value);" value="{Organ/OrganName}" />
					<input type="hidden"  name="priOrganName" class="textfield" maxlength="32"  value="{Organ/OrganName}" />
				</td>
			</tr>
			<tr style="display: none">
				<td class="formLabel">组织机构状态</td>
				<td class="formField" colspan="1">
					<select class="listTableRowSelected" name="OrganStatus" onChange=""  tabindex="1" onkeypress="">
						<xsl:for-each select="//create/OrganStatus/option">
							<option value="{value}">
								<xsl:value-of select="caption" />
							</option>
						</xsl:for-each>
					</select>
				</td>
				<td class="tdType"></td>
				<td class="tdType2" colspan="1"></td>
			</tr>
			<tr>
				<td class="formLabel">组织机构类型</td>
				<td class="formField">
					<select class="listTableRowSelected" name="OrganKind" onChange="" tabindex="1" onkeypress="">
						<xsl:for-each select="//create/OrganKind/option">
							<option value="{value}">
								<xsl:value-of select="caption" />
							</option>
						</xsl:for-each>
					</select>
				</td>
				<td class="formLabel">是否内部组织机构</td>
				<td class="formField" colspan="1">
					<select class="listTableRowSelected" name="InnerDuty" onChange="" tabindex="1" onkeypress="">
						<xsl:for-each select="//create/InnerDuty/option">
							<option value="{value}">
								<xsl:value-of select="caption" />
							</option>
						</xsl:for-each>
					</select>
				</td>
			</tr>
			<tr>
				<td class="formLabel">所属区域</td>
				<td class="formField">
					<select name="AreaId" class="listTableRowSelected">
						<option />
						<xsl:for-each select="AreaList/option">
							<option>
								<xsl:attribute name="value">
									<xsl:value-of select="value" />
								</xsl:attribute>
								<xsl:value-of select="caption" />
							</option>
						</xsl:for-each>
					</select>
				</td>
				<td class="formLabel">上级组织机构</td>
				<td class="formField">
					<select name="ParentOrganId" class="listTableRowSelected">
						<option />
						<xsl:for-each select="OrganList/option">
							<option>
								<xsl:attribute name="value">
									<xsl:value-of select="value" />
								</xsl:attribute>
								<xsl:value-of select="caption" />
							</option>
						</xsl:for-each>
					</select>
				</td>
			</tr>
			<tr>
				<td class="formLabel">负责人</td>
				<td class="formField" >
					<input type="text" class="textfield" name="Principal" maxlength="32" value="{Organ/Principal}" />
				</td>
				<td class="formLabel">顺序</td>
				<td class="formField">
					<input type="text" class="textfield" name="order" maxlength="32" value="{Organ/order}" />
				</td>
			</tr>
			<tr style="display: none">
				<td class="formLabel">生效日期</td>
				<td class="formField">
					<input type="text" readonly="true" class="textfield" name="ActiveDate" id="ActiveDate" maxlength="32" onkeypress="" value="{Organ/ActiveDate}" />
					<A onclick="event.cancelBubble=true;" href="javascript:showCalendar('ActiveDate','{/root/create/path}');">
						<img id="ActiveDateImg" src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
					</A>

				</td>
				<td class="formLabel">失效日期</td>
				<td class="formField">
					<input type="text" readonly="true" class="textStyle" name="InactiveDate" id="InactiveDate" maxlength="32" onkeypress="" value="{Organ/InactiveDate}" />
					<A onclick="event.cancelBubble=true;" href="javascript:showCalendar('InactiveDate','{/root/create/path}');">
						<img id="InactiveDateImg" src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
					</A>

				</td>
			</tr>
			<tr>
				<td align="left" class="formLabel" >职能归属&#160;&#160;</td>
				<td align="left" class="formField" >
					<select name="dutyParent" class="listTableRowSelected">
						<option/>
							<xsl:for-each select="DutyOrganList/option">
							<option>
								<xsl:attribute name="value">
									<xsl:value-of select="value"/>
								</xsl:attribute>
								<xsl:value-of select="caption"/>
							</option>
							</xsl:for-each>
					</select>
				</td>
				<td class="formLabel">详细描述&#160;&#160;</td>
				<td class="formField">
					<input type="text" class="textType1" name="OrganDesc" maxlength="32" onkeypress="" value="{Organ/OrganDesc}" />
				</td>
			</tr>
			<tr class="trType" style="display:none;">
				<td colspan="4" align="right">
					<input type="button" id="bReload" name="bReload" value="返回" class="button2" onclick="doReload();" />
					<input type="button" name="bSubmit" value="提交修改" class="button2" onclick="bSubmitClick('{//create/path}');return false;" />
					<xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
				</td>
			</tr>
		</table>
	</xsl:template>
</xsl:stylesheet>
