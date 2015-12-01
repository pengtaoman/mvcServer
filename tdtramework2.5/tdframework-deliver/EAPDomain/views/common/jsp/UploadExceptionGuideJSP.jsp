<%@ page import="org.apache.struts.Globals" %>
<%@ page session="true"%>
<%@ page buffer="none" autoFlush="true" %>
<%@ page contentType="text/html; charset=GB2312" %>

<%
String webpath = request.getContextPath();
Exception ex = (Exception)request.getAttribute(Globals.EXCEPTION_KEY);
%>
<html>
<head>
<title>CRM</title>
</head>
<link href="<%=webpath%>/common/css/main_style.css" rel="stylesheet">
<body onmousedown="helpor()">
<TABLE border=0 width=100% height=100%>
<p align="center"><FONT class=blue30px></FONT></p>
<TR>
  <TD align=center>
    <b><FONT color="blue"><marquee width=30 scrollamount=1 behavior=alternate><-</marquee>&nbsp;操作出现异常，上传失败! </FONT></b>
    <br/>
<%
	if(ex!=null) {
		out.print(ex);
	    out.print("<script>");
	    out.print("alert(\"" + ex.getMessage() + "\")");
	    out.print("</script>");
    }
%>
    <BR>
    <BR>
  </TD>
</TR>
<tr><td align=center><IMG SRC="<%=webpath%>/views/common/images/01-11-006-11.gif" WIDTH="191" HEIGHT="36" BORDER=0 ALT=""></td></tr>
</table>
</body>
</html>
