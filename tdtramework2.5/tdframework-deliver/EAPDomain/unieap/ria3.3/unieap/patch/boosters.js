dojo.provide("unieap.patch.boosters");
(function(){
if(false === unieap.isBoosters ){
	return;
}
dojo.require("dijit._Widget");
var _WidgetConnect = dijit._Widget.prototype.connect;
var bindEvents = {};
var uiEvents = { //常用的监听事件定义
		'onmouseover' : 1,
		'onmouseout' : 1,
		'onmousemove' : 1,
		'onmousedown' : 1, 
		'onmouseup' : 1, 
		'onmove' : 1,
		'onclick' : 1, 
		'ondblclick' : 1, 
		'oncontextmenu' : 1,
		'onkeyup' : 1, 
		'onkeydown' : 1, 
		'onkeypress' : 1,
		'onfocus' : 1,
		'onblur' : 1,
		'onchange' : 1,
		'oncopy' : 1,
		'onpaste' : 1,
		'oncut' : 1
};
function attachEvents(node){
	var widgetId;
	while(node){
		if(node.getAttribute && (widgetId= node.getAttribute("widgetId"))){
			unieap.attachEvent(dijit.byId(widgetId));
		}
		node = node.parentNode;
	}
};
unieap.attachEvent = function(widget){
	var widgetId = widget.id;
	if(widgetId in bindEvents){
		var cEvents = bindEvents[widgetId]; 
		for(var i=0,event;event=cEvents[i];i++){
			if(event[1]=="onfocus"){ //connect导致原来的方法还起作用
				event[0].onfocus = null;
			}
			_WidgetConnect.apply(widget,event);
		}
		delete bindEvents[widgetId]; 
	}
}
dojo.addOnLoad(function(){
	dojo.connect(document.body,"onmouseover",function(evt){
		attachEvents(evt.target);
	});
});

//重载dijit的remove方法，及时删除widget事件定义
var _remove = dijit.registry.remove;
dijit.registry.remove = function(id){
	_remove.apply(dijit.registry,arguments);
	delete bindEvents[id]
};

//重载dijit.registry的add方法，在不同的上下文下，允许出现相同的id
var _add=dijit.registry.add;

dijit.registry.add=function(widget){
	//如果存在WIDGET_CONTEXT上下文，就修改widget控件的id属性
	widget.id = (widget._rootID||"") +widget.id;
	_add.apply(dijit.registry,arguments);
}


//mouseoverEventProxy
unieap.mep = function(target){
	var node = target;
	while(node){
		if(node.getAttribute && (widgetId= node.getAttribute("widgetId"))){
			target.onmouseover = null;
			if(!(widgetId in bindEvents)){
				return;
			}
			var cEvents = bindEvents[widgetId]; 
			for(var i=0,event;event=cEvents[i];i++){
				_WidgetConnect.apply(dijit.byId(widgetId),event);
			}
			delete bindEvents[widgetId]; 
			break;
		}
		node = node.parentNode;
	}
	if(document.createEventObject){
		target.fireEvent("onmouseover"); 
	} 
	else{
		var event = document.createEvent("MouseEvent"); 
		event.initMouseEvent("mouseover",true,false);
		target.dispatchEvent(event); 
	}
}
//focusEventProxy
unieap.fep = function(target){
	var node = target;
	while(node){
		if(node.getAttribute && (widgetId= node.getAttribute("widgetId"))){
			target.onfocus = null;
			if(!(widgetId in bindEvents)){
				return;
			}
			var cEvents = bindEvents[widgetId]; 
			for(var i=0,event;event=cEvents[i];i++){
				_WidgetConnect.apply(dijit.byId(widgetId),event);
			}
			delete bindEvents[widgetId]; 
			break;
		}
		node = node.parentNode;
	}
	if(document.createEventObject){
		target.fireEvent("onfocus"); 
	} 
	else{
		var event = document.createEvent("Event"); 
		event.initEvent("focus",true,false);
		target.dispatchEvent(event); 
	}
}
dojo.extend(dijit._Widget,{
	connect : function(obj,event,method,flag){
		if(false == flag || !(event in uiEvents)){
			_WidgetConnect.apply(this,arguments);
			return;
		}
		var cEvents = bindEvents[this.id] || (bindEvents[this.id] = []);
		cEvents.push([obj,event, method]);
	}
});


//overload parser class
dojo.parser = new function(){
	// summary: The Dom/Widget parsing package
	var d = dojo;
	this._attrName = d._scopeName + "Type";
	this._query = "[" + this._attrName + "]";
	function val2type(/*Object*/ value){
		// summary:
		//		Returns name of type of given value.
		if(d.isString(value)){ return "string"; }
		if(typeof value == "number"){ return "number"; }
		if(typeof value == "boolean"){ return "boolean"; }
		if(d.isFunction(value)){ return "function"; }
		if(d.isArray(value)){ return "array"; } // typeof [] == "object"
		if(value instanceof Date) { return "date"; } // assume timestamp
		if(value instanceof d._Url){ return "url"; }
		return "object";
	}

	function str2obj(/*String*/ value, /*String*/ type){
		// summary:
		//		Convert given string value to given type
		switch(type){
			case "string":
				return value;
			case "number":
				return value.length ? Number(value) : NaN;
			case "boolean":
				// for checked/disabled value might be "" or "checked".  interpret as true.
				return typeof value == "boolean" ? value : !(value.toLowerCase()=="false");
			case "function":
				if(d.isFunction(value)){
					// IE gives us a function, even when we say something like onClick="foo"
					// (in which case it gives us an invalid function "function(){ foo }"). 
					//  Therefore, convert to string
					value=value.toString();
					value=d.trim(value.substring(value.indexOf('{')+1, value.length-1));
				}
				try{
					if(value.search(/[^\w\.]+/i) != -1){
						// The user has specified some text for a function like "return x+5"
						return new Function(value);
					}else{
						// The user has specified the name of a function like "myOnClick"
						return d.getObject(value, false);
					}
				}catch(e){ return new Function(); }
			case "array":
				return value ? value.split(/\s*,\s*/) : [];
			case "date":
				switch(value){
					case "": return new Date("");	// the NaN of dates
					case "now": return new Date();	// current date
					default: return d.date.stamp.fromISOString(value);
				}
			case "url":
				return d.baseUrl + value;
			default:
				return d.fromJson(value);
		}
	}

	var instanceClasses = {
	};

	dojo.connect(dojo, "extend", function(){
		instanceClasses = {};
	});
	//获取组件类的定义
	function getClassInfo(/*String*/ className){
		if(!instanceClasses[className]){
			// get pointer to widget class
			var cls = d.getObject(className);
			if(!d.isFunction(cls)){
				throw new Error("Could not load class '" + className +
					"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?");
			}
			var proto = cls.prototype;
	
			// get table of parameter names & types
			var params = {};
			if(proto.UserInterfaces){
				params = proto.UserInterfaces;
			}
			else{
				var dummyClass = {};
				for(var name in proto){
					if(name.charAt(0)=="_"){ continue; } 	// skip internal properties
					if(name in dummyClass){ continue; }		// skip "constructor" and "toString"
					var defVal = proto[name];
					params[name]=val2type(defVal);
				}
			}
			instanceClasses[className] = { cls: cls, params: params };
		}
		return instanceClasses[className];
	}
	function getAnnotation(node){
		var previous = node.previousSibling;
		if(previous && previous.nodeName=="#comment"){
			var value = previous.nodeValue,
				result = value.match(/@parameters\(.*\)/ig);
			if(result!=null){
				return result[0].substring(12,result[0].length-1).split(",");
			}
		}
		return null;
	}
	this.instantiate = function(/* Array */nodes, /* Object? */mixin, /* Object? */args,/* function?*/callBack){
		var thelist = [], dp = dojo.parser,containerlist=[];
		mixin = mixin||{};
		args = args||{};
		for(var k=0,node;node=nodes[k];k++){
			if(!node){ return; }
			var type = dp._attrName in mixin?mixin[dp._attrName]:node.getAttribute(dp._attrName);
			if(!type || !type.length){ return; }
			var clsInfo = getClassInfo(type),
				clazz = clsInfo.cls;

			// read parameters (ie, attributes).
			// clsInfo.params lists expected params like {"checked": "boolean", "n": "number"}
			var params = {},
				attributes = node.attributes,
				parameters = clsInfo.params,
				annotation = getAnnotation(node);
				//使用注释方式告诉组件使用了哪些属性
			if(annotation!=null){
				for(var i=0,name;name=annotation[i];i++){
					var item = attributes.getNamedItem(name);
					if(item==null) continue;
					var value = item.value;
					switch(name){
						case "class":
							value = node.className;
							break;
						case "style":
							value = node.style && node.style.cssText; 
					}
					var _type = parameters[name];
					if(_type && typeof value == "string"){
						params[name] = str2obj(value, _type);
					}else{
						params[name] = value;
					}
				}
			}
			else{
				for(var name in parameters){
					var item = name in mixin?{value:mixin[name],specified:true}:attributes.getNamedItem(name);
					if(!item || (!item.specified && (!dojo.isIE || name.toLowerCase()!="value"))){ continue; }
					var value = item.value;
					// Deal with IE quirks for 'class' and 'style'
					switch(name){
					case "class":
						value = "className" in mixin?mixin.className:node.className;
						break;
					case "style":
						value = "style" in mixin?mixin.style:(node.style && node.style.cssText); // FIXME: Opera?
					}
					var _type = parameters[name];
					if(typeof value == "string"){
						params[name] = str2obj(value, _type);
					}else{
						params[name] = value;
					}
				}
			}
			if(args["xhrload"] == true){
				var root =  args["rootNode"];
				if(!root.id){
					root.id = dijit.getUniqueId("_rootID")+"_";
				}
				params['_rootID'] = root.id;
			}
			var markupFactory = clazz.markupFactory || clazz.prototype && clazz.prototype.markupFactory;
			// create the instance
			var instance = markupFactory ? markupFactory(params, node, clazz) : new clazz(params, node);
			thelist.push(instance);
			if(	!args.noStart && instance  && 
					instance.startup &&
					!instance._started && 
					(!instance.getParent || !instance.getParent())
				){
				containerlist.push(instance);
			}

			// map it to the JS namespace if that makes sense
			var jsname = node.getAttribute("jsId");
			if(jsname){
				d.setObject(jsname, instance);
			}
		};

		//在回调方法中将临时片段中的节点放回body,保证startup正常运行
		if(callBack){
			callBack();
		}
		
		// Call startup on each top level instance if it makes sense (as for
		// widgets).  Parent widgets will recursively call startup on their
		// (non-top level) children
		if(!mixin._started){
			for(var i=containerlist.length-1;i>=0;i--){
				var instance = containerlist[i];
				instance.startup();
			}
		}
		return thelist;
	};
	function queryNodes(attrName,rootNode){
		var list = [],
			 node = rootNode.firstChild;
		while(node){
			if(node.getAttribute){
				if(node.getAttribute(attrName)){
					list.push(node);
					if(node.getAttribute("postponeRender") == "true"){
						node = node.nextSibling;
						continue;
					}
				}
				var subList = queryNodes(attrName,node);
				if(subList.length>0){
					Array.prototype.push.apply(list,subList);
				}
			}
			node = node.nextSibling;
		}
		return list;
	}
	this.parse = function(/*DomNode?*/ rootNode, /* Object? */ args){
		var root ,node ,fragment;
		if(!args && rootNode && rootNode.rootNode){
			args = rootNode;
			root = args.rootNode;
		}else{
			root = rootNode;
		}
		if(args && args.currentDataCenter){
			currentDataCenter = args.currentDataCenter;
		}
		root = root || document.body;
		var list = queryNodes(this._attrName, root);
		if (11 != root.nodeType && !(dojo.isIE && dojo.isIE < 8)
				&& document.getElementsByTagName("OBJECT").length == 0) {
			// 如果nodeType类型不是documentFragment
			// 不是IE6 IE7
			// 没有object节点， flash在DocumentFragment中渲染会出现意想不到的问题
			fragment = document.createDocumentFragment();
			while (root.hasChildNodes()) {
				fragment.appendChild(root.firstChild);
			}
		}
		if(args&&args["xhrload"]){
			if(!args["rootNode"]){
				args["rootNode"] = root;
			}
		}
		// go build the object instances
		var result =  this.instantiate(list, null, args,function(){
			if(fragment!=null){
				root.appendChild(fragment);
			}
		});
		// Array
		currentDataCenter = null;
		return result;
	};
}();
})();
