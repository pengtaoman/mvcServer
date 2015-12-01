dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	testWidget = grid;
	//当Grid初始化后测试Grid的属性是否正确
	doh.register("Test Grid Attribute", [
		function test_width() {
			doh.is(testWidget.width, "500px");
		},
		function test_height() {
			doh.is(testWidget.height, "300px");
		}
	]);
	doh.register("Test Grid Function", [
		function test_grid() {
			doh.is(testWidget.getBinding().grid, grid);
		},
		function test_store() {
			doh.is(testWidget.getBinding().getDataStore(), unieap.getDataStore("empDataStore", "dataCenter"));
		},
		function test_getRowCount() {
			doh.is(testWidget.getBinding().getRowCount(), 5);
		},
		function test_min() {
			doh.is(testWidget.getBinding().min("attr_sal"), 1080);
		},
		function test_max() {
			doh.is(testWidget.getBinding().max("attr_sal"), 50000);
		},
		function test_avg() {
			doh.is(testWidget.getBinding().avg("attr_sal"), 12386.8);
		},
		function test_sum() {
			doh.is(testWidget.getBinding().sum("attr_sal"), 61934);
		}
	]);
	doh.run();
}
