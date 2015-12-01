var ab01ds = new unieap.ds.DataStore();

var todayValue=new Date().getTime();
var ab02ds= new unieap.ds.DataStore('ab02ds',[
	{AB02_AAE140:"11",AB02_AAB050:todayValue},
	{AB02_AAE140:"21",AB02_AAB050:todayValue},
	{AB02_AAE140:"31",AB02_AAB050:todayValue},
	{AB02_AAE140:"41",AB02_AAB050:todayValue},
	{AB02_AAE140:"51",AB02_AAB050:todayValue}
]);

var ae03ds = new unieap.ds.DataStore('ae03ds',[
	{AE03_AAE140:'类型1',AE03_AAA082:'账户类型1',AE03_BAE010:'银行类型1',AE03_BAB024:'建设银行',AE03_AAE009:'李默',AE03_AAE010:'12345'},
	{AE03_AAE140:'类型1',AE03_AAA082:'账户类型2',AE03_BAE010:'银行类型2',AE03_BAB024:'交通银行',AE03_AAE009:'王海',AE03_AAE010:'12300'},
	{AE03_AAE140:'类型1',AE03_AAA082:'账户类型5',AE03_BAE010:'银行类型1',AE03_BAB024:'交通银行',AE03_AAE009:'李明',AE03_AAE010:'12301'}
]);

var ae06ds = new unieap.ds.DataStore('BAE018',[
	{AE06_BAE018:'类型1',AE06_AAE004:'李默',AE06_AAE005:'84830000',AE06_BAE017:'1380000001',AE06_BAE009:'移动'},
	{AE06_BAE018:'类型2',AE06_AAE004:'陈风',AE06_AAE005:'84830001',AE06_BAE017:'1380000002',AE06_BAE009:'社保'},
	{AE06_BAE018:'类型4',AE06_AAE004:'张芳',AE06_AAE005:'84830002',AE06_BAE017:'1380000003',AE06_BAE009:'移动'}
]);

var xzType = new unieap.ds.DataStore('AAE140',[
	{CODEVALUE:'11',CODENAME:'11'},
	{CODEVALUE:'21',CODENAME:'21'},
	{CODEVALUE:'31',CODENAME:'31'},
	{CODEVALUE:'41',CODENAME:'41'},
	{CODEVALUE:'51',CODENAME:'51'}
]);

var comType = new unieap.ds.DataStore('comType',[
	{code:1,name:'国企'},
	{code:2,name:'民营'}
]);

var jingjiType = new unieap.ds.DataStore('jingji',[
	{code:1,name:'经济类型1'},
	{code:2,name:'经济类型2'},
	{code:3,name:'经济类型3'},
	{code:4,name:'经济类型4'}
]);
var lishu = new unieap.ds.DataStore('lishu',[
	{code:1,name:"类属关系1"},
	{code:2,name:"类属关系2"},
	{code:3,name:"类属关系3"},
	{code:4,name:"类属关系4"}
]);

var code = new unieap.ds.DataStore('code',[
	{code:1,name:'10001'},
	{code:2,name:'10002'},
	{code:3,name:'10003'},
	{code:4,name:'10004'}
]);

var area = new unieap.ds.DataStore('area',[
	{code:1,name:'地区1'},
	{code:2,name:'地区2'},
	{code:3,name:'地区3'}
]);

var kind = new unieap.ds.DataStore('kind',[
	{code:1,name:'执照种类1'},
	{code:2,name:'执照种类2'},
	{code:3,name:'执照种类3'},
	{code:4,name:'执照种类4'}
]);

var jigou = new unieap.ds.DataStore('jigou',[
	{code:1,name:'机构1'},
	{code:2,name:'机构2'},
	{code:3,name:'机构3'},
	{code:4,name:'机构4'},
	{code:5,name:'机构5'}
]);

dataCenter.addDataStore(comType);
dataCenter.addDataStore(jingjiType);
dataCenter.addDataStore(code);
dataCenter.addDataStore(area);
dataCenter.addDataStore(kind);
dataCenter.addDataStore(jigou);
dataCenter.addDataStore(lishu);
dataCenter.addDataStore(xzType);

