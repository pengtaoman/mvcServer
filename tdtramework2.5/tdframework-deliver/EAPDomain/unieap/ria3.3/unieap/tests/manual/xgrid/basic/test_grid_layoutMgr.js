var v1 = null;
var v2 = null;
var v3 = null;
var layout = null;
var changed = true;
function init() {
	dojo.parser.parse();
	layout = grid.getManager("LayoutManager");
	buildStructure();
}
function buildStructure() {
	v1 = layout.getStructure()[0];
	v2 = layout.getStructure()[1];
	v3 = layout.getStructure()[2];
}
function getLayout() {
	unieap.debug(layout);
}
function getCell() {
	unieap.debug(layout.getCell("NAME"));
}
function getStructure() {
	unieap.debug(layout.getStructure());
}
function setStructure() {
	if (changed) {
		var s = [v2];
	} else {
		var s = [v2,v3];
	}
	changed = !changed;
	layout.setStructure(s);
}
dojo.addOnLoad(function(){
	init();
});