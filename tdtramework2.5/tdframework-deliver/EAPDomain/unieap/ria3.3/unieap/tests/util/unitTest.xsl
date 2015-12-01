<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html"></xsl:output>
<xsl:template match="/">
<html>
<head>
<title>Unit Test Navigator</title>
<link rel="stylesheet" type="text/css" href="unitTest.css"/>
<script type="text/javascript" src="unitTestTree.js"></script>
</head>
<xsl:apply-templates/>
</html>
</xsl:template>

<xsl:template match="tree">
	<body>
		<xsl:apply-templates/>
	</body>
</xsl:template>

<xsl:template match="branch">
	<span class="trigger">
	<xsl:attribute name="onClick">
		showBranch('<xsl:value-of select="@id"/>');
	</xsl:attribute>
	<img src="images/closed.gif">
		<xsl:attribute name="id">I<xsl:value-of select="@id"/></xsl:attribute>
	</img>
	<xsl:value-of select="branchText"/>
	<br/>
	</span>
	<span class="branch">
		<xsl:attribute name="id">
			<xsl:value-of select="@id"/></xsl:attribute>
		<xsl:apply-templates/>
	</span>
</xsl:template>

<xsl:template match="leaf">
	<img src="images/leaf.gif"/>
	<a>
		<xsl:attribute name="href" >
			javascript:showContent('<xsl:value-of select="link"/>')
		</xsl:attribute>
		<xsl:value-of select="leafText"/>
	</a><br/>
</xsl:template>

<!-- avoid output of text node with default template -->
<xsl:template match="branchText"/>

</xsl:stylesheet>
