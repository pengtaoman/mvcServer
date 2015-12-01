<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<%String pid = request.getParameter("procDefID");%>
<%String version = request.getParameter("version"); %>
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<SCRIPT language="JavaScript">

function reSizeApplet(){
   document.monitor.width =parseInt(window.document.body.offsetWidth)-20;
   document.monitor.height = parseInt(window.document.body.offsetHeight)-50;
   var mleft = (parseInt(window.screen.availWidth)-parseInt(window.document.body.offsetWidth))/2-5;
   var mtop  = (parseInt(window.screen.availHeight)-parseInt(window.document.body.offsetHeight))/2-13;
   window.moveTo(mleft,mtop);
}

</SCRIPT>

</head>
<body>
<uniflow:p_content_comm_wrapper width="100%" styleClass="main_label_outline3">
<uniflow:p_content_table>
<OBJECT
    classid = "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"
    NAME="monitor"
    WIDTH =800 HEIGHT =600 >
    <PARAM NAME = CODE VALUE = "com.neusoft.uniflow.partcpdef.client.MonitorApplet" >
	<param name =codebase value="applet">
    <PARAM NAME = ARCHIVE VALUE = "appletparti.jar,JFlex.jar,alloy.jar,xpp3.jar" >
    <PARAM NAME = "servletPath"  VALUE = "<%=request.getContextPath()%>/Tool" >
    <PARAM NAME = "processID"  VALUE = "<%=pid%>" >
    <PARAM NAME = "versionName" VALUE = "<%=new String(version.getBytes("iso-8859-1"))%>">
    <PARAM NAME = "type" VALUE = "application/x-java-applet;version=1.4.2">
    <PARAM NAME = "scriptable" VALUE = "false">
    <PARAM NAME = "appControl" VALUE = "false">
    
    <PARAM NAME = "uninit.fillColor" VALUE = "white">
    <PARAM NAME = "init.fillColor"   VALUE = "white">
    <PARAM NAME = "running.fillColor" VALUE = "green">
    <PARAM NAME = "active.fillColor" VALUE = "blue">
    <PARAM NAME = "suspend.fillColor" VALUE = "yellow">
    <PARAM NAME = "completed.fillColor" VALUE = "lightGray">
    <PARAM NAME = "terminated.fillColor" VALUE = "gray">

    <PARAM NAME = "uninit.textColor" VALUE = "black">
    <PARAM NAME = "init.textColor"   VALUE = "black">
    <PARAM NAME = "running.textColor" VALUE = "black">
    <PARAM NAME = "active.textColor" VALUE = "black">
    <PARAM NAME = "suspend.textColor" VALUE = "black">
    <PARAM NAME = "completed.textColor" VALUE = "black">
    <PARAM NAME = "terminated.textColor" VALUE = "black">
    <PARAM NAME = "selectedColor" VALUE = "lightGray">
</OBJECT>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
<m_table style="main_button" width="800">
    <tr>
	<td>&nbsp;</td>
	<td align="right">
	  <input type="button" value="·µ»Ø" class="button_normal" onclick="javascript:history.back()"></input>
	</td>
    </tr>
</m_table>
</body>
</html:html>
