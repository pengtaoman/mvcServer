<%@ page contentType="text/xml; charset=gb2312" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.om.dao.systemoperate.SystemOperateVO" %>
<%@ page import="com.neusoft.om.dao.systemoperate.SystemOperateColl" %>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeVO" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>

<% String path = request.getContextPath();
	
	SystemOperateVO vo = (SystemOperateVO)request.getAttribute("onesys");
	AuthorizeVO authrizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);

%>

<?xml version="1.0" encoding="gb2312"?>
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/menuoperate/SystemOperate.xsl"?>


<root>
	<create>
	<SystemId><%=vo.getSystemId()%></SystemId>>
	<SystemName><%=vo.getSystemName()%></SystemName>
	<SystemType>
			<option>
				<value>0</value>
				<caption>cs�ṹ</caption>
			</option>
   			<option>
				<value>1</value>
				<caption>bs�ṹ,����Ҫ�ڿ������ʾ</caption>
			</option>
			<option>
				<value>2</value>
				<caption>�й���������</caption>
			</option>
			<selected><%=vo.getSystemType()%></selected>
	</SystemType>
	<DetailDesc><%=vo.getDetailDesc()%></DetailDesc>
	<PortalWinId><%=vo.getPortalWinId()%></PortalWinId>
    <path><%=path%></path> 
   </create> 
</root>