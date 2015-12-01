//属性测试
var test_attr = {
    id: 'attribute',
    init: createWidget,
    test: [{
        summary: 'textarea的大小',
        title: "width height",
        fun: attr_size,
        args: [{
			width:'500px',
			height:'500px'
		}]
    },{
        summary: 'textarea的大小',
        title: "width height",
        fun: attr_size,
        args: [{
			width:'50px',
			height:'50px'
		}]
    }]
}
var test = [test_attr];



//////

function createWidget(arg){
    new unieap.form.Textarea(dojo.mixin({
        id: 'textarea'
    }, arg ||
    {})).placeAt('widget');
}

function getWidget(){
    return dijit.byId('textarea');
}

function destroyWidget(){
    getWidget().destroy();
    dojo.forEach(dijit.findWidgets(dojo.byId('widget')), function(w){
        w.destroy && w.destroy();
    })
    dojo.empty('widget');
}

/////////////////////////////属性测试////////////////////////////////////

function attr_size(size){
    destroyWidget();
	try{
		createWidget(size);
	}catch(e){
		return "出现BUG！应该显示width: "+size.width+"  height:"+size.height+"的Textarea";
	}
	return "width: "+size.width+"  height:"+size.height;
}


