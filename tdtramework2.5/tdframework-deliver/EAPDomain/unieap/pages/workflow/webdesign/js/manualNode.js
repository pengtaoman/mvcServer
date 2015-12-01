//Make the page on the top
var newWin=null;
window.onfocus=function (){  
 	if(newWin){
		if(!newWin.closed)
		newWin.focus();
	} 
};

window.document.onfocus=function (){  
	if(newWin){
		if(!newWin.closed)
		newWin.focus();
	} 
};

window.document.onclick=function (){  
	if(newWin){
		if(!newWin.closed)
		newWin.focus();
	} 
};

window.document.ondblclick=function (){  
	if(newWin){
		if(!newWin.closed)
		newWin.focus();
	} 
};

function $(id) {
	return document.getElementById(id);
};

function trim(str) {
	return str.replace(/\s/g, "");
}
function checkOpertion() {
	if (document.getElementById('OpertionLevel1').checked == true) {
		$('Level0').checked = true;
		$('Level1').disabled = true;
		$('Level2').disabled = true;
		$('Level3').disabled = true;
	} else {
		$('Level1').disabled = false;
		$('Level2').disabled = false;
		$('Level3').disabled = false;
	}
}
function getRadioValue(name) {
	var names = document.getElementsByName(name);
	var radioValue = "";
	for (i = 0; i < names.length; i++) {
		if (names[i].checked == true) {
			radioValue = names[i].value;
			return radioValue;
		}
	}
}
function submit_onclick() {
	if (trim(document.manualNodeForm.name.value) == "") {
		document.manualNodeForm.name.focus();
		alert("名称不可以为空")
		document.manualNodeForm.name.value = "";
		return false;
	}

	document.manualNodeForm.opertionLevel.value = getRadioValue("OpertionLevel");
	document.manualNodeForm.assignRule.value = getRadioValue("AssignRule");
	document.manualNodeForm.participantsName.value = $('primaryPerson').value
			+ $('minorPerson').value
	document.manualNodeForm.action.value = "submit";
	document.manualNodeForm.submit();
}
// Display the person page
function displayPerson(flag) {
	$('cType').value = flag;
	var path = document.manualNodeForm.path.value;
	var left = (window.screen.availWidth - 635) / 2 + 20;
	var top = (window.screen.availHeight - 420) / 2;
	openUrl = path
			+ "/unieap/pages/workflow/webdesign/attribute/manualNodePages/unitOrgTree.jsp";
	newWin = window
			.open(
					openUrl,
					'expiration',
					'height=500, width=680,   top='
							+ top
							+ ', left='
							+ left
							+ ',toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
}

// Call function when init page
function initPage() {
	if (document.all) {
		self.resizeTo(660, 620);
	} else {
		self.resizeTo(660, 620);
	}
	checkOpertion();
	
	//初始化主送参与人
	setprimaryPerson();
	
	//初始化抄送参与人
	setminorPerson();
}
function setprimaryPerson(){
	var primaryPreDefine="";
    var def= document.getElementsByName("primaryPreDefine")[0].value;
    var def_all = def.split(";");
    for(var i=0;i<def_all.length;i++){
		if(def_all[i]=="2"){
			primaryPreDefine += "实例创建者;";
		}
		if(def_all[i]=="3"){
			primaryPreDefine += "实例创建者上级;";
		}
		if(def_all[i]=="4"){
			primaryPreDefine += "前一节点;";
		}
		if(def_all[i]=="5"){
			primaryPreDefine += "前一节点上级;";
		}
	}
	
	var nodeVariables = "";
	var variablesString = document.getElementsByName("variablesString")[0].value;
	var str=document.getElementById("nodeVariables").value;
	var variables=str.split(";");
	for(i=0;i<variables.length-1;i++){
	if(variablesString.indexOf(variables[i].split(",")[0])!=-1){
			nodeVariables+=variables[i].split(",")[1]+";";	
		}	
	}
	var node = "";
	
	var nodeArraryString = document.getElementsByName("nodeArraryString")[0].value;
	var nodeStr=document.getElementById("manualNode").value;
	
	var nodes = nodeStr.split(";");
    for(i=0;i<nodes.length-1;i++){
        if(nodeArraryString.indexOf(nodes[i].split(",")[0])!=-1){
            node+=nodes[i].split(",")[1]+";";	
        }
    }
    
	var value = document.getElementById("primaryPerson").value;
	if(value != ""){
		value += ";";
	}
	value += primaryPreDefine+nodeVariables+node;
	document.getElementById("primaryPerson").value = value;
}
function setminorPerson(){
	var minorPreDefine="";
    var def= document.getElementsByName("minorPreDefine")[0].value;
    var def_all = def.split(";");
    for(var i=0;i<def_all.length;i++){
		if(def_all[i]=="2"){
			minorPreDefine += "流程起草人;";
		}
		if(def_all[i]=="3"){
			minorPreDefine += "流程起草人上级;";
		}
		if(def_all[i]=="4"){
			minorPreDefine += "前一节点;";
		}
		if(def_all[i]=="5"){
			minorPreDefine += "前一节点上级;";
		}
	}
	
	var nodeVariables = "";
	var variablesString = document.getElementsByName("minorVariablesString")[0].value;
	var str=document.getElementById("nodeVariables").value;
	var variables=str.split(";");
	for(i=0;i<variables.length-1;i++){
	if(variablesString.indexOf(variables[i].split(",")[0])!=-1){
			nodeVariables+=variables[i].split(",")[1]+";";	
		}	
	}
	var node = "";
	var nodeArraryString = document.getElementsByName("minorNodeArraryString")[0].value;
	var nodeStr=document.getElementById("manualNode").value;
	var nodes = nodeStr.split(";");
    for(i=0;i<nodes.length-1;i++){
        if(nodeArraryString.indexOf(nodes[i].split(",")[0])!=-1){
            node+=nodes[i].split(",")[1]+";";	
        }
    }
	var value = document.getElementById("minorPerson").value;
	if(value != ""){
		value += ";";
	}
	value += minorPreDefine+nodeVariables+node;
	document.getElementById("minorPerson").value = value;
}
// Open application dialog
function openApp(event) {
	var obj = event.srcElement ? event.srcElement : event.target;
	var applicationPageName = obj.name
	var path = document.getElementById("path").value
	var left = (window.screen.availWidth - 635) / 2 + 320;
	var top = (window.screen.availHeight - 420) / 2;
	var appId =  document.manualNodeForm.application.value;
	openUrl = path
			+ "/unieap/pages/workflow/webdesign/attribute/appnewmgt/applicationManager.jsp?"
			+ "applicationPageName=" + applicationPageName + "&applicationId="+appId;
	newWin = window
			.open(
					openUrl,
					'applicationPages',
					'height=520, width=250,  top='
							+ top
							+ ', left='
							+ left
							+ ',toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
}
// clear up application
function clearUp() {
	document.manualNodeForm.applicationName.value = "";
	document.manualNodeForm.application.value = "";
}

// Display the events
function displayEvents() {
	var events = document.manualNodeForm.events.value;
	var msgReceiver = document.manualNodeForm.msgReceiver.value;
	var openUrl = "";
	var path = document.getElementById("path").value;

	openUrl = path
			+ "/unieap/pages/workflow/webdesign/attribute/manualNodePages/events.jsp?events="
			+ events + "&msgReceiver=" + msgReceiver;
	var left = (window.screen.availWidth - 635) / 2 + 20;
	var top = (window.screen.availHeight - 420) / 2;
	if (document.all) {
		parameter = 'height=460, width=600, top=' + top + ', left=' + left
				+ ', toolbar=no, menubar=no, location=no, status=no';
	} else {
		parameter = 'height=485, width=610,  top=' + top + ', left=' + left
				+ ', toolbar=no, menubar=no, location=no, status=no';
	}
	newWin = window.open(encodeURI(encodeURI(openUrl)), 'events', parameter);
}

// Display the survival
function displaySurvival() {
	var dur = document.manualNodeForm.duration.value;
	var aDur = document.manualNodeForm.alertDuration.value;
	var vOD = document.manualNodeForm.varOrDur.value;
	var aVOD = document.manualNodeForm.alertVarOrDur.value;
	var aType = document.manualNodeForm.actionType.value;
	var aAType = document.manualNodeForm.alertActionType.value;
	var aAI = document.manualNodeForm.alertActionInterval.value;
	var aA = document.manualNodeForm.actionApplication.value;
	var aAA = document.manualNodeForm.alertActionApplication.value;
	var v = document.manualNodeForm.variable.value;
	var aV = document.manualNodeForm.alertVariable.value;
	var exAn = document.manualNodeForm.exActionName.value;
	var exAAN = document.manualNodeForm.exAlertActionName.value;
	var openUrl = "";
	var path = document.getElementById("path").value
	openUrl = path
			+ "/unieap/pages/workflow/webdesign/attribute/manualNodePages/expiration.jsp"
			+ "?dur=" + dur + "&aDur=" + aDur + "&vOD=" + vOD + "&aVOD=" + aVOD
			+ "&aType=" + aType + "&aAType=" + aAType + "&aAI=" + aAI + "&aA="
			+ aA + "&aAA=" + aAA + "&v=" + v + "&aV=" + aV + "&exAn=" + exAn
			+ "&exAAN=" + exAAN;
	var left = (window.screen.availWidth - 635) / 2 + 20;
	var top = (window.screen.availHeight - 420) / 2;
	if (document.all) {
		parameter = 'height=430, width=550, top=' + top + ', left=' + left
				+ ', toolbar=no, menubar=no, location=no, status=no';
	} else {
		parameter = 'height=455, width=560,  top=' + top + ', left=' + left
				+ ', toolbar=no, menubar=no, location=no, status=no';
	}
	newWin = window.open(openUrl, 'expiration', parameter);
};