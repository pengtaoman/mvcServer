<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<LINK REL="stylesheet" HREF="{root/create/path}/views/common/css/pubstyle.css" TYPE="text/css" />
<title>组织机构维护</title>
</head>
<SCRIPT language="javascript" src="{root/create/path}/views/common/js/nas_select_default.js"/>
<SCRIPT language="javascript" src="{root/create/path}/views/common/js/nas_enter_jump.js"/>
<script language="javascript" src="{root/create/path}/views/common/js/return_table_much_arr.js"></script>
<script language="javascript" src="{root/create/path}/views/common/js/generate_result_table.js"></script>
<script language="javascript" src="{root/create/path}/views/common/js/nas_select_change.js"></script>
<script language="javascript">
<xsl:comment><![CDATA[

	function init(){
		//如果选中的结点是组织机构,则显示该组织机构信息,否则不显示.
		if(document.myform.Kind.value=="organ"){
			queryInfo();
		}else{
			//修改和删除按钮置灰
			document.myform.modifyorgan.disabled="true";			
			document.myform.deleteorgan.disabled="true";
		}
	}
//查询
	function queryInfo(){
		//alert(document.myform.OrganId.value);
		document.forms[0].OperType.value="query";
		document.myform.target = "showQueryIframe";
		document.forms[0].submit();
	}
//增加	
	function addInfo(){
		document.forms[0].OperType.value="addinit";
		document.myform.target = "showQueryIframe";
		document.forms[0].submit();
	}
//修改
	function modifyInfo(){
		document.forms[0].OperType.value="modify";
		document.myform.target = "showModifyIframe";
		document.forms[0].submit();
	}
//删除
	function deleteInfo(){
		document.forms[0].OperType.value="modify";
		document.myform.target = "showModifyIframe";
		document.forms[0].submit();
	}	

]]></xsl:comment>	
</script>

<body onload="init()" topmargin="0" leftmargin="12" class="BODY">

<form name="myform" method="POST" action="{root/create/path}/om/OrganMaintanceAction.do">
<xsl:apply-templates select="root/create" />

</form>
</body>
</html>
</xsl:template>
<xsl:template match="root/create">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="body">
        <tr>
          <td width="5%" align="center"><img src="{path}/views/common/images/icon_arrow_button.gif" align="center" width="15" height="16" /></td>
          <td width="95%" class="h14">组织机构维护</td>
        </tr>
      </table>
      <table width="100%" border="0" bordercolor="#000000" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
       <input type="hidden" name="OrganId" value="{Id}" />
		<input type="hidden" name="OperType" value="" />
		<input type="hidden" name="Kind" value="{Kind}" />
		<input type="hidden" name="BelongArea" value="{BelongArea}" />
        <tr class="trcolor">
          <td align="center" class="tdbuttonStyle" colspan="4" width="100%">
            <input type="button" name="addorgan" class="buttonStyle" value="增加" onclick="addInfo()" />
            <input type="button" name="modifyorgan" class="buttonStyle" value="修改" onclick="modifyInfo()" />
            <input type="button" name="deleteorgan" class="buttonStyle" value="删除" onclick="deleteInfo()" />
          </td>
  	   	</tr> 
  	  </table>
	<iframe name="showQueryIframe" id="showQueryIframe" FRAMEBORDER="0" SCROLLING="yes" marginwidth="0" marginheight="0" style="height:85%;width:100%;" />
	<iframe name="showAddIframe" id="showAddIframe" FRAMEBORDER="0" SCROLLING="yes" marginwidth="0" marginheight="0" style="height:85%;width:100%;" />
	<iframe name="showModifyIframe" id="showModifyIframe" FRAMEBORDER="0" SCROLLING="yes" marginwidth="0" marginheight="0" style="height:85%;width:100%;" />
	<iframe name="showDeleteIframe" id="showDeleteIframe" FRAMEBORDER="0" SCROLLING="yes" marginwidth="0" marginheight="0" style="height:85%;width:100%;" />
 </xsl:template>
</xsl:stylesheet>          
