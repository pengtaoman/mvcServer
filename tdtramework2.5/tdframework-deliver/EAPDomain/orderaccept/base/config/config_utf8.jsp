<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String _webPath = request.getContextPath();
	String _path = request.getContextPath();
	String cmpPath = request.getRequestURI();
	String themePath = _path + "/unieap/ria3.3/unieap/themes/blue/css";
	boolean _PUBLICATION = false;
%>

<link rel="stylesheet" type="text/css"
	href="<%=_path%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"
	charset="utf-8"></link>
<link rel="stylesheet" type="text/css"
	href="<%=themePath%>/<%=_PUBLICATION ? "unieap-all.css" : "unieap.css"%>"
	charset="utf-8"></link>

<script type="text/javascript"
	src="<%=_webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"
	charset="utf-8"></script>
<script type="text/javascript"
	src="<%=_webPath%>/buscard/common/js/buscard_2.0.js"></script>
<script src="<%=_webPath%>/unieap/ria3.3/dojo/dojo.js"></script>
<script type="text/javascript"
	src="<%=_webPath%>/orderaccept/riaconfig/crm1InitConfig.js"
	charset="utf-8"></script>
