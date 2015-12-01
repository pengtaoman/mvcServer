<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<html>
<head>
<uniflow:style />
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="JavaScript">


function setParticipant(nodeID){
    requestURL = "<%=request.getContextPath()%>/setActparti.do?activityid="+nodeID;
	document.all.frame.src=requestURL;
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
  location.href = "<%=request.getContextPath()%>/svgparti.do?processid=<%=request.getParameter("processid")%>&version=<%=request.getParameter("version")%>&type=main";
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
  var divw = document.body.clientWidth*0.5-11;  
  var divh = document.body.clientHeight-40;
  document.all.div.style.width=divw;
  document.all.div.style.height=divh;
  var infow = document.body.clientWidth*0.5;  
  var infoh = document.body.clientHeight-10;
  document.all.info.style.width=infow;
  document.all.info.style.height=infoh;  
  document.all.frame.width = infow-10;
  document.all.frame.height = infoh-35;  
}

</script>

</head>
<body onload="javascript:onload()" style="margin-left:0px;margin-top: 0px;margin-right:0px;margin-bottom: 0px;scrollbar-face-color: #D8E2E7;
scrollbar-shadow-color: #EEEEEE; scrollbar-highlight-color: #EEEEEE;scrollbar-3dlight-color: #EEEEEE;
scrollbar-darkshadow-color: #EEEEEE;scrollbar-track-color: #EEEEEE;scrollbar-arrow-color: #606D79;overflow-y:hidden;overflow-x:hidden; ">
<uniflow:m_form action="svgparti.do">

<table border="1" cellpadding="0"cellspacing="0">
<tr><td bgcolor="#EEEEEE"><table>
    <tr>
    <td align="left" valign="middle" class="main_table2_td2">
      <table height="28" border="0" cellpadding="0"cellspacing="0"class="main_label_table" >
      <tr>
        <td width="25" align="right" valign="middle" nowrap class="main_title_label_td">
           <a href="javascript:refresh()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/refresh.gif" alt="即时刷新" width="16" height="16" border='0'></a></td>
        <td width="25" align="right" valign="middle" nowrap class="main_title_label_td">
           <a href="javascript:document.forms[0].svg.window.zoomOut()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/zoomout.gif" alt="缩小0.8倍" width="16" height="16"border='0'></a></td>
        <td width="25" align="right" valign="middle" nowrap class="main_title_label_td">
           <a href="javascript:document.forms[0].svg.window.originalView()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/nozoom.gif" alt="还原至1:1" width="16" height="16"border='0'></a></td>
        <td width="25" align="right" valign="middle" nowrap class="main_title_label_td">
          <a href="javascript:document.forms[0].svg.window.zoomIn()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/zoomin.gif" alt="放大1.2倍" width="16" height="16"border='0'></a></td>
      </tr>
    </table></td>
    </tr>
	<tr><td align="center">
		<div style="overflow:auto;background-color:#FFFFFF" id="div"><embed
			id="svg" width='<%=(String)request.getSession().getAttribute("maxX")%>' 
			height='<%=(String)request.getSession().getAttribute("maxY")%>'
			type="image/svg+xml"
			PLUGINSPAGE="http://www.adobe.com/svg/viewer/install/"
			src='<%=request.getContextPath()%>/displaySvg?print=mparticipant'>
		</embed></div>
	</td></tr>	
</table></td>
<td bgcolor="#EEEEEE" valign="middle">
<div style="overflow:auto;background-color:#EEEEEE" id="info">
<table>
<tr>
    <td align="left" height="26" valign="middle" style="font-size:12;font-weight:bold"><%=(String)request.getSession().getAttribute("procTitle") %></td>
</tr>
<tr>
<td>
<iframe name="frame" scrolling="yes" frameborder="0" src="<%=request.getContextPath()%>/unieap/pages/workflow/participant/blank.jsp">
</iframe>
</td>
</tr>
</table>
</div>
</td>
</tr>			
</table>
</uniflow:m_form>
</body>
</html>