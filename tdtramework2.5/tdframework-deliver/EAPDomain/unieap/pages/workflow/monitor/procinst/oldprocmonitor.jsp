<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<html:html locale="true">
<head>
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/AjaxUtil.js"></script>
<script language="JavaScript">
var ctrlFlag = "true";
var procinstid = "<%=request.getParameter("procInstID")%>";
var procdefid = "<%=(String)request.getAttribute("procdefid")%>";
var version = "<%=(String)request.getAttribute("version")%>";
var lineNum = 0;
var line = "<%=(String)request.getAttribute("line")%>";
var lineArray = line.split("#");
var curStr = "<%=(String)request.getAttribute("curStr")%>";
var menuActDefID,menuActInstID;

function rollback(){

    if(menuActInstID!=null){
       	var openURL = "<%=request.getContextPath()%>/monitorrollback.do?actInstID="+menuActInstID;
    	var width = 400;
    	var height =240;
    	open_modalWindow(openURL,width,height);
    }else{
      	alert("<%=MessageUtil.getString("workflow.monitor.procinst.activity.instance.null",session)%>");
    } 
}

function reStartSubProcinst(){
    var index = menuActInstID.indexOf("#");
    var subprocid = menuActInstID.substring(0,index);
    if (subprocid=="none"){
    	alert("<%=MessageUtil.getString("workflow.monitor.procinst.activity.instance.null",session)%>");
    }else{
        var url= "ajaxutil?method=subProcRestart&subPid="+subprocid;
    	send_request(url);
    }       
}

function doCompleteActivity(){
    var actinstID = menuActInstID;
    if (actinstID=="none"){
    	alert("<%=MessageUtil.getString("workflow.monitor.procinst.activity.instance.null",session)%>");
    }else{
        var url= "ajaxutil?method=doCompleteAct&actinstid="+actinstID;
    	send_request(url);
    }  
}
function getResponseText(){
     if(http_request.readyState==4){
         if (http_request.status == 200){
              location.href = "<%=request.getContextPath()%>/procmonitor.do?procInstID="+procinstid;
         }
     }
}

function viewProcDetail(){
   var Url = "<%=request.getContextPath()%>/pdetail.do?procinstID="+procinstid+"&procdefID="+procdefid+"&ver="+version;
   document.all.frame.src=Url;
}
function viewPocRelDateDetail(){
   var Url="<%=request.getContextPath()%>/rddetail.do?id="+procinstid+"&type=pi&ver="+version;
   document.all.frame.src=Url;   
}
function viewPocDefRelDateDetail(){
  var Url="<%=request.getContextPath()%>/rddetail.do?id="+procdefid+"&type=pd&ver="+version;
  document.all.frame.src=Url;   
}

function viewWorkItemList(){
     if (menuActInstID!=null)
         document.all.frame.src="<%=request.getContextPath()%>/widetail.do?actinstid="+menuActInstID;    
     else
         document.all.frame.src="<%=request.getContextPath()%>/widetail.do?actinstid=none";  
}

function viewActDefDetail(){
   document.all.frame.src="<%=request.getContextPath()%>/addetail.do?actdefid="+menuActDefID;   
}
function viewActInstDetail(){
   if (menuActInstID!=null){
      document.all.frame.src="<%=request.getContextPath()%>/aidetail.do?actinstid="+menuActInstID;
   }else{
      alert("<%=MessageUtil.getString("workflow.monitor.procinst.activity.instance.null",session)%>");
   }   
}
function viewRelDateDetail(){
     if (menuActInstID!=null){
         var index = menuActInstID.indexOf("#");
         var len = menuActInstID.length;
         if (index>0 && len>index){
         	var subprocid = menuActInstID.substring(index+1,len);
         	document.all.frame.src="<%=request.getContextPath()%>/rddetail.do?id="+subprocid+"&type=ai"; 
         }else{
         	document.all.frame.src="<%=request.getContextPath()%>/rddetail.do?id="+menuActInstID+"&type=ai"; 
         }           
     }else
         alert("<%=MessageUtil.getString("workflow.monitor.procinst.activity.instance.null",session)%>"); 
}
function viewApplication(){
     if (menuActInstID!=null)
         document.all.frame.src="<%=request.getContextPath()%>/apdetail.do?actinstid="+menuActInstID;    
     else
         alert("<%=MessageUtil.getString("workflow.monitor.procinst.activity.instance.null",session)%>"); 
}
function viewEventList(){
    document.all.info.src="<%=request.getContextPath()%>/eventlist.do?actdefid="+menuActDefID+"&procinstID="+procinstid;    
}


function show_procinstdetail(){
   var Url = "<%=request.getContextPath()%>/pdetail.do?procinstID="+procinstid+"&procdefID="+procdefid+"&ver="+version;
   document.all.frame.src=Url;
}
function his_manual_onClick(actInstID,actdefID){
     	var Url="<%=request.getContextPath()%>/widetail.do?actinstid="+actInstID; 
     	document.all.frame.src=Url;  
}
function his_auto_onClick(actInstID,actdefID){
     var Url="<%=request.getContextPath()%>/addetail.do?actdefid="+actdefID; 
     document.all.frame.src=Url; 
}

function manual_onClick(evt,actInstID,actdefID){
	if(evt.detail==2){
     	var Url="<%=request.getContextPath()%>/widetail.do?actinstid="+actInstID; 
     	document.all.frame.src=Url;  
    }
}
function auto_onClick(evt,actInstID,actdefID){
	if(evt.detail==2){
     var Url="<%=request.getContextPath()%>/addetail.do?actdefid="+actdefID; 
     document.all.frame.src=Url; 
     } 
}
function subproc_onClick(evt,actdefid,subprocinstid){
	if(evt.detail==2){
   		if (subprocinstid!="none"){
       		var url = "<%=request.getContextPath()%>/procmonitor.do?procInstID="+subprocinstid;
       		open_scrollable_window(url,900,600);
   		}else{
       		var url = "<%=request.getContextPath()%>/addetail.do?actdefid="+actdefid; 
       		document.all.frame.src=url;       
   		} 
   }   
}
function event_onClick(evt,actInstID,actdefID){
	if(evt.detail==2){
   		var Url="<%=request.getContextPath()%>/eventlist.do?actdefid="+actdefID+"&procinstID="+procinstid+"&actinstid="+actInstID;     
   		document.all.frame.src=Url;  
   	}
}
function branch_onClick(evt,branchid){
   //alert(branchid);
}
function parallel_onClick(evt,parallelinstid){
    if(evt.detail==2){
    	var openURL = "<%=request.getContextPath()%>/oldparallel.do?parallelID="+parallelinstid; 
    	var width = 400;
    	var height = 245;
    	open_scrollable_window(openURL,width,height);
    }
}
function findPrevious(){
   var preid = lineArray[lineNum];
   var curid = null;
   if(lineArray[lineNum-1]!=null) 
      curid = lineArray[lineNum-1];  
   if (preid != null){
      lineNum++;
      document.forms[0].svg.window.setPreviousColor(preid,curid);
      var next = document.getElementById("a_next");
      next.setAttribute("href","javascript:findNext()");
      var mnext = document.getElementById("img_next");
      mnext.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/next.gif");
   }
   if(lineArray[lineNum]==null){
      var a_obj = document.getElementById("a_previous");
      a_obj.setAttribute("href","#");
      var img_obj = document.getElementById("img_previous");
      img_obj.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/previous1.gif");
   }   
}
function findNext(){
   var nexid = null;
   var curid = lineArray[lineNum-1];
   if(lineArray[lineNum-2]!=null) 
      nexid = lineArray[lineNum-2];  
   if (curid != null){
      lineNum--;
      document.forms[0].svg.window.setNextColor(nexid,curid);
      var a_obj = document.getElementById("a_previous");
      a_obj.setAttribute("href","javascript:findPrevious()");
      var img_obj = document.getElementById("img_previous");
      img_obj.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/previous.gif");
   }
   if(lineArray[lineNum-1]==null){
      var a_obj = document.getElementById("a_next");
      a_obj.setAttribute("href","#");
      var img_obj = document.getElementById("img_next");
      img_obj.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/next1.gif");
   }   
}
function findCurrent(){
   if (lineNum>0){
	   var curid = lineArray[lineNum-1];
	   document.forms[0].svg.window.setCurColor(curid,curStr);
   }else{
       document.forms[0].svg.window.setCurColor(null,curStr);
   }
   lineNum = 0;
      var a_obj = document.getElementById("a_previous");
      a_obj.setAttribute("href","javascript:findPrevious()");
      var img_obj = document.getElementById("img_previous");
      img_obj.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/previous.gif");
      var a_obj = document.getElementById("a_next");
      a_obj.setAttribute("href","#");
      var img_obj = document.getElementById("img_next");
      img_obj.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/next1.gif");
}
function focusDiv(x,y){
   if (y>100)
      document.all.div.scrollTop=y-100;
   else
      document.all.div.scrollTop=y;   
   document.all.div.scrollLeft=x-50;
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
function doAbort(){
   location.href = "procmonitor.do?procInstID="+procinstid+"&operation=abort";
}
function doResume(){
   location.href = "procmonitor.do?procInstID="+procinstid+"&operation=resume";
}
function doSuspend(){
   location.href = "procmonitor.do?procInstID="+procinstid+"&operation=suspend";
}
function doRestart(){
   location.href = "procmonitor.do?procInstID="+procinstid+"&operation=restart";
}
function refresh(){
   location.href = "<%=request.getContextPath()%>/procmonitor.do?procInstID="+procinstid;
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
  var divw = document.body.clientWidth*0.6-11;  
  var divh = document.body.clientHeight-70;
  document.all.div.style.width=divw;
  document.all.div.style.height=divh;
  var infow = document.body.clientWidth*0.4;  
  var infoh = document.body.clientHeight-10;
  document.all.info.style.width=infow;
  document.all.info.style.height=infoh;
  
  document.all.frame.width = infow-10;
  document.all.frame.height = infoh*0.6-5;
  document.all.path.style.height = infoh*0.2;
  document.all.path.style.wdith = infow-20;
  document.all.frame.src="<%=request.getContextPath()%>/pdetail.do?procinstID="+procinstid+"&procdefID="+procdefid+"&ver="+version;
    
  var flag="<%=(String)request.getAttribute("curstate")%>";
  if (flag=="1"){
      var suspend = document.getElementById("a_suspend");
      suspend.setAttribute("href","javascript:doSuspend()");
      var restart = document.getElementById("a_restart");
      restart.setAttribute("href","javascript:doRestart()");
      var abort = document.getElementById("a_abort");
      abort.setAttribute("href","javascript:doAbort()");
      var msuspend = document.getElementById("img_suspend");
      msuspend.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/suspend.gif");
      var mrestart = document.getElementById("img_restart");
      mrestart.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/restart.gif");
      var mabort = document.getElementById("img_abort");
      mabort.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/abort.gif");
  }else if(flag=="3"){
      var resume = document.getElementById("a_suspend");
      resume.setAttribute("href","javascript:doResume()");
      var abort = document.getElementById("a_abort");
      abort.setAttribute("href","javascript:doAbort()");
       var mresume = document.getElementById("img_suspend");
      mresume.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/resume.gif");
      var mabort = document.getElementById("img_abort");
      mabort.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/abort.gif");
  }else if(flag=="0"){
      var a_obj = document.getElementById("a_previous");
      a_obj.setAttribute("href","#");
      var img_obj = document.getElementById("img_previous");
      img_obj.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/previous1.gif");
      var a_obj = document.getElementById("a_current");
      a_obj.setAttribute("href","#");
      var img_obj = document.getElementById("img_current");
      img_obj.setAttribute("src","<%=WorkflowManager.getWorkflowStylePath()%>/style1/monitor_img/current1.gif");  
  
  }
}
function openApplet(){
   location.href="<%=request.getContextPath()%>/unieap/pages/workflow/monitor/procinst/procdetail.do?procInstID=<%=request.getParameter("procInstID")%>";
}
</script>

</head>
<body onload="javascript:onload()" style="margin-left:0px;margin-top: 0px;margin-right:0px;margin-bottom: 0px;scrollbar-face-color: #D8E2E7;
scrollbar-shadow-color: #EEEEEE; scrollbar-highlight-color: #EEEEEE;scrollbar-3dlight-color: #EEEEEE;
scrollbar-darkshadow-color: #EEEEEE;scrollbar-track-color: #EEEEEE;scrollbar-arrow-color: #606D79;overflow-y:hidden;overflow-x:hidden; ">
<uniflow:m_form action="svgmonitor.do">
<table border="1" cellpadding="0" cellspacing="0">
<tr><td bgcolor="#EEEEEE"><table>
    <tr>
    <td align="left" valign="middle" class="main_table2_td2">
      <table height="28" border="0" cellpadding="0" cellspacing="0" class="main_label_table" >
      <tr>
      <uniflow:monitor_action id="procdef" src="procinst.gif" action="javascript:show_procinstdetail()" alt='<%=MessageUtil.getString("workflow.alt.monitor.see.process",session)%>'/>
      <uniflow:monitor_action id="refresh" src="refresh.gif" action="javascript:refresh()" alt='<%=MessageUtil.getString("workflow.alt.monitor.refresh.process",session)%>'/>
      <uniflow:monitor_action id="zoomout" src="zoomout.gif" action="javascript:document.forms[0].svg.window.zoomOut()" alt='80%'/>
      <uniflow:monitor_action id="nozoom" src="nozoom.gif" action="javascript:document.forms[0].svg.window.originalView()" alt='100%'/>
      <uniflow:monitor_action id="zoomin" src="zoomin.gif" action="javascript:document.forms[0].svg.window.zoomIn()" alt='120%'/>
      <uniflow:monitor_action id="current" src="current.gif" action="javascript:findCurrent()" alt='<%=MessageUtil.getString("workflow.alt.monitor.find.current.activity",session)%>'/>
      <uniflow:monitor_action id="previous" src="previous.gif" action="javascript:findPrevious()" alt='<%=MessageUtil.getString("workflow.alt.monitor.find.previous.activity",session)%>'/>
      <uniflow:monitor_action id="next" src="next1.gif'" action="#" alt='<%=MessageUtil.getString("workflow.alt.monitor.find.next.activity",session)%>'/>
      <uniflow:monitor_action id="suspend"  src="suspend1.gif" action="#" alt='<%=MessageUtil.getString("workflow.alt.monitor.suspend.process",session)%>'/>
      <uniflow:monitor_action id="restart" src="restart1.gif" action="#" alt='<%=MessageUtil.getString("workflow.alt.monitor.restart.process",session)%>'/> 
      <uniflow:monitor_action id="abort"  src="abort1.gif" action="#" alt='<%=MessageUtil.getString("workflow.alt.monitor.abort.process",session)%>'/>         
      </tr>
    </table></td>
    </tr>
	<tr><td align="center">
		<div style="overflow:auto;background-color:#FFFFFF" id="div"><embed
			id="svg" width='<%=(String)request.getAttribute("maxX")%>' 
			height='<%=(String)request.getAttribute("maxY")%>'
			type="image/svg+xml"
			PLUGINSPAGE="http://www.adobe.com/svg/viewer/install/"
			src='<%=request.getContextPath()%>/displaySvg?print=oldmprocinst'>
		</embed></div>
	</td></tr>
	<tr><td><table>
	<tr valign="top">
	<td align="left" valign="top" width="10"><hr width='10' size='10' noshade color='#cccccc'></td>
	<td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(0,session)%></td>
	<td align="left" valign="top" width="10"><hr width='10' size='10' noshade color='#00FF00'></td>
    <td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(1,session)%></td>
	<td align="left" valign="top" width="10"><hr width='10' size='10' noshade color='blue'></td>
    <td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(2,session)%></td>
	<td align="left" valign="top" width="10"><hr width='10' size='10' noshade color='yellow'></td>
    <td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(3,session)%></td>
	<td align="left" valign="top" width="10"><hr width='10' size='10' noshade color='#800000'></td>
    <td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(4,session)%></td>
	<td align="left" valign="top" width="10"><hr width='10' size='10' noshade color='red'></td>
    <td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(5,session)%></td>
    <td>&nbsp;</td>
	</tr>
	</table></td></tr>
</table></td>
<td bgcolor="#EEEEEE" valign="middle">
<div style="overflow:auto;background-color:#EEEEEE" id="info">
<table>
  <tr>
    <td align="left" height="26" valign="middle" style="font-size:12;font-weight:bold"><%=(String)request.getAttribute("procTitle") %></td>
  </tr>
<tr>
	<td align="left" height="28" valign="middle" style="font-size:12;font-weight:bold">
	<bean:message bundle="uniflow" key="workflow.monitor.procinst.info.monitor" />&nbsp;</td>
</tr>
<tr>
<td >
<iframe name="frame" scrolling="yes" frameborder="0" src="">
</iframe>
</td>
</tr>
<tr>
	<td align="left" height="30" valign="middle" style="font-size:12;font-weight:bold">
	<bean:message bundle="uniflow" key="workflow.monitor.procinst.path" />&nbsp;</td>
</tr>
<tr>
	<td><table><tr><td  align="left" valign="top" class="input_text">
	<div style="overflow:auto;" id="path">
	<%=CommonInfoManager.getProcessPath(((String)request.getAttribute("instline")))%>
	</div></td></tr></table>
	</td>
</tr>
</table>
</div>
</td>
</tr>			
</table>
</uniflow:m_form>
</body>
</html:html>