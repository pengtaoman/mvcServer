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
<TITLE>��¼ipά��</TITLE>
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
	 function radioOnclick(logId, workNo){
		parent.query.document.getElementById("modify").disabled="";
		parent.query.document.getElementById("delete").disabled="";
		parent.query.document.getElementById("priLogId").value=logId;
		parent.query.document.getElementById("priWorkNo").value=workNo;	
     } 


</script>
</head>
<body onload="init()">
	<unieap:form action="" method="post">		
	<ec:table items="empLoginTimeList" var="empLoginTime" rowsDisplayed="10" action="${pageContext.request.contextPath}/empLoginTimeAction.do?method=query"> 
			<ec:row>
				<ec:column cell="radiobox" alias="radbox" title=" " 
				width="15px" style="text-align:center" onclick="radioOnclick('${empLoginTime.logId }','${empLoginTime.workNo}')"/>
				<ec:column property="logId" title="��ʶ" style="text-align:left" />	
				<ec:column property="workNo" title="��¼�˺�" style="text-align:left" />
				<ec:column property="employeeName" title="ְԱ����" style="text-align:left" />
				<ec:column property="startDate" title="��ʼ����" style="text-align:left" />
				<ec:column property="startTime" title="��ʼʱ��" style="text-align:left" />
				<ec:column property="endDate" title="��������" style="text-align:left" />
				<ec:column property="endTime" title="����ʱ��" style="text-align:left" />
				<ec:column property="forceName" title="��������" style="text-align:left" />
				<ec:column property="detailDesc" title="��ע" style="text-align:left"/>
				<ec:column property="updateDate" title="����ʱ��" style="text-align:left" />
				<ec:column property="updaetEmployeeName" title="����ְԱ" style="text-align:left" />
				<ec:column property="updOrganName" title="���²���" style="text-align:left" />
		   </ec:row>		
	</ec:table>
    <input type="hidden" id="message" value="<%=message%>"/>
    </unieap:form>
</body>
</html>
