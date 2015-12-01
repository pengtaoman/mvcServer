<?xml version="1.0" encoding="gb2312"?>
<%@ page contentType="text/xml; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.om.dao.employee.EmployeeColl" %>
<%@ page import="com.neusoft.om.dao.employee.EmployeeVO" %>

<% 
	String path = request.getContextPath();
	String alertMessage = (String)request.getAttribute("alertMessage");
	EmployeeColl employeeColl = (EmployeeColl)request.getAttribute("employeeColl");
	if(alertMessage == null){
		alertMessage = "";
	}
%>

<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/employeeduty/EmployeeList.xsl"?>

<root>
	<alertMessage><%=alertMessage%></alertMessage>
	<employeeColl>
		<%
     	if(employeeColl!=null){
      	int rowcount = employeeColl.getRowCount();
		    for(int i=0;i<rowcount;i++){
		    	EmployeeVO vo = employeeColl.getEmployee(i);%>
		<!--人员列表信息-->
		<list>
  		<RowNo><%=i+1%></RowNo>
  		<EmployeeId><%=vo.getEmployeeId()%></EmployeeId>
  		<EmployeeName><%=vo.getEmployeeName()%></EmployeeName>
		</list>
	 		<%} 
	 		}%>
	</employeeColl>
    <path><%=path%></path> 
</root>
