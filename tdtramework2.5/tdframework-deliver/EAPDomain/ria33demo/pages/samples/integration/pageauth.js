
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
var store = new unieap.ds.DataStore("empDataStore");
store.setRowSetName("emp");
store.addStatistic("attr_sal", "sum");
store.addStatistic("attr_sal", "avg");
store.addStatistic("attr_sal", "min");
store.addStatistic("attr_sal", "max");
unieap.Action.doQuery(store);
store = dataCenter.getDataStore("empDataStore");
var ds = new unieap.ds.DataStore('demo', [{
    name: '张三',
    age: 20,
    sex: '男'
}, {
    name: '李四',
    age: 18,
    sex: '女'
}]);
dataCenter.addDataStore(ds);

var noScene = {
    'empno': 'disabled',
    'ename': 'writely'
};
var haveScene = {
    'a': {
        'hiredate': 'disabled',
        'deptno': 'disabled',
        'salary': 'hidden',
        'job': 'hidden',
        'name': 'disabled',
        'age': 'hidden'
    },
    'b': {}
}

function fn_noScene(){
    window['unieap.pageAuthList'] = noScene;
    unieap.setPageAuthority();
    animate(' 编号文本框被禁用，姓名文本框可编辑');
}

function fn_scene(){
    window['unieap.pageAuthList'] = haveScene;
    unieap.setPageAuthority('a');
    animate('日期和部门的文本框被禁用,工资和职务的文本框被隐藏了,grid控件的年龄列被隐藏了,姓名列不可编辑');
}

function fn_reset(){
    window['unieap.pageAuthList'] = haveScene;
    unieap.setPageAuthority('b');
    animate('还原到初始页面');
}

function animate(str){
    dojo.animateProperty({
        node: 'info',
        properties: {
            backgroundColor: {
                start: 'yellow',
                end: 'white'
            }
        },
        duration: 2000
    }).play();
    
    dojo.byId('info').innerHTML = str;
}
