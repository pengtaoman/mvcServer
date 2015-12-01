<%
	/* JSP�����Ҫ������Ϣ
	 **************************************************************
	 * ������	: dueList.jsp
	 * ��������    : 2011-06-10
	 * ����		: liuyong.neu@neusoft.com
	 * ģ��		: ����Ԥ����Ϣ
	 * ����		: ����Ԥ����Ϣ�Ĳ�ѯ���ҳ��
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���			�޸�ԭ��
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page contentType="text/html; charset=GBK" language="java" isELIgnored="false"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>

<%
	String webpath = request.getContextPath();
	String cityCode = NullProcessUtil.nvlToString((String) request.getAttribute("cityCode"),""); //�������     
	String custId = NullProcessUtil.nvlToString(request.getParameter("custId"),"");//�ͻ�ID
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>����Ԥ����Ϣ</title>
		<contextPath value="<%=webpath%>" />
		<!-- ����css  -->
		<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
		<link href="<%=webpath%>/custcontact/orderaccept/common/css/style.css"
			rel="stylesheet" type="text/css">
		<!-- ����js  -->
		<script language="javascript"
			src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/eccn.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
		<script type="text/javascript">
			var eccn;
			function init(){
				eccn = new ECCN("ec");
				eccn.init();
			}
		</script>
	</head>
	<body class="mainBody" onload="init();">
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="form_table">
			<tr>
				<td>
				</td>
			</tr>
			<tr>
				<td>
					<ec:table items="optrs" var="pre"
					action="${pageContext.request.contextPath}/newCustRecognitionAction.do?method=getDueQuery" >
						<ec:row highlightRow="true">
							<ec:column property="prodOfferInstId" title="����Ʒʵ��"></ec:column>
							<ec:column property="prodOfferId" title="����Ʒ"></ec:column>
							<ec:column property="custId" title="�ͻ�����"></ec:column>
							<ec:column property="effDate" title="��¼��Чʱ�� "></ec:column>
							<ec:column property="expDate" title="��¼��Чʱ�� "></ec:column>
							<ec:column property="prodOfferType" title="����Ʒ����"></ec:column>
							<ec:column property="cityCode" title="����"></ec:column>	
							<ec:column property="effOrderItemId" title="��Ч�������ʶ"></ec:column>
							<ec:column property="expOrderItemId" title="ʧЧ�������ʶ"></ec:column>
						</ec:row>
					</ec:table>
				</td>
			</tr>
		</table>
		<input type="hidden" name="cityCode" id="cityCode"value="<%=cityCode%>" />
		<input type="hidden" name="custId" id="custId" value="<%=custId%>" />
	</body>
</html>
