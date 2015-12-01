JSKit.element={
	ClassName : 'jsk.util.element',
	
	showhideCore : function(att,attarg,elems){
				elems=[].concat(elems);
				for (var i = 0; i < elems.length; i++) {

				  var element = $(elems[i]);
				  element.style[att] = attarg;
				}
		},
	
	hide: function() {
				var att='display' ,attarg='none';
				JSKit.element.showhideCore(att,attarg,arguments);
		  },
	hideb: function() {
				var att='visibility' ,attarg='hidden';
				JSKit.element.showhideCore(att,attarg,arguments);
		  },
	show: function() {
				var att='display' ,attarg='';
				JSKit.element.showhideCore(att,attarg,arguments);
		  },
	showb: function() {
				var att='visibility' ,attarg='';
				JSKit.element.showhideCore(att,attarg,arguments);
		  },



	toggle: function() {
				var att='display' ,attarg='';
				for (var i = 0; i < arguments.length; i++) {
				  var element = $(arguments[i]);
				  attarg=JSKit.element.visible(element) ? 'none' : '';
				  JSKit.element.showhideCore(att,attarg,element);
				}
		},

	toggleb: function() {
				var att='visibility' ,attarg='';
				for (var i = 0; i < arguments.length; i++) {
				  var element = $(arguments[i]);
				  attarg=JSKit.element.visibleb(element) ? 'hidden' : '';
				  JSKit.element.showhideCore(att,attarg,element);
				}
		},

	visible: function(elem) {
			return $(elem).style.display != 'none';
		},
	visibleb: function(elem) {
			return $(elem).style.visibility  != 'hidden';
		},
	
	flashElement: null,
	flashAction: function(){
				if (!JSKit.element.flashElement){ return ;	}
				JSKit.element.toggleb.apply(this,[].concat(JSKit.element.flashElement) );
		},
	flash: function(elements,ftimes,delay){
			JSKit.element.flashElement=elements;
			ftimes=ftimes?ftimes:2;
			delay=delay?delay:130;
			var timeout=0
			for (var i=0;i<ftimes;i++ ){
				timeout+=delay;
				window.setTimeout(JSKit.element.flashAction,timeout);
				timeout+=delay;
				window.setTimeout(JSKit.element.flashAction,timeout);
			}
			window.setTimeout(JSKit.element.flashOver,timeout+delay);

		},
	flashOver: function(){
			JSKit.element.flashElement=null;
		},
	scrollTo: function(elem , winObj) {
			if (!winObj){
				winObj = window;
			}
			elem = $(elem);
			var x = elem.x ? elem.x : elem.offsetLeft,
				y = elem.y ? elem.y : elem.offsetTop;
			winObj.scrollTo(x, y);
		  },
	jumpTo: function (elem){
		elem=$(elem);
		elem.focus();
	},
	getHeight: function(elem) {
			elem = $(elem);
			return elem.offsetHeight;
		  },

	getPosLeft:	function(elem) {
			elem = $(elem);
			var left = elem.offsetLeft;
			while((elem = elem.offsetParent) != null)	{
				left += elem.offsetLeft;
			}
			return left;
		},

	getPosTop: function (elem) {
			elem = $(elem);
			var pTop = elem.offsetTop;
			while((elem = elem.offsetParent) != null)	{
				pTop += elem.offsetTop;
			}
			return pTop;
		},

	addEvent: function (elem, evname, func) {
			elem = $(elem);
			elem.attachEvent(evname, func);
		},


	removeEvent: function (elem, evname, func) {
			elem = $(elem);
			elem.detachEvent( evname, func);
		},

	hasClass: function (elem, classname) {
			elem = $(elem);
			return elem && (elem.className.search('(^|\\s)' + classname + '(\\s|$)') != -1);
		},

	removeClass: function (elem,className) {
			elem = $(elem);
			if (!elem) return;
			elem.className = elem.className.replace(new RegExp('(^|\\s)'+className+'(\\s|$)'), RegExp.$1+RegExp.$2);
		},

	addClass: function (elem,className) {
			elem = $(elem);
			if (!elem || hasClass(elem, className)) return;
			if (elem.className) {
				elem.className += ' '+className;
			} else {
				elem.className = className;
			}
		},

	insertClass: function (elem,classname) {
			elem = $(elem);
			if (elem.className) {
				elem.className = classname+' '+elem.className;
			} else {
				elem.className = classname;
			}
		},

	getElementsWithClassName: function (elemTagname,className,parentEle) {
			if (!isValid(parentEle)){
				parentEle=document;
			}else{
				parentEle = $(parentEle);
			}
			var allElements = parentEle.getElementsByTagName(elemTagname);
			var elemColl = [];
			for (var i = 0; i< allElements.length; i++) {
				if (hasClass(allElements[i], className)) {
					elemColl[elemColl.length] = allElements[i];
				}
			}
			return elemColl;
		},

	stopEvent: function () {
			event.cancelBubble=true;
			event.returnValue=false;
			return false;
		},

	ignoreEvent: function (){
			event.returnValue=false;
			return false;
		},


	getSelectedValues : function(elem){
			var elementValues = []
			elem = $byName(elem);
			if (elem[0]==null) {return null;}
			var etype=elem[0].type.toLowerCase();
			if (etype=='select-multiple'){
				var optionlist = elem[0].options;
				for(var x = 0; x < optionlist.length ; x++) {
					if(optionlist[x].selected) {
						 elementValues.push(optionlist[x].value); 
					}
				}
			}else{
				for (var i=0;i<elem.length ;i++ ){
					etype==elem[i].type.toLowerCase();
					if ( (etype=="radio" || etype=="checkbox") && elem[i].checked==true){
						elementValues.push(elem[i].value);
					}
				}
			}
			return elementValues;
	
	},

	resizeParentFrame: function (winObj){
			if (!winObj){
				winObj=window;
			}
			var docObj=null;
			if (winObj.frameElement && winObj.frameElement.tagName.toLowerCase()=="iframe"){
				docObj=winObj.document;
				winObj.frameElement.style.height=docObj.body.scrollHeight+"px";
			};
		},

	resizeAllParentFrame: function (winObj){
			if (!winObj){
				winObj=window;
			}
			var docObj=null;
			while (isValid(winObj) && isValid(winObj.frameElement) && winObj.frameElement.tagName.toLowerCase()=="iframe"){
				docObj=winObj.document;
				winObj.frameElement.style.height=docObj.body.scrollHeight+"px";
				winObj=winObj.parent;
			};
		},

	enterJump: function(){
			var kcode=event.keyCode;
			if(kcode == 13){
				event.keyCode = 9;
			}
			return true;
		},

	enterJumpTo: function(id){
			var kcode=event.keyCode;
			if(kcode == 13){
				jumpTo(id);
			}
			return false;
		}


};


(function(){

if (!JSKit.initClass(JSKit.element)) return;

JSKit.completeClass(JSKit.element);

})();