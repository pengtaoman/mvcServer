<?xml version="1.0" encoding="GBK" standalone="no"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- 控件整体模板 -->
<xsl:import href="DataWindowConfig.xsl"/>
<xsl:import href="DataWindowCommon.xsl"/>

<xsl:template match = "dataWindow">
	<xsl:call-template name="template-querywin-filters"/>
</xsl:template>
<!-- 弹出窗口使用的解析模板，命名原则：editer_[dw name]_[index] -->
<xsl:template name="template-querywin-filters" match="filters">
		<br/>
		<table class="NEUBodyListTableback" cellSpacing="0" borderColorDark="#ffffff" cellPadding="2" bgColor="#f4f4f4" borderColorLight="#848284" border="1"  width="300">
			<tr><td>
			<table id="dwDataOneRecordTbl" width="100%" border="1"  bordercolordark="#FFFFFF" bordercolorlight="#848284" cellpadding="2" cellspacing="0" bgcolor="#FFFFFF" class="NEUDwListTable">
				<form id="{$DW_FORM_NAME}">
					<tr><td colspan="3" class="NEUDwOpenWinTitleTD" align="left" bgColor="#f4f4f4">
						请录入查询条件
					</td></tr>
				<xsl:if test="filters/@logicalmean != ''">					
	                <tr><td colspan="3" class="NEUDwOpenWinTitleTD" align="left" bgColor="#f4f4f4">
						以下条件间关系为：<xsl:value-of select="filters/@logicalmean"/>
					</td></tr>
				</xsl:if>				
					
				
				<xsl:call-template name="template-common-filters-core"/>
			    </form>
	        	<tr align="center" >
	        		<td colspan="3">
	        			<input id="{$DW_BUTTON_QUERY_BEGIN}{/dataWindow/@name}" type="button" class="NEUDwButton" value="查询" onclick="if(window.dialogArguments.dwManager.getActiveDW().querywin_query_onclick(document))window.close();"/>
	        			<input type="button" class="NEUDwButton" value="关闭" onclick="javaScript:window.close();"/>
	        		</td>
	        	</tr>
		    </table>
	    </td></tr></table>
</xsl:template>
</xsl:stylesheet>