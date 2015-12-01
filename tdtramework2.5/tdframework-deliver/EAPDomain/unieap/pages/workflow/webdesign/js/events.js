function initEvents() {
	var msgReceiver = "";
	msgReceiver = document.getElementById("msgReceiverString").value;
	document.getElementById("msgReceiver").value = msgReceiver;
	var event = [];
	var eventString = document.getElementById("eventString").value;
	event = eventString.substring(0, eventString.length - 1).split(";");
	for (var i = 0; i < event.length; i++) {
		var eventPro = [];
		eventPro = event[i].split(",");
		setEvent(eventPro[0], eventPro[1], eventPro[2]);
	}
}
function setEvent(eventID, action, actionName) {
	switch (eventID) {
		case "530" :
			document.getElementById("actOpenEvent").checked = true;
			document.getElementById("actOpenEventAction").value = action;
			document.getElementById("actOpenEventText").value = actionName;
			break;
		case "531" :
			document.getElementById("actCloseEvent").checked = true;
			document.getElementById("actCloseEventAction").value = action;
			document.getElementById("actCloseEventText").value = actionName;
			break;
		case "524" :
			document.getElementById("actSuspendEvent").checked = true;
			document.getElementById("actSuspendEventAction").value = action;
			document.getElementById("actSuspendEventText").value = actionName;
			break;
		case "526" :
			document.getElementById("actRollbackEvent").checked = true;
			document.getElementById("actRollbackEventAction").value = action;
			document.getElementById("actRollbackEventText").value = actionName;
			break;
		case "523" :
			document.getElementById("actAbortEvent").checked = true;
			document.getElementById("actAbortEventAction").value = action;
			document.getElementById("actAbortEventText").value = actionName;
			break;
		case "529" :
			document.getElementById("actCompletedEvent").checked = true;
			document.getElementById("actCompletedEventAction").value = action;
			document.getElementById("actCompletedEventText").value = actionName;
			break;
		case "522" :
			document.getElementById("actStartEvent").checked = true;
			document.getElementById("actStartEventAction").value = action;
			document.getElementById("actStartEventText").value = actionName;
			break;
		case "525" :
			document.getElementById("actResumeEvent").checked = true;
			document.getElementById("actResumeEventAction").value = action;
			document.getElementById("actResumeEventText").value = actionName;
			break;
		case "521" :
			document.getElementById("actCreateEvent").checked = true;
			document.getElementById("actCreateEventAction").value = action;
			document.getElementById("actCreateEventText").value = actionName;
			break;
		case "528" :
			document.getElementById("actDeleteEvent").checked = true;
			document.getElementById("actDeleteEventAction").value = action;
			document.getElementById("actDeleteEventText").value = actionName;
			break;
		case "542" :
			document.getElementById("openEvent").checked = true;
			document.getElementById("openEventAction").value = action;
			document.getElementById("openEventText").value = actionName;
			break;
		case "543" :
			document.getElementById("closeEvent").checked = true;
			document.getElementById("closeEventAction").value = action;
			document.getElementById("closeEventText").value = actionName;
			break;
		case "547" :
			document.getElementById("suspendEvent").checked = true;
			document.getElementById("suspendEventAction").value = action;
			document.getElementById("suspendEventText").value = actionName;
			break;
		case "546" :
			document.getElementById("rollbackEvent").checked = true;
			document.getElementById("rollbackEventAction").value = action;
			document.getElementById("rollbackEventText").value = actionName;
			break;
		case "545" :
			document.getElementById("reassignEvent").checked = true;
			document.getElementById("reassignEventAction").value = action;
			document.getElementById("reassignEventText").value = actionName;
			break;
		case "544" :
			document.getElementById("completedEvent").checked = true;
			document.getElementById("completedEventAction").value = action;
			document.getElementById("completedEventText").value = actionName;
			break;
		case "549" :
			document.getElementById("abortEvent").checked = true;
			document.getElementById("abortEventAction").value = action;
			document.getElementById("abortEventText").value = actionName;
			break;
		case "548" :
			document.getElementById("resumeEvent").checked = true;
			document.getElementById("resumeEventAction").value = action;
			document.getElementById("resumeEventText").value = actionName;
			break;
		case "541" :
			document.getElementById("createEvent").checked = true;
			document.getElementById("createEventAction").value = action;
			document.getElementById("createEventText").value = actionName;
			break;
		case "550" :
			document.getElementById("deleteEvent").checked = true;
			document.getElementById("deleteEventAction").value = action;
			document.getElementById("deleteEventText").value = actionName;
			break;
		case "551" :
			document.getElementById("commissionEvent").checked = true;
			document.getElementById("commissionEventAction").value = action;
			document.getElementById("commissionEventText").value = actionName;
			break;
		case "504" :
			document.getElementById("procSuspendEvent").checked = true;
			document.getElementById("procSuspendEventAction").value = action;
			document.getElementById("procSuspendEventText").value = actionName;
			break;
		case "508" :
			document.getElementById("aprocCompletedEvent").checked = true;
			document.getElementById("aprocCompletedEventAction").value = action;
			document.getElementById("aprocCompletedEventText").value = actionName;
			break;
		case "503" :
			document.getElementById("procAbortEvent").checked = true;
			document.getElementById("procAbortEventAction").value = action;
			document.getElementById("procAbortEventText").value = actionName;
			break;
		case "502" :
			document.getElementById("procStartEvent").checked = true;
			document.getElementById("procStartEventAction").value = action;
			document.getElementById("procStartEventText").value = actionName;
			break;
		case "507" :
			document.getElementById("procRestartEvent").checked = true;
			document.getElementById("procRestartEventAction").value = action;
			document.getElementById("procRestartEventText").value = actionName;
			break;
		case "505" :
			document.getElementById("procResumeEvent").checked = true;
			document.getElementById("procResumeEventAction").value = action;
			document.getElementById("procResumeEventText").value = actionName;
			break;
		case "501" :
			document.getElementById("procCreateEvent").checked = true;
			document.getElementById("procCreateEventAction").value = action;
			document.getElementById("procCreateEventText").value = actionName;
			break;
		case "506" :
			document.getElementById("procDeleteEvent").checked = true;
			document.getElementById("procDeleteEventAction").value = action;
			document.getElementById("procDeleteEventText").value = actionName;
			break;
	}
}
function ock_check(id) {
	var obj = document.getElementById(id);
	var eventAction = document.getElementById(id + "Action");
	var eventApp = document.getElementById(id + "Text");
	var eventBtn = document.getElementById(id + "Button");
	if (obj.checked == true) {
		eventApp.disabled = "";
		eventBtn.disabled = "";
	} else {
		eventAction.value = "";
		eventApp.value = "";
		eventApp.disabled = "disabled";
		eventBtn.disabled = "disabled";
	}
}
function setParentValue() {
	var isComplete = true;
	var msgReceiver = "";
	msgReceiver = document.getElementById("msgReceiver").value;
	var events = [];
	var ret = "";
	events = document.getElementsByName("events");
	for (var i = 0; i < events.length; i++) {
		if (events[i].checked) {
			var eventID = document.getElementById(events[i].id + "Type").value;
			var eventAction = document.getElementById(events[i].id + "Action").value;
			var actionName = document.getElementById(events[i].id + "Text").value;
			if (eventAction == "") {
				isComplete = false;
				break;
			}
			ret += eventID;
			ret += "," + eventAction;
			ret += "," + actionName;
			ret += ";";
		}
	}
	if (isComplete) {
		window.opener.document.forms[0].events.value = ret;
		window.opener.document.forms[0].msgReceiver.value = msgReceiver;
		window.opener = null;
		window.close();
	} else {
		alert("请选择应用程序");
	}
}

// Open application dialog
function openApp(event) {
	var obj = event.srcElement ? event.srcElement : event.target;
	var applicationPageName = obj.name;
	var path = document.getElementById("projectPath").value;
	var left = (window.screen.availWidth - 635) / 2 + 320;
	var top = (window.screen.availHeight - 420) / 2;
	openUrl = path
			+ "/unieap/pages/workflow/webdesign/attribute/appnewmgt/applicationManager.jsp?"
			+ "applicationPageName=" + applicationPageName;
	newWin = window
			.open(
					openUrl,
					"applicationPages",
					"height=520, width=250, top="
							+ top
							+ ", left="
							+ left
							+ ",toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
}

function validateInput() {

	if (!((window.event.keyCode >= 48) && (window.event.keyCode <= 57))
			&& !((window.event.keyCode >= 65) && (window.event.keyCode <= 90))
			&& !((window.event.keyCode >= 97) && (window.event.keyCode <= 122))
			&& !(window.event.keyCode == 95)) {
		window.event.keyCode = 0;
	}
}
