
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
	return t;
}

function destroy(){
    var t = unieap.byId('titlepane');
    t && t.destroy();
}

function flexible(flexible){
    destroy();
    createWidget({
        title: 'new titlepane',
        flexible: true,
		style:'background:#e6e6e6;height:200px'
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
        'duration': duration
    });
}
function setButtons(){
	destroy();
	var inner="<div dojoType='unieap.layout.TitlePane' id='titlepane' style='background:#e6e6e6;height:200px ' title='new button'><div type='buttons'><button>New Button</button></div></div>";
	var div=dojo.create('div',{innerHTML:inner});
	dojo.parser.parse(div);
	var t=unieap.byId('titlepane')
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
		'title': 'onCollapse',
		style:'background:#e6e6e6;height:200px',
        'onCollapse': function(){
			alert('onCollapse event');
		}
    });	
}

function setOnExpand(){
	destroy();
    createWidget({
		'title': 'onExpand',
		style:'background:#e6e6e6;height:200px',
        'onExpand': function(){
			alert('onExpand event');

			
		}
    });	
}
function setOnBeforeCollapse(){
	destroy();
    createWidget({
		'title': 'onBeforeCollapse',
		style:'background:#e6e6e6;height:200px',
        'onBeforeCollapse': function(){
			alert('onBeforeCollapse event');
		}
    });	
}
function setOnBeforeExpand(){
	destroy();
    createWidget({
		'title': 'onBeforeExpand',
		style:'background:#e6e6e6;height:200px',
        'onBeforeExpand': function(){
			alert('onBeforeExpand');
		}
    });	
}
dataCenter.addDataStore(test);
