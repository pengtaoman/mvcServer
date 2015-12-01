<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<%String pid = request.getParameter("procInstID");%>
<%String version = request.getParameter("version"); %>
<uniflow:style/>
 <style type="text/css">

      #loading {
        position:absolute;
        left:150;
        top:200;
      }

      #myapplet {
        position:absolute;
        left:10;
        top:10;
        visibility:hide;
      }

    </style>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<SCRIPT language="JavaScript">
	
function doubleClick_AllWorkList(actDefID){
   var url = "<%=request.getContextPath()%>/monitorworkitem.do?actDefID=" + actDefID+"&state=0";   
   open_scrollable_window(url,600,400);
}
function pupMenuClick_RunWorkList(actDefID,state){
   var url = "<%=request.getContextPath()%>/monitorworkitem.do?actDefID=" + actDefID+"&state="+state;   
   open_scrollable_window(url,600,400);
}
function pupMenuClick_ComWorkList(actDefID,state){
   var url = "<%=request.getContextPath()%>/monitorworkitem.do?actDefID=" + actDefID+"&state="+state;   
   open_scrollable_window(url,600,400);
}
function pupMenuClick_AllWorkList(actDefID,state){
   var url = "<%=request.getContextPath()%>/monitorworkitem.do?actDefID=" + actDefID+"&state="+state;   
   open_scrollable_window(url,600,400);
}


function menuClick_ProcinstList(procdefid,version){
   var url = "<%=request.getContextPath()%>/monitorproc.do?procdefID="+procdefid+"&verName="+version+"&state=-1";   
   open_scrollable_window(url,600,400);
}

function doubleClick_AllApplication(actDefID){
   var url = "<%=request.getContextPath()%>/applicationlist.do?actDefID=" + actDefID+"&state=-1";   
   open_scrollable_window(url,600,400);
}
function pupMenuClick_AllApplication(actDefID,state){
   var url = "<%=request.getContextPath()%>/applicationlist.do?actDefID=" + actDefID+"&state=-1";     
   open_scrollable_window(url,600,400);
}
function pupMenuClick_RunApplication(actDefID,state){ 
   var url = "<%=request.getContextPath()%>/applicationlist.do?actDefID=" + actDefID+"&state=1";  
   open_scrollable_window(url,600,400);
}
function pupMenuClick_ComApplication(actDefID,state){ 
   var url = "<%=request.getContextPath()%>/applicationlist.do?actDefID=" + actDefID+"&state=3";  
   open_scrollable_window(url,600,400);
}

function openSVG(){
   location.href="<%=request.getContextPath()%>/svgmonitor.do?processid=<%=pid%>&version=<%=version%>";
}
function setFormActAppID(nodeID,nodeName,appurl,participants){

}
</SCRIPT>

</head>
<body>
<uniflow:tab >
      <uniflow:tabElement messageKey="workflow.monitor.type.svg" selected="false" action="javascript:openSVG()"/>  
      <uniflow:tabElement messageKey="workflow.monitor.type.applet" selected="true" action="javascript:openApplet()"/>        
</uniflow:tab>
<uniflow:p_content_comm_wrapper width="100%" styleClass="main_label_outline3">
<uniflow:p_content_table>
<OBJECT
    classid = "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"
    NAME="monitor"
    WIDTH = 800 HEIGHT = 500
    ALIGN = middle
    codebase= "http://java.sun.com/products/plugin/autodl/jinstall-1_4_2-windows-i586.cab#Version=1,4,2,0">

    <PARAM NAME = CODE VALUE = "com.neusoft.uniflow.webauth.client.MonitorApplet" >
    <PARAM NAME = ARCHIVE VALUE = "appletDefMonitor.jar,alloy.jar,xpp3.jar" >
    <PARAM NAME = "servletPath"  VALUE = "<%=request.getContextPath()%>/Tool" >
    <PARAM NAME = "processID"  VALUE = "<%=pid%>" >
    <PARAM NAME = "versionName" VALUE = "<%=version%>">
    <PARAM NAME = "type" VALUE = "application/x-java-applet;version=1.4.2">
    <PARAM NAME = "scriptable" VALUE = "true">

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
    <PARAM NAME = "selectedColor" VALUE = "black">
</OBJECT>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
</body>
</html:html>