<?xml version="1.0" encoding="GBK" standalone="no"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+    
+	�ļ�˵���� ���ݴ��ڽ���ģ�弯��������������ΪFREE_EDIT�����ݴ��ڡ�
+   		   ����������Ϊ��template_����_�ڵ�����
+   ����  �ˣ� ���⻪ hugh@neusoft.com
+   ����ʱ�䣺 2003-04-30
+   �޸�������
+
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

<xsl:import href="DataWindowConfig.xsl"/>
<xsl:import href="DataWindowCommon.xsl"/>

<!-- ģ��: ���������ݴ��ڽ������ -->
<xsl:template name="template-freeedit-dataWindow" match = "dataWindow">	    	
	<!-- ���ÿɼ��༭ģ�� -->		
	<xsl:if test="/dataWindow/editers/@isAutoDraw = 'true' ">
		<xsl:call-template name="template-displayEditer"/>
	</xsl:if>	
</xsl:template>	
</xsl:stylesheet>