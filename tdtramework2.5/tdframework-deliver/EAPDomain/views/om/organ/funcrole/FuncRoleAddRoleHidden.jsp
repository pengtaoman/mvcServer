<%@ page contentType="text/xml; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ page import="com.neusoft.om.dao.role.RoleColl"%>

<% 
	String path = request.getContextPath();
	String message = (String)request.getAttribute("Message");
	String operFlag = (String)request.getAttribute("OperFlag");
	String operType = (String)request.getAttribute("OperType");
	RoleColl roleColl =(RoleColl)request.getAttribute("RoleColl");
	if(message == null){
		message = "";
	}
%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/funcrole/FuncRoleAddRoleBanner.xsl"?>
<root>
	<create>
    <path><%=path%></path> 
   </create> 
</root>