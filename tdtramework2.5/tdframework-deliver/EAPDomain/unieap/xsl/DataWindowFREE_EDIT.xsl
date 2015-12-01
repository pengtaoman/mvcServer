<?xml version="1.0" encoding="GBK" standalone="no"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+    
+	文件说明： 数据窗口解析模板集，仅适用于类型为FREE_EDIT的数据窗口。
+   		   其命名规则为：template_类型_节点名称
+   创建  人： 胡光华 hugh@neusoft.com
+   创建时间： 2003-04-30
+   修改履历：
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

<xsl:import href="DataWindowConfig.xsl"/>
<xsl:import href="DataWindowCommon.xsl"/>

<!-- 模板: 本类型数据窗口解析入口 -->
<xsl:template name="template-freeedit-dataWindow" match = "dataWindow">	    	
	<!-- 启用可见编辑模板 -->		
	<xsl:if test="/dataWindow/editers/@isAutoDraw = 'true' ">
		<xsl:call-template name="template-displayEditer"/>
	</xsl:if>	
</xsl:template>	
</xsl:stylesheet>