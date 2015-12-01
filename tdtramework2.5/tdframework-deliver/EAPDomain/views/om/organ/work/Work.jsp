<%@ page contentType="text/xml; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/authorize.tld" prefix="auth" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ page import="com.neusoft.om.dao.work.WorkColl"%>
<%@ page import="com.neusoft.om.dao.work.WorkVO"%>
<%@ page import="com.neusoft.om.dao.system.SystemColl"%>

<% 
	String path = request.getContextPath();
	String message = (String)request.getAttribute("Message");
	WorkColl workColl = (WorkColl)request.getAttribute("WorkColl");
	SystemColl systemColl = (SystemColl)request.getAttribute("SystemColl");
	String systemName = "";
	if(message == null){
		message = "";
	}
%>

<?xml version="1.0" encoding="gb2312"?>  
<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/work/Work.xsl"?>

<root>
	<create>
		<%
			if(workColl!= null && workColl.getRowCount()>0){
				for(int i=0;i<workColl.getRowCount();i++){
					WorkVO vo = new WorkVO();
					vo = workColl.getWork(i);
					systemName = systemColl.getSystem(vo.getSystemId()).getSystemName(); 
		%>
		<WorkInfo>
			<RowNo><%=i+1%></RowNo>
			<%=vo.toString(2)%>
			<SystemName><%=systemName%></SystemName>
		</WorkInfo>
		<%	}
			}
		%>
		
    <path><%=path%></path> 
    <message><%=message%></message>
   </create> 
</root>