
<html locale="true">
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>

  <head>
    <base href='<%=basePath%>'>
    <title>Forward......</title>
<script>
function LoadName(){
   
   document.forwardForm.xmlStr.value=opener.xmlStr;
   document.forwardForm.id.value=opener.id;
   document.forwardForm.type.value=opener.type;
   // For midea
   document.forwardForm.flag.value=opener.flag;
   document.forwardForm.isNewVersion.value=opener.isNewVersion;
   document.forwardForm.editable.value=opener.editable;
   document.forwardForm.operatable.value=opener.operatable;
   document.forwardForm.submit();
   
}
</script>
  </head>
  
  <body  onLoad="LoadName()">
  <html:form action="forward.do">
   <html:hidden property="xmlStr" />
   <html:hidden property="id"/>
   <html:hidden property="type"/>
   <!-- For midea -->
   <html:hidden property="flag"/>
   <html:hidden property="isNewVersion"/>
   <html:hidden property="editable"/>
   <html:hidden property="operatable"/>
   </html:form>
  </body>
</html>