
function test_attr(){
	doh.register("属性测试",[
	
		//required属性
		function test_required(){
			var box=unieap.byId("textbox"),
				visible=dojo.style(box.requiredNode,"visibility");
			doh.is("visible",visible);
		},
		
		//displayFormatter属性
		function test_displayFormatter(){
			var box=unieap.byId("complextBox"),
				text,value;
			box.setValue(20);
			text=box.getText();
			value=box.getValue();
			doh.is("$20.00",text);
			doh.is(20,box.getValue());
			
			box.setValue("2000");
			text=box.getText();
			value=box.getValue();
			doh.is("$2,000.00",text);
			doh.is(2000,box.getValue());
			
			box.setValue(2000000);
			text=box.getText();
			value=box.getValue();
			doh.is("$2,000,000.00",text);
			doh.is(2000000,box.getValue());
		},
		
		//validator属性
		function test_validator(){
			var box=unieap.byId("complextBox"),
				validator=box.getValidator();
			doh.t(validator.validate());
			box.setValue('native2ascii');
			doh.is('只能输入数字',validator.getErrorMsg());
			
			box.setRequired(true);
			box.setValue('');
			doh.t(validator.getErrorMsg().indexOf('该输入项的值不能为空')>-1);
			
			box.setRequired(false);
			box.setValue(3000);
		},
		
		//密码框
		function test_password(){
			var box=unieap.byId('securityBox');
			box.setValue('password');
			var value=[];
			dojo.query("input[type=password]").forEach(function(passwordTextBox){
				value.push(passwordTextBox.value);
			});
			doh.is("password",value.join(","));
			doh.is("password",box.getValue());
		},
		
		//数字文本框range测试
		function test_range(){
			
			var box=unieap.byId('numberBox'),
				value="",
				validator=box.getValidator();
			box.setValue("hello");
			doh.f(validator.validate());
			doh.is(validator.getErrorMsg(),'只能输入1~1000之间的整数');
			
			
			box.setValue(-2);
			doh.f(validator.validate());
			doh.is('最小值为1',validator.getErrorMsg());
			
			box.setValue(1);
			doh.t(validator.validate());
			
			box.setValue(600);
			doh.t(validator.validate());
			
			box.setValue(1000);
			doh.t(validator.validate());
			
			box.setValue(1001);
			doh.f(validator.validate());
			doh.is('最大值为1000',validator.getErrorMsg());
			
			box.setValue(100);
		},
		
		
		//精度测试
		function test_prcesionAndScale(){
			var box=unieap.byId('numberBox'),
				validator=box.getValidator();
			
			box.setValue(1.2);
			doh.t(validator.validate());
			box.setValue(1.20);
			doh.t(validator.validate());
			box.setValue(1.201);
			doh.f(validator.validate());
			doh.is('小数部分最多为2个数字',validator.getErrorMsg());
		}
	]);
}


function test_method(){
	
	doh.register("方法测试",[
	
		//是指是否必填
		//setRequired
		function test_setRequired(){
			var box=unieap.byId("textbox");
			box.setRequired(false);
			var visible=dojo.style(box.requiredNode,"visibility");
			doh.is("hidden",visible);
			box.setRequired(true);
			visible=dojo.style(box.requiredNode,"visibility");
			doh.is("visible",visible);
		},
		
		//获得文本值
		//getValue
		function test_getValue(){
			var box=unieap.byId('textbox');
			doh.is('hi',box.getValue());
			box.setValue("hello");
			doh.is("hello",box.getValue());
		},
		
		//校验
		//getValidator().validate()
		function test_validate(){
			var box=unieap.byId('textbox'),
				validator=box.getValidator(),
				fieldNode=box.fieldNode,
				errorNode=box.errorNode;
			box.setValue('');
			doh.t(dojo.hasClass(box.fieldNode,'u-form-textbox-error'));
			doh.is(dojo.style(errorNode,'display'),'block');
			doh.f(validator.validate());
			doh.t(validator.getErrorMsg().indexOf('该输入项的值不能为空')>-1);
			
			box.setValue("hello");
			doh.f(dojo.hasClass(box.fieldNode,'u-form-textbox-error'));
			doh.is(dojo.style(errorNode,'display'),'none');
			doh.t(validator.validate());
		}
	]);
}


dojo.addOnLoad(function(){
	test_attr();
	test_method();
	doh.run();
});
