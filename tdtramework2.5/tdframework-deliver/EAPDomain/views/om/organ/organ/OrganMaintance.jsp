<%@ page contentType="text/xml; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>

<% 
	String operType = (String)request.getAttribute("OperType");
	String organId = (String)request.getAttribute("OrganId");
	String organKind = (String)request.getAttribute("OrganKind");
	String belongArea = (String)request.getAttribute("BelongArea");
	String path = request.getContextPath();
	String message = (String)request.getAttribute("Message");
	if(message == null){
		message = "";
	}
%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/organ/OrganMaintance.xsl"?>

<root>
	<create>
    <path><%=path%></path> 
    <OperType><%=operType%></OperType>
    <Id><%=organId%></Id>
    <Kind><%=organKind%></Kind>
    <BelongArea><%=belongArea%></BelongArea>
   </create> 
</root>