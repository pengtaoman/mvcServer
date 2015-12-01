dojo.provide("unieap.tests.manual.form.TextBox.demo.EditClassDemo");
dojo.require("unieap.form.SimpleFormatter");
dojo.declare("unieap.tests.manual.form.TextBox.demo.EditClassDemo",unieap.form.SimpleFormatter,{
	
	
	//可选值为USA和CHN,USA表示$,CHN表示￥
	dataFormat:'CHN',
	
	
	constructor:function(params){
		dojo.mixin(this,params);
	},
	
	
	format:function(value){
		var format=this._processDataFormat(this.dataFormat);
		if(value){
			return format+value;
		}
		return "";
	},
	
	parse:function(value){
		var format=this._processDataFormat(this.dataFormat);
		if(value){
			var reg=null;
			if(format=='$'){
				reg=new RegExp("\\"+format); //$在正则表达式中是一个特殊字符
			}else{
				reg=new RegExp(format);
			}
			return value.replace(reg,'');
		}
		return "";
		
	},
	
	_processDataFormat:function(dataFormat){
		switch(dataFormat){
			case 'CHN':
				return '￥';break;
			case 'USA':
				return '$';break;
			
		}
	}
})
