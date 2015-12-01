var plugins = {
	"script" :{
		label : "脚本解析引擎",
		isInstalled : function() {
			var version = null;
			if (window.ScriptEngine) {
				version = ScriptEngineMajorVersion() + "."
						+ ScriptEngineMinorVersion();
			}
			return (version != null) && (parseFloat(version) >=5.6)
		},
		getInstallPath : function() {
			var url = unieap.WEB_APP_NAME + "/unieap/plugin/";
			url += "scripten.exe";
			return url;
		},
		getStatus : function(){
			if(navigator.appName.indexOf("Microsoft")>-1){
				if(!this.isInstalled()){
					return  "plugin-uninstalled";
				}
			}
			return  "plugin-installed";
		}
	},
	gears : {
		label : "客户端缓存插件",
		isInstalled : function() {
			var factory = null;
			// Firefox
			if (typeof GearsFactory != 'undefined') {
				factory = new GearsFactory();
			} else {
				// IE
				try {
					factory = new ActiveXObject('Gears.Factory');
					// privateSetGlobalObject is only required and supported on
					// WinCE.
					if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
						factory.privateSetGlobalObject(this);
					}
				} catch (e) {
					// Safari
					if ((typeof navigator.mimeTypes != 'undefined')
							&& navigator.mimeTypes["application/x-googlegears"]) {
						factory = document.createElement("object");
						factory.style.display = "none";
						factory.width = 0;
						factory.height = 0;
						factory.type = "application/x-googlegears";
						document.documentElement.appendChild(factory);
					}
				}
			}
			return factory != null;
		},
		getInstallPath : function() {
			var url = unieap.WEB_APP_NAME + "/unieap/plugin/";
			url+= "gears-win32-opt.msi";
			return url;
		},
		getStatus : function(){
			if(this.isInstalled()){
				return  "plugin-installed";
			}
			return "plugin-uninstalled";
		}
	}
}
function installPlugins(evt){
	var target = evt.srcElement || evt.target;
	var dlg = document.createElement("div");
	dlg.className = "plugin";
	window.setTimeout(function(){
		document.body.onclick = function(){
			document.body.onclick = null;
			document.body.removeChild(dlg);
	}},0);
	document.body.appendChild(dlg);
	var result = ["<table class=\"plugin-tab\" cellspacing=\"0\" cellpadding=\"0\">"];
	var i = 0;
	for(var name in plugins){
		result.push("<tr>");
		result.push("<td class=\"plugin-status\">");
		result.push("<div class=\"");
		result.push(plugins[name].getStatus());
		result.push("\"></div>");
		result.push("</td>");
		result.push("<td align=\"left\" class=\"plugin-label\" ");
		result.push("onclick=\"installPlugin(event,'");
		result.push(name)
		result.push("');\"");
		result.push("\">");
		result.push(plugins[name].label);
		result.push("</td>");
		result.push("</tr>");
	}
	result.push("</table>");
	dlg.innerHTML = result.join("");
	var rect = target.getBoundingClientRect();
	dlg.style.left = rect.left + "px";
	dlg.style.top = (rect.top+target.offsetHeight) + "px";
}
function installPlugin(evt,name){
	evt.cancelBubble  = true;
	var pluginForm = document.getElementById("pluginForm");
	if(!pluginForm){
		pluginForm = document.createElement("form");
		pluginForm.id = "pluginForm";
		pluginForm.method = "post";
		document.body.appendChild(pluginForm);
	}	
	pluginForm.action = plugins[name].getInstallPath();
	pluginForm.submit();
}
