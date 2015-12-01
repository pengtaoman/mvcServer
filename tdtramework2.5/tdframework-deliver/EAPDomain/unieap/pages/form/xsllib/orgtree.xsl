<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns="http://www.w3.org/TR/REC-html40">
   <xsl:output method="html" indent="no"/>
   <xsl:variable name="tree_collapsed">css/images/close.gif</xsl:variable>
   <xsl:variable name="personparent">css/images/organise.gif</xsl:variable>
   <xsl:variable name="roleparent">css/images/role.gif</xsl:variable>
   <xsl:variable name="image_T">css/images/T.gif</xsl:variable>
   <xsl:variable name="image_L">css/images/L.gif</xsl:variable>
   <xsl:variable name="image_I">css/images/I.gif</xsl:variable>
   <xsl:variable name="rolenode">css/images/role.gif</xsl:variable>
   <xsl:variable name="personnpde">css/images/personnel.gif</xsl:variable>
  <!-- 
   <xsl:template match="role">
          <xsl:apply-templates select="role"/>
   </xsl:template>
   -->
   <xsl:template match="role">
         <xsl:variable name="id" select="@id"/>
         <xsl:variable name="name" select="@name"/>
         <span>
          <xsl:if test="./*[1]">
            <xsl:attribute name="onclick">showBranch(this)</xsl:attribute>
          </xsl:if>
          <xsl:attribute name="id">
             <xsl:value-of select="$id"/>
          </xsl:attribute>
          <xsl:attribute name="name">
             <xsl:value-of select="$name"/>
          </xsl:attribute>
          <xsl:attribute name="orgtype">role</xsl:attribute>
          <nobr>
          <xsl:choose>
            <xsl:when test="./*[1]">
              <img src="{$tree_collapsed}"/>&#160;<img src="{$roleparent}" onclick="event.cancelBubble=true" style="vertical-align:middle;text-align:center"/>   
            </xsl:when>
            <xsl:otherwise>
              <xsl:choose>
                <xsl:when test="following-sibling::node() and not(preceding-sibling::node()/*[1])">
                  <img src="{$image_T}" class="imgalign" style="visibility:hidden"/>   
                </xsl:when>
                <xsl:when test="preceding-sibling::node()/*[1]">&#160;&#160;</xsl:when>                
                <xsl:otherwise><img src="{$image_L}" class="imgalign" style="visibility:hidden"/></xsl:otherwise>
              </xsl:choose>
              &#160;&#160;<img src="css/images/role.gif" style="vertical-align:middle;text-align:center;margin-left:0"/>
            </xsl:otherwise>
          </xsl:choose>
          <LABEL onmousedown="roleOnclick('{$id}','{$name}')">
             <xsl:value-of select="$name"/>
          </LABEL></nobr><br/>
         </span>
         <span class="branch">
         </span>
   </xsl:template>
   
   <!-- new template -->
   <xsl:template match="persons">
         <xsl:copy-of select="*"/>
   </xsl:template>
</xsl:stylesheet>
