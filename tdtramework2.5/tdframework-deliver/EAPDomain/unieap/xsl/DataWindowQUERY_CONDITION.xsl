<?xml version="1.0" encoding="GBK" standalone="no"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+	�ļ�˵���� ���ݴ��ڽ���ģ�弯��������������ΪQUERY_CONDITION�����ݴ��ڡ�
+   		   ����������Ϊ��template_����_�ڵ�����
+   ����  �ˣ� ���⻪ hugh@neusoft.com
+   ����ʱ�䣺 2003-08-08
+   �޸�������
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

<xsl:import href="DataWindowConfig.xsl"/>
<xsl:import href="DataWindowCommon.xsl"/>

<!-- ģ��: ���������ݴ��ڽ������ -->
<xsl:template match = "dataWindow">
	<xsl:call-template name="template-querywin-filters"/>
</xsl:template>
<!-- ��������ʹ�õĽ���ģ�壬����ԭ��editer_[dw name]_[index] -->
<xsl:template name="template-querywin-filters" match="filters">
		<table class="NEUBodyListTableback" cellSpacing="0" borderColorDark="#ffffff" cellPadding="2" bgColor="#f4f4f4" borderColorLight="#848284" border="1" style="width:{@width}">
			<tr><td>
			<table id="dwDataOneRecordTbl" width="{@width}" border="1"  bordercolordark="#FFFFFF" bordercolorlight="#848284" cellpadding="2" cellspacing="0" bgcolor="#FFFFFF" class="NEUDwListTable">
					<tr><td colspan="3" class="NEUDwOpenWinTitleTD" align="left" bgColor="#f4f4f4">
						��¼���ѯ����
					</td></tr>
				<xsl:if test="filters/@logicalmean != ''">					
	                <tr><td colspan="3" class="NEUDwOpenWinTitleTD" align="left" bgColor="#f4f4f4">
						�����������ϵΪ��<xsl:value-of select="filters/@logicalmean"/>
					</td></tr>
				</xsl:if>				
				<xsl:call-template name="template-common-filters-core"/>
				<tr align="right" >
	        		<td colspan="3">
	        			<!-- ���ù���ģ�壬���ɰ�ť -->
	        			<xsl:call-template name="template-common-one-button">
							<xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_QUERY_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
		            		<xsl:with-param name="value">��ѯ</xsl:with-param>
		            		<xsl:with-param name="onclick">query_onclick()</xsl:with-param>
		            		<xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_QUERY_TYPE"/></xsl:with-param>
                            <xsl:with-param name="class">NEUDwButton_Query</xsl:with-param>
						</xsl:call-template>

						<xsl:call-template name="template-common-one-button">
							<xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_RESET_TYPE"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
		            		<xsl:with-param name="value">����</xsl:with-param>
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