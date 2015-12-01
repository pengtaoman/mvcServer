<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>
<xsl:strip-space elements="*"/>

<xsl:template match="/">

<html>
<head>
<title></title>
<LINK REL="stylesheet" HREF="{root/path}/views/common/css/crm_style.css" TYPE="text/css"/>
<script language="javascript" src="{//path}/{//actionJS}"/>
<script language="javascript">
<xsl:comment>
<![CDATA[

function changeDiv(itemId,webPath){
	  divObj = document.all.item("div_"+itemId);
	  imgObj=document.all.item("img_"+itemId);
	  if(divObj.style.display=="none")  {
	    	divObj.style.display="block";
	    	imgObj.src=webPath + "/views/common/images/minus.gif";
	   }
	  else {
	    	divObj.style.display="none";
	    	imgObj.src=webPath + "/views/common/images/plus.gif";
	    }
}

]]>
</xsl:comment>	
</script>
</head>
<body class="BODY">

<form name="myform">
<xsl:apply-templates select="root/item">
<xsl:with-param name="webPath" select="//path"/>
</xsl:apply-templates>

</form>

</body>
</html>
</xsl:template>

<xsl:template match="item">
	<xsl:param name="webPath"/>
	<xsl:choose>
	<!-- 当有子节点的情况 -->
	<xsl:when test="ifChild=1">
		<img src="{$webPath}/views/common/images/spacer.gif" align="left" width="{spaceWidth}" height="1"/>      <!-- 放空的图片开始推进 -->
		<img src="{$webPath}/views/common/images/plus.gif"  id="img_{itemId}" onclick="changeDiv('{itemId}','{$webPath}')"/>  <!-- 加号 减号表示折叠及展开 -->
		<xsl:if test="type='duty'">
			<input type="radio" name="dutyRadio" onclick="selectMenu('{$webPath}','{dutyId}');"/>
		</xsl:if>
		<span id="span_{itemId}" style="cursor:hand" onclick="changeDiv('{itemId}','{$webPath}')"><xsl:value-of select="name"/></span> <br/>
		<div id="div_{itemId}" style="display:none">
			<xsl:apply-templates select="child/item">
				<xsl:with-param name="webPath" select="$webPath"/>
			</xsl:apply-templates>
		</div>
	</xsl:when>
	<!-- 当没有子节点的情况,如下为叶子节点 -->
	<xsl:otherwise>
		<img src="{$webPath}/views/common/images/spacer.gif" align="left" width="{spaceWidth+15}" height="1"/> <!-- 放空的图片开始推进,不设置折叠展开图片 -->
		<xsl:if test="type='duty'">
			<input type="radio" name="dutyRadio" onclick="selectMenu('{$webPath}','{dutyId}');"/>
		</xsl:if>
		<span id="{$webPath}/views/common/images/span_{itemId}" onclick="return false;"><xsl:value-of select="name"/></span> <br/>
	</xsl:otherwise>
	</xsl:choose>

</xsl:template>

</xsl:stylesheet>
