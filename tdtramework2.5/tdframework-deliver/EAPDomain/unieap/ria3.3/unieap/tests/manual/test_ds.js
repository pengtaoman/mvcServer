dojo.require("unieap.ds");
dataCenter = new unieap.ds.DataCenter();
var region = new unieap.ds.DataStore('region_store', [{
    CODEVALUE: 11,
    CODENAME: '浙江'
}, {
    CODEVALUE: 12,
    CODENAME: '辽宁'
}, {
    CODEVALUE: 13,
    CODENAME: '福建'
}, {
    CODEVALUE: 14,
    CODENAME: '沈阳'
}, {
    CODEVALUE: 15,
    CODENAME: '北京'
}, {
    CODEVALUE: 16,
    CODENAME: '宁海'
}, {
    CODEVALUE: 17,
    CODENAME: '宁波'
}, {
    CODEVALUE: 18,
    CODENAME: '水车'
}, {
    CODEVALUE: 19,
    CODENAME: '上园'
}, {
    CODEVALUE: 20,
    CODENAME: '下园'
}]);

var province = new unieap.ds.DataStore('province_store', [{
    CODEVALUE: 11,
    CODENAME: '浙江'
}, {
    CODEVALUE: 12,
    CODENAME: '辽宁'
}]);

var city = new unieap.ds.DataStore('city_store', [{
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

var city1 = new unieap.ds.DataStore('city_store1', [{
    CODEVALUE: 1,
    CODENAME: '宁波'
}, {
    CODEVALUE: 2,
    CODENAME: '宁海'
}, {
    CODEVALUE: 3,
    CODENAME: '温州'
}]);

var city2 = new unieap.ds.DataStore('city_store2', [{
    CODEVALUE: 4,
    CODENAME: '沈阳'
}, {
    CODEVALUE: 15,
    CODENAME: '大连'
}, {
    CODEVALUE: 16,
    CODENAME: '金州'
}]);
var person = new unieap.ds.DataStore('person_store', [{
    id: '1',
    label: '人类',
    parent: '',
    leaf: false
}, {
    id: '11',
    label: '学生',
    parent: '1',
    leaf: false
}, {
    id: '111',
    label: '小学生',
    parent: '11',
	leaf:true
}, {
    id: '112',
    label: '中学生',
    parent: '11',
	leaf:true
}, {
    id: '113',
    label: '大学生',
    parent: '11',
	leaf:true
}, {
    id: '2',
    label: '动物',
    parent: '',
    leaf: false
},  {
    id: '21',
    label: '熊猫',
    parent: '2',
	leaf:true
}, {
    id: '22',
    label: '猩猩',
    parent: '2',
	leaf:true
},{
    id: '3',
    label: '植物',
    parent: '',
    leaf: true
}]);

var neusoft=new unieap.ds.DataStore('neusoft_store', [{
	id:'1',
	label:'基础软件',
	parent:'',
	leaf:false
},{
	id:'11',
	label:'Platform',
	parent:'1',
	leaf:true
},{
	id:'12',
	label:'Form',
	parent:'1',
	leaf:true
},{
	id:'13',
	label:'WorkFlow',
	parent:'1',
	leaf:true
},{
	id:'14',
	label:'Report',
	parent:'1',
	leaf:true
},{
	id:'15',
	label:'DataExchange',
	parent:'1',
	leaf:true
},{
	id:'2',
	label:'电力',
	parent:'',
	leaf:true
}
]);

dataCenter.addDataStore(region);
dataCenter.addDataStore(province);
dataCenter.addDataStore(city);
dataCenter.addDataStore(city1);
dataCenter.addDataStore(city2);
dataCenter.addDataStore(person);
dataCenter.addDataStore(neusoft);

