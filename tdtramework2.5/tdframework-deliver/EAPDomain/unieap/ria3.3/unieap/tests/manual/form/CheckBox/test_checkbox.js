
//属性测试
var test_attr = {
    id: 'attribute',
    init: createWidget,
    test: [{
        summary: 'checkbox的checkvalue',
        title: "checkedValue='c'",
        fun: attr_checkedValue,
        args: ['c']
    }, {
        summary: 'checkbox的uncheckvalue',
        title: "uncheckvalue='u'",
        fun: attr_uncheckedValue,
        args: ['u']
    }, {
        summary: 'checked选中状态',
        title: 'checked=true',
        fun: attr_checked,
        args: [true]
    }, {
        summary: 'checked选中状态',
        title: 'checked=false',
        fun: attr_checked,
        args: [false]
    }]
}

//控件方法测试
var test_fn = {
    id: 'fn',
    test: [{
        fun: fun_setChecked,
        title: 'setChecked(true)',
        summary: "选中或取消checkbox",
        args: [true]
    }, {
        fun: fun_setChecked,
        title: 'setChecked(false)',
        summary: "选中或取消checkbox",
        args: [false]
    }]
}

//事件测试

var test_evt = {
    id: 'evt',
    test: [{
        fun: evt_onChange,
        title: 'onchange',
        summary: 'onchange事件'
    }]
}

test = [test_attr, test_fn, test_evt];



//////

function createWidget(arg){
    new unieap.form.CheckBox(dojo.mixin({
        id: 'checkbox'
    }, arg ||
    {})).placeAt('widget');
}

function getWidget(){
    return dijit.byId('checkbox');
}

function destroyWidget(){
    getWidget().destroy();
    dojo.forEach(dijit.findWidgets(dojo.byId('widget')), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty('widget');
}

/////////////////////////////属性测试////////////////////////////////////

function attr_checkedValue(v){
    destroyWidget();
    createWidget({
        checkedValue: v
    });
    new unieap.form.Button({
        label: 'getCheckedValue',
        onClick: function(){
            alert(getWidget().getCheckedValue())
        }
    }).placeAt('widget');
    return "checkedValue为" + v;
}

function attr_uncheckedValue(v){
    destroyWidget();
    createWidget({
        uncheckedValue: v
    });
    new unieap.form.Button({
        label: 'getUncheckedValue',
        onClick: function(){
            alert(getWidget().getUncheckedValue())
        }
    }).placeAt('widget');
    return "uncheckedValue为" + v;
}

function attr_checked(bool){
    destroyWidget();
	
	if (dojo.isIE) {
		var box = new unieap.form.CheckBox({
			id: 'checkbox'
		});
		box.placeAt('widget')
		box.setChecked(bool);
	}else{
	    createWidget({
	        checked: bool
	    });
	}
    return "checkbox是否checked：" + bool;
}

////////////////////////////////方法测试//////////////////////////////////////

function fun_setChecked(bool){
    if (!getWidget()) {
        createWidget();
    }
    getWidget().setChecked(bool);
    return (bool ? '选中' : "取消") + "checkbox"
}

/////////////////////////////////////事件测试/////////////////////////////////

function evt_onChange(){
    destroyWidget();
    createWidget({
        onChange: function(){
            alert('change')
        }
    });
    return "选中或取消checkbox 会弹出'change'"
}




