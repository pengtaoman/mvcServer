<%@ page session="true"  contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>

<%
	String webpath = request.getContextPath();
	String message = (String)request.getAttribute("message");
	//System.out.println(message);
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

<unieap:base/>

<script  language="javascript" src="<%=webpath%>/common/js/prototypeajax.js"> </script>
<script  language="javascript" src="<%=webpath%>/common/js/eccn.js"> </script>
<script  language="javascript" src="<%=webpath%>/tdframework/demo/js/statusInfoList.js"> </script>
<script  language="javascript">
<%
	if(message != null){
%>
	alert("<%=message%>");
<%
	}
%>	
</script>

</head>

<body class="mainBody" onload="init();">
<td:PrintObject/>
<ec:table items="optrs" var="pre" rowsDisplayed="5" action="${pageContext.request.contextPath}/batchFileManager.do?method=query">
	<ec:extend>
		<input type="hidden" name="alertMsg" value="<%=message%>">
	</ec:extend>
	<ec:row>
		<ec:column property="batch_no" title="文件批次号" />
		<ec:column property="create_operator" title="创建导入用户" />
		<ec:column property="create_date" title="文件导入时间" style="width:100px">
			<span style="width:100px" class="ellipsis" onclick="showAllText(this)">${pre.create_date}</span>
		</ec:column>
		<ec:column property="status" title="文件状态"/>
		<ec:column property="finish_date" title="处理完成时间" style="width:100px">
			<span style="width:100px" class="ellipsis" onclick="showAllText(this)">${pre.finish_date}</span>
		</ec:column>
	</ec:row>
</ec:table>
</body>
</html>