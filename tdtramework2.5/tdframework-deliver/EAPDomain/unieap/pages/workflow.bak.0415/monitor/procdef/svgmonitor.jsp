<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html>
<head>
<%
		  String pid = request.getParameter("processid"); 
		  if(pid == null)
		  {
		     pid = (String)request.getAttribute("processid");
		  }
		  String version = request.getParameter("version");
		  if(version == null)
		  {
		     version = (String)request.getAttribute("version");
		  }
		  //增加查看子流程节点（未被实例化）对应流程模板
		  String isSubProcess =(String)request.getAttribute("isSubProcess");
 %>
<uniflow:style />
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="JavaScript">
var menuActDefID;
function manual_onClick(actDefID){
   if(<%= isSubProcess == null%>)
   {
	   var url = "<%=request.getContextPath()%>/monitorworkitem.do?actDefID=" + actDefID+"&state=-1";   
	   open_scrollable_window(url,800,600);
   }
}
function auto_onClick(actDefID){
    if(<%= isSubProcess == null%>)
   {
	   var url = "<%=request.getContextPath()%>/applicationlist.do?actDefID=" + actDefID+"&state=-1";   
	   open_scrollable_window(url,800,600);
   }
}
function subproc_onClick(subproc){
   if(<%= isSubProcess == null%>)
   {
	   var temp = subproc.indexOf("#");
	   var procDefID = subproc.substring(0,temp);
	   var version = subproc.substring(temp+1);
	   var url = "<%=request.getContextPath()%>/svgmonitor.do?processid="+procDefID+"&version="+version;
	   open_scrollable_window(url,800,600);
   }
}
function showRunProcinst(){
   var procdefid = "<%=request.getParameter("processid")%>";
   var version = "<%=request.getParameter("version")%>";
   var url = "<%=request.getContextPath()%>/monitorproc.do?procdefID="+procdefid+"&verName="+version+"&procState=15";   
   open_scrollable_window(url,800,600);
}
function showComProcinst(){
   var procdefid = "<%=request.getParameter("processid")%>";
   var version = "<%=request.getParameter("version")%>";
   var url = "<%=request.getContextPath()%>/monitorproc.do?procdefID="+procdefid+"&verName="+version+"&procState=16";   
   open_scrollable_window(url,800,600);
}
function showAllProcinst(){
   var procdefid = "<%=request.getParameter("processid")%>";
   var version = "<%=request.getParameter("version")%>";
   var url = "<%=request.getContextPath()%>/monitorproc.do?procdefID="+procdefid+"&verName="+version+"&procState=-1";   
   open_scrollable_window(url,800,600);
}
function showAbortProcinst(){
   var procdefid = "<%=request.getParameter("processid")%>";
   var version = "<%=request.getParameter("version")%>";
   var url = "<%=request.getContextPath()%>/monitorproc.do?procdefID="+procdefid+"&verName="+version+"&procState=32";   
   open_scrollable_window(url,800,600);
}
function winZoomIn(){
   var svg = document.getElementById("svg");
   var width = svg.getAttribute("width");
   var height = svg.getAttribute("height");
   svg.setAttribute("width",width*1.2);   
   svg.setAttribute("height",height*1.2);
}
function winZoomOut(){
   var svg = document.getElementById("svg");
   var width = svg.getAttribute("width");
   var height = svg.getAttribute("height");    
   svg.setAttribute("width",width*0.8);   
   svg.setAttribute("height",height*0.8);
}
function winOriginalView(scale){
   var svg = document.getElementById("svg");
   var width = svg.getAttribute("width");
   var height = svg.getAttribute("height");    
   svg.setAttribute("width",width/scale);   
   svg.setAttribute("height",height/scale);
}
function refresh(){
  location.href = "<%=request.getContextPath()%>/svgmonitor.do?processid=<%=pid%>&version=<%=version%>";
}

function detectPlugin(){
    try{
        document.forms[0].svg.window.detectPlugin();
        return true;
    }catch (e){
        return false;
    }
}

function onload(){
  if (!detectPlugin()){
      var url= "<%=request.getContextPath()%>/unieap/pages/workflow/common/skip.jsp" ;
      var width = 400;
      var height = 240; 
      open_windows(url,width,height);  
  }
}
function openApplet(){
   location.href="<%=request.getContextPath()%>/unieap/pages/workflow/monitor/procdef/monitorapplet.jsp?procInstID=<%=pid%>&version=<%=version%>";
}
</script>

</head>
<body onload="javascript:onload()">
<form action="svgmonitor.do">
 <uniflow:m_table style="main_title_table">
  <tr>
    <td nowrap class="text_title" ><%=(String) request.getAttribute("procTitle")%></td>
    <td align="right" valign="middle" class="main_table2_td2"><table height="28" border="0" cellpadding="0"    cellspacing="0"   class="main_label_table">
      <tr>
        <%if(isSubProcess == null)
          {
         %>
	        <td width="25" align="right" valign="middle" nowrap class="main_title_label_td">
	           <a href="javascript:refresh()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/refresh.gif" alt="即时刷新" width="16" height="16" border='0'></a></td>
         <%
           }
          %>   
          
        <td width="25" align="right" valign="middle" nowrap class="main_title_label_td">
           <a href="javascript:document.forms[0].svg.window.zoomOut()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/zoomout.gif" alt="缩小0.8倍" width="16" height="16"border='0'></a></td>
        <td width="25" align="right" valign="middle" nowrap class="main_title_label_td">
           <a href="javascript:document.forms[0].svg.window.originalView()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/nozoom.gif" alt="还原至1:1" width="16" height="16"border='0'></a></td>
        <td width="25" align="right" valign="middle" nowrap class="main_title_label_td">
          <a href="javascript:document.forms[0].svg.window.zoomIn()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/zoomin.gif" alt="放大1.2倍" width="16" height="16"border='0'></a></td>
      </tr>
    </table></td>
  </tr>
</uniflow:m_table>
<uniflow:m_table style="main_list">
	<tr>
		<td width="100%" align="center">
		<div style="width:100%;overflow:auto" id="svgdiv">
		<embed id="svg" width="<%=(String)request.getAttribute("maxX")%>" height='<%=(String)request.getAttribute("maxY")%>'
			type="image/svg+xml"
			PLUGINSPAGE="http://www.adobe.com/svg/viewer/install/"
			src='<%=request.getContextPath()%>/displaySvg?print=mprocdef&processid=<%=pid%>&version=<%=version%>'>
		</embed></div>
		</td>
	</tr>
</uniflow:m_table>
</form>
</body>
</html>
