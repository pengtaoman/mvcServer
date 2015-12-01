<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<html:html locale="true">
<head>
<title></title>
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
<SCRIPT language="JavaScript">
	
function setFormActAppID(nodeID,nodeName,appurl,participants){
  var temp = appurl.indexOf(",");
  var wform = appurl.substring(0,temp);
  var url = appurl.substring(temp+1);
  var openwin = "<%=request.getContextPath()%>/unieap/pages/workflow/authorization/uniform/formauthWindow.jsp?activityname="+nodeName+"&activityid="+nodeID+"&formid="+url+"&participants="+participants;
  if (wform=="wform"){    
     //window.open(openwin);
     location.href = openwin;
  }
  else{
     alert("<%=MessageUtil.getString("workflow.authorization.uniform.checked",request.getSession())%>");
  }
}
function onload()
{

	 if (document.all)
        {
          document.all.loading.style.visibility="hidden";
          document.all.myapplet.style.visibility="visible";
          document.applets[0].repaint();
        }
        // Netscape Navigator
        else
        {
          document.loading.visibility="hide";
          document.myapplet.visibility="visible";
        }
		//reSizeApplet();
}
function reSizeApplet(){
   document.monitor.width =parseInt(document.body.clientWidth)<10?10:parseInt(document.body.clientWidth)-5;
   document.monitor.height =parseInt(document.body.clientHeight)<15?1:parseInt(document.body.clientHeight)-5;
}
function openSVG(){
   location.href="<%=request.getContextPath()%>/processAuthor.do?processid=<%=request.getParameter("procInstID")%>&version=<%=request.getParameter("version")%>";
}
</SCRIPT>

</head>
<body >
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
    <PARAM NAME = ARCHIVE VALUE = "appletauth.jar,alloy.jar,xpp3.jar" >
    <PARAM NAME = "servletPath"  VALUE = "<%=request.getContextPath()%>/Tool" >
    <PARAM NAME = "processID"  VALUE = "<%=request.getParameter("procInstID")%>" >
    <PARAM NAME = "versionName" VALUE = "<%=new String(request.getParameter("version").getBytes("iso-8859-1"))%>">
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
