<%@ page contentType="text/html; charset=gb2312"%>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>

<%String path = request.getContextPath();
            String message = (String) request.getAttribute("message") == null ? "" : (String) request
                    .getAttribute("message");
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gbk">
	<title>Query Result</title>
	<contextPath value="<%=path%>"/>
	<!-- ��ֹ windows ������ss -->
	<meta http-equiv="MSThemeCompatible" content="no" />
	<!-- ��ֹ���� headers -->
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="-1" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	
	<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
	<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>

	<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
	<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
	<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
	<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
	<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
	<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
	<script language="javascript" src="<%=path%>/views/om/organ/dataParamRole/dataSourceInfo/js/list.js"></script>
</head>
	<body onLoad="init('<%=message%>')" class="mainBody">
		<ec:table items="dataSourceInfoObjs" var="infoObjs" rowsDisplayed="10" 
			action="${pageContext.request.contextPath}/datasourceinfo.do?method=query">
			<ec:parameter name="checkboxs" value="" />
			<ec:row ondblclick="doModify('${infoObjs.tableId}','${infoObjs.columnInfo}')">
				<ec:column cell="checkbox" headerCell="checkbox" alias="checkboxs" width='15' value="${infoObjs.tableId}~${infoObjs.columnInfo}"  />
				<ec:column property="tableId" title="��ʶ" />
				<ec:column property="tableName" title="����Դ����" />
				<ec:column property="tableDesc" title="����Դ������" />
				
				<ec:column property="columnInfo" title="�ֶ���Ϣ" />
				<ec:column property="columnKind" title="�ֶ�����" />
				<ec:column property="columnType" title="�ֶ�����" />
					
				<ec:column property="columnOrder" title="�ֶ�˳��" />
				<ec:column property="columnDesc" title="�ֶ�����" />
				<ec:column property="filterId" title="����������" />
			</ec:row>
		</ec:table>
		<div style="display: none">
			<!-- ����ĳ��ʱ�� ��������ֵ�޸�action�л�ȡ��ֵ-->
		    <input type="text"  name="modiValue" id="modiValue"  />
		</div>
	</body>
</html>
