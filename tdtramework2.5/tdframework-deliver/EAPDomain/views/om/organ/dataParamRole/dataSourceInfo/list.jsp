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
	<!-- 禁止 windows 主题风格ss -->
	<meta http-equiv="MSThemeCompatible" content="no" />
	<!-- 禁止缓存 headers -->
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
				<ec:column property="tableId" title="标识" />
				<ec:column property="tableName" title="数据源表名" />
				<ec:column property="tableDesc" title="数据源表描述" />
				
				<ec:column property="columnInfo" title="字段信息" />
				<ec:column property="columnKind" title="字段类型" />
				<ec:column property="columnType" title="字段作用" />
					
				<ec:column property="columnOrder" title="字段顺序" />
				<ec:column property="columnDesc" title="字段描述" />
				<ec:column property="filterId" title="关联过滤器" />
			</ec:row>
		</ec:table>
		<div style="display: none">
			<!-- 单击某行时存 该行主键值修改action中获取该值-->
		    <input type="text"  name="modiValue" id="modiValue"  />
		</div>
	</body>
</html>
