
//属性测试
function test_attr(){
	doh.register("属性测试",[
	]);
}


//方法测试
function test_method(){
	doh.register("方法测试",[
	
		//反选
		function test_checkReverse(){
			var box=unieap.byId('boxgroup');
			box.checkReverse();
			var checked=dojo.query('input:checkbox',box.domNode).every(function(dom){
				return dom.checked;
			});
			doh.t(checked);
			box.checkReverse();
			checked=dojo.query('input:checkbox',box.domNode).every(function(dom){
				return !dom.checked;
			});
			doh.t(checked);
		},
		
		//手动选中
		function test_setChecked(){
			var box=unieap.byId('boxgroup');
			//选中第一个和第三个
			box.setChecked(true,[0,2]);
			var value=[];
			dojo.query("input:checked",box.domNode).forEach(function(checkbox,index){
				value.push(checkbox.value);
			});
			doh.is('10,30',value.join(','));
			//取消选中
			box.setChecked(false,[0,2]);
			value=[];
			dojo.query("input:checked",box.domNode).forEach(function(checkbox,index){
				value.push(checkbox.value);
			});
			doh.is(value.join(','),'');
			//全部选中
			box.setChecked(true,[0,1,2,3]);
			dojo.query("input:checked",box.domNode).forEach(function(checkbox,index){
				value.push(checkbox.value);
			});
			doh.is('10,20,30,40',value.join(','));
		},
		
		//获得文本
		function test_getText(){
			var box=unieap.byId('boxgroup'),
				text=box.getText();
			doh.is("财务部,采购部,销售部,开发部",text);
			//全部取消选中
			box.checkReverse();
			text=box.getText();
			doh.is("",text);
		},
		
		//设置禁用
		function set_disabled(){
			var box=unieap.byId('boxgroup');
			//禁用第一个和第四个
			box.setDisabled(true,[1,3]);
			var value=[];
			dojo.query("input[disabled]",box.domNode).forEach(function(checkbox){
				value.push(checkbox.value);
			});
			doh.is("20,40",value);
			//再禁用第二个和第三个
			box.setDisabled(true,[1,2]);
			value=[];
			dojo.query("input[disabled]",box.domNode).forEach(function(checkbox){
				value.push(checkbox.value);
			});
			doh.is("20,30,40",value.join(","));
			
			//取消禁用
			box.setDisabled(false,[1,2,3]);
			value=[];
			dojo.query("input[disabled]",box.domNode).forEach(function(checkbox){
				value.push(checkbox.value);
			});
			doh.is("",value.join(","));
		},
		
		function test_getValue(){
			var box=unieap.byId('boxgroup');
			box.setChecked(true,[0]);
			doh.is("10",box.getValue());
			doh.is("财务部",box.getText());
			box.setValue("20,40");
			doh.is("20,40",box.getValue());
			doh.is("采购部,开发部",box.getText());
		}
	]);
}


dojo.addOnLoad(function(){
	test_attr();
	test_method();
	doh.run();
});
