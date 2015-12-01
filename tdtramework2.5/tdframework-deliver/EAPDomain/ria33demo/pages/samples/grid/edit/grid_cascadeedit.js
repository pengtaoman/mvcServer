dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
});
			
function initData(){
	var ds = {
		header: {code:0, message: {title: "null", detail: "null"}},
		body: {
		parameters: {},
		dataStores: {
		empDataStore: {
			metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
			pageSize:30,pageNumber:1,recordCount:30,dataSetName:"ria.empDataStore",name:"empDataStore",order:"",condition:"",   
			rowSet:[
			{attr_empno:"250",NAME:"杨作仲",master:1,married:1,attr_job:"项目经理",attr_hiredate:"1205917947270",attr_sal:"1080",attr_deptno:"10",attr_unitid:"0711281110",attr_province:"12",attr_city:"3",attr_jiguan:"1"},
			{attr_empno:"319",NAME:"赵斌",master:0,married:0,attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10",attr_unitid:"0711281110",attr_province:"12",attr_city:"1",attr_jiguan:"11"},
			{attr_empno:"216",NAME:"陈旭杰",master:0,married:0,attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110",attr_province:"11",attr_city:"2",attr_jiguan:"111"},
			{attr_empno:"100",NAME:"张卫滨",master:0,married:1,attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110",attr_province:"12",attr_city:"2",attr_jiguan:"112"},
			{attr_empno:"10000",NAME:"赵磊",master:0,married:0,attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110",attr_province:"11",attr_city:"1",attr_jiguan:"2"}]
		},
		DEPT:{
			pageSize:-1,pageNo:1,count:4,metaData:{name:{dataType:1}},rowSet:[{CODEVALUE:"10",CODENAME:"财务部"},{CODEVALUE:"20",CODENAME:"采购部"},{CODEVALUE:"30",CODENAME:"销售部"},{CODEVALUE:"40",CODENAME:"开发部"}]}
		}
}};
					
dataCenter = new unieap.ds.DataCenter(ds);
		var p = new unieap.ds.DataStore('p', [{
				CODEVALUE: 11,
				CODENAME: '浙江'
		}, {
				CODEVALUE: 12,
				CODENAME: '辽宁'
		}]);
		var c = new unieap.ds.DataStore('c', [{
				CODEVALUE: 1,
				CODENAME: '宁波',
				filter: 11
		}, {
				CODEVALUE: 2,
				CODENAME: '宁海',
				filter: 11
		}, {
				CODEVALUE: 3,
				CODENAME: '温州',
				filter: 11
		}, {
				CODEVALUE: 4,
				CODENAME: '沈阳',
				filter: 12
		}, {
				CODEVALUE: 5,
				CODENAME: '大连',
				filter: 12
		}, {
				CODEVALUE: 6,
				CODENAME: '金州',
				filter: 12
		}]);
var c1 = new unieap.ds.DataStore('c1', [
		{CODEVALUE: 1, CODENAME:'沈阳'},
		{CODEVALUE: 2, CODENAME:'大连'},
		{CODEVALUE: 3, CODENAME:'鞍山'}
]);
var c2 = new unieap.ds.DataStore('c2', [
		{CODEVALUE: 1, CODENAME:'宁波'},
		{CODEVALUE: 2, CODENAME:'宁海'},
		{CODEVALUE: 3, CODENAME:'温州'}
]);
dataCenter.addDataStore(c);
dataCenter.addDataStore(p);
dataCenter.addDataStore(c1);
dataCenter.addDataStore(c2);
					
var jiguan = new unieap.ds.DataStore('jiguan', [{
		id: '1',
		label: '辽宁',
		parent: '',
		leaf: false
	}, {
		id: '11',
		label: '大连',
		parent: '1',
		leaf: false
	}, {
		id: '111',
		label: '沙河口区',
		parent: '11',
		leaf:true
	}, {
		id: '112',
		label: '甘井子区',
		parent: '11',
		leaf:true
	}, {
		id: '113',
		label: '西岗区',
		parent: '11',
		leaf:true
	}, {
		id: '2',
		label: '吉林',
		parent: '',
		leaf: false
	},  {
		id: '21',
		label: '长春',
		parent: '2',
		leaf:true
	}, {
		id: '22',
		label: '四平',
		parent: '2',
		leaf:true
	},{
		id: '3',
		label: '江苏',
		parent: '',
		leaf: true
}]);
				
dataCenter.addDataStore(jiguan);
}
			
initData();		
			
function mybe(inRowIndex) {
	return true;
}
			
function getCascade(value) {
	if (value==11) {
		return "c2";
	} else if (value==12) {
		return "c1";
	}
	return null;
}
			
function doEdit() {
	var row = dojo.byId("rowInput").value;
	if (isNaN(row)) {
		alert("请输入数字");
		return
	} else {
		row = Number(row);
	}
	var cell = dojo.byId("cellInput").value;
	if (isNaN(cell)) {
		alert("请输入数字");
		return
	} else {
		cell = Number(cell);
	}
	unieap.byId('grid').getManager("EditManager").setEdit(row, cell);
}