<%@ page session="true"  contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>

<%
	String webpath = request.getContextPath();
%>

<html>
<head>

<title>Query Result</title>

<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<meta http-equiv="MSThemeCompatible" content="no" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />

<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet>
<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>

<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=webpath%>/common/js/prototypeajax.js"> </script>
<script language="javascript" src="<%=webpath%>/common/js/eccn.js"> </script>
<script language="javascript" src="<%=webpath%>/tdframework/demo/js/queryResult.js"> </script>

<script language="javascript">

function click1(){
	//alert(obj.innerHtml);
	var message = document.getElementsByName("pathValue")[0].value;
	alert(message);
}
</script>

</head>

<body class="mainBody" onload="init2();">
	<ec:table items="optrs" var="pre" rowsDisplayed="-1"  showPrint="true" maxRowsExported="25" 
              action="${pageContext.request.contextPath}/demoExtremeTable.do?method=queryAll" paginationLocation="false">
		<ec:extend>
			<input type="button" class="exportButton exportPrint" onclick="javascript:EccnUtil.doExport('ec','print','_print_');" alt="打印" />
			<input type="button" class="exportButton exportXls" onclick="EccnUtil.doExportList('ec','不要分页只要导出.xls');" alt="导出" />
		</ec:extend>
		<ec:exportXls fileName="名单test.xls" />
		<ec:row>
			<ec:column cell="checkbox" headerCell="checkbox" width="15" alias="chkbx_user" 
		        	   value="${pre.workno}" onclick="alert('${pre.workno}')" calcspan="3"/>
			<ec:column property="id">
				<a href="#" onclick="modify2('${pre.workno}')" title="点击进入编辑页面">${pre.id}</a>
			</ec:column>
			<ec:column property="名字" title="删除" width="30">
				<input type="image" src="<%=webpath%>/common/images/icon/delete.gif" style="width:20px" 
			   	       onClick="alert('hello');EccnUtil.noExport('ec');return;" value="${pre.workno}"/>				 
			</ec:column>
			<ec:column property="name" title="名字" style="width:100px">
				<span style="width:100px" class="ellipsis" onclick="showAllText(this)">${pre.name}</span>
			</ec:column>
			<ec:column property="area" calc="total" calcTitle= "总数(自定义)"/>
			<ec:column property="organ" />
			<ec:column property="workno" />
		</ec:row>
	</ec:table>
</body>
</html>