<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/root">
<html>
<head>
	<title>职务功能信息</title>
	<LINK REL="stylesheet" HREF="{/root/path}/views/common/css/crm_style.css" TYPE="text/css"/>	
	<script language="javascript" src="{/root/path}/views/common/js/nas_trim.js"></script>
	<script language="javascript" src="{root/path}/{root/actionJS}"></script>
	<script language="javascript" src="{root/path}/views/om/organ/menu/common.js"></script>
	<script language="javascript" src="{root/path}/views/om/organ/menu/mouseAction.js"></script>
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
	
//把Exec里面functionid为ckbId的checkbox设置为选中
function setExec(ckbId){
	var obj=formExec.all.tags("input");
	for(var i=0;i<obj.length;i++)
		if (obj[i].functionid==ckbId)
			obj[i].checked=true;
}

//根据strValue设置checkBox
function bResetClick(strValue){
alert("strValue = "+strValue);
	//if (strValue=='') return ;//初始没有值;
	var tmpValue=false;
	setCheckBox(tmpValue);
	var myArray=strValue.split(';');
	var tempArray;
	for (var i=0;i<myArray.length;i++){
		if (myArray[i]!=''){	
			setExec(myArray[i]);
		}
	}
}
//获取当前整个串的值
function getFuncStr(){
		var funcStr='';
		var execObj,temp;
		var execCheckBox=formExec.all.tags("input");
		
		for(var i=0;i<execCheckBox.length;i++){
			execObj=execCheckBox[i];			
			if (execObj.type=='checkbox') {
				if (execObj.checked && typeof(execObj.sysId) == 'undefined'){
					funcStr=funcStr+execObj.functionid + ";";
				}
			}
		}
	return funcStr;
}

		function selectAll(){
			var len=document.formExec.elements.length;
			var i;
		    for (i=0;i<len;i++){
			if (document.formExec.elements[i].type=="checkbox"){
		        document.formExec.elements[i].checked=true;								
						 }
					}
				}
		
			function selectReset(){
			var len=document.formExec.elements.length;
			var i;
		    for (i=0;i<len;i++){
			if (document.formExec.elements[i].type=="checkbox"){
		        document.formExec.elements[i].checked=false;								
						 }
					}
				}

		function CheckSelectValue(v)
		{
			if (v==true)
			{
				selectAll();
			}
			else
			{
				selectReset();
			}
		
		}



function setCheckBox(val){
		var funcStr='';
		var execObj,temp;
		var execCheckBox=formExec.all.tags("input");
		for(var i=0;i<execCheckBox.length;i++){
			execObj=execCheckBox[i];
			if (typeof(execObj)=='object'){
				execObj.checked=val;
			}
		}
}
	]]>
	</xsl:comment>
	</script>
</head>
<body class="BODY" onload="init('{/root/FuncExec/AllSelect}');">
		<form name="formExec">
		<input type="hidden" name="selectedFun"/>
		<xsl:apply-templates select="FuncExec/MainMenu"/>

		<input type="checkbox" name="execSelectAll" onclick="CheckSelectValue(this.checked);"/>

		<input type="button" name="bExecSelectAll" value="全部选中" class="btn3_mouseout" nmouseover="this.className='btn3_mouseover'"
 onmouseout="this.className='btn3_mouseout'" onmousedown="this.className='btn3_mousedown'"  onmouseup="this.className='btn3_mouseup'"  onclick="selectAll();;"></input>
		<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
<!--		
		<input type="checkbox" name="execFolderOff" onclick="bExecFolderAllOffClick(this.checked,'{/root/path}');" />
		<input type="button" name="bExecFolderAllOff" value="全部折叠" onclick="bExecFolderAllOffClick(formExec.execFolderOff.checked,'{/root/path}');"></input>
-->		
		<input type="button" name="bReset" value="重 置" class="btn1_mouseout" nmouseover="this.className='btn1_mouseover'"
 onmouseout="this.className='btn1_mouseout'" onmousedown="this.className='btn1_mousedown'"  onmouseup="this.className='btn1_mouseup'" onclick="bResetClick('{/root/FuncExec/AllSelect}')"></input>
 <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
		<input type="button" name="bModify" value="修 改" class="btn1_mouseout" nmouseover="this.className='btn1_mouseover'"
 onmouseout="this.className='btn1_mouseout'" onmousedown="this.className='btn1_mousedown'"  onmouseup="this.className='btn1_mouseup'" onclick="bModifyClick('{/root/path}');"></input>
		<input type="hidden" name="strSelected" value="'{/root/FuncExec/AllSelect}'"/>
		
		</form>
		<form name="submitForm" method="post">
			<input type="hidden" name="operType"/>
			<input type="hidden" name="dutyId" value="{root/dutyId}"/>
			<input type="hidden" name="roleId" value="{root/roleId}"/>
			<input type="hidden" name="selectedMenuList"/>
			<input type="hidden" name="addMenuList"/>
			<input type="hidden" name="delMenuList"/>
		</form>
</body>
</html>	
</xsl:template>

<!--ExecFunc-->
<xsl:template match="FuncExec/MainMenu">
	<div style="display:block">
		<IMG src="{/root/path}/views/common/images/close.gif" CLASS="OutLine" STYLE="cursor:hand" onclick="imageExecClick(this,'{/root/path}');">
			<xsl:attribute name="id"><xsl:value-of select="ID"/>_imgE</xsl:attribute>
		</IMG>
		<input type="checkbox" name="ckbExec{ID}" sysId="1">
			<xsl:if test="Selected='true'">
				<xsl:attribute name="checked"/>
			</xsl:if>
			<xsl:attribute name="onclick">checkboxEvent(this)</xsl:attribute>
			<xsl:attribute name="functionid"><xsl:value-of select="FunctionID"/></xsl:attribute>
			<xsl:attribute name="ifSun"><xsl:value-of select="IfSun"/></xsl:attribute>
			<xsl:attribute name="number"><xsl:value-of select="Number"/></xsl:attribute>
			<xsl:attribute name="sysnumber"><xsl:value-of select="SysNumber"/></xsl:attribute>
		</input>
		<span class="First" STYLE="cursor:hand;color:#000000" onClick="imageExecClick(this,'{/root/path}');">
			<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
			<xsl:value-of select="Name"/>
		</span>
		<xsl:apply-templates select="Level1"/>
	</div>
</xsl:template>
	<!-- 显示第一层数据-->
	<xsl:template match="FuncExec/MainMenu/Level1">
		<DIV style="display:none;">
			<xsl:attribute name="id"><xsl:value-of select="ParentID"/>E</xsl:attribute>
			<xsl:apply-templates select="Sub1"/>
		</DIV>
	</xsl:template>
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1">
		<!-- 第一层数据有子选项的数据-->
		<xsl:if test="IfSun='true'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="{/root/path}/views/common/images/spacer.gif" align="left" width="8" height="1"/>
						<IMG src="{/root/path}/views/common/images/close.gif" CLASS="OutLine" STYLE="cursor:hand" onclick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_imgE</xsl:attribute>
							<xsl:attribute name="ifsun"><xsl:value-of select="IfSun"/></xsl:attribute>
						</IMG>
						<input type="checkbox">
							<xsl:if test="Selected='true'">
								<xsl:attribute name="checked"/>
							</xsl:if>
							<xsl:attribute name="name">ckbExec<xsl:value-of select="ID"/></xsl:attribute>
							<xsl:attribute name="functionid"><xsl:value-of select="FunctionID"/></xsl:attribute>
							<xsl:attribute name="ifSun"><xsl:value-of select="IfSun"/></xsl:attribute>
							<xsl:attribute name="number"><xsl:value-of select="Number"/></xsl:attribute>
							<xsl:attribute name="sysnumber"><xsl:value-of select="SysNumber"/></xsl:attribute>
						</input>
						<span align="left" class="First" STYLE="cursor:hand;color:#000000" onClick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
			<xsl:apply-templates select="Level2"/>
		</xsl:if>
		<!-- 第一层数据没有子选项的数据-->
		<xsl:if test="IfSun='false'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="{/root/path}/views/common/images/spacer.gif" align="left" width="24" height="1"/>
						<input type="checkbox">
							<xsl:if test="Selected='true'">
								<xsl:attribute name="checked"/>
							</xsl:if>
							<xsl:attribute name="name">ckbExec<xsl:value-of select="ID"/></xsl:attribute>
							<xsl:attribute name="functionid"><xsl:value-of select="FunctionID"/></xsl:attribute>
							<xsl:attribute name="ifSun"><xsl:value-of select="IfSun"/></xsl:attribute>
							<xsl:attribute name="number"><xsl:value-of select="Number"/></xsl:attribute>
							<xsl:attribute name="sysnumber"><xsl:value-of select="SysNumber"/></xsl:attribute>
						</input>
						<span align="left" class="First">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
		</xsl:if>
	</xsl:template>
	<!-- 显示第二层数据-->
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2">
		<DIV style="display:none;">
			<xsl:attribute name="id"><xsl:value-of select="ParentID"/>E</xsl:attribute>
			<xsl:apply-templates select="Sub2"/>
		</DIV>
	</xsl:template>
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2/Sub2">
		<!-- 第二层数据有子选项的数据-->
		<xsl:if test="IfSun='true'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="{/root/path}/views/common/images/spacer.gif" align="left" width="36" height="1"/>
						<IMG src="{/root/path}/views/common/images/close.gif" CLASS="OutLine" STYLE="cursor:hand" onClick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_imgE</xsl:attribute>
							<xsl:attribute name="ifsun"><xsl:value-of select="IfSun"/></xsl:attribute>
						</IMG>
						<input type="checkbox">
							<xsl:if test="Selected='true'">
								<xsl:attribute name="checked"/>
							</xsl:if>
							<xsl:attribute name="name">ckbExec<xsl:value-of select="ID"/></xsl:attribute>
							<xsl:attribute name="functionid"><xsl:value-of select="FunctionID"/></xsl:attribute>
							<xsl:attribute name="ifSun"><xsl:value-of select="IfSun"/></xsl:attribute>
							<xsl:attribute name="number"><xsl:value-of select="Number"/></xsl:attribute>
							<xsl:attribute name="sysnumber"><xsl:value-of select="SysNumber"/></xsl:attribute>
						</input>
						<span align="left" class="First" STYLE="cursor:hand;color:#000000" onClick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
			<xsl:apply-templates select="Level3"/>
		</xsl:if>
		<!-- 第二层数据没有子选项的数据-->
		<xsl:if test="IfSun='false'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="{/root/path}/views/common/images/spacer.gif" align="left" width="52" height="1"/>
						<input type="checkbox">
							<xsl:if test="Selected='true'">
								<xsl:attribute name="checked"/>
							</xsl:if>
							<xsl:attribute name="name">ckbExec<xsl:value-of select="ID"/></xsl:attribute>
							<xsl:attribute name="functionid"><xsl:value-of select="FunctionID"/></xsl:attribute>
							<xsl:attribute name="ifSun"><xsl:value-of select="IfSun"/></xsl:attribute>
							<xsl:attribute name="number"><xsl:value-of select="Number"/></xsl:attribute>
							<xsl:attribute name="sysnumber"><xsl:value-of select="SysNumber"/></xsl:attribute>
						</input>
						<span align="left" class="First">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
		</xsl:if>
	</xsl:template>
	<!-- 显示第三层数据-->
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2/Sub2/Level3">
		<DIV style="display:none;">
			<xsl:attribute name="id"><xsl:value-of select="ParentID"/>E</xsl:attribute>
			<xsl:apply-templates select="Sub3"/>
		</DIV>
	</xsl:template>
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2/Sub2/Level3/Sub3">
		<!-- 第三层数据有子选项的数据-->
		<xsl:if test="IfSun='true'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="{/root/path}/views/common/images/spacer.gif" align="left" width="60" height="1"/>
						<IMG src="{/root/path}/views/common/images/close.gif" CLASS="OutLine" STYLE="cursor:hand" onCLick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_imgE</xsl:attribute>
							<xsl:attribute name="ifsun"><xsl:value-of select="IfSun"/></xsl:attribute>
						</IMG>
						<input type="checkbox">
							<xsl:if test="Selected='true'">
								<xsl:attribute name="checked"/>
							</xsl:if>
							<xsl:attribute name="name">ckbExec<xsl:value-of select="ID"/></xsl:attribute>
							<xsl:attribute name="functionid"><xsl:value-of select="FunctionID"/></xsl:attribute>
							<xsl:attribute name="ifSun"><xsl:value-of select="IfSun"/></xsl:attribute>
							<xsl:attribute name="number"><xsl:value-of select="Number"/></xsl:attribute>
							<xsl:attribute name="sysnumber"><xsl:value-of select="SysNumber"/></xsl:attribute>
						</input>
						<span align="left" class="First" STYLE="cursor:hand;color:#000000" onClick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
			<xsl:apply-templates select="Level4"/>
		</xsl:if>
		<!-- 第三层数据没有子选项的数据-->
		<xsl:if test="IfSun='false'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="{/root/path}/views/common/images/spacer.gif" align="left" width="76" height="1"/>
						<input type="checkbox">
							<xsl:if test="Selected='true'">
								<xsl:attribute name="checked"/>
							</xsl:if>
							<xsl:attribute name="name">ckbExec<xsl:value-of select="ID"/></xsl:attribute>
							<xsl:attribute name="functionid"><xsl:value-of select="FunctionID"/></xsl:attribute>
							<xsl:attribute name="ifSun"><xsl:value-of select="IfSun"/></xsl:attribute>
							<xsl:attribute name="number"><xsl:value-of select="Number"/></xsl:attribute>
							<xsl:attribute name="sysnumber"><xsl:value-of select="SysNumber"/></xsl:attribute>
						</input>
						<span align="left" class="First">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
		</xsl:if>
	</xsl:template>
	<!-- 显示第四层数据-->
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2/Sub2/Level3/Sub3/Level4">
		<DIV style="display:none;">
			<xsl:attribute name="id"><xsl:value-of select="ParentID"/>E</xsl:attribute>
			<xsl:apply-templates select="Sub4"/>
		</DIV>
	</xsl:template>
	<xsl:template match="FuncExec/MainMenu/Level1/Sub1/Level2/Sub2/Level3/Sub3/Level4/Sub4">
		<!-- 第四层数据有子选项的数据-->
		<xsl:if test="IfSun='true'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="{/root/path}/views/common/images/spacer.gif" align="left" width="92" height="1"/>
						<IMG src="{/root/path}/views/common/images/close.gif" CLASS="OutLine" STYLE="cursor:hand" onClick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_imgE</xsl:attribute>
							<xsl:attribute name="ifsun"><xsl:value-of select="IfSun"/></xsl:attribute>
						</IMG>
						<input type="checkbox">
							<xsl:if test="Selected='true'">
								<xsl:attribute name="checked"/>
							</xsl:if>
							<xsl:attribute name="name">ckbExec<xsl:value-of select="ID"/></xsl:attribute>
							<xsl:attribute name="functionid"><xsl:value-of select="FunctionID"/></xsl:attribute>
							<xsl:attribute name="ifSun"><xsl:value-of select="IfSun"/></xsl:attribute>
							<xsl:attribute name="number"><xsl:value-of select="Number"/></xsl:attribute>
							<xsl:attribute name="sysnumber"><xsl:value-of select="SysNumber"/></xsl:attribute>
						</input>
						<span align="left" class="First" STYLE="cursor:hand;color:#000000" onClick="imageExecClick(this,'{/root/path}');">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
			<xsl:apply-templates select="Level5"/>
		</xsl:if>
		<!-- 第四层数据没有子选项的数据-->
		<xsl:if test="IfSun='false'">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr width="100%">
					<td align="left">
						<img src="{/root/path}/views/common/images/spacer.gif" align="left" width="110" height="1"/>
						<input type="checkbox">
							<xsl:if test="Selected='true'">
								<xsl:attribute name="checked"/>
							</xsl:if>
							<xsl:attribute name="name">ckbExec<xsl:value-of select="ID"/></xsl:attribute>
							<xsl:attribute name="functionid"><xsl:value-of select="FunctionID"/></xsl:attribute>
							<xsl:attribute name="ifSun"><xsl:value-of select="IfSun"/></xsl:attribute>
							<xsl:attribute name="number"><xsl:value-of select="Number"/></xsl:attribute>
							<xsl:attribute name="sysnumber"><xsl:value-of select="SysNumber"/></xsl:attribute>
						</input>
						<span align="left" class="First">
							<xsl:attribute name="id"><xsl:value-of select="ID"/>_spnE</xsl:attribute>
							<xsl:value-of select="Name"/>
						</span>
					</td>
				</tr>
			</table>
		</xsl:if>
	</xsl:template>
	
	</xsl:stylesheet>
	