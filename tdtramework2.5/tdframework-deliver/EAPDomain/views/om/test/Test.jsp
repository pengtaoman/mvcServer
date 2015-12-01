<%@ page contentType="text/xml; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/authorize.tld" prefix="auth" %>

<% 
	String path = request.getContextPath();
%>

<?xml version="1.0" encoding="gb2312"?>  
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/test/Test.xsl"?>

<root>
	<Path><%=path%></Path>
  <auth:DisabledButtonList currentRequest="<%=request%>" employeeId="999" buttonString="180AAA" />
</root>
