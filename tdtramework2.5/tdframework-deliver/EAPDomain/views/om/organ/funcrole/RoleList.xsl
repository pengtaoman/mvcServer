<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
<head>
<title>角色列表</title>
<LINK REL="stylesheet" HREF="{/root/path}/views/common/css/crm_style.css" TYPE="text/css"/>
<script language="javascript">
<xsl:comment><![CDATA[
//页面初始化
function commonInit(alertMessage) {
	if(alertMessage!=null && alertMessage!="")
		alert(alertMessage);
}

//选择一行数据,给隐含变量赋值
function selectRoleId(roleId,ifModify) {
	if(ifModify){//设置不允许删除和修改
		document.myform.bDelete.disabled = false;
		document.myform.bModify.disabled = false;
	}else{
		document.myform.bDelete.disabled = true;
		document.myform.bModify.disabled = true;
	}
	document.myform.selectedRoleId.value=roleId;
	document.submitForm.operType.value="menuQuery";
	document.submitForm.roleId.value=roleId;
	document.submitForm.target="right";
	document.submitForm.submit();	
}

//增加角色
function addRole() {
        var webPath = document.myform.webPath.value;
        var theResponse = window.showModalDialog(webPath + "/views/om/organ/funcrole/inputWindow.htm",'','dialogWidth:300px;DialogHeight=150px;status:no');
        if(typeof(theResponse)=="undefined" || theResponse=="") return;
        else {
        	document.submitForm.operType.value="roleAdd";
        	document.submitForm.roleName.value=theResponse;
        	document.submitForm.target="bottom";
        	document.submitForm.submit();
        }
}


//删除角色
function delRole() {
	var webPath = document.myform.webPath.value;
	var roleName = getRoleName();
	if(roleName==null) {alert("请选择角色！"); return;}
	
	if(confirm("确认要删除角色'" + roleName + "'吗？")) {
    	document.submitForm.operType.value="roleDelete";
    	document.submitForm.roleId.value=document.myform.selectedRoleId.value;
    	document.submitForm.target="bottom";
    	 parent.right.location=webPath + "/blank.html"
    	document.submitForm.submit();
	}     
}
//修改角色
function modifyRole() {
    var roleName = getRoleName();
	
	if(roleName==null) {alert("请选择角色！"); return;}
	
    var webPath = document.myform.webPath.value;
    var theResponse = window.showModalDialog(webPath + "/views/om/organ/funcrole/inputWindow.htm",roleName,'dialogWidth:300px;DialogHeight=150px;status:no');
    if(typeof(theResponse)=="undefined" || theResponse=="") return;
    else {
    	document.submitForm.operType.value="roleModify";
    	document.submitForm.roleId.value=document.myform.selectedRoleId.value;
    	document.submitForm.roleName.value=theResponse;
    	document.submitForm.target="bottom";
    	document.submitForm.submit();
    }
        	
}

//获取角色名称
function getRoleName() {
    var roleId=document.myform.selectedRoleId.value;
    
    if(roleId=="unselected") return null;
    
    var trId = "rowtr" + roleId;
    var roleName = document.all.item(trId).cells[1].innerText;
    
    return roleName;
}

]]></xsl:comment>	
</script>
</head>
<body onload="commonInit('{root/alertMessage}');return false;" class="BODY" >
	<form name="myform">
		<input type="hidden" name="webPath" value="{root/path}"/>
		<input type="hidden" name="selectedRoleId" value="unselected"/>
		<xsl:apply-templates select="root/roleColl"/>
		<input type="button" name="bAdd" value="增 加" class="btn1_mouseout" nmouseover="this.className='btn1_mouseover'"
 onmouseout="this.className='btn1_mouseout'" onmousedown="this.className='btn1_mousedown'"  onmouseup="this.className='btn1_mouseup'" onclick="addRole()"/>
		<input type="button" name="bDelete" value="删 除" class="btn1_mouseout" nmouseover="this.className='btn1_mouseover'"
 onmouseout="this.className='btn1_mouseout'" onmousedown="this.className='btn1_mousedown'"  onmouseup="this.className='btn1_mouseup'" onclick="delRole()"/>
		<input type="button" name="bModify" value="修 改" class="btn1_mouseout" nmouseover="this.className='btn1_mouseover'"
 onmouseout="this.className='btn1_mouseout'" onmousedown="this.className='btn1_mousedown'"  onmouseup="this.className='btn1_mouseup'" onclick="modifyRole()"/>
	</form>
	<form name="submitForm" method="post" action="{root/path}/om/funcRoleAdmin.do">
		<input type="hidden" name="operType"/>
		<input type="hidden" name="dutyId" value="{root/dutyId}"/>
		<input type="hidden" name="roleId"/>
		<input type="hidden" name="roleName"/>
	</form>
</body>
</html>
</xsl:template>

<!-- 角色列表的template -->
<xsl:template match="root/roleColl">
	<table border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
			<tr class="thList">
			<td class="tdfontstyle" nowrap="nowrap">选择</td>
			<td class="tdfontstyle" nowrap="nowrap">角色名称</td>
			<td class="tdfontstyle" nowrap="nowrap">创建地市</td>
			</tr>
			<xsl:for-each select="role">
			<tr id="rowtr{roleId}">	
			<xsl:choose>
				<xsl:when test="(position() mod 2) = 1 ">
					<xsl:attribute name="class">trList</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">trListDark</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>	
				<td width="10%" nowrap="nowrap"><input name="role" type="radio" id="radio{roleId}" onclick="selectRoleId({roleId},{ifModify})"/></td>
				<td width="60%" nowrap="nowrap"><xsl:value-of select="roleName"/></td>
				<input type="hidden" id="areaid{roleId}" value="{createAreaId}" disabled="true" />
				<td width="30%" nowrap="nowrap"><xsl:value-of select="createAreaName"/></td>
			</tr>
			</xsl:for-each>
	</table>
</xsl:template>
</xsl:stylesheet>
