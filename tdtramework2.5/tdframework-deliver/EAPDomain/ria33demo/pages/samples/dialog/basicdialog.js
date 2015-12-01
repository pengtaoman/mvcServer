dojo.addOnLoad(function(){
dojo.parser.parse();
	dp.SyntaxHighlighter.HighlightAll('code');
});
var inner = "对话框显示的内容是预先定义，该对话框可以最大化和拖拽改变位置。"
		  
function showInner() {
	var dialog = new unieap.dialog.Dialog({inner:inner});
	dialog.show(document.getElementById("btn1")); 
}
		    
function showUrl() {
	var dialog = new unieap.dialog.Dialog({url:unieap.appPath + "/pages/samples/dialog/inner.jsp"});
	dialog.show(document.getElementById("btn2")); 
}
		    
function showDomNode(){
	var node= document.createElement('p');
	var browser = navigator.userAgent.toLowerCase();
	if(browser.indexOf("firefox") != -1){
		node.textContent="对话框显示的内容是一个domNode";
	}else{
		node.innerText="对话框显示的内容是一个domNode";
	}
	var dialog = new unieap.dialog.Dialog({inner:node});
	dialog.show(document.getElementById("btn3"));
}