
//属性测试
function test_attr(){
	doh.register("属性测试",[
		function test_checked(){
			var radio=unieap.byId('radiobox');
			doh.t(radio.isChecked());
		}
	]);
}


//方法测试
function test_method(){
	doh.register("方法测试",[
		function test_setChecked(){
			var radio=unieap.byId('radiobox');
			radio.setChecked(false);
			doh.f(radio.isChecked());
			radio.setChecked(true);
			doh.t(radio.isChecked());
		},
		
		function test_setValue(){
			var radio=unieap.byId('radiobox');
			radio.setValue("0");
			doh.f(radio.isChecked());
			radio.setValue("1");
			doh.t(radio.isChecked());
		},
		
		function test_getValue(){
			var radio=unieap.byId('radiobox');
			radio.setChecked(false);
			doh.is(radio.getValue(),radio.getUncheckedValue());
			radio.setChecked(true);
			doh.is(radio.getValue(),radio.getCheckedValue());
			
		},
		
		function test_setDisabled(){
			var radio=unieap.byId('radiobox');
			radio.setDisabled(true);
			doh.t(dojo.query("input:radio[disabled]"),1);
			radio.setDisabled(false);
			doh.t(dojo.query("input:radio[disabled]"),0);
		}
	]);
}


dojo.addOnLoad(function(){
	test_attr();
	test_method();
	doh.run();
});
