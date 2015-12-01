dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	var select = grid.getManager("SelectionManager");
	doh.register("Test Grid Function", [
		
		function test_grid_singleSelect() {
			doh.is(select.getSelectType(), "single");
		},
		
		function test_grid_select1() {
			select.clearSelection();
			select.setSelect(0, true);
			var row = grid.getBinding().getRowData()[0];
			doh.is(row["_s"], true);
		},
		
		function test_grid_getSelectedRowIndexs() {
			select.clearSelection();
			select.setSelect(1, true);
			select.setSelect(3, true);
			doh.is(select.getSelectedRowIndexs().length, 1);
			doh.is(select.getSelectedRowIndexs()[0], 3);
		},
		
		function test_grid_isSelect() {
			select.clearSelection();
			select.setSelect(2, true);
			doh.is(select.isSelected(2), true);
			select.setSelect(2, false);
			doh.is(select.isSelected(2), false);
		}
	]);
	doh.run();
}
