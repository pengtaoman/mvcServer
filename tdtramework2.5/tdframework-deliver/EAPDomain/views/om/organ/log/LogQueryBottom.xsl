<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/root/create">
<html>
<head>
	<title>logquerybutton</title>
	<LINK REL="stylesheet" HREF="{path}/views/common/css/crm_style.css" TYPE="text/css"/>
	<script language="javascript">
	<xsl:comment>
	<![CDATA[
	function init(){
		parent.logquerybanner.myform.bQuery.disabled=false;
	}
	]]>
	</xsl:comment>
	</script>
</head>
<body class="BODY" onload="init()">
<form name="myform" method="post" action="">
<TABLE border="0" align="center" cellpadding="0" cellspacing="1"  class="tablebluemore">
<TR class="thList">
	<TD class="tdfontstyle">序号</TD>
	<TD class="tdfontstyle">操作员帐号</TD>
	<TD class="tdfontstyle">功能</TD>
	<TD class="tdfontstyle">登陆主机</TD>
	<TD class="tdfontstyle">操作日期</TD>
	<TD class="tdfontstyle">详细描述</TD>
</TR>
<xsl:for-each select="Log/LogList">
<TR>
<xsl:choose>
		<xsl:when test="(position() mod 2) = 1 ">
					<xsl:attribute name="class">trList</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">trListDark</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>	
	<TD><xsl:value-of select="RowNo"/></TD>
	<TD><xsl:value-of select="WorkNo"/></TD>
	<TD><xsl:value-of select="BottomName"/></TD>
	<TD><xsl:value-of select="LoginHost"/></TD>
	<TD><xsl:value-of select="OperateDate"/></TD>
	<TD><xsl:value-of select="OperateDesc"/></TD>
</TR>
</xsl:for-each>
</TABLE>

</form>
</body>
</html>	
</xsl:template>
</xsl:stylesheet>