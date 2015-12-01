<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
    <head><title></title></head>
    
	<LINK REL="stylesheet" HREF="{root/create/path}/views/common/css/crm_style.css" TYPE="text/css"/>
	
	<script language="javascript" src="{root/create/path}/views/common/js/nas_select_default.js"></script> 
	<script language="javascript" src="{root/create/path}/views/om/organ/passwordupdate/PasswordUpdate.js"></script> 
	<script language="javascript" src="{root/create/path}/unieap/js/Common.js" ></script>
	<script language="javascript" src="{root/create/path}/unieap/js/Globals.js" ></script>
    <body onload="init('{root/create/path}');" topmargin="0" leftmargin="12" class="BODY">
	<form method="POST" name="myform" action="{root/create/path}/om/passwordupdateaction.do">
		
		<xsl:apply-templates select="root/create"/>
		
	</form>
	</body>
</html>
</xsl:template>

<xsl:template match="root/create">
<table align="center"  border="0" cellspacing="0" cellpadding="0" class="tab_line">
			<tr>
				<td width="5%" align="center" valign="top">
					<img src="{path}/views/common/images/current2.gif" align="center" width="20" height="20"/>
				</td>
				<td  class="h14">修改密码 </td>
			</tr>
			<tr>
				<td colspan="2" class="h14"><xsl:value-of select="Prompt"/> </td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="15"/>
			</tr>
		</table>
	<table border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore1">
        <input type="hidden" name="OperType" value="update"></input>      
        <tr class="trcolorT">
				<td class="tdlabelStyle" width="35%" >请输入旧密码：
				</td>
				<td class="tdtextStyle" width="25%">
					<input type="password" name="OldPassword" onkeydown="enterToTab()" class="textStyle" ><xsl:attribute name="value"><xsl:value-of select="OldPassword"/></xsl:attribute></input>	
				</td>
				<td width="25%" >
				<div id="oldPwdMsg" style="display:none;color:red;font-size:12px">长度应在6到15位之间！</div>
				</td>
			</tr>
            
        <tr class="trcolor">
				<td class="tdlabelStyle"  width="25%">请输入新密码：
				</td>
				<td class="tdtextStyle" width="25%">
					<input type="password" name="NewPassword"  onchange="" class="textStyle"  onkeydown="enterToTab()"><xsl:attribute name="value"><xsl:value-of select="NewPassword"/></xsl:attribute></input>	
				</td>
				<td width="25%" >
				<div id="newPwdMsg" style="display:none;color:red">长度应在6到15位之间！</div>
				</td>
			</tr>
     
           <tr class="trcolor">
				<td class="tdlabelStyle" width="25%" >请再次输入新密码：
				</td>
				<td class="tdtextStyle" width="25%">
					<input type="password" name="RePassword"  onchange="compare_password(this.form.NewPassword,this,0);" class="textStyle"  onkeydown="enterToSubmit()"><xsl:attribute name="value"><xsl:value-of select="RePassword"/></xsl:attribute></input>	
				</td>
				<td width="25%" >
				<div id="reNewPwdMsg" style="display:none;color:red">密码长度应在6到15位之间！</div>
				</td>
			</tr>
     
                           
        <tr class="trcolorT">
                  <td class="tdlabelStyle" colspan="3">
              		<center><input type="button" value="确 认 " name="B1" onClick="update();" class="btn3_mouseout" nmouseover="this.className='btn3_mouseover'"
 onmouseout="this.className='btn3_mouseout'" onmousedown="this.className='btn3_mousedown'"  onmouseup="this.className='btn3_mouseup'" ></input></center>
              </td>   
        </tr>   
        
        <input type="hidden" name="Message"><xsl:attribute name="value"><xsl:value-of select="Message"/></xsl:attribute></input>
        <input type="hidden" name="pwdMinLength"><xsl:attribute name="value"><xsl:value-of select="pwdMinLength"/></xsl:attribute></input>
        <input type="hidden" name="pwdMaxLength"><xsl:attribute name="value"><xsl:value-of select="pwdMaxLength"/></xsl:attribute></input>
        
    </table>
</xsl:template>
</xsl:stylesheet>