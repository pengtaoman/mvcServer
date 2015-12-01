<?xml version="1.0" encoding="GBK" standalone="no"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+	文件说明： 数据窗口解析模板集，仅适用于类型为QUERY_CONDITION的数据窗口。
+   		   其命名规则为：template_类型_节点名称
+   创建  人： 胡光华 hugh@neusoft.com
+   创建时间： 2003-08-08
+   修改履历：
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

<xsl:import href="DataWindowConfig.xsl"/>
<xsl:import href="DataWindowCommon.xsl"/>

<!-- 模板: 本类型数据窗口解析入口 -->
<xsl:template match = "dataWindow">
	<xsl:call-template name="template-querywin-filters"/>
</xsl:template>
<!-- 弹出窗口使用的解析模板，命名原则：editer_[dw name]_[index] -->
<xsl:template name="template-querywin-filters" match="filters">
		<table class="NEUBodyListTableback" cellSpacing="0" borderColorDark="#ffffff" cellPadding="2" bgColor="#f4f4f4" borderColorLight="#848284" border="1" style="width:{@width}">
			<tr><td>
			<table id="dwDataOneRecordTbl" width="{@width}" border="1"  bordercolordark="#FFFFFF" bordercolorlight="#848284" cellpadding="2" cellspacing="0" bgcolor="#FFFFFF" class="NEUDwListTable">
					<tr><td colspan="3" class="NEUDwOpenWinTitleTD" align="left" bgColor="#f4f4f4">
						请录入查询条件
					</td></tr>
				<xsl:if test="filters/@logicalmean != ''">					
	                <tr><td colspan="3" class="NEUDwOpenWinTitleTD" align="left" bgColor="#f4f4f4">
						以下条件间关系为：<xsl:value-of select="filters/@logicalmean"/>
					</td></tr>
				</xsl:if>				
				<xsl:call-template name="template-common-filters-core"/>
				<tr align="right" >
	        		<td colspan="3">
	        			<!-- 调用公共模板，生成按钮 -->
	        			<xsl:call-template name="template-common-one-button">
							<xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_QUERY_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
		            		<xsl:with-param name="value">查询</xsl:with-param>
		            		<xsl:with-param name="onclick">query_onclick()</xsl:with-param>
		            		<xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_QUERY_TYPE"/></xsl:with-param>
                            <xsl:with-param name="class">NEUDwButton_Query</xsl:with-param>
						</xsl:call-template>

						<xsl:call-template name="template-common-one-button">
							<xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_RESET_TYPE"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
		            		<xsl:with-param name="value">重置</xsl:with-param>
		            		<xsl:with-param name="onclick">reset()</xsl:with-param>
		            		<xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_RESET_TYPE"/></xsl:with-param>
                            <xsl:with-param name="class">NEUDwButton_Reset</xsl:with-param>
						</xsl:call-template>
	        		</td>
	        	</tr>
		    </table>
	    </td></tr></table>
</xsl:template>
</xsl:stylesheet>