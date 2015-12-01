//属性测试
function test_attr(){
	doh.register("属性测试",[
		function test_label(){
			var btn=unieap.byId('btn');
			doh.is(btn.getValue(),"按钮");
		}
	]);
	doh.run();
	
	
}


//方法测试
function test_method(){
	doh.register("方法测试",[
		function test_setDisabled(){
			var btn = unieap.byId('btn'), button = btn.btnNode;
			btn.setDisabled(true);
			doh.is(dojo.attr(btn, 'disabled'), true);
			btn.setDisabled(false);
			doh.is(dojo.attr(btn, 'disabled'), false);
		},
		
		function test_setValue(){
			var btn=unieap.byId('btn'),
				str="测试";
			btn.setValue(str);
			doh.is(btn.getValue(),str);
			
			//测试数据绑定
			var form=unieap.byId('form');
			form.getBinding().setDataStore(dataCenter.getDataStore("largeDataStore"));
			btn=unieap.byId('btn_bind');
			doh.is(btn.getValue(),'工程师3');
		
		}
			
	]);
}

dojo.addOnLoad(function(){
	test_attr();
	test_method();
	doh.run();
});


