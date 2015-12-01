dojo.provide("unieap.tests.manual.grid.basic.demo.CustomDisplayFormatter");
dojo.require("unieap.form.SimpleFormatter");
dojo.declare("unieap.tests.manual.grid.basic.demo.CustomDisplayFormatter",unieap.form.SimpleFormatter,{

	constructor:function(params){
		dojo.mixin(this,params);
	},
	
	format:function(value,inRowIndex){
		console.info('CustomDisplayFormatter获得到的值为'+value+',rowIndex为:'+inRowIndex);
		return value;
	},
	
	parse:function(value){
		return value;
		
	}
	
})
