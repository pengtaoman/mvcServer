<%
	 /* 
	 **************************************************************
	 * ������		: PreAcceptInfoList.jsp
	 * ��������  	: 2011��2��16��
	 * ����		: RKligx
	 * ģ��		: �ͻ�Ԥ������Ϣ�б�
	 * ����		: 
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���	�޸�ԭ��
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%
	String webPath = request.getContextPath();
	String preRgstNo = "";
	String firstName = "";
	String identityAddress = "";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<contextPath value="<%=webPath%>" />
	<link rel="stylesheet" href="<%=webPath%>/common/css/td_style_new.css" type="text/css" />
	<link href="<%=webPath%>/common/css/td_style_ec.css" rel="stylesheet">
	<!-- ����js  -->
	<script language="javascript" src="<%=webPath%>/unieap/js/Globals.js"></script>
	<script language="javascript" src="<%=webPath%>/unieap/js/Common.js"></script>
	<script language="javascript" src="<%=webPath%>/custcontact/common/businessmodule/jscu/Jscu.js"></script>
	<script language="javascript" src="<%=webPath%>/custcontact/orderaccept/base/Common.js"></script>
	<script language="javascript" src="<%=webPath%>/orderaccept/common/js/CommonUtils.js"></script>	
	<script language="javascript" src="<%=webPath%>/common/js/td_common.js"></script>
	<script language="javascript" src="<%=webPath%>/common/js/prototypeajax.js"> </script>
	<script language="javascript" src="<%=webPath%>/common/js/eccn.js"> </script>
	<script language="javascript" src="<%=webPath%>/common/js/td_date.js" ></script>
	<script language="javascript" src="<%=webPath%>/custcontact/orderaccept/common/js/switchdown.js"></script>
	<script language="javascript" src="<%=webPath%>/orderaccept/custRecognition/js/PreAcceptInfoList.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css" />
	<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css" />
	<script language="javascript" src="<%=webPath%>/buscard/common/js/buscard_2.0.js"></script>
	<script language="javascript" src="<%=webPath%>/unieap/ria3.3/dojo/dojo.js"></script>
	<script language="javascript" src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
	<script language="javascript" src="<%=webPath%>/orderaccept/common/dialog/MessageBox.js"></script>
  </head>
  
  <body onload="init()">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" class="form_table">
    	<tr>
    		<td>
    			<ec:table items="preAcceptInfoVOList" var="vo" action="" rowsDisplayed="-1" paginationLocation="no" resizeColWidth="false" style="table-layout:auto;" >			
					<ec:row  style="cursor:hand"  >
						<ec:column property="preRgstNo" title="Ԥ������" styleClass="eccolomntext" />
						<ec:column property="padNo" title="Pad�浥��" styleClass="eccolomntext" />				
						<ec:column property="firstName" title="�ͻ�����"  styleClass="eccolomntext" />	
						<ec:column property="serviceId" title="ҵ�����"  styleClass="eccolomntext" />
						<ec:column property="identityCode" title="֤������"  styleClass="eccolomntext" />
						<ec:column property="identityAddress" title="֤����ַ"  styleClass="eccolomntext" />
						<ec:column property="contactPerson" title="��ϵ��"  styleClass="eccolomntext" />
						<ec:column property="contactPhone" title="��ϵ�绰"  styleClass="eccolomntext" />
						<ec:column title="����" styleClass="eccolomntext operating_area" property="radioBx">
							<button class="titleButton" onclick="onPreAcceptBtn('${vo.preRgstNo}');">Ԥ����ת��ʽ</button>
						</ec:column>
					</ec:row>	 
				</ec:table>
    		</td>
    	</tr>
    </table>
  </body>
</html>
