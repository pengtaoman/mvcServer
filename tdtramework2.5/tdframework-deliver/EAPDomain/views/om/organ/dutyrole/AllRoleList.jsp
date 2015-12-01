<%@ page import="com.neusoft.om.dao.role.RoleVO" %>
<%@ page import="com.neusoft.om.dao.role.RoleColl" %>
<?xml version="1.0" encoding="gb2312"?>
<%@ page contentType="text/xml; charset=gb2312" %>

<% 
	String path = request.getContextPath();
	String alertMessage = (String)request.getAttribute("alertMessage");
	RoleColl roleColl = (RoleColl)request.getAttribute("RoleColl");
	if(alertMessage == null){
		alertMessage = "";
	}
%>

<?xml-stylesheet type="text/xsl" href="<%=path%>/views/om/organ/dutyrole/AllRole.xsl"?>

<root>
	<alertMessage><%=alertMessage%></alertMessage>
	<roleColl>
		<%
     	if(roleColl!=null){
      	int rowcount = roleColl.getRowCount();
		    for(int i=0;i<rowcount;i++){
		    	RoleVO vo = roleColl.getRole(i);%>
		<!--人员列表信息-->
		<role>
  		<RowNo><%=i+1%></RowNo>
  		<roleId><%=vo.getRoleId()%></roleId>
  		<roleName><%=vo.getRoleName()%></roleName>
		</role>
	 		<%} 
	 		}%>
	</roleColl>
    <path><%=path%></path> 
</root>
