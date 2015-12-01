/**
 *页面程序查询、提交、重置按钮的快捷键
 *通常在body的onkeydown事件中调用这个函数
 *operType：页面操作类型，如果是查询操作传入query，如果是提交操作传入commit，如果是重置操作传入reset
 *methodName：页面某个操作需要执行的js函数的名称
 *webPath:web应用的根路径
 *例如：
 *		某个页面中查询按钮调用的js函数的名称为query()，那么在调用时写法是：onkeydown="nas_shortcut_key('query','query()',{root/create/path})"
 */
function nas_shortcut_key(operType,methodName,webPath){
	if (operType == 'query' && event.ctrlKey && event.keyCode == 74){  //查询快捷键 "ctrl+J"
		event.keyCode=0;
		eval(methodName);
		event.returnValue=false;
    }    	
	if (operType == 'commit' && event.ctrlKey && event.keyCode == 75){  //提交快捷键 "ctrl+K"
		event.keyCode=0;
		eval(methodName);
		event.returnValue=false;
    }  	
	if (operType == 'reset' && event.ctrlKey && event.keyCode == 71){  //重置快捷键 "ctrl+G"
		event.keyCode=0;
		eval(methodName);
		event.returnValue=false;
    }
    nas_global_shortcut(webPath);
}