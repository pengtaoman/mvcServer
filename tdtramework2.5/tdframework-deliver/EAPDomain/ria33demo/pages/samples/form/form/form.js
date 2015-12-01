dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
    dojo.connect(document, "onkeydown", function(evt){
        if (evt.keyCode == dojo.keys.PAGE_DOWN) {
            var data = unieap.byId('form').getBinding().getRow().data;
            animate('要提交的数据为:' + dojo.toJson(data) + ",请查看是否和输入框中的数据一致");
        }
        
        if (evt.keyCode == dojo.keys.PAGE_UP) {
            unieap.byId('form').getHelper().apply();
            var data = unieap.byId('form').getBinding().getRow().data;
            animate('要提交的数据为:' + dojo.toJson(data) + ",请查看是否和输入框中的数据一致");
        }
    });
    //Form控件聚焦
    unieap.byId('empNo').focus();
});



var emp = new unieap.ds.DataStore('emp_store', [{
    emoloyeeNum: 1,
    departmentNum: 2,
    emoloyeeName: '张三',
    salary: 5000
}, {
    emoloyeeNum: 2,
    departmentNum: 4,
    emoloyeeName: '李四',
    salary: 3000
}]);

dataCenter.addDataStore(emp);

//清空表单
function form_clear(){
    unieap.byId("form").clear();
    animate("请查看控件的值是否清空了,注意清空后数据绑定依然存在");
}

//重置
function form_reset(){
    animate("如果控件的值发生了变化,点击该按钮会还原到控件的初始值")
    unieap.byId("form").reset();
}

//修改控件绑定的datastore
function changeDS(){
    emp.getRowSet().discardUpdate(); //如果先点击清空按钮，那么emp的数据就会改变，导致绑定的数据为空，所以可撤消更改
    var currentRow = unieap.byId('form').getBinding().getRow(), row;
    if (currentRow.getIndex() == 1) {
        row = emp.getRowSet().getRow(0);
    }
    else {
        row = emp.getRowSet().getRow(1);
    }
    unieap.byId("form").getBinding().bind(row);
    animate('请查看表单控件中的值是否发生了改变');
}

//对控件进行校验
function form_validate(){
    var boolean = unieap.byId('form').validate();
    if (boolean) {
        animate('恭喜您,校验全部通过!');
    }
    else {
        animate('如果控件的值不合法,会提示错误信息')
    }
}

//判断控件的值是否修改
function form_isModified(){
    var boolean = unieap.byId('form').isModified();
    if (boolean) {
        animate("控件的值被修改");
    }
    else {
        animate("控件的值没有发生变化");
    }
}

//清除更新标记
function form_resetUpdate(){
    unieap.byId('form').getBinding().getRow().getRowSet().resetUpdate();
}

//收集数据
function form_collectData(){
    var data = unieap.byId('form').getHelper().collectData();
    animate("该方法用来收集表单控件的值,返回一个对象")
    setTimeout(function(){
        unieap.debug(data)
    }, 1000);
}

//强制保存数据
function form_forceSave(){
    animate('所谓强制保存是指当用户编辑数据时(控件不失去焦点)就提交数据,如果不进行强制保存,保存的数据会有问题,可以把光标置于文本框中并修改数据,然后按下键盘上的PgDn和pgUp进行测试,pgUp会强制保存数据')
}

//高亮显示
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


