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
<TITLE>MAC地址维护</TITLE>
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
	 function radioOnclick(address){
		parent.query.document.getElementById("modify").disabled="";
		parent.query.document.getElementById("delete").disabled="";
		parent.query.document.getElementById("address").value=address;
     }   

</script>
</head>
<body onload="init()">
	<ec:table items="macsList" var="macsPermitted" rowsDisplayed="10" action="${pageContext.request.contextPath}/macsPermittedAction.do?method=query"> 
			<ec:row>
				<ec:column cell="radiobox" value="${macsPermitted.macAddress}" alias="radbox" title=" " 
				width="15px" style="text-align:center" onclick="radioOnclick('${macsPermitted.macAddress}')"/>	
				<ec:column property="cityName" title="区域" style="text-align:left"/>
				<ec:column property="hallName" title="营业厅" style="text-align:left"/>
				<ec:column property="contactName" title="联系人" style="text-align:left" />
				<ec:column property="macAddress" title="MAC地址" style="text-align:left" />
				<ec:column property="phoneNumber" title="电话" style="text-align:left"/>
				
		   </ec:row>		
	</ec:table>
    <input type="hidden" id="message" value="<%=message%>"/>
</body>
</html>
