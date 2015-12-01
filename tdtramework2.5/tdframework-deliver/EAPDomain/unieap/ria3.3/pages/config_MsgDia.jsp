<%
String path = request.getContextPath();
String themePath = path + "/unieap/ria3.3/unieap/themes/blue/css";
java.util.Properties envProp = (java.util.Properties)request.getSession().getServletContext().getAttribute("ENVCONF");
//System.out.println("???????????????????????????????????    " + envProp.getProperty("td.jscompress.flag"));
boolean isCompressJs = false;
if ("1".equals(envProp.getProperty("td.usejscompress.flag"))) {
	isCompressJs = true;
}
%>

<% if(!isCompressJs) { %>

		<link rel="stylesheet" type="text/css" href="<%=path%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
        <link rel="stylesheet" type="text/css" href="<%=path%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/> 
  	    <script language="javascript" src="<%=path%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=path%>/unieap/ria3.3/pages/MsgGlobalConfig.js"></script>
        <script language="javascript" src="<%=path%>/unieap/ria3.3/pages/MessageBox.js"></script>
        <script language="javascript" src="<%=path%>/unieap/ria3.3/pages/openWinDialog.js"></script>
<%} else{%>

        <link rel="stylesheet" type="text/css" href="<%=themePath%>/unieap-combo.css" ></link>
  	    <script language="javascript" src="<%=path%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=path%>/unieap/ria3.3/pages/MsgGlobalConfig.js"></script>
        <script language="javascript" src="<%=path%>/unieap/ria3.3/pages/MessageBox.js"></script>
        <script language="javascript" src="<%=path%>/unieap/ria3.3/pages/openWinDialog.js"></script>
<%} %>
