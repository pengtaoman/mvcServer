<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
	String webPath = request.getContextPath();
	String path = request.getContextPath();
	String cmpPath = request.getRequestURI();
	String themePath = path + "/unieap/ria3.3/unieap/themes/blue/css";
	boolean PUBLICATION = false;
%>

<link rel="stylesheet" type="text/css"
	href="<%=path%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"
	charset="utf-8"></link>
<link rel="stylesheet" type="text/css"
	href="<%=themePath%>/<%=PUBLICATION ? "unieap-all.css" : "unieap.css"%>"
	charset="utf-8"></link>

<script type="text/javascript"
	src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"
	charset="utf-8"></script>
<script type="text/javascript"
	src="<%=webPath%>/buscard/common/js/buscard_2.0.js" charset="utf-8"></script>
<script src="<%=webPath%>/unieap/ria3.3/dojo/dojo.js" charset="utf-8"></script>
<script type="text/javascript"
	src="<%=webPath%>/orderaccept/riaconfig/crm1InitConfig.js"
	charset="utf-8"></script>
<!--<script type="text/javascript"
	src="<%=webPath%>/prodOfferSaleAction.do?method=combo&sf=/orderaccept/prodofferaccept/moduleDependence.js"
	charset="utf-8"></script>
-->