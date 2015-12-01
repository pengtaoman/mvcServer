dojo.provide("unieap.tests.manual.form.TextBox.demo.DisplayClassDemo");
dojo.require("unieap.form.SimpleFormatter");
dojo.declare("unieap.tests.manual.form.TextBox.demo.DisplayClassDemo",unieap.form.SimpleFormatter,{
	
	
	//可选值为USA和CHN,USA表示美元,CHN表示人民币
	constructor:function(params){
		dojo.mixin(this,params);
	},
	
	dataFormat:'CHN',
	
	
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
			return value.replace(new RegExp(format),'');
		}
		return "";
		
	},
	
	_processDataFormat:function(dataFormat){
		var str="";
		switch(dataFormat){
			case 'CHN':
				return '人民币';break;
			case 'USA':
				return '美元';break;
			
		}
	}
})
