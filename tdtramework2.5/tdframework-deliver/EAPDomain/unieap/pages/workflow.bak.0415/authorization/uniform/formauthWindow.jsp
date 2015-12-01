<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<html>
<head>
<title><bean:message bundle="uniflow" key = "workflow.authorization.uniform.title"/></title>
<script language="javascript">
function save(){
       form_applet.savePolicies();
}
</script>

</head>
<%
String strarti = new String((request.getParameter("participants")).getBytes("iso-8859-1"));
%>
<frameset rows="10,*,20" border="1">
<frame id="001" name="001" border="1" scrolling="no">
<frameset cols="200,*" border="1">
     <frame id="leftframe" src="<%=request.getContextPath()%>/participantstree.do?formid=<%=request.getParameter("formid")%>&activityid=<%=request.getParameter("activityid")%>&participants=<%=request.getParameter("participants")%>" 
             scrolling="no" name="leftframe" >
 	 <frame id="rightframe" name="rightframe">
</frameset>
<frame id="002" name="002" border="1" scrolling="no">
</frameset>
<body>
</BODY>
</html>