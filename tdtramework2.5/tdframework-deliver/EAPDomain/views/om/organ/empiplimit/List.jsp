<%@ page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%
     String path =request.getContextPath();
     String message = (String)request.getAttribute("message");
%>
<html>
<head>
<TITLE>登录ip维护</TITLE>
<link href="<%=path%>/common/css/td_style.css"    rel=stylesheet></link>
<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>
<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
<script language="javascript">

    var eccn=new ECCN("ec");

	function init(){
	    eccn.doPrep=false;
		eccn.ajaxSubmit=false;
		eccn.init();
		var message = document.getElementById("message").value;
		if(message!=null && message!="" && message != "null"){
			alert(message);
		}
		parent.query.document.getElementById("modify").disabled="true";
		parent.query.document.getElementById("delete").disabled="true";
	}
	 function radioOnclick(workNo,priStartAdd,priEndAdd){
		parent.query.document.getElementById("modify").disabled="";
		parent.query.document.getElementById("delete").disabled="";
		parent.query.document.getElementById("priStartAdd").value=priStartAdd;
		parent.query.document.getElementById("priEndAdd").value=priEndAdd;	
		parent.query.document.getElementById("workNo").value=workNo;	
     } 


</script>
</head>
<body onload="init()">
	<unieap:form action="" method="post">		
	<ec:table items="empIpLimitList" var="empIpLimit" rowsDisplayed="10" action="${pageContext.request.contextPath}/empIpLimitAction.do?method=query"> 
			<ec:row>
				<ec:column cell="radiobox" alias="radbox" title=" " 
				width="15px" style="text-align:center" onclick="radioOnclick('${empIpLimit.workNo }','${empIpLimit.ipStartAdd}','${empIpLimit.ipEndAdd}')"/>	
				<ec:column property="workNo" title="登录账号" style="text-align:left" />
				<ec:column property="employeeName" title="职员姓名" style="text-align:left" />
				<ec:column property="ipStartAdd" title="IP起始地址" style="text-align:left" />
				<ec:column property="ipEndAdd" title="IP终止地址" style="text-align:left" />
				<ec:column property="areaName" title="归属地域" style="text-align:left" />
				<ec:column property="forceName" title="系统限制标记" style="text-align:left" />
				<ec:column property="detailDesc" title="备注" style="text-align:left"/>
				<ec:column property="updateDate" title="更新时间" style="text-align:left" />
				<ec:column property="updaetEmployeeName" title="更新职员" style="text-align:left" />
		   </ec:row>		
	</ec:table>
    <input type="hidden" id="message" value="<%=message%>"/>
    </unieap:form>
</body>
</html>
