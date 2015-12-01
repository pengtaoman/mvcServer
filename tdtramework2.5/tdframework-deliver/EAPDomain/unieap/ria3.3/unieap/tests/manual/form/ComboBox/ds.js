var test = new unieap.ds.DataStore('test', [{
	CODEVALUE: 11,
	CODENAME: '浙江',
	py:'zj'
}, {
	CODEVALUE: 12,
	CODENAME: '辽宁',
	py:'ln'
}, {
	CODEVALUE: 13,
	CODENAME: '福建',
	py:'fj'
}, {
	CODEVALUE: 14,
	CODENAME: '沈阳',
	py:'sy'
}, {
	CODEVALUE: 15,
	CODENAME: '北京',
	py:'bj'
}, {
	CODEVALUE: 16,
	CODENAME: '宁海',
	py:'nh'
}, {
	CODEVALUE: 17,
	CODENAME: '宁波',
	py:'nb'
}, {
	CODEVALUE: 18,
	CODENAME: '水车',
	py:'sc'
}, {
	CODEVALUE: 19,
	CODENAME: '上园',
	py:'sy'
}, {
	CODEVALUE: 20,
	CODENAME: '下园',
	py:'xy'
}]);

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
	CODEVALUE: 15,
	CODENAME: '大连',
	filter: 12
}, {
	CODEVALUE: 16,
	CODENAME: '金州',
	filter: 12
}]);

if (!dataCenter) {
	var dataCenter = new unieap.ds.DataCenter();
		dataCenter.addDataStore(test);
		dataCenter.addDataStore(c);
		dataCenter.addDataStore(p);
}
