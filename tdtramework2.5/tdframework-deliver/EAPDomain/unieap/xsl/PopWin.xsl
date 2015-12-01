<?xml version="1.0" encoding="GBK" standalone="no"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- �ؼ�����ģ�� -->
<xsl:import href="DataWindowConfig.xsl"/>
<xsl:import href="DataWindowCommon.xsl"/>
<xsl:template match = "dataWindow">
	<xsl:call-template name="template-openwin-editers"/>	
</xsl:template>	
<!-- ��������ʹ�õĽ���ģ�壬����ԭ��editer_[dw name]_[index] -->	
<xsl:template name="template-openwin-editers" match="editers">	
		<br/>	
		<center>		
		<table class="NEUBodyListTableback" cellSpacing="0" borderColorDark="#ffffff" cellPadding="2" bgColor="#f4f4f4" borderColorLight="#848284" border="1"  width="400">
			<tr><td>							
			<table id="dwDataOneRecordTbl" width="100%" border="1"  bordercolordark="#FFFFFF" bordercolorlight="#848284" cellpadding="2" cellspacing="0" bgcolor="#FFFFFF" class="NEUDwListTable">								
				<form id="{$DW_FORM_NAME}"> 
				<xsl:variable name="colspan"><xsl:value-of select="2 * /dataWindow/editers/@colsInOneRow"/></xsl:variable>	
				<tr><td colspan="{$colspan}" class="NEUDwOpenWinTitleTD" align="left" bgColor="#f4f4f4">
					<xsl:value-of select="/dataWindow/@title"/>
				</td></tr>			    	
				<!-- ���ÿɼ��༭������ģ��  -->
				<xsl:call-template name="template-displayEditer-core"/>									
			    </form>		
	        	<tr>	  
	        	    <xsl:variable name="colspan"><xsl:value-of select="2 * /dataWindow/editers/@colsInOneRow"/></xsl:variable>	      	    
	        		<td colspan="{$colspan}" align="center" >        									        			
	        			<input id="{$DW_BUTTON_SAVE_BEGIN}{/dataWindow/@name}" type="button" class="NEUDwButton" value="����" onclick="javaScript:if(window.dialogArguments.dwManager.getActiveDW().popwin_save_onclick(document)) window.close();"/>	        				        				
	        			<input type="button" class="NEUDwButton" value="�ر�" onclick="javaScript:window.close();"/>
	        		</td>
	        	</tr>
		    </table>			
	    </td></tr></table></center>    
</xsl:template>	
</xsl:stylesheet>