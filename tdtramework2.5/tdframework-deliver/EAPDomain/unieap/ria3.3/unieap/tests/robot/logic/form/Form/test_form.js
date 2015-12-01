function init(){
	 var ds=new unieap.ds.DataStore("testStore",[{name:'liu',empno:'1',hiredate:'2003-07-13',deptno:'10',sal:'3000'}]);
	 var test =new unieap.ds.DataStore("testDEPT",[{CODEVALUE:10,CODENAME:'salDepartment'},
												  {CODEVALUE:20,CODENAME:'techDepartment'},
												  {CODEVALUE:30,CODENAME:'testDepartment'}]);
	 dataCenter.addDataStore(ds);
	 dataCenter.addDataStore(test);
}
init();



function test_attr(){
	
	
}


function test_method(){
	
	doh.register("方法测试",[
	
		//控件值收集
		function test_collectData(){
			var form=unieap.byId('form'),
				actualData=form.getHelper().collectData(),
				expectedData={
					name:'liu',
					sal:'3000',
					empno:'1',
					hiredate:'2003-07-13',
					deptno:'10'
				}
			doh.is(dojo.toJson(expectedData),dojo.toJson(actualData));
		},
		
		//获得form下的Widget控件
		function test_getDescendants(){
			var form=unieap.byId('form');
			doh.is(5,form.getDescendants().length);
		},
		
		//判断form是否修改
		function test_isModified(){
			var form=unieap.byId('form');
			doh.f(form.isModified());
			unieap.byId('name').setValue('flyingzl');
			doh.t(form.isModified());
			
		},
		
		//清空form下所有控件的值
		//不显示小三角，但测试form.isModified()为true
		function test_clear(){
			var form=unieap.byId('form');
			form.clear();
			doh.t(form.isModified());
			var actualData=form.getHelper().collectData(),
				expectedData={
					name:'',
					sal:'',
					empno:'',
					hiredate:'',
					deptno:null
				}
			doh.is(dojo.toJson(expectedData),dojo.toJson(actualData));
		},
		
		//还原到初始值
		function test_reset(){
			var form=unieap.byId('form');
			form.reset();
			doh.f(form.isModified());
			var actualData=form.getHelper().collectData(),
				expectedData={
					name:'liu',
					sal:'3000',
					empno:'1',
					hiredate:'2003-07-13',
					deptno:'10'
				}
			doh.is(dojo.toJson(expectedData),dojo.toJson(actualData));
		},
		
		//表单校验
		function test_validate(){
			var form=unieap.byId("form");
			doh.t(form.validate());
			unieap.byId('name').setValue('');
			doh.f(form.validate());
			//获得第一个出错的控件
			doh.is('name',form.getInvalidWidget().id);
			unieap.byId('name').setValue('flyingzl');
			doh.t(form.validate());
			//全部校验通过，没有非法的控件
			doh.is(null,form.getInvalidWidget());
			form.reset();
			doh.f(form.isModified());
		},
		
		//刷新绑定
		function test_refresh(){
			var form=unieap.byId("form"),
				binding=form.getBinding(),
				row=binding.getRow();
			row.getData()['name']='flyingzl';
			form.refresh();
			doh.is('flyingzl',unieap.byId('name').getValue());
			
		}
	
	]);
}

dojo.addOnLoad(function(){
	
	test_attr();
	test_method();
	doh.run();
});



