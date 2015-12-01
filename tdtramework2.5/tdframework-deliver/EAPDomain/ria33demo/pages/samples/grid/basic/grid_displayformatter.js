dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(20);
    unieap.Action.doQuery(store);
	    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});

var ds1=new unieap.ds.DataStore('ds1',[
	{province:1,city:11},
	{province:2,city:12}
]);
dataCenter.addDataStore(ds1);
			
var provinceDs=new unieap.ds.DataStore("province",[
	{CODEVALUE:1,CODENAME:'湖北'},
	{CODEVALUE:2,CODENAME:'辽宁'}
]);
			
dataCenter.addDataStore(provinceDs);

var city1=new unieap.ds.DataStore("city1",[
	{CODEVALUE:11,CODENAME:'仙桃'},
	{CODEVALUE:12,CODENAME:'荆州'}
])
dataCenter.addDataStore(city1);

var city2=new unieap.ds.DataStore('city2',[
	{CODEVALUE:11,CODENAME:'大连'},
	{CODEVALUE:12,CODENAME:'锦州'}
]);
dataCenter.addDataStore(city2);

function fn(value){
	if(value=="1"){
		return "city1";
	}else if(value=="2"){
		return "city2";
	}
}
