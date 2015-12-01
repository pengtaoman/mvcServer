var v1 = null;
var v2 = null;
var layout = null;
var changed = true;
function init() {
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
	layout = grid.getManager("LayoutManager");
	buildStructure();
}
function buildStructure() {
	v1 = layout.getStructure()[1];
	v2 = layout.getStructure()[2];
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
		var s = [v1,v2];
	}
	changed = !changed;
	layout.setStructure(s);
}
dojo.addOnLoad(function(){
	init();
});