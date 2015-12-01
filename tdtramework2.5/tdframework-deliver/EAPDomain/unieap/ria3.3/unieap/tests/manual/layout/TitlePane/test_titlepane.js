
if (typeof dataCenter == 'undefined') {
    dataCenter = new unieap.ds.DataCenter();
}

var test = new unieap.ds.DataStore('test', [{
    CODEVALUE: 'Google',
    CODENAME: 'http://www.google.com/',
    ico: '../images/google.ico'
}, {
    CODEVALUE: 'Baidu',
    CODENAME: 'http://www.baidu.com/',
    ico: '../images/baidu.bmp'
}, {
    CODEVALUE: 'Javaeye',
    CODENAME: 'http://www.javaeye.com/',
    ico: '../images/javaeye.JPG'
}, {
    CODEVALUE: 'Neusoft',
    CODENAME: 'http://www.neusoft.com/'
}]);

function createWidget(object){
    var t = new unieap.layout.TitlePane(dojo.mixin({
        id: 'titlepane',
        style: {
            height: '300px'
        }
    }, object));
    dojo.place(t.domNode, 'widgetBox', 'first');
	unieap.fireContainerResize();	
	return t;
}

function destroy(){
    var t = dijit.byId('titlepane');
    t && t.destroy();
}

function flexible(flexible){
    destroy();
    createWidget({
        title: 'flexible :' + flexible,
        'flexible': flexible
    });
};
function setTitle(title){
    destroy();
    createWidget({
        'title': title
    });
}

function setOpen(open){
    destroy();
    createWidget({
        'title': 'open :' + open,
        'open': open
    });
}

function setAnimate(animate){
    destroy();
    createWidget({
        'title': 'animate :' + animate,
        'animate': animate
    });
}

function setDuration(duration){
    destroy();
    createWidget({
        'title': 'duration :' + duration,
        'duration': duration,
		'animate':true
    });
}
function setButtons(){
	destroy();
	var inner="<div dojoType='unieap.layout.TitlePane' id='titlepane' style='height:300px' title='buttons'><div type='buttons'><button>你好</button></div></div>";
	var div=dojo.create('div',{innerHTML:inner});
	dojo.parser.parse(div);
	var t=dijit.byId('titlepane')
    dojo.place(t.domNode, 'widgetBox', 'first');
}

function setHref(href){
   	destroy();
    createWidget({
        'title': 'href :' + href,
        'href': href
    });
}

function setOnCollapse(){
 	destroy();
    createWidget({
        'onCollapse': function(){
			alert('onCollapse');
		}
    });	
}

function setOnExpand(){
	destroy();
    createWidget({
        'onExpand': function(){
			alert('onExpand');
		},
		'open':false
    });	
}
function setOnBeforeCollapse(){
	destroy();
    createWidget({
        'onBeforeCollapse': function(){
			alert('onBeforeCollapse');
		}
    });	
}
function setOnBeforeExpand(){
	destroy();
    createWidget({
        'onBeforeExpand': function(){
			alert('onBeforeExpand');
		},
		'open':false
    });	
}
function setIframe(){
    destroy();
    createWidget({
        'title': '获取Iframe的Window对象' ,
        'href': 'test_titlepane_resize.html'
    });
}
dataCenter.addDataStore(test);
