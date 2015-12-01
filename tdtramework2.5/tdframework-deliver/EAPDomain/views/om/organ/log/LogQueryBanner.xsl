<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/root/create">
<html>
<head>
	<title>logquerybanner</title>
	<LINK REL="stylesheet" HREF="{path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript" src="{path}/views/common/js/nas_check_no_null.js"></script>
	<script language="javascript" src="{path}/views/common/js/nas_enter_jump.js"></script>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_check_date.js"/>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_date_onkey.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_date_compare.js"></script>
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_calendar.js"></script> 	
	<script language="javascript" src="{/root/create/path}/views/common/js/nas_select_default.js"></script>
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
	function bQueryClick(webpath){
		var AreaId=myform.AreaId.value;
		var SystemId=myform.SystemId.value;
		var MenuId=myform.MenuId.value;
		//var PartMonth=myform.PartMonth.value;
		var BegTime=myform.BegTime.value;
		var EndTime=myform.EndTime.value;
		if(nas_check_no_null('系统标识',myform.SystemId,0)==false)
			return false;
		if(nas_check_no_null('功能',myform.MenuId,0)==false)
			return false;
		if(nas_check_no_null('开始时间',myform.BegTime,0)==false)
			return false;
		if(nas_check_no_null('结束时间',myform.EndTime,0)==false)
			return false;
		if (nas_check_date(myform.BegTime,10)==false)
			return false;
		if (nas_check_date(myform.EndTime,10)==false)
			return false;
		var result=nas_date_compare(myform.BegTime,myform.EndTime,'结束时间应该大于起始时间','','','');
		if (!result.status){
			alert (result.message);
			return false;
		}
		if (!nas_check_date_samemonth(BegTime,EndTime)){
			alert('开始时间和结束时间应在同一个月内');
			return false;
		}

		var link=webpath+"/om/LogQueryAction.do?AreaId="+AreaId+"&SystemId="+SystemId+"&MenuId="+MenuId+"&BegTime="+BegTime+"&EndTime="+EndTime+"&OperType=query"
		parent.logquerybottom.location.href=link;
		myform.bQuery.disabled=true;
	}
	function nas_check_date_samemonth(start_date,end_date){
		splitone='-';
		var start = start_date.split(splitone);
		var end = end_date.split(splitone);
		if (start[0]!=end[0])
			return false;
		if (start[1]!=end[1])
			return false;
		return true;
	}
	function init(){
		nas_select_default('myform','SystemId','create/SystemList/selected');	
	}
	
	]]>
	</xsl:comment>
	</script>
</head>
<body class="BODY" onload="init()" >
<form name="myform" method="post" action="">
<table align="center"  border="0" cellspacing="0" cellpadding="0" class="tab_line">
			<tr>
				<td width="5%" align="center" valign="top">
					<img src="{//path}/views/common/images/current2.gif" align="center" width="20" height="20"/>
				</td>
				<td  class="h14">日志查询</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="10"/>
			</tr>
		</table>
	<table  border="0" cellpadding="0" cellspacing="1"  class="tablebluemore" align="center">
		<tr class="trcolorT">
			<td class="tdlabelStyle" width="13%">
				区域
			</td>
			<td class="tdtextStyle">
				<select name="AreaId" onchange="nas_enter();" class="dropDownStyle">
					<xsl:for-each select="AreaList/option" >
						<option>
							<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
							<xsl:value-of select="caption"/>
						</option>
					</xsl:for-each>
				</select>
			</td>
			<td  class="tdlabelStyle" width="13%">
				系统标识
			</td>
			<td class="tdtextStyle">
				<select name="SystemId" onchange="nas_enter();" class="dropDownStyle"  onkeypress="" disabled="true">
					<xsl:for-each select="SystemList/option">
						<option>
							<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
							<xsl:value-of select="caption"/>
						</option>
              		</xsl:for-each>
				</select>
			</td>
            
			<td class="tdlabelStyle" width="13%">
				功能
			</td>
			
			<td class="tdtextStyle">
				<input type="text" name="MenuId" maxlength="16" onkeydown="nas_enter();" class="textStyle"/>
			</td>
			</tr>
				<tr class="trcolorT">
			<td class="tdlabelStyle" width="13%">
				开始时间
			</td>
			<td class="tdtextStyle">
				<input type="text" name="BegTime" maxlength="10" id="BegTime" class="textStyle" style="ime-mode:disabled" />
				<a href="javascript:showCalendar('BegTime','{/root/create/path}');">
					<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
				</a>
			</td>
			<td  class="tdlabelStyle" width="13%">
				结束时间
			</td>
			<td class="tdtextStyle">
				<input type="text" name="EndTime" maxlength="10" id="EndTime" class="textStyle" />
				<a href="javascript:showCalendar('EndTime','{/root/create/path}');">
					<img src="{/root/create/path}/views/common/images/calendar/cal.gif" width="16" height="16" border="0" />
				</a>
			</td>
			<td  colspan="2" align="center" >
				<input type="button" name="bQuery" value="查 询" class="btn3_mouseout" nmouseover="this.className='btn3_mouseover'"
 onmouseout="this.className='btn3_mouseout'" onmousedown="this.className='btn3_mousedown'"  onmouseup="this.className='btn3_mouseup'"
 onclick="bQueryClick('{path}')"/>
			</td>
		</tr>
	</table>
</form>
</body>
</html>	
</xsl:template>
</xsl:stylesheet>