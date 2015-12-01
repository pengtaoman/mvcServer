dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);
//	store.getRowSet().getData()[1]["_s"] = true;
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
});
function getCascade(item) {
	if (item.CODEVALUE==11) {
		return "c2";
	} else if (item.CODEVALUE==12) {
		return "c1";
	}
	return null;
}
function doGroup() {
	var group = grid.managers.get("GroupManager");
	group.setName(['attr_province','NAME']);
	group.commit();
}
function undoGroup() {
	var group = grid.managers.get("GroupManager");
	group.clear();
}
function groupFormatter(name, value) {
	if (name=="attr_province") {
		return "省份---"+ (value==12?"辽宁":"浙江");
	} else {
		return value+"(姓名)";
	}
	return name+"+++"+value;
}