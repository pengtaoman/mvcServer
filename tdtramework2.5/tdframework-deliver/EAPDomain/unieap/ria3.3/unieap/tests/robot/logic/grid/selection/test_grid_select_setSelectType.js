dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	var select = grid.getManager("SelectionManager");
	doh.register("Test Grid Function", [
		function test_grid_selectType() {
			doh.is(select.getSelectType(), "none");
		},
		function test_grid_multipleSelect() {
			select.setSelectType("multiple");
			doh.is(select.getSelectType(), "multiple");
		},
		function test_grid_singleSelect() {
			select.setSelectType("single");
			doh.is(select.getSelectType(), "single");
		}
	]);
	doh.run();
}
