<%@ page session="true"  contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<html>
<%
	String webpath = request.getContextPath();
	String message = (String)request.getAttribute("message");
	String roleId = (String)request.getAttribute("roleId");
	String operType = (String)request.getAttribute("operType");
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<base target="_self">
<title>角色对应数据源表信息</title>
<contextPath value="<%=webpath%>"/>

<!-- 禁止 windows 主题风格ss -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- 禁止缓存 headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet>
<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
<script language="javascript" src="<%=webpath%>/common/js/td_common.js" ></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>	
<script language="javascript" src="<%=webpath%>/common/js/eccn.js"> </script>
<script language="javascript" src="<%=webpath%>/views/om/organ/dataParamRole/dataParamManage/js/roleTableInfo.js"></script>

</head>
<body onload="init()" class="mainBody">
<ec:table items="ParamRoleTable" rowsDisplayed="-1" var="pre" paginationLocation="false">
<ec:row ondblclick="openDetailPage('${pre.table_id}');"> 
	<ec:column cell="checkbox"  headerCell="checkbox" width="15" 
		alias="table_ids" 	value="${pre.table_id}" onclick="" />
	<ec:column property="table_desc" title="数据源表信息"/>
	<ec:column property="paramTableDescValue" title="过滤权限描述信息" style="width:300px">
		<span style="width:300px" class="ellipsis" onclick="showAllText(this)">${pre.param_table_desc}</span>
	</ec:column>
</ec:row>
</ec:table>
<div class="formButtonDIV" id="filebutton" style="display:block"> 
	<button class="formButton" name="add" id="add" onclick="openAddPage()" disabled="disabled">新&#160;&#160;增</button>
	<button class="formButton" name="delete" id="delete" onclick="deleteParamTable()" disabled="disabled">删&#160;&#160;除</button>
</div>
<input type="hidden" id="message" value='<%=message%>' />
<input type="hidden" id="roleId" value='<%=roleId%>' />
<input type="hidden" id="operType" value='<%=operType%>' />
</body>
</html>