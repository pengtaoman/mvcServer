var ds1=new unieap.ds.DataStore('ds1',[
	{province:1,city:11},
	{province:2,city:12},
	{province:3,city:13}
]);
dataCenter.addDataStore(ds1);
			
var provinceDs=new unieap.ds.DataStore("province",[
	{CODEVALUE:1,CODENAME:'湖北'},
	{CODEVALUE:2,CODENAME:'辽宁'},
	{CODEVALUE:3,CODENAME:'吉林'}
]);
			
dataCenter.addDataStore(provinceDs);

var city1=new unieap.ds.DataStore("city1",[
	{CODEVALUE:11,CODENAME:'仙桃'},
	{CODEVALUE:12,CODENAME:'荆州'}
]);
dataCenter.addDataStore(city1);

var city2=new unieap.ds.DataStore('city2',[
	{CODEVALUE:11,CODENAME:'大连'},
	{CODEVALUE:12,CODENAME:'锦州'}
]);
var city3=new unieap.ds.DataStore('city3',[
	{CODEVALUE:11,CODENAME:'长春'},
	{CODEVALUE:12,CODENAME:'吉林'},
	{CODEVALUE:13,CODENAME:'四平'}
]);
dataCenter.addDataStore(city2);
dataCenter.addDataStore(city3);

function fn(value){
	if(value=="1"){
		return "city1";
	}else if(value=="2"){
		return "city2";
	}else if(value=="3"){
		return "city3";
	}
}



dojo.addOnLoad(function(){
	
	dp.SyntaxHighlighter.HighlightAll('code');
});