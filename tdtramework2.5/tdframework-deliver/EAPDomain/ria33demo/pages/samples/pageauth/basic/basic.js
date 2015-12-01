dojo.addOnLoad(function(){
		dp.SyntaxHighlighter.HighlightAll('code'); 
	});
	var ds=new unieap.ds.DataStore('demo',[{
		name:'张三',
		age:20,
		sex:'男'
	},{
		name:'李四',
		age:18,
		sex:'女'
	}]);
	dataCenter.addDataStore(ds);
