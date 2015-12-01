
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});


//人的信息datastore
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
    leaf: true
}, {
    id: '112',
    label: '中学生',
    parent: '11',
    leaf: true
}, {
    id: '113',
    label: '大学生',
    parent: '11',
    leaf: true
}, {
    id: '2',
    label: '动物',
    parent: '',
    leaf: false
}, {
    id: '21',
    label: '熊猫',
    parent: '2',
    leaf: true
}, {
    id: '22',
    label: '猩猩',
    parent: '2',
    leaf: true
}, {
    id: '3',
    label: '植物',
    parent: '',
    leaf: true
}]);

var neusoft = new unieap.ds.DataStore('neusoft_store', [{
    id: '1',
    label: '基础软件',
    parent: '',
    leaf: false
}, {
    id: '11',
    label: 'Platform',
    parent: '1',
    leaf: true
}, {
    id: '12',
    label: 'Form',
    parent: '1',
    leaf: true
}, {
    id: '13',
    label: 'WorkFlow',
    parent: '1',
    leaf: true
}, {
    id: '14',
    label: 'Report',
    parent: '1',
    leaf: true
}, {
    id: '15',
    label: 'DataExchange',
    parent: '1',
    leaf: true
}, {
    id: '2',
    label: '电力',
    parent: '',
    leaf: true
}]);

dataCenter.addDataStore(person);
dataCenter.addDataStore(neusoft);

//懒加载
var lazy_data = [{
    id: '1001',
    label: "01",
    parentID: '',
    leaf: false
}, {
    id: '1002',
    label: "02",
    parentID: '',
    leaf: false
}, {
    id: '1006',
    label: "03",
    parentID: '',
    leaf: false
}, {
    id: '1007',
    label: "04",
    parentID: '',
    leaf: true
}];
var lazyStore = new unieap.ds.DataStore("lazyStore", lazy_data);
dataCenter.addDataStore(lazyStore);


var form_ds = new unieap.ds.DataStore("form_ds", [{
    number: '10011',
    info: '01-01'
}]);
dataCenter.addDataStore(form_ds);

function changeStore(){
    unieap.byId('combobox_tree1').setTreeJson({
        label: '新的树',
        binding: {
            leaf: 'leaf',
            store: 'neusoft_store',
            query: {
                name: 'parent',
                relation: '=',
                value: '1'
            }
        }
    });
    unieap.byId('combobox_tree1').setValue('11');
}

function fn_setValue(){
    unieap.byId('combobox_tree').setValue("112");
    alert("控件中显示中学生");
}

function fn_getValue(){
    var value = unieap.byId('combobox_tree').getValue();
    alert("从下拉树取出的值为:" + value);
}

function fn_clear(){
    unieap.byId('combobox_tree1').clear();
}

function fn_clearTree(){
    unieap.byId('combobox_tree').clear();
}
