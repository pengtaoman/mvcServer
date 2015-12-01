
function initDateTextBox(){
	
	var inputs=dojo.query("input");
	
	if(dojo.isIE){
		inputs.forEach(function(input){
			input.focus();
		});
	}else{
		evt=document.createEvent('HTMLEvents');
		evt.initEvent('focus',false,false);
		inputs.forEach(function(input){
			input.dispatchEvent(evt);
		});
	}
}

function test_attr(){
	doh.register("属性测试",[
	
		//测试displayFormatter
		function test_displayFormatter(){
			var	startDate=unieap.byId('startDate'),
				endDate=unieap.byId('endDate'),
				startDateValue,startDateText,
				endDateValue,endDateText,
				date=new Date(),
				year=String(date.getFullYear()),
				month=String(date.getMonth()+1).padLeft(2,'0'),
				day=String(date.getDate());
			startDateValue=startDate.getValue();
			startDateText=startDate.getText();
			doh.is(year+month+day,startDateValue);
			doh.is(year+'/'+month+'/'+day,startDateText);
			
			endDateValue=endDate.getValue();
			endDateText=endDate.getText();
			doh.is(year+month+day,endDateValue);
			doh.is(year+'年'+month+'月'+day+'日',endDateText);
		}
	]);
}


function test_method(){
	
	doh.register("方法测试",[
	
		//setValue
		function test_setValue(){
			var	startDate=unieap.byId('startDate'),
				endDate=unieap.byId('endDate');
			endDate.setValue('20121212');
			startDate.setValue('20121212');
			doh.is('2012/12/12',startDate.getText());
			doh.is('20121212',startDate.getValue());
			doh.is('2012年12月12日',endDate.getText());
			doh.is('20121212',endDate.getValue());
			
		},
		
		//连个日期校验
		
		function test_validate(){
			var	startDate=unieap.byId('startDate'),
				endDate=unieap.byId('endDate');
			//后一个日期比前一个大
			startDate.setValue('20090909');
			endDate.setValue('20091010');
			
			//测试当 前一个日期值不变，后一个日期比前一个日期小
			doh.is('2009年10月10日',endDate.getText());
			endDate.setValue('20090908');
			doh.is('2009年09月09日',endDate.getText());
			
			//测试当 后一个日期值不变，前一个日期比后一个日期大
			startDate.setValue('20121212');
			doh.is('2009/09/09',startDate.getText());
		}
		
	]);
	
}


dojo.addOnLoad(function(){
	
	initDateTextBox();
	
	//在ie下有问题，需要延时一下
	setTimeout(function(){
		test_attr();
		test_method();
		doh.run();
		
	},1000);
	
});
