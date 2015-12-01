<?xml version="1.0" encoding="GBK" standalone="no"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+
+	�ļ�˵���� ���ݴ��ڽ���ģ�弯��������������ΪPOP_EDIT�����ݴ��ڡ�
+   		   ����������Ϊ��template_����_�ڵ�����
+   ����  �ˣ� ���⻪ hugh@neusoft.com
+   ����ʱ�䣺 2003-05-01
+   �޸�������
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

<xsl:import href="DataWindowConfig.xsl"/>
<xsl:import href="DataWindowCommon.xsl"/>

<!-- ģ��: ���������ݴ��ڽ������ -->
<xsl:template name="template-popedit-dataWindow" match = "dataWindow">
	<!-- Ԥ�ñ༭ģ�� -->
	<xsl:call-template name="template-hiddenEditer"/>
	<xsl:element name = "div">
	<xsl:variable name="titleheight">
			<xsl:value-of select="count(//titles/title[@isRowBegin = 'true'])" />
	</xsl:variable>	 	
    	<xsl:attribute name="id"><xsl:value-of select="@name"/></xsl:attribute>
    	<table border="1" cellpadding="2" cellspacing="0" bordercolordark="#FFFFFF" bordercolorlight="#848284" bgcolor="#F4F4F4" width="{@width}" class="NEUDwListTableback">
    		<tr>
    			<td>
					<!-- �����ɱ�ͷ -->
			    	<div id="{$DW_HEADER_DIV_BEGIN}{@name}">
			    	<xsl:attribute name="style">overflow:hidden;width:<xsl:value-of select="@width"/>;height:<xsl:value-of select="($titleheight+1)*25-3"/>;</xsl:attribute>
			        	<table id="{$DW_HEADER_TABLE_BEGIN}{@name}" class="NEUDwListTable" border="1"  bordercolordark="#FFFFFF" bordercolorlight="#848284" cellpadding="2" cellspacing="0" bgcolor="#FFFFFF">
			        	<xsl:attribute name="style">position:absolute;left:0;width:<xsl:value-of select="@width"/>;</xsl:attribute>
			        		<xsl:call-template name="template-common-title"/>
			            	<xsl:call-template name="template-common-header"/>
			        	    <xsl:call-template name="template-popedit-header-dataObjs"/>
							<xsl:call-template name="template-common-sumcols"/>			        	    
			        	</table>
			    	</div>
					<!-- �����ɱ��� -->
			        <div id="{$DW_BODY_DIV_BEGIN}{@name}">
			        	<xsl:attribute name="onscroll">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').moveTitle()</xsl:attribute>
			    		<xsl:attribute name="style">align:center;overflow:auto;width:<xsl:value-of select="@width"/>;height:<xsl:value-of select="@height"/>;</xsl:attribute>
			    		<xsl:attribute name="class">NEUDwBackgroud</xsl:attribute>
			        	<table id="{$DW_BODY_TABLE_BEGIN}{@name}" class="NEUDwListTable" width="{@width}" border="1"  bordercolordark="#FFFFFF" bordercolorlight="#848284" cellpadding="2" cellspacing="0" bgcolor="#FFFFFF">
			            	<xsl:attribute name="style">position:absolute;top:-50;left:0;</xsl:attribute>	            	
			            	<xsl:call-template name="template-common-header"/>
			            	<xsl:call-template name="template-popedit-body-dataObjs">
			            		<xsl:with-param name="colIndex"><xsl:value-of select="orderInfo/@attrIndex"/></xsl:with-param>
			            		<xsl:with-param name="dataType"><xsl:value-of select="orderInfo/@dataType"/></xsl:with-param>
			            		<xsl:with-param name="order"><xsl:value-of select="orderInfo/@order"/></xsl:with-param>
							</xsl:call-template>
							<xsl:call-template name="template-common-sumcols"/>							
			        	</table>
			    	</div>
			    	<!-- ������ť -->
			    	<xsl:call-template name="template-popedit-order-buttons"/>
        		</td>
        	</tr>
        </table>
	</xsl:element>
</xsl:template>
<!-- ��ťģ�壺��ť�����Լ����еİ�ť�͹����İ�ť -->
<xsl:template name="template-popedit-order-buttons">
  <div>
		<xsl:attribute name="style">overflow:auto;width:<xsl:value-of select="@width"/></xsl:attribute>
    	<table border="1" cellpadding="2" cellspacing="0" bordercolordark="#FFFFFF" bordercolorlight="#848284" bgcolor="#F4F4F4" class="NEUDwListTableback" width="100%">
            <tr class="NEUDwCommon">
                    <!-- Ӧ�ù���ģ�� -->
        	    <xsl:call-template name="template-common-buttons"/>
            </tr>
        	<tr class="NEUDwCommon">
        		<td align="right">
        		   <xsl:for-each select="/dataWindow/buttons/button">
        		     <xsl:choose>
					  <xsl:when test="@type=$DW_BUTTON_ADD_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_ADD_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		     <xsl:with-param name="value">����</xsl:with-param>
	            		     <xsl:with-param name="onclick">addRow()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_ADD_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Add</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
					     </xsl:call-template>
					 </xsl:when>
					 <xsl:when test="@type=$DW_BUTTON_DEL_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_DEL_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		     <xsl:with-param name="value">ɾ��</xsl:with-param>
	            		     <xsl:with-param name="onclick">deleteSelectedRow()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_DEL_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Delete</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
					     </xsl:call-template>
					 </xsl:when>
					 <xsl:when test="@type=$DW_BUTTON_SAVE_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_SAVE_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		     <xsl:with-param name="value">����</xsl:with-param>
	            		     <xsl:with-param name="onclick">save()</xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_SAVE_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class">NEUDwButton_Save</xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
					     </xsl:call-template>
					 </xsl:when>
					 <xsl:when test="@type=$DW_BUTTON_CUSTOM_TYPE">
						  <xsl:call-template name="template-one-order-buttons">
						     <xsl:with-param name="id"><xsl:value-of select="@id"/></xsl:with-param>
	            		     <xsl:with-param name="value"><xsl:value-of select="@value"/></xsl:with-param>
	            		     <xsl:with-param name="onclick"><xsl:value-of select="@onclick"/></xsl:with-param>
	            		     <xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_CUSTOM_TYPE"/></xsl:with-param>
	            		     <xsl:with-param name="class"></xsl:with-param>
                             <xsl:with-param name="boControllerName"><xsl:value-of select="@boControllerName"/></xsl:with-param>
                             <xsl:with-param name="boControllerMethod"><xsl:value-of select="@boControllerMethod"/></xsl:with-param>
                             <xsl:with-param name="actionName"><xsl:value-of select="@actionName"/></xsl:with-param>
                             <xsl:with-param name="actionMethod"><xsl:value-of select="@actionMethod"/></xsl:with-param>
                             <xsl:with-param name="isPartlyRefresh"><xsl:value-of select="@isPartlyRefresh"/></xsl:with-param>
                             <xsl:with-param name="name"><xsl:value-of select="@name"/></xsl:with-param>
                             <xsl:with-param name="title"><xsl:value-of select="@title"/></xsl:with-param>
					     </xsl:call-template>
					 </xsl:when>					
				    </xsl:choose>
        		   </xsl:for-each>
        		</td>
        	</tr>
    	</table>
	</div>
</xsl:template>
<!-- ��ťģ�壺��ť�����Լ����еİ�ť�͹����İ�ť --><!--
<xsl:template name="template-popedit-buttons">
    <div>
		<xsl:attribute name="style">overflow:auto;width:<xsl:value-of select="@width"/></xsl:attribute>
    	<table border="1" cellpadding="2" cellspacing="0" bordercolordark="#FFFFFF" bordercolorlight="#848284" bgcolor="#F4F4F4" class="NEUDwListTableback" width="100%">
            <tr class="NEUDwCommon">
                    --><!-- Ӧ�ù���ģ�� --><!--
        	    <xsl:call-template name="template-common-buttons"/>
            </tr>
        	<tr class="NEUDwCommon">
        		<td align="right">
        			--><!-- ���ù���ģ�壬���ɰ�ť --><!--
					<xsl:call-template name="template-common-one-button">
						<xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_ADD_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		<xsl:with-param name="value">����</xsl:with-param>
	            		<xsl:with-param name="onclick">addRow()</xsl:with-param>
	            		<xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_ADD_TYPE"/></xsl:with-param>
                        <xsl:with-param name="class">NEUDwButton_Add</xsl:with-param>
					</xsl:call-template>
					<xsl:call-template name="template-common-one-button">
						<xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_DEL_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		<xsl:with-param name="value">ɾ��</xsl:with-param>
	            		<xsl:with-param name="onclick">deleteSelectedRow()</xsl:with-param>
	            		<xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_DEL_TYPE"/></xsl:with-param>
                        <xsl:with-param name="class">NEUDwButton_Delete</xsl:with-param>
					</xsl:call-template>
					<xsl:call-template name="template-common-one-button">
						<xsl:with-param name="id"><xsl:value-of select="$DW_BUTTON_SAVE_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:with-param>
	            		<xsl:with-param name="value">����</xsl:with-param>
	            		<xsl:with-param name="onclick">save()</xsl:with-param>
	            		<xsl:with-param name="type"><xsl:value-of select="$DW_BUTTON_SAVE_TYPE"/></xsl:with-param>
                        <xsl:with-param name="class">NEUDwButton_Save</xsl:with-param>
					</xsl:call-template>
                    --><!-- ���ù���ģ�壬�����Զ��尴ť--><!--
                    <xsl:call-template name="template-common-custom-button"/>
        		</td>
        	</tr>
    	</table>
	</div>
</xsl:template>
-->
<!-- ��ͷ��¼ģ��,�ͱ���ļ�¼����ģ����������ڣ��䲻������ֻ������һ�м�¼ -->
<xsl:template name="template-popedit-header-dataObjs" match="dataObjs">
    <xsl:for-each select="dataObjs/dataObj">
    		<xsl:call-template name="template-popedit-dataobj">
    		 <xsl:with-param name="display">none</xsl:with-param>
          </xsl:call-template>
    </xsl:for-each>
</xsl:template>

<!-- �����¼��ģ�壬֮���Խ�������Ϊһ��ģ�壬��Ҫ��Ϊ������
     ������ colIndex  ���������
            dataType  ��������
            order     ���������
-->
<xsl:template name="template-popedit-body-dataObjs" match="dataObjs">
	<xsl:param name="colIndex">0</xsl:param>
	<xsl:param name="dataType">text</xsl:param>
	<xsl:param name="order">ascending</xsl:param>
<!--comment by wanghx for unite cols
    <xsl:for-each select="dataObjs/dataObj">
    	<xsl:sort select="attribute[position()=$colIndex]" data-type="{$dataType}" order="{$order}"/>
    	<xsl:call-template name="template-popedit-dataobj"/>
    </xsl:for-each>
-->
     <xsl:choose>
     <xsl:when test="boolean(/dataWindow/uniteCols)">
        <xsl:for-each select="dataObjs/dataObj">
          <xsl:call-template name="template-popedit-dataobj">
           <xsl:with-param name="display"></xsl:with-param>
          </xsl:call-template>
        </xsl:for-each>
     </xsl:when>
     <xsl:otherwise>
          <xsl:for-each select="dataObjs/dataObj">
    	<xsl:sort select="attribute[position()=$colIndex]" data-type="{$dataType}" order="{$order}"/>
       <xsl:call-template name="template-popedit-dataobj">
        <xsl:with-param name="display"></xsl:with-param>
          </xsl:call-template>
    </xsl:for-each>
      </xsl:otherwise>
    </xsl:choose>

</xsl:template>

<!-- ������¼ģ�� -->
<xsl:template name="template-popedit-dataobj" match="dataObj" >
<xsl:param name="display"></xsl:param>
	<xsl:if test="@status!='DELETED' and @status!='CANCELED' and @hiddened !='true'">
		<xsl:element name = "tr">
			<!-- ΪTR����һ������pos -->
			<xsl:attribute name="pos"><xsl:value-of select="@index"/></xsl:attribute>
			<xsl:attribute name="onmouseover">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').doMouseEvent(this);</xsl:attribute>
			<xsl:attribute name="onmouseout">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').doMouseEvent(this);</xsl:attribute>
			<xsl:attribute name="onclick">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').doMouseEvent(this);</xsl:attribute>
			
			<td width="10">
				<xsl:element name = "input">
					<xsl:attribute name="type">radio</xsl:attribute>
					<xsl:attribute name="style">display:<xsl:value-of select="$display"/></xsl:attribute>
	        		<xsl:attribute name="value"><xsl:value-of select="position()"/></xsl:attribute>
	        		<xsl:attribute name="name"><xsl:value-of select="$DW_ROW_SELECTOR_BEGIN"/><xsl:value-of select="/dataWindow/@name"/></xsl:attribute>
                    <xsl:attribute name="value"><xsl:value-of select="@index"/></xsl:attribute>
					<xsl:if test="@selected='true'">
						<xsl:attribute name="checked"/>
					</xsl:if>
					<xsl:attribute name="onclick">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').rowSelecterOnclick()</xsl:attribute>
				</xsl:element>
			</td>
			<!-- Ӧ�ù���ģ��,��ָ��onDblClick�¼���Ӧ����-->
			<xsl:call-template name="template-common-attributes">
				<xsl:with-param name="dataObjIndex"><xsl:value-of select="@index"/></xsl:with-param>
				<xsl:with-param name="onDblClick">dwManager.getDW('<xsl:value-of select="/dataWindow/@name"/>').cell_onDblClick_pop()</xsl:with-param>
			</xsl:call-template>
		</xsl:element>
	</xsl:if>
</xsl:template>
</xsl:stylesheet>