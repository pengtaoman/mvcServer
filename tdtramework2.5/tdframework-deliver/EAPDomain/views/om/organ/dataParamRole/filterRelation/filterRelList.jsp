<%@ page contentType="text/html; charset=gb2312"%>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%
	String path = request.getContextPath();
    String message = (String)request.getAttribute("message")==null?"":(String) request.getAttribute("message");
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
	<script language="javascript" src="<%=path%>/views/om/organ/dataParamRole/filterRelation/js/filterRelList.js"></script>
</head>
	<body onLoad="init('<%=message%>')" class="mainBody">
		<ec:table items="result" rowsDisplayed="-1" var="pre" paginationLocation="false">
			<ec:parameter name="checkboxs" value="" />
			<ec:row ondblclick="showModifyPage('${pre.tableId}','${pre.mainFilterInfo}');">
				<ec:column cell="checkbox" headerCell="checkbox" alias="checkboxs" 
					width='15' value="${pre.tableId}~${pre.mainFilterInfo}~${pre.filterId}"/>
				<ec:column property="tableInfo" title="����Դ��"/>
				<ec:column property="mainFilterInfo" title="�����ֶ�"/>
				<ec:column property="mainFilterTable" title="������������"/>
				<ec:column property="filterInfo" title="������������"/>
				<ec:column property="paramColumnInfo" title="������������Ӧ�ֶ�"/>
				<ec:column property="passiveFilterInfo" title="������ѯ������Ϣ"/>
			</ec:row>
		</ec:table>
	</body>
</html>
