
dojo.provide("unieap.util.Debug");
dojo.declare("unieap.util.Debug", null, {
	
	constructor : function(json,pNode,showFunction,name){
		if(dojo.isString(json)) {
			if(dojo.isString	(json=dojo.fromJson(json))){
				//非json格式数据
				json = {error:"非json格式数据"};
			}
		}
		this.showFunction = showFunction;
		//Json数据结构
		name = name || "Json数据结构";
		var domNode = this.createJsonTree("<b>"+name+"：</b>",json);
		if(pNode){
			pNode.appendChild(domNode);
		}		
	},
	createJsonTree : function(name,json){
		var domNode = document.createElement("DIV");
		domNode.className = "layer";
		var ul = document.createElement("UL");
		ul.className = "tree";
		this.render(name,json,ul);
		domNode.appendChild(ul);
		return domNode;
	},
	
	getType:function(object){
		var type=typeof(object);
		if(type=='object'&&object&&object.call&&object.apply){
			type="function"
		}
		return type;
	},
	/**
	 * 渲染json树方法
	 * 
	 * @param {string} name 节点名称
	 * @param {object} json json对象
	 * @param {object} ul 父节点Dom对象
 	 */
	render :  function(name,json,ul){ 
		if(this.getType(json)=="object"&&json){		
			var li = document.createElement("LI");
			
			if(!this._isEmpty(json)){
				var span = document.createElement("SAPN");
				span.className= "plus bullet"; //加号
				span.innerHTML = "&nbsp;";
				var _this = this;
				span.onclick = function(){
					if(this.load){
						if(this.className=="minus bullet"){
							this.className="plus bullet";
							this.parentNode.lastChild.style.display = "none";
						}
						else{
							this.className="minus bullet";
							this.parentNode.lastChild.style.display = "block";
						}
						return ;
					}
					var child = document.createElement("UL");
					li.appendChild(child);
					for(var i in json){
						_this.render(i,json[i],child);
					}
					this.load = true;
					this.className="minus bullet";
				}	
				li.appendChild(span)			
			}
			var span = document.createElement("SAPN");
			span.className= "basic object";
			
			if((json instanceof Array)||(json.constructor+"").indexOf("Array()")>0){
				span.className= "basic array"; 
			}
			span.innerHTML = "&nbsp;";
			li.appendChild(span);
			span = document.createElement("SAPN");
			span.className= "text"; 
			span.innerHTML = name;
			li.appendChild(span);
			ul.appendChild(li);
		}
		else{
			var className = "basic ",text = "";
			switch(this.getType(json)){
				case "string" :
					className+="string";
					text = "'"+ json +"'";
					break;
				case "number":
					className+="number";
					text =  json ;
					break;
				case "boolean" :
					className+="boolean";
					text =  json ;
					break;
				case "function" :
					className+="function";
					text = "Function";
					if(!this.showFunction){ return ;}
					break;
				default : 
					className+="null";
					text = "null";
					break;
			}
			text = "<span CONTENTEDITABLE>"+text+"</span>";
			var li = document.createElement("LI");
			var span = document.createElement("SAPN");
			span.className= className;		
			span.innerHTML = "&nbsp;";
			li.appendChild(span);
			span = document.createElement("SAPN");
			span.className= "text";
			span.innerHTML = name +":" +text;
			li.appendChild(span);
			ul.appendChild(li);
		}
	},
	_isEmpty : function(data){
		if(!data) return true;
		if(data instanceof Array){
			return data.length==0;
		}
		if(typeof(data) =="object"){
			for(var _t in data){
				return false;
			}
			return true;
		}
		return false;
	},
	search : function(name,json){
		var stack = [];
		this._search(name,json,stack);
		return stack;
	},
	_search : function(name,json,stack){
		if(json&&typeof(json)=="object"){
			if(json instanceof Array){
				for(var _t in json){
					this._search(name,json[_t],stack);
				}
			}
			else{
				for(var _t in json){
					if(_t==name){
						stack.push(json[_t]); 
					}
					this._search(name,json[_t],stack);
				}
			}
		}
	},
	getPartJsonTree : function(name,json){
		var domNode = document.createElement("DIV");
		domNode.className = "layer";
		var _r = this.search(name,json);
		for(var i in _r){
			var ul = document.createElement("UL");
			ul.className = "tree";
			this.render(name,_r[i],ul);
			domNode.appendChild(ul);
		}
		return domNode;
	}
});