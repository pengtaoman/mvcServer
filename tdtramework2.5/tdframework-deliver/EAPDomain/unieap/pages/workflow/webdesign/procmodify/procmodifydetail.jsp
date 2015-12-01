<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.SessionManager"%>
<%
	String isNewVersion = "false";
	String curActId = "";
	String afterTranId = "";
	String procinstID = "";
	String isCreateNewProcess = "false";
	String editable = "true";
	String selectedVersion = "";
	String appHost = "appmanager";
	String msgReceiver = "appmanager";
	String operatable = "true";
	String selectedID = "";
	String isLoadData = "true";
	String contextPath = request.getContextPath();
	String locale = "zh_CN";
	String userAccount = "";
	if (request.getSession().getAttribute(
			SessionManager.USER) != null) {
		userAccount = request.getSession().getAttribute(
				SessionManager.USER).toString();
	} 
	if (request.getSession().getAttribute(Globals.LOCALE_KEY) != null) {
		String selectedLocal = request.getSession().getAttribute(
				Globals.LOCALE_KEY).toString();
		if (selectedLocal.equals(Locale.CHINA.toString()))
			locale = "zh_CN";
		else if (selectedLocal.equals(Locale.ENGLISH.toString()))
			locale = "en_US";
		else
			locale = "zh_CN";
	}
	if (request.getParameter("isLoadData") != null) {
		isLoadData = request.getParameter("isLoadData");
	}
	if (request.getParameter("isCreateNewProcess") != null) {
		isCreateNewProcess = request.getParameter("isCreateNewProcess");
	}
	if (request.getParameter("selectedID") != null) {
		selectedID = request.getParameter("selectedID");
	} else if (request.getAttribute("selectedID") != null) {
		selectedID = (String) request.getAttribute("selectedID");
	}
	if (request.getAttribute("procinstID") != null) {
		procinstID = (String) request.getAttribute("procinstID");
	}
	if (request.getAttribute("curActAfterTran") != null) {
		afterTranId = (String) request.getAttribute("curActAfterTran");
	}
	if (request.getAttribute("curActId") != null) {
		curActId = (String) request.getAttribute("curActId");
	}
	if (request.getAttribute("isNewVersion") != null) {
		isNewVersion = (String) request.getAttribute("isNewVersion");
	}
	if (request.getAttribute("editable") != null) {
		editable = (String) request.getAttribute("editable");
	}
	if (request.getAttribute("selectedVersion") != null) {
		selectedVersion = (String) request
				.getAttribute("selectedVersion");
	}
	if (request.getAttribute("operatable") != null) {
		operatable = (String) request.getAttribute("operatable");
	}
%>

<%@page import="org.apache.struts.Globals"%>
<%@page import="java.util.Locale"%>
<%@page import="com.neusoft.uniflow.web.util.SessionManager;"%>
<html:html>
<head>
	<title>流程设计器</title>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/AC_OETags.js"></script>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/history/history.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/bizHandler.js"></script>
	<script>
var id;
var xmlStr;
var type;
var flag;
var isNewVersion;
var editable;
var operatable;

function sendDataToJsp(xmlStr1,type1,id1,flag1){
     flag=flag1;
     xmlStr=xmlStr1;
     id=id1;
     type=type1;
     isNewVersion = '<%=isNewVersion%>';
     editable = '<%=editable%>';
     operatable = '<%=operatable%>';
     var openUrl = "<%=WorkflowManager.getWorkflowPath()%>/webdesign/attribute/forward.jsp";
     var width = 650;
     var height = 512;
     open_scrollable_window(openUrl,width , height);
     //window.showModalDialog("unieap/pages/workflow/common/popupwrapper.jsp",param , features);
}


function callFlex(xmlStr,id){
     document.getElementById("workflow").setValuesToFlex(xmlStr,id,"");
}

function callFlex(xmlStr , id ,name){
     document.getElementById("workflow").setValuesToFlex(xmlStr,id,name);
}

function callFlexTree(xmlStr , id ,name,type)
{
    document.getElementById("workflow").setValuesToFlexTree(xmlStr,id,name,type); 
}

function pageSubmit(){
	document.getElementById("workflow").callFlexSave();
}

function saveProcRefresh(saveResult,procDefID,procDefVersion,isSubmit,isProcInst){
	//handleBiz(saveResult,procDefID,procDefVersion);
	//if(saveResult == "true")
		//document.getElementById("workflow").callFlexRefresh(procDefID);
}

function closeJsp(){
	check();
}
function closeWindow(event){
    event.returnValue=" "
}
function check(){
    if(confirm("您确定要离开吗？")){
      window.onbeforeunload="";
        window.close();
    }
}

function callHelpPage(isNewVersion){
    var openUrl = "";
    if(isNewVersion == "false"){
       openUrl = "<%=WorkflowManager.getWorkflowPath()%>/webdesign/attribute/defhelp.jsp";
    }else{
       openUrl = "<%=WorkflowManager.getWorkflowPath()%>/webdesign/attribute/inshelp.jsp";
    }
    var width = 600;
    var height = 512;
    open_scrollable_window(openUrl,width , height);
}

function createProcinst(type){
    var openUrl = "";
    if(type == "NewByTemplet"){
       openUrl = "<%=WorkflowManager.getWorkflowPath()%>/webdesign/attribute/appnewmgt/procTemplets.jsp";
    }
    var width = 600;
    var height = 512;
    open_scrollable_window(openUrl,width , height);
}

function openProcByID(id){
    var openUrl = "<%=WorkflowManager.getWorkflowPath()%>/webdesign/procmodify/procmodifydetail.jsp?selectedID="+id;
    var width = 600;
    var height = 512;
    open_scrollable_window(openUrl,width , height);
}

function importXML(){
    var openUrl = "<%=WorkflowManager.getWorkflowPath()%>/webdesign/attribute/fileUpLoadPages/fileUpLoad.jsp";
    var width = 600;
    var height = 512;
    open_scrollable_window(openUrl,width , height);
}

function exportXML(xmlStr){
    document.procModifyDetailForm.xmlStr.value = xmlStr;
    window.onbeforeunload="";
    document.procModifyDetailForm.submit();
}
function exportJPG(){
	window.onbeforeunload="";
}
function importXMLintoFlex(xmlStr){
    document.getElementById("workflow").importXML(xmlStr);
}
function setTitle(procName){
	document.title=procName;
}
</script>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

	<!--  BEGIN Browser History required section -->
	<link rel="stylesheet" type="text/css"
		href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/history/history.css" />
	<!--  END Browser History required section -->

	<title></title>
	<%
		String procID = request.getParameter("selectedID");
	%>
	<style>
body {
	margin: 0px;
	overflow: hidden
}
</style>

	<script language="JavaScript" type="text/javascript">
<!--
// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var requiredMajorVersion = 9;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Minor version of Flash required
var requiredRevision = 115;
// -----------------------------------------------------------------------------
// -->

</script>
</head>
<body onbeforeunload="closeWindow(event)">

	<script language="JavaScript" type="text/javascript">
<!--
// Version check for the Flash Player that has the ability to start Player Product Install (6.0r65)
var hasProductInstall = DetectFlashVer(6, 0, 65);

// Version check based upon the values defined in globals
var hasRequestedVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);


if ( hasProductInstall && !hasRequestedVersion ) {
	// DO NOT MODIFY THE FOLLOWING FOUR LINES
	// Location visited after installation is complete if installation is required
	var MMPlayerType = (isIE == true) ? "ActiveX" : "PlugIn";
	var MMredirectURL = window.location;
    document.title = document.title.slice(0, 47) + " - Flash Player Installation";
    var MMdoctitle = document.title;

	AC_FL_RunContent(
		"src", "playerProductInstall",
		"FlashVars", "value="+str+"&MMredirectURL="+MMredirectURL+'&MMplayerType='+MMPlayerType+'&selectedID='+"<%=request.getAttribute("selectedID")%>"+'&MMdoctitle='+MMdoctitle+"",
		"width", "943",
		"height", "566",
		"align", "middle",
		"id", "workflow",
		"quality", "high",
		"bgcolor", "#869ca7",
		"name", "workflow",
		"allowScriptAccess","sameDomain",
		"type", "application/x-shockwave-flash",
		"pluginspage", "http://www.adobe.com/go/getflashplayer"
	);
} else if (hasRequestedVersion) {

	// if we've detected an acceptable version
	// embed the Flash Content SWF when all tests are passed
	AC_FL_RunContent(
			"src", "<%=WorkflowManager.getWorkflowPath()%>/webdesign/common/workflow",
			"FlashVars", "MMredirectURL="+MMredirectURL+'&MMplayerType='+MMPlayerType+'&selectedID='+"<%=selectedID%>"+'&selectedVersion='+"<%=selectedVersion%>"+'&isCreateNewProcess='+'<%=isCreateNewProcess%>'+'&isNewVersion='+'<%=isNewVersion%>'+'&curActID='+'<%=curActId%>'+'&afterTranID='+'<%=afterTranId%>'+'&procinstID='+'<%=procinstID%>'+'&operatable='+'<%=operatable%>'+'&editable='+'<%=editable%>'+'&path='+"<%=contextPath%>"+'&isLoadData='+'<%=isLoadData%>'+'&localeChain='+'<%=locale%>'+'&MMdoctitle='+MMdoctitle+'&userAccount='+'<%=userAccount%>'+'&appHost='+"<%=appHost%>"+'&msgReceiver='+"<%=msgReceiver%>"+"",
		
			"width", "100%",
			"height", "100%",
			"align", "middle",
			"id", "workflow", 
			"quality", "high",
			"bgcolor", "#869ca7",
			"name", "workflow",
			"allowScriptAccess","sameDomain",
			"type", "application/x-shockwave-flash",
			"pluginspage", "http://www.adobe.com/go/getflashplayer"
	);
  } else {  // flash is too old or we can't detect the plugin
    //var alternateContent = 'Alternate HTML content should be placed here. '
  	//+ 'This content requires the Adobe Flash Player. '
   	//+ '<a href=http://www.adobe.com/go/getflash/>Get Flash</a>';
    //document.write(alternateContent);  // insert non-flash content
    window.onbeforeunload="";
    var url= "<%=WorkflowManager.getWorkflowPath()%>/webdesign/flash.jsp";
    var width = 420;
    var height = 240; 
    open_scrollable_window(url,width,height); 
  }
// -->
</script>
	<html:form action="toExport.do">
		<html:hidden property="xmlStr" />
	</html:form>
</body>
</html:html>