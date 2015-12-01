dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);

	dojo.parser.parse();
	 testUtil.markNode(grid.domNode);
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
	testUtil.markNode(grid.domNode);
}
function groupFormatter(name, value) {
	if (name=="attr_province") {
		return "省份---"+ (value==12?"辽宁":"浙江");
	} else {
		return value+"(姓名)";
	}
	return name+"+++"+value;
}
function changeDS() {
	grid.getBinding().setDataStore(unieap.getDataStore("empDataStore2"))
	 testUtil.markNode(grid.domNode);
}