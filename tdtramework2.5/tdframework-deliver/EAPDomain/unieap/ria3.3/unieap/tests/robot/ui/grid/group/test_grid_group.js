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
	group.setName(['attr_province','aaa']);
	group.commit();
	testUtil.markNode(grid.domNode);
}
function undoGroup() {
	doGroup();
	var group = grid.managers.get("GroupManager");
	group.clear();
	testUtil.markNode(grid.domNode);
}
