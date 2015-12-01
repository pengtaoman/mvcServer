dojo.require("unieap.form.TextBox");

//属性测试
var test_attr = {
    id: 'attribute',
    init: createWidget,
    test: [{
        summary: '是否默认显示当前时间',
        title: "autoDate=true",
        fun: attr_autoDate,
        args: [true]
    }, {
        summary: '是否默认显示当前时间',
        title: "autoDate=false",
        fun: attr_autoDate,
        args: [false]
    }, {
        summary: '设置时间的范围',
        title: "range=1900-2111",
        fun: attr_range,
        args: [{
            min: 1900,
            max: 2111
        }]
    },{
        summary: '设置时间的范围',
        title: "range=1988-2188",
        fun: attr_range,
        args: [{
            min: 1988,
            max: 2188
        }]
    },{
        summary: '一周的第一天',
        title: 'firstDayOfWeek',
        fun: attr_firstDayOfWeek,
        args: [4]
    }, {
        summary: '是否显示时间区域,如图',
        title: 'showsTime',
        fun: attr_showsTime,
        args: [12]
    
    },{
        summary: '是否显示时间区域,如图',
        title: 'showsTime',
        fun: attr_showsTime,
        args: [24]
    
    }, {
        summary: '是否显示其它月份的日期',
        title: 'showsOtherMonths',
        fun: attr_showsOtherMonths,
        args: [false]
    
    }, {
        summary: '日期显示格式',
        title: 'dataFormat',
        fun: attr_dataFormat,
        args: ["dd-MM-yyyy"]
    },{
		summary:'日期比较功能',
		title:'preDate',
		fun:attr_preDate
	},{
		summary:'日期只读',
		title:'readOnly',
		fun:attr_readonly
	}]
}

//控件方法测试
var test_fn = {
    id: 'fn',
    test: [{
		summary:'设置时间',
		title:'setValue',
		fun:fun_setValue,
		args:[1123241021000]
	}]
}

//事件测试

var test_evt = {
    id: 'evt',
    test: []
}

var test = [test_attr, test_fn, test_evt];



//////

function createWidget(arg){
    new unieap.form.DateTextBox(dojo.mixin({
        id: 'datetextbox'
    }, arg ||
    {})).placeAt('widget');
}

function getWidget(){
    return dijit.byId('datetextbox');
}

function destroyWidget(){
    getWidget().destroy();
    dojo.forEach(dijit.findWidgets(dojo.byId('widget')), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty('widget');
}

/////////////////////////////属性测试////////////////////////////////////

function attr_autoDate(bool){
    destroyWidget();
    createWidget({
        autoDate: bool
    });
    if (bool) {
        return "点击文本框,显示当前时间"
    }
    return "点击文本框,不显示当前时间";
}

function attr_range(range){
    destroyWidget();
    createWidget({
        range: range
    });
    return "可编辑的时间范围为"+range.min+"-"+range.max;
}


function attr_firstDayOfWeek(fir){
    destroyWidget();
    createWidget({
        popup: {
            firstDayOfWeek: fir
        }
    });
    return "点击日期图标,弹出的日期框每周的第一天为'周四'<br><img src='4.png'>"
    
}

function attr_showsTime(num){
    destroyWidget();
    createWidget({
		displayFormatter:{dataFormat:'yyyy-MM-dd hh:mm:ss'},
        popup: {
            showsTime: num
        }
    });
    return "如图所示在弹出框中显示"+num+"小时制的时间编辑域<br><img src='"+num+".png'>"
}

function attr_dataFormat(format){
    destroyWidget();
    createWidget({
        displayFormatter: {
            dataFormat: format
        }
    });
	return "日期的显示格式为dd-MM-yyyy";
}

function attr_showsOtherMonths(bool){
    destroyWidget();
    createWidget({
        popup: {
            showsOtherMonths: bool
        }
    });
    return "如图所示在弹出框不显示其它月份的日期(默认为灰写的日期值)<br><img src='2.png'>"
}

function attr_preDate(){
	destroyWidget();
	 createWidget();
	  createWidget({
	  	id:'preDate',
        validator: {
            preDate: 'datetextbox',
			errorMsg:'结束日期必须大于初始日期'
        }
    });
	dojo.connect(dijit.byId('datetextbox'),'onBlur',function(){
		if (dijit.byId('preDate').getValue()!="") {
			dijit.byId('preDate').getValidator().validate();
		}
	})
	return "后一个日期必须晚于前一个日期";
}

function attr_readonly(){
	destroyWidget();
	    createWidget({
	        readOnly: true
	    });
	    return "点击文本框选定日期后,时间不可通过按数字键编辑";
}
////////////////////////////////方法测试//////////////////////////////////////
function fun_setValue(v){
    getWidget().setValue(v);
    return "日期框的显示值为 2005-08-05";
}

function fun_setLabel(l){
    getButton().setLabel(l);
    return "button的显示值为" + l;
}

function fun_setIconClass(c){
    getButton().setIconClass(c);
    return "button图标显示的为一蓝色图标";
}

/////////////////////////////////////事件测试/////////////////////////////////

//点击
function evt_onClick(){
    destroyButton();
    createButton({
        onClick: function(){
            alert('click me');
        }
    });
    
    return "点击button会出现click me"
}





