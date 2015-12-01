<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
<html>
	
	<head>
	<SCRIPT language="javascript" src="{root/create/path}/views/common/js/nas_select_default.js"/>
	<title></title>
	<LINK REL="stylesheet" HREF="{root/create/path}/views/common/css/crm_style.css" TYPE="text/css"/>
		
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
function init(){

	nas_select_default('menu','menuType','create/MenuType/selected');//��֯����״̬
	nas_select_default('menu','openMethod','create/OpenMethod/selected');//��������
	nas_select_default('menu','ifMyWork','create/IfMyWork/selected');//�Ƿ��ڲ���֯����
	nas_select_default('menu','inuse','create/Inuse/selected');//��֯��������

}

function nas_select_default(form_name,dwname,dwselect)
{
	source = document.XMLDocument;
	mark="/root/"+dwselect; 
   
	v=source.selectNodes(mark);    
	for(t=v.nextNode();t;t=v.nextNode())
	{ 
		temp=t.text; 
		
		if (temp!="-1" && temp!="")
		{
			var dwobject="document."+form_name+"."+dwname+".value='"+temp+"'";
			eval(dwobject);
		}
	}  
}
function willaddmenu()
{
	        menu.action="menuoperate.do?oprType=willaddmenu";
			menu.submit();
}
function addmenu()
{
	        menu.action="menuoperate.do?oprType=addmenu";
			menu.submit();
}
function updatemenu()
{
	if(confirm("ȷ��Ҫ�޸�����˵�ô��"))
		{
	        menu.action="menuoperate.do?oprType=updatemenu";
			menu.submit();
			//parent.location.href="/tdframework/views/om/organ/menuoperate/MenuOperateMain.jsp";
		}
	else
	    return false;
}
function deletemenu()
{
	if(confirm("ȷ��Ҫɾ������˵�ô��"))
		{
	        menu.action="menuoperate.do?oprType=deletemenu";
			menu.submit();
		}
	else
	    return false;
}
  ]]>
	</xsl:comment>
	</script>
	</head>
	<body onload="init()" class="BODY ">
		<form method="POST" name="menu" action="">		
			<xsl:apply-templates select="root/create"/>
		</form>
	</body>
	</html>	
</xsl:template>	

<xsl:template match="root/create">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" height="20px">
	  	<tr><td><xsl:text disable-output-escaping="no"></xsl:text></td></tr>
	</table>
			
			<table border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
		<tr class="trcolorT">
			<td class="tdlabelStyle">�˵�����</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="menuId"  maxlength ="32"  value="{MenuId}" />
  				<input type="hidden"  name="oldMenuId"  value="{MenuId}" />
  			</td>
  			<td class="tdlabelStyle">�˵�����</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="menuName"  maxlength ="32"  value="{MenuName}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">ϵͳ����</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="systemId"  maxlength ="32"  value="{SystemId}" />
  			</td>
  			<td class="tdlabelStyle">ģ�����</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="moduleId"  maxlength ="32"  value="{ModuleId}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">����0����ť��1����С�Ӳ˵� 2���˵�</td>
			<td class="tdtextStyle" colspan="1" >
            <select class="dropdownStyle" name="menuType" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/MenuType/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          	</td>
  			<td class="tdlabelStyle">�򿪷�ʽ0:�ڿ���д�1:���´����д�</td>
			<td class="tdtextStyle" colspan="1" >
            <select class="dropdownStyle" name="openMethod" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/OpenMethod/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          	</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">ҳ������</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="pageLink"  maxlength ="32"  value="{PageLink}" />
  			</td>
  			<td class="tdlabelStyle">�˵����</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="layer"  maxlength ="32"  value="{Layer}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">��¼��־</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="log"  maxlength ="32"  value="{Log}" />
  			</td>
  			<td class="tdlabelStyle">�˵�˳��</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="order"  maxlength ="32"  value="{Order}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">ifMyWork0:����ʾ,1:��ʾ</td>
			<td class="tdtextStyle" colspan="1" >
            <select class="dropdownStyle" name="ifMyWork" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/IfMyWork/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          	</td>
  			<td class="tdlabelStyle">�ϼ��˵�</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="parentMenuId"  maxlength ="32"  value="{ParentMenuId}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">ʹ��״̬ 1:ʹ���� 0��ͣ��</td>
			<td class="tdtextStyle" colspan="1" >
            <select class="dropdownStyle" name="inuse" onChange="" tabindex="1" onkeypress="">
				<xsl:for-each select="//create/Inuse/option">
				<option value="{value}">
					<xsl:value-of select="caption"/>
				</option>
              </xsl:for-each>
            </select>
          	</td>
  			<td class="tdlabelStyle">��ע</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="menuDesc"  maxlength ="32"  value="{MenuDesc}" />
  			</td>
		</tr>
		<tr class="trcolorT">
			<td class="tdlabelStyle">��Ӧportal�е�window_id</td>
			<td class="tdtextStyle">
  				<input type="text"  class="textStyle" name="portalWinId"  maxlength ="32"  value="{PortalWinId}" />
  			</td>
  			<td> </td><td> </td>
		</tr>
	</table>
	<center>
			 <input type="button" name="Submit"  onClick="updatemenu()" value="�޸�"/>
			 <input type="button" name="Submit2"  onClick="deletemenu()" value="ɾ��"/>
			 <input type="button" name="Submit3"  onClick="addmenu()" value="����"/>
			 <input type="button" name="Submit3"  onClick="willaddmenu()" value="����"/>
			</center>
</xsl:template>
</xsl:stylesheet>