if(!window.unieap){
	unieap = {};
}
unieap.loader = new function(){
	
	//收集提交参数
	function getParameters(data){
		var params = [];
		for(var name in data){
			var param = name +"=";
			if(dojo.isFunction(data[name])){
				param += data[name]();
			}
			else{
				param += data[name];
			}
			params.push(param);
		}
		return params.join("&");
	}
	
	//是否强制加载，针对重复执行
	function enforceLoad(script){
		var url = script.src;
		if(script.getAttribute("load")=="enforce") return true;
		if(!/\/unieap\/ria/.test(url)) return true;
		return false;
	}
	
	//加载资源的标识容器
	var _loadedResources = null;
	
	//加载指定页面
	//	unieap.loader.load({
	//		data:{name:'',password:''},
	//		node: rootNode,
	//		url:'/test/a.html'
	//	})
	this.load = function(inData){
		if(!window.dojo){
			alert("miss dojo-lib, can not to load any page.");
			return;
		}
		dojo.require("unieap.util.util");
		//初始化header中link和script内容，添加到加载资源的标识容器里
		if(_loadedResources==null){
			_loadedResources = {};
			var head = document.getElementsByTagName("head")[0];
			var stylesheets = head.getElementsByTagName("link");  
			for(var i=0,stylesheet;stylesheet=stylesheets[i];i++){
				_loadedResources[stylesheet.href] = 1;
			}
			var scripts = head.getElementsByTagName("script");  
			for(var i=0,script;script=scripts[i];i++){
				if(script.src && !enforceLoad(script)){
					_loadedResources[script.src] = 1;
				}
			}
		}
		if(dojo.isString(inData)){
			inData = {url : inData};
		} 
		var url = inData.url,
			data = getParameters(inData.data || {}),
			node = (inData.node || document.body);
		//设置立马不执行addOnLoad操作	
		dojo._postLoad = false;
		unieap.showLoading(true);
		//发XHR请求获取页面内容
		dojo.xhrGet({
			url : url,
			sync : false,
			load : function(response){
				//判断超时等问题
				if(response.match(unieap.session.timeout)){
					var topWin = unieap.getTopWin();
					topWin.location.href = topWin.location.href;
					return ;
				}
				//先销毁原来节点下的内容（节点、事件绑定和对象声明）
				var widgets = dojo.query("[widgetId]",node).map(dijit.byNode);
				for(var i=widgets.length-1,widget;widget=widgets[i];i--){
					if(widget.destroy){
						widget.destroy();
					}
					else if(widget.id){
						dijit.registry.remove(widget.id);
					}
				}
				//设置节点的内容为空
				node.innerHTML = "";
				
				//创建临时文档流
				var fragment = document.createDocumentFragment();
				var div = document.createElement("div");
				fragment.appendChild(div);
				if(dojo.isIE<9){
					dojo.forEach(["header","fixed","row","cell","toolbar"],function(element){
						fragment.createElement(element);
					});
				}
				div.innerHTML = "div<div>"+response + "</div>";
				div = div.lastChild;
				div.insertBefore(document.createTextNode(""), div.firstChild);
				
				//开始处理样式文件
				var stylesheets = div.getElementsByTagName("link");
				//过滤掉重复的stylesheet引入，减少下载量
				for(var i=stylesheets.length-1,stylesheet;i>=0;i--){
					stylesheet=stylesheets[i];
					var url = stylesheet.href ;
					if(url in _loadedResources){
							stylesheet.parentNode.removeChild(stylesheet);
					}
					else{
						_loadedResources[url] = 1;
					}
				}
				//添加script节点并滤去重复的脚本引用
				var scripts =[],
					scriptElements = div.getElementsByTagName("script"),
					head = document.getElementsByTagName("head")[0] || document.documentElement;
				for(var i = scriptElements.length-1,script;i>=0;i--){
					script = scriptElements[i];
					script.parentNode.removeChild(script);
					if(script.src){
						var src = script.getAttribute("src");
						if(!/^\//.test(src)){
							script.setAttribute("src",inData.url.substring(0,inData.url.lastIndexOf("/")+1)+src);
						}
						if(!(script.src in _loadedResources)){
							scripts.unshift(script);
							if(script.src && !enforceLoad(script)){
								_loadedResources[script.src] = 1;
							}
						}
					}
					else{
						scripts.unshift(script);
					}					
				}
				//把节点添加到文档片段中
				while(div.hasChildNodes()){
					fragment.appendChild(div.firstChild);
				}
				dojo.destroy(div.parentNode);
				(function(index){
					var script = scripts[index];
					
					if(null==script){
						try{
							//执行渲染
							dojo.parser.parse(fragment,{xhrload:true,rootNode:node});
							//添加到文档流里
							node.appendChild(fragment);
							//触动组件改变大小
							unieap.fireContainerResize(node);	
							//执行addOnLoad
							dojo._callLoaded();
							//执行用户的回调
							inData.load && inData.load();
						}catch(e){
							window.console && console.info(e.message);
						}
						unieap.showLoading(false);
						return;
					}
					var func = arguments.callee;
					var scriptElement = document.createElement("script");
					scriptElement.type = "text/javascript";
					var url = script.src;
					if(url){
						scriptElement.src = url;
						//异步串行加载脚本
						scriptElement.onload = scriptElement.onreadystatechange = function(){ 
							if (!this.readyState || 
								this.readyState === "loaded" || 
								this.readyState === "complete" ) {
								scriptElement.onload = scriptElement.onreadystatechange = null;
								scriptElement.parentNode.removeChild(scriptElement);
								func(index + 1);
							}
						}
						unieap.currentRootNode = node;
						head.appendChild(scriptElement);
						unieap.currentRootNode = null;
					}
					else{
						var data = script.text || script.textContent || script.innerHTML || "";
						scriptElement.text = data;
						unieap.currentRootNode = node;
						head.appendChild(scriptElement);
						unieap.currentRootNode = null;
						head.removeChild(scriptElement);
						func(index + 1);
					}
				})(0);
			}
		});
	}
}();
