dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
});
var href = new unieap.ds.DataStore('test', [{
		CODENAME: 'http://www.baidu.com',
		CODEVALUE: 'http://www.baidu.com'
	}, {
		CODENAME: 'http://www.google.cn',
		CODEVALUE: 'http://www.google.cn'
	}, {
		CODENAME: 'http://www.neusoft.com',
		CODEVALUE: 'http://www.neusoft.com'
	}]);
	
dataCenter.addDataStore(href);
		
function onComChange(){
	var v = unieap.byId('com').getValue();
	var t = unieap.byId('com').getText();
	if (t) {
		unieap.byId("hrefTitlePane").setHref(t);
		var items = unieap.byId('com').getDataProvider().getItems();
		if (!dojo.some(items, function(item){
			return item.CODENAME == t;
		})) {
			items.push({
				CODENAME: t,
				CODEVALUE: t
			});
		}
	}
};
function setEvent(){
	alert("Alerting...");
};