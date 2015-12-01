<%@ page contentType="text/html; charset=gb2312" %>
<%@ page language="java" import="java.lang.*,java.util.*" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
String path = request.getContextPath();
String message = (String)request.getAttribute("alertMessage");
String operType = (String)request.getAttribute("operType");
message = NullProcessUtil.nvlToString(message,"");
if("".intern() != message.intern()){
	message = message.replaceAll(" ","");
	message = message.replaceAll("\"","'");
}
%>

<html>
  <head>
    <title></title>
  </head>
  <script>
  function init(){

		if(myform.errorInfo.value != ""){
			alert(myform.errorInfo.value);
		}
		if(myform.operType.value=="add" || myform.operType.value=="delete"){
			var organKind = parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value;
			var belongArea = parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
			var organId = parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
			var dutyId = parent.organdisplayhidden.document.myform.CurrentSelectDutyId.value;
			var webPath = myform.path.value;
			var link = webPath+"/om/employeeListQueryByDuty.do?"+"&OrganKind="+organKind+"&BelongArea="+belongArea+"&OrganId="+organId+"&DutyId="+dutyId+"&OperType=employeeList";
			parent.employeelist.location.href = link;
		}
	}
</script>
  <body onload="init()" bgcolor="transparent">
  <form name="myform">
    <input type="hidden" name="errorInfo" value="<%=message%>"/>
    <input type="hidden" name="operType" value="<%=operType%>"/>
    <input type="hidden" name="path" value="<%=path%>"/>
  </form>
  </body>
</html>
