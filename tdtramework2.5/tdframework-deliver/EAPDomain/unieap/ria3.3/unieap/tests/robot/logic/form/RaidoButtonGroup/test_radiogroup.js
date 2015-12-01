
//属性测试
function test_attr(){
	doh.register("属性测试",[
	]);
}


//方法测试
function test_method(){
	doh.register("方法测试",[
	
		function test_getValue(){
			var box=unieap.byId('radioGroup');
			box.setValue("20");
			var value=""
			dojo.query("input:checked",box.domNode).forEach(function(radio){
				value=radio.value;
			});
			doh.is("20",value);
			doh.is("20",box.getValue());
			box.setValue("10");
			dojo.query("input:checked",box.domNode).forEach(function(radio){
				value=radio.value;
			});
			doh.is("10",value);
			doh.is("10",box.getValue());
		},
		
		
		//获得文本
		function test_getText(){
			var box=unieap.byId('radioGroup'),
				text=box.getText();
			doh.is("财务部",text);
		}
		
		
	
	]);
}


dojo.addOnLoad(function(){
	test_attr();
	test_method();
	doh.run();
});
