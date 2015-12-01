// Display the conditions
function displayConditions(conditionType) {
	var conditionValue = "";
	if (conditionType == "preCondition") {
		conditionValue = document.forms[0].preCondition.value;
	} else {
		conditionValue = document.forms[0].postCondition.value;
	}
	var openUrl = "";
	var path = document.getElementById("path").value;

	openUrl = path
			+ "/unieap/pages/workflow/webdesign/attribute/conditions.jsp?conditionValue="
			+ encodeURIComponent(encodeURIComponent(conditionValue)) + "&conditionType=" + conditionType;
	var left = (window.screen.availWidth - 635) / 2 + 20;
	var top = (window.screen.availHeight - 420) / 2;
	if (document.all) {
		parameter = 'height=330, width=550, top=' + top + ', left=' + left
				+ ', toolbar=no, menubar=no, location=no, status=no';
	} else {
		parameter = 'height=330, width=550,  top=' + top + ', left=' + left
				+ ', toolbar=no, menubar=no, location=no, status=no';
	}
	newWin = window
			.open(openUrl, 'conditions', parameter);
}
