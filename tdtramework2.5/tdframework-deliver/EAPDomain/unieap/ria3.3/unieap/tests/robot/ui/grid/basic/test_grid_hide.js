var v1=null;
var v2=null;
var layout=null;
var changed = true;
function init() {
	layout = grid.getManager("LayoutManager");
	v1 = layout.getStructure()[1];
	v2 = layout.getStructure()[2];
}
function setStructure(){
	if (changed) {
		var s = [v2];
	} else {
		var s = [v1,v2];
	}
	changed = !changed;
	layout.setStructure(s);
	testUtil.markNode(unieap.byId("grid").domNode);
}
function isHide(){
	var isHide =layout.isHidden("attr_empno");
	alert(isHide);
}
dojo.addOnLoad(init);
