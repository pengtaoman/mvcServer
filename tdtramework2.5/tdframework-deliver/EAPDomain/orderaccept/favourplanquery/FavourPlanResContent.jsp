<%/* 
			 **************************************************************
			 * ������	:FavourPlanQueryResContent.jsp
			 * �������� : 
			 * ����		: li.m@neusoft.com
			 * ģ��		: 
			 * ����		:
			 * ��ע		: version20111114001
			 * ------------------------------------------------------------
			 * �޸���ʷ
			 * ���		����		�޸���			�޸�ԭ��
			 * 1 20111114	li.m	  REQ2011102496501 ���������ʻ����ײͲ�ѯ���ܵ�����
			 * 2
			 **************************************************************
			 */
%>
<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%
String webpath = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>
			��ѯ
		</title>
		<contextPath value="<%=webpath%>" />
		<!-- ����css  -->
		<link rel="stylesheet" href="<%=webpath%>/common/css/td_style.css" type="text/css" />
		<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
		<!-- ����js  -->
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language=javascript src="<%=webpath%>/common/js/prototypeajax.js"> </script>
		<script language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
		<script type="text/javascript" src="<%=webpath%>/orderaccept/favourplanquery/js/FavourPlanBottom.js"></script>
	</head>
	<body class="mainBody" onload="init();">
		<ec:table items="resultList" var="pre" toolbarContent="navigation|pagejump|pagesize|export|extend|status" action="${pageContext.request.contextPath}/favourPlanQueryAction.do?method=doQuery" resizeColWidth="false"
    		style="table-layout:auto;" rowsDisplayed="10">
    		<ec:exportXls fileName="�ʻ��ײͲ�ѯ.xls" text="good"></ec:exportXls>
			<ec:row>
				<ec:column property="rowNum" title="���"  />
				<ec:column property="fcityCode" title="����"  />
				<ec:column property="serviceId" title="ҵ�����" />
				<ec:column property="fcustomerId" title="�ͻ���ʶ" />
				<ec:column property="faccountId" title="�ʻ���ʶ" />
				<ec:column property="fserviceKind" title="�ײ�����" />
				<ec:column property="ffavourName" title="�ײ�����" />
				<ec:column property="ffavourDesc" title="�ײ�����" />
				<ec:column property="fbegDate" cell="date" format="yyyy-MM-dd" title="��Чʱ��" />
				<ec:column property="fendDate" cell="date" format="yyyy-MM-dd" title="ʧЧʱ��" />
			</ec:row>			
		</ec:table>				
	</body>
</html>
