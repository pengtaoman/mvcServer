<?xml version="1.0" encoding="GB2312"?>
<!-- edited with XMLSPY v2004 rel. 4 U (http://www.xmlspy.com) by mayc (ORiON) -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html"/>
	<xsl:variable name="selectable" select="0"/>
	<xsl:variable name="multiselect" select="0"/>
	<xsl:template match="/">
		
		<xsl:apply-templates select="node"/>

	</xsl:template>

	<xsl:template match="node">

			  <span>
				    <xsl:attribute name="id"><xsl:value-of select="@value"/></xsl:attribute>

				    <xsl:attribute name="class">node</xsl:attribute>
			        <img src="unieap/pages/form/data/images/tree_close.gif" class="imgCls" >
						        <xsl:attribute name="onclick">showBranch('<xsl:value-of select="@value"/>')</xsl:attribute>
					</img>
					
					<xsl:value-of select="@text"/><br/>
			 </span>
			 <span>
			        <xsl:attribute name="class">branch</xsl:attribute>
			 	    <xsl:apply-templates select="elements"/>
			 </span>
 
	</xsl:template>
	
	<xsl:template match="elements">

				<xsl:for-each select="node">
					<span>
				      <xsl:attribute name="id"><xsl:value-of select="@value"/></xsl:attribute>
				        <xsl:attribute name="path">
				        <xsl:value-of select="@text"/>
				      </xsl:attribute>
			            <img class="imgCls" >
			                    <xsl:attribute name="src">
			                      <xsl:choose>
			                        <xsl:when test="not(./*[1])">
			                          unieap/pages/form/data/images/tree_leaf.gif
			                        </xsl:when>
			                        <xsl:otherwise>
			                          unieap/pages/form/data/images/tree_close.gif
			                        </xsl:otherwise>
			                      </xsl:choose>
			                    </xsl:attribute>
						        <xsl:attribute name="onclick">showBranch('<xsl:value-of select="@value"/>')</xsl:attribute>
						</img>
						<xsl:choose>
						  <xsl:when test="elements[node] and $selectable!=1">
						    <xsl:value-of select="@text"/><br/>  
						  </xsl:when>
						  <xsl:otherwise>
						     <xsl:if test="$multiselect">
						       <input type="checkbox" onclick="setTreeValue('{@value}')"></input>
						     </xsl:if> 
						     <a onclick="javascript:setTreeValue('{@value}')" href="javascript:"> 
						       <xsl:value-of select="@text"/><br/> 
						     </a>
						  </xsl:otherwise>
						</xsl:choose>
			 		</span>
			 	 
			 		<span>
			        	<xsl:attribute name="class">branch</xsl:attribute>
			        	<!-- 
			        	<xsl:apply-templates select="elements"/>
			        	 -->
					</span>
				 
				</xsl:for-each>
	 
	</xsl:template>
	
</xsl:stylesheet>
