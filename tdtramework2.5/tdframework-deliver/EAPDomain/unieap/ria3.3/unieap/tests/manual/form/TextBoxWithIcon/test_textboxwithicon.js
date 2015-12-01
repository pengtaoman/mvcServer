var test1 = {
    id: "attribute",
    title: '属性',
    init: test1init,
    test: [{
        title: "showicon",
        summary: "设置是否显示图标",
        fun: showIcon
    },{
		summary:'自定义TextBoxWithIcon内容',
		title:'点击设置',
		fun:attr_custom_popup
	}]
}
test = [];
test.push(test1);
function test1init(){
    var c = createWidget({
    })
    dojo.place(c.domNode, dojo.byId('attributeWidget'), 'first');
}

function testclear(id){
    dojo.forEach(dijit.findWidgets(dojo.byId(id)), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty(dojo.byId(id));
}

function createWidget(obj){
    return new unieap.form.TextBoxWithIcon(obj);
}

function showIcon(){
    testclear('attributeWidget');
    var c = createWidget({
        showIcon: false
    })
    dojo.place(c.domNode, dojo.byId('attributeWidget'), 'first');
    return '图标消失了!';
}

function attr_custom_popup(){
	testclear('attributeWidget');
	dojo.require("unieap.tests.manual.form.TextBoxWithIcon.demo.TextBoxWithIconDemo");
	var box=new unieap.tests.manual.form.TextBoxWithIcon.demo.TextBoxWithIconDemo();
	box.placeAt('attributeWidget');
	return "点击下拉按钮,下拉框弹出的是一个textarea控件"
}

////////////////////////////fun

var test2={
	id:'fun',
	title:'方法',
	init:test2init,
	test:[{
		title:'setIconClass',
		fun:setIconClass,
		summary:'设置图标的css样式'		
	}]
	
}
test.push(test2)
function test2init(){
  dojo.place(createWidget({
  	id:'funWidgetText'
  }).domNode, dojo.byId('funWidget'), 'first');
}

function setIconClass(){
    //testclear('funWidget');
    var c = dijit.byId('funWidgetText');
    c.setIconClass('myclass')
    return '图标变成了放大镜';
}

///////////////////////////event

var test3 = {
    id: "event",
    title: '事件',
    init: test3init,
    test: [{
        title: 'onIconClick',
        fun: setOnIconClick,
        summary: '点击图标事件'
    }]
}
test.push(test3);
function test3init(){
    var c = createWidget({
        id: 'eventWidgetCombo'
    })
    dojo.place(c.domNode, dojo.byId('eventWidget'), 'first');
}
function setOnIconClick(){
    testclear('eventWidget');
    var c = createWidget({
        id: 'eventWidgetCombo',
        onIconClick: function(){
            alert('oniconclick')
        }
    })
    dojo.place(c.domNode, dojo.byId('eventWidget'), 'first');
    return "点击图标 将弹出'oniconclick'"
}
