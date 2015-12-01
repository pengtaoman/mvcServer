<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Iterator"%>
<%@page import="com.neusoft.uniflow.api.handler.NWActInst"%>
<%@page import="com.neusoft.uniflow.web.monitor.procinst.beans.DynamicBranchInfo"%>
<html:html locale="true">
<head>
<uniflow:style/>

<style type="text/css">
	a.complete:visited {color: #800000;}
    a.complete:link {color: #800000;}

	a.run:visited {color:#00ff00;}
	a.run:link {color:#00ff00;}
	
	a.suspend:visited {color:yellow;}
	a.suspend:link {color:yellow;}
	
	a.active:visited {color:blue;}
	a.active:link {color:blue;}
	
</style>
<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/AjaxUtil.js"></script>
<script language="JavaScript">
var ctrlFlag = "true";
var procinstid = "<%=request.getParameter("procInstID")%>";
var procdefid = "<%=(String)request.getAttribute("procdefid")%>";
var version = "<%=(String)request.getAttribute("version")%>";
var lineNum = 0;
var line = "<%=(String)request.getAttribute("line")%>";
var lineArray = line.split("#");
var curStr = "<%=(String)request.getAttribute("curStr")%>";
var flag="<%=(String)request.getAttribute("curstate")%>";
 var oplevel="<%=(String)request.getAttribute("oplevel")%>";
 var SVGUrl="<%=request.getContextPath()%>/displaySvg?print=mprocinst&procinstid="+procinstid;//+"&oplevel="+oplevel;
var menuActDefID,menuActInstID;
var currentBranchID="";//记录当前操作的分支定义
var currentParallelID="";//记录当前操作的并发体实例ID
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
	show_info();
   var Url = "<%=request.getContextPath()%>/pdetail.do?procinstID="+procinstid+"&procdefID="+procdefid+"&ver="+version;
   document.all.frame.src=Url;
}
function viewPocRelDateDetail(){
	show_info();
   var Url="<%=request.getContextPath()%>/rddetail.do?id="+procinstid+"&type=pi&ver="+version;
   document.all.frame.src=Url;   
}
function viewPocDefRelDateDetail(){
	show_info();
  var Url="<%=request.getContextPath()%>/rddetail.do?id="+procdefid+"&type=pd&ver="+version;
  document.all.frame.src=Url;   
}

function viewWorkItemList(){
	show_info();
     if (menuActInstID!=null)
         document.all.frame.src="<%=request.getContextPath()%>/widetail.do?actinstid="+menuActInstID;    
     else
         document.all.frame.src="<%=request.getContextPath()%>/widetail.do?actinstid=none";  
}

function viewActDefDetail(){
	show_info();
   document.all.frame.src="<%=request.getContextPath()%>/addetail.do?actdefid="+menuActDefID;
   
}
function viewActInstDetail(){
	show_info();
   if (menuActInstID!=null){
      document.all.frame.src="<%=request.getContextPath()%>/aidetail.do?actinstid="+menuActInstID;
   }else{
      alert("<%=MessageUtil.getString("workflow.monitor.procinst.activity.instance.null",session)%>");
   }   
}
function viewRelDateDetail(){
	show_info();
     if (menuActInstID!=null){
         var index = menuActInstID.indexOf("#");
         var len = menuActInstID.length;
         if (index>0){
         	var subprocid = menuActInstID.substring(0,index);
         	if(subprocid !="none")
         	document.all.frame.src="<%=request.getContextPath()%>/rddetail.do?id="+subprocid+"&type=supai";
         	else
         	alert("<%=MessageUtil.getString("workflow.monitor.procinst.activity.instance.null",session)%>"); 
         }else{
         	document.all.frame.src="<%=request.getContextPath()%>/rddetail.do?id="+menuActInstID+"&type=ai"; 
         }           
     }else
         alert("<%=MessageUtil.getString("workflow.monitor.procinst.activity.instance.null",session)%>"); 
}
function viewApplication(){
	show_info();
     if (menuActInstID!=null)
         document.all.frame.src="<%=request.getContextPath()%>/apdetail.do?actinstid="+menuActInstID;    
     else
         alert("<%=MessageUtil.getString("workflow.monitor.procinst.activity.instance.null",session)%>"); 
}
function viewEventList(){
    document.all.info.src="<%=request.getContextPath()%>/eventlist.do?actdefid="+menuActDefID+"&procinstID="+procinstid;    
}
var v="hidden";
function show_info(){
	if(v=="hidden"){
		v="visible";
		var divw = document.body.clientWidth*0.7-11;  
  		var divh = document.body.clientHeight-70;
  		infow=document.body.clientWidth*0.3;  
  		infoh=document.body.clientHeight-10;
  		
  		document.all.div.style.width=divw;
  		document.all.div.style.height=divh;
  	
  		document.all.info.style.width=infow;
  		document.all.info.style.height=infoh;
  		document.all.frame.width = infow-11;
  		document.all.frame.height = infoh*0.7;
  		document.all.info.style.display='inline';
  	}
}
function show_procinstdetail(){
	var divw,divh;
	var infow = document.body.clientWidth*0.3;  
  	var infoh = document.body.clientHeight-10;

	if(v=="hidden"){
		v="visible";
		divw = document.body.clientWidth*0.7-11;  
  		divh = document.body.clientHeight-70;
  		infow=document.body.clientWidth*0.3;
  		infoh=document.body.clientHeight-10;
  		
  		document.all.info.style.display='inline';
  	}else if(v=="visible"){
  		v="hidden";
  		divw = document.body.clientWidth-11;  
  		divh = document.body.clientHeight-70;
  		infow=11;
  		infoh=document.body.clientHeight-10;
  		document.all.info.style.display='none';
  	}
  	/*process monitor picture*/
  	document.all.div.style.width=divw;
  	document.all.div.style.height=divh;
  	
  	document.all.info.style.width=infow;
  	document.all.info.style.height=infoh;
  	
 	document.all.frame.width = infow-11;
  	document.all.frame.height = infoh*0.7;
 	document.all.path.style.height = infoh*0.1;
  	document.all.path.style.wdith = infow-20;
}

function his_manual_onClick(actInstID,actdefID){
		show_info();
     	var Url="<%=request.getContextPath()%>/widetail.do?actinstid="+actInstID; 
     	document.all.frame.src=Url;  
}
/*
�鿴������֧����ת��ʷ���˴�ȡ���ǲ�������ڵ�id
*/
function his_parallel_onClick(actInstID,actdefID){
	show_info();
	var Url="<%=request.getContextPath()%>/paralleldetail.do?actinstid="+actInstID;
	var width = 590;
    var height = 300;
	open_scrollable_window(Url,width,height);
}
function his_auto_onClick(actInstID,actdefID){
     var Url="<%=request.getContextPath()%>/addetail.do?actdefid="+actdefID; 
     document.all.frame.src=Url; 
}

function manual_onClick(evt,actInstID,actdefID){
	show_info();
	if(evt.detail==2){
     	var Url="<%=request.getContextPath()%>/widetail.do?actinstid="+actInstID; 
     	document.all.frame.src=Url;  
    }
}
function auto_onClick(evt,actInstID,actdefID){
	show_info();
	if(evt.detail==2){
     var Url="<%=request.getContextPath()%>/addetail.do?actdefid="+actdefID; 
     document.all.frame.src=Url; 
     } 
}
function subproc_onClick(evt,actdefid,subprocinstid){
    //�鿴�����δ��ʵ��
	if(evt.detail==2){
	    
   		if (subprocinstid!="none"){
       		var url = "<%=request.getContextPath()%>/procmonitor.do?procInstID="+subprocinstid;
       		open_max_window(url);
   		}else{
   		   //lincx ��Ӳ鿴�����ģ��
   		   var openURL = "<%=request.getContextPath()%>/svgmonitor.do?isSubProcess=true&subProcessNodeID="+actdefid;
       	   open_max_window(openURL);
   		   //lincx ��ӽ���
       		var url = "<%=request.getContextPath()%>/addetail.do?actdefid="+actdefid; 
       		document.all.frame.src=url;  
       		    
   		} 
   } 
   
    
}
function subproc_onClick_view(evt,actdefid,subprocinstid){  
	if(evt.detail==2){
   		if (subprocinstid!="none"){
       		var url = "<%=request.getContextPath()%>/procmonitor.do?procInstID="+subprocinstid+"&oplevel=view";
       		open_max_window(url);
   		}else{
       		var url = "<%=request.getContextPath()%>/addetail.do?actdefid="+actdefid; 
       		document.all.frame.src=url;       
   		} 
   }   
}

function event_onClick(evt,actInstID,actdefID){
	show_info();
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
    	var openURL = "<%=request.getContextPath()%>/parallel.do?parallelID="+parallelinstid; 
    	var width = 400;
    	var height = 245;
    	open_scrollable_window(openURL,width,height);
    }
}
//������lineArray�б������Ѿ��ź���Ľڵ�ģ�壬������һ��ָ��Ҳ����lineNum��λ���ڲ鿴�Ľڵ㣬��curStr�б������������еĽڵ�
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
	   document.forms[0].svg.window.setCurColor(curid,curStr);//���ָ��lineNum����ָ��һ��ڵ㣬����ָ��curStr��ͬʱ��Ҫ���ԭ4ָ��ڵ����ɫ
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
   location.href = "<%=request.getContextPath()%>/procmonitor.do?procInstID="+procinstid+"&oplevel="+oplevel;
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
  var divw = document.body.clientWidth-20;  
  var divh = document.body.clientHeight-70;
  document.all.div.style.width=divw;
  document.all.div.style.height=divh;
  document.all.frame.src="<%=request.getContextPath()%>/pdetail.do?procinstID="+procinstid+"&procdefID="+procdefid+"&ver="+version;
    
  
  if(oplevel=="view"){
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
function resize(){
	var divw,divh;
	var infow = document.body.clientWidth*0.3;  
  	var infoh = document.body.clientHeight-10;

	if(v=="hidden"){
		divw = document.body.clientWidth-11;  
  		divh = document.body.clientHeight-70;
  		infow=11;
  		infoh=document.body.clientHeight-10;
  		document.all.info.style.display='none';
  	}else if(v=="visible"){
  		divw = document.body.clientWidth*0.7-11;  
  		divh = document.body.clientHeight-70;
  		infow=document.body.clientWidth*0.3;  
  		infoh=document.body.clientHeight-10;
  		document.all.info.style.display='inline';
  	}
  	/*process monitor picture*/
  	document.all.div.style.width=divw;
  	document.all.div.style.height=divh;
  	
  	document.all.info.style.width=infow;
  	document.all.info.style.height=infoh;
  	
 	document.all.frame.width = infow-11;
  	document.all.frame.height = infoh*0.7;
 	document.all.path.style.height = infoh*0.1;
  	document.all.path.style.wdith = infow-20;
}
function openApplet(){
   location.href="<%=request.getContextPath()%>/unieap/pages/workflow/monitor/procinst/procdetail.do?procInstID=<%=request.getParameter("procInstID")%>";
}

//根据分支定义获得所有的分支实例信息
function getBranchItems(){
	var branchInsts=document.getElementsByName(currentBranchID);
	if(branchInsts==null)
		return "";
	var itemXml="<separator/>";
	for(i=0;i<branchInsts.length;i++){
		var branchInst=branchInsts[i];
		if(branchInst.otherInfo==currentParallelID)
			itemXml=itemXml+"\n<item onactivate=\"changeBranchInst('"+branchInst.id+"')\">"+branchInst.title+"</item>"
	}
	return itemXml;
}
function changeBranchInst(branchInstId) {
	var contextpath = "<%=WorkflowManager.getWorkflowPath()%>";
	var graphicStyle = "fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4";
	htmlObj=document.getElementById("svg");       
	svgdoc=htmlObj.getSVGDocument();       
	svgroot=svgdoc.documentElement; 
	var branchInstInfo = document.getElementById(branchInstId).value;
	var title=document.getElementById(branchInstId).title;
	var branchID=document.getElementById(branchInstId).name;
	
	changeAltText(svgdoc,branchID,title);
	
	var actInfos = branchInstInfo.split(";");
	var length=actInfos.length;
	for (var i=0; i<length; i++) {
		var actInfo = actInfos[i].split(",");
		var size = actInfo.length;
		if (size >= 5) {
			var actDefId = actInfo[0];
			var actInstId = actInfo[1];
			if (actInstId == "")
				actInstId = actDefId;
			var actState = actInfo[2];
			var actSubprocId = actInfo[3];//节点为分支时，该变量记录分支的悬浮名称。
			if (actSubprocId == "") 
				actSubprocId = "none";
			var actType = actInfo[4];
			var curID = actInstId;
			if (actInstId == actDefId)
				curID = "none";
			if (actType != 19) {
				var actNameText = svgroot.getElementById("text"+actDefId);
				actNameText.getStyle().setProperty("fill" , getColor(actState));
			}
			var actGraphic = svgroot.getElementById(actDefId);
			if (actType == 0) {
				actGraphic.setAttribute("onclick" , "auto_onClick(evt,'"+curID+"','"+actDefId+"')");
				actGraphic.setAttribute("onmouseover" , "byRecSelected('0',evt,'"+actDefId+"','"+actInstId+"','"+contextpath+"')");
			} else if (actType == 1) {
				actGraphic.setAttribute("onclick" , "manual_onClick(evt,'"+curID+"','"+actDefId+"')");
				if (actState == "1") {
					actGraphic.setAttribute("onmouseover" , "byRunManualRecSelected('1',evt,'"+actDefId+"','"+actInstId+"','"+contextpath+"')");
				} else {
					actGraphic.setAttribute("onmouseover" , "byRecSelected('1',evt,'"+actDefId+"','"+actInstId+"','"+contextpath+"')");
				}
			} else if (actType == 2 || actType == 3) {
				actGraphic.setAttribute("onmouseover" , "byRecSelected('2',evt,'"+actDefId+"','"+actSubprocId+"#"+actInstId+"','"+contextpath+"')");
				if (oplevel != "view") {
					actGraphic.setAttribute("onclick" ,"subproc_onClick(evt,'"+actDefId+"','"+actSubprocId+"')");
				} else {
					actGraphic.setAttribute("onclick" ,"subproc_onClick_view(evt,'"+actDefId+"','"+actSubprocId+"')");
				}
			} else if (actType == 16) {
				if (actState == "1" && oplevel != "view") {
					actGraphic.setAttribute("onclick" , "parallel_onClick(evt,'" +actInstId+ "')");
					actGraphic.setAttribute("onmouseover" ,"byParrallelRecSelected(evt,'" +actDefId+ "')");
					actGraphic.setAttribute("onmouseout" , "unParallelRecSelected(evt,'rec" +actDefId+ "')");
				} else {
					actGraphic.setAttribute("onclick" , "");
					actGraphic.setAttribute("onmouseover" , "");
					actGraphic.setAttribute("onmouseout" , "");
				}
			} else if (actType == 19) {
				var byBranchEvent=actGraphic.getAttribute("onmouseover").split(",");
	  			byBranchEvent[2]="'"+actSubprocId+"'";
	  			byBranchEvent[7]="'"+actInfo[5]+"')";
	  			actGraphic.setAttribute("onmouseover",byBranchEvent.join());
			}
			
		}
	}
}
//修改并发分支的altText
function changeAltText(svgdoc,branchID,newName){
	  var currentBranch=svgdoc.getElementById(branchID);
	  var byBranchEvent=currentBranch.getAttribute("onmouseover").split(",");
	  byBranchEvent[2]="'"+newName+"'";
	  currentBranch.setAttribute("onmouseover",byBranchEvent.join());
	  
}

function getColor(state) {
	if (state == "1") {
		return "#00FF00";
	} else if (state == "") {
		return "#000000"
	} else if (state == "4") {
		return "#800000"
	} else if (state == "0") {
		return "#cccccc"
	} else if (state == "2") {
		return "blue"
	} else if (state == "3") {
		return "yellow"
	} else if (state == "5") {
		return "red"
	} 
}
</script>

</head>
<body onload="javascript:onload()" onresize="resize()" style="margin-left:0px;margin-top: 0px;margin-right:0px;margin-bottom: 0px;scrollbar-face-color: #D8E2E7;
scrollbar-shadow-color: #EEEEEE; scrollbar-highlight-color: #EEEEEE;scrollbar-3dlight-color: #EEEEEE;
scrollbar-darkshadow-color: #EEEEEE;scrollbar-track-color: #EEEEEE;scrollbar-arrow-color: #606D79;overflow-y:hidden;overflow-x:hidden; ">
<uniflow:m_form action="svgmonitor.do">
<table border="1" cellpadding="0"cellspacing="0">
<tr>
	<td bgcolor="#EEEEEE">
		<table>
    		<tr>
    		<td align="left" valign="middle" class="main_table2_td2">
      			<table height="28" border="0" cellpadding="0"cellspacing="0"class="main_label_table" >
      				<tr>
      				<uniflow:monitor_action id="refresh" src="refresh.gif" action="javascript:refresh()" alt='<%=MessageUtil.getString("workflow.alt.monitor.refresh.process",session)%>'/>
      				<uniflow:monitor_action id="zoomout" src="zoomout.gif" action="javascript:document.forms[0].svg.window.zoomOut()" alt='80%'/>
      				<uniflow:monitor_action id="nozoom" src="nozoom.gif" action="javascript:document.forms[0].svg.window.originalView()" alt='100%'/>
      				<uniflow:monitor_action id="zoomin" src="zoomin.gif" action="javascript:document.forms[0].svg.window.zoomIn()" alt='120%'/>
      				<uniflow:monitor_action id="procdef" src="procinst.gif" action="javascript:show_procinstdetail()" alt='<%=MessageUtil.getString("workflow.alt.monitor.see.process",session)%>'/>
      				</tr>
    			</table>
    		</td>
    		</tr>
			<tr>
			<td align="center">
				<div style="overflow:auto;background-color:#FFFFFF" id="div">
				<embed id="svg" width='<%=(String)request.getAttribute("maxX")%>' height='<%=(String)request.getAttribute("maxY")%>'
					type="image/svg+xml"
					PLUGINSPAGE="http://www.adobe.com/svg/viewer/install/"
					src="<%=request.getContextPath()%>/displaySvg?print=mprocinst&procinstid=<%=request.getParameter("procInstID")%>&oplevel=<%=request.getParameter("oplevel")%>">
				</embed>
				</div>
			</td>
			</tr>
			<tr>
			<td>
				<table>
					<tr valign="top">
					<td align="left" valign="top"width="10"><hr width='10' size='10' noshade color='#cccccc'></td>
					<td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(0,session)%></td>
					<td align="left" valign="top"width="10"><hr width='10' size='10' noshade color='#00FF00'></td>
    				<td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(1,session)%></td>
					<td align="left" valign="top"width="10"><hr width='10' size='10' noshade color='blue'></td>
    				<td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(2,session)%></td>
					<td align="left" valign="top"width="10"><hr width='10' size='10' noshade color='yellow'></td>
    				<td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(3,session)%></td>
					<td align="left" valign="top"width="10"><hr width='10' size='10' noshade color='#800000'></td>
    				<td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(4,session)%></td>
					<td align="left" valign="top"width="10"><hr width='10' size='10' noshade color='red'></td>
    				<td align="left" valign="middle" width="40" class="input_text"><%=CommonInfoManager.getStateStr(5,session)%></td>
    				<td>&nbsp;</td>
					</tr>
				</table>
			</td>
			</tr>
		</table>
	</td>
	<td bgcolor="#EEEEEE" valign="middle">
		<div style="overflow-x:auto;overflow-y:auto;background-color:#EEEEEE;display:none;" id="info">
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
				<div style="overflow:auto">
				<iframe  name="frame" scrolling="auto" frameborder="0" src=""></iframe>
				<div>
				</td>
			</tr>
			<tr>
				<td align="left" height="30" valign="middle" style="font-size:12;font-weight:bold">
					<bean:message bundle="uniflow" key="workflow.monitor.procinst.path" />&nbsp;
				</td>
			</tr>
			<tr>
				<td>
					<table width="100%">
						<tr>
						<td  align="left" valign="top"  class="input_text">
							<div style="overflow:auto;" id="path">
								<%=CommonInfoManager.getProcessPath(((String)request.getAttribute("instline")))%>
							</div>
						</td>
						</tr>
					</table>
				</td>
			</tr>
			</table>
		</div>
	</td>
</tr>			
</table>
</uniflow:m_form>
<% 
	List branchInfoList = (List)request.getAttribute("branchInfoList");
	Iterator it = branchInfoList.iterator();
	while (it.hasNext()) {
		DynamicBranchInfo info = (DynamicBranchInfo)it.next();
%>
<input type="hidden" id="<%=info.getBranchInstId()%>" name="<%=info.getBranchDefId()%>" otherInfo="<%=info.getOtherInfo()%>" title="<%=info.getBranchInstTitle()%>" value="<%=info.getInfo()%>" />
<% } %>
</body>
</html:html>