dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	var select = grid.getManager("SelectionManager");
	doh.register("Test Grid Function", [
		
		function test_grid_multipleSelect() {
			doh.is(select.getSelectType(), "multiple");
		},
		
		function test_grid_select() {
			select.clearSelection();
			select.setSelect(0, true);
			select.setSelect(1, true);
			var row = grid.getBinding().getRowData()[0];
			doh.is(row["_s"], true);
			var row = grid.getBinding().getRowData()[1];
			doh.is(row["_s"], true);
		},
		
		function test_grid_getSelectedRowIndexs() {
			select.clearSelection();
			select.setSelect(0, true);
			select.setSelect(2, true);
			select.setSelect(4, true);
			doh.is(select.getSelectedRowIndexs().length, 3);
			doh.is(select.getSelectedRowIndexs()[0], 0);
		},
		
		function test_grid_isSelect() {
			select.clearSelection();
			select.setSelect(2, true);
			doh.is(select.isSelected(2), true);
			select.setSelect(2, false);
			doh.is(select.isSelected(2), false);
		},
		
		function test_grid_setAllSelect() {
			select.setAllSelect(true);
			doh.is(grid.getBinding().getRowSet().getUnSelectedRows().length,0);
			select.clearSelection();
			doh.is(grid.getBinding().getRowSet().getSelectedRowIndexs().length,0);
		}
	]);
	doh.run();
}
