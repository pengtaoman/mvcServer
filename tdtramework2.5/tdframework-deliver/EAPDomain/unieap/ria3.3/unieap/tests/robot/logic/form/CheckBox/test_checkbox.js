
//属性测试
function test_attr(){
	doh.register("属性测试",[
		function test_checked(){
			setTimeout(function(){
//				debugger;
				var checkbox=unieap.byId('checkbox');
				doh.t(checkbox.isChecked());
			},5000);
			
		}
	]);
}


//方法测试
function test_method(){
	doh.register("方法测试",[
	
		//测试选中、取消
		function test_setChecked(){
			var checkbox=unieap.byId('checkbox');
			checkbox.setChecked(false);
			doh.f(checkbox.isChecked());
			checkbox.setChecked(true);
			doh.t(checkbox.isChecked());
		},
		
		//测试setValue
		function test_setValue(){
			var checkbox=unieap.byId('checkbox');
			checkbox.setChecked(true);
			doh.is(checkbox.getValue(),checkbox.getCheckedValue());
			checkbox.setChecked(false);
			doh.is(checkbox.getValue(),checkbox.getUncheckedValue());
		},
		
		//测试getValue
		function test_getValue(){
			var checkbox=unieap.byId('checkbox');
			checkbox.setChecked(false);
			doh.is(checkbox.getValue(),checkbox.getUncheckedValue());
			checkbox.setChecked(true);
			doh.is(checkbox.getValue(),checkbox.getCheckedValue());
			
		},
		
		//测试 setDisabled
		function test_setDisabled(){
			var checkbox=unieap.byId('checkbox');
			checkbox.setDisabled(true);
			doh.t(dojo.query("input:radio[disabled]"),1);
			checkbox.setDisabled(false);
			doh.t(dojo.query("input:radio[disabled]"),0);
		}
	]);
}


dojo.addOnLoad(function(){
	test_attr();
	//test_method();
	doh.run();
});
