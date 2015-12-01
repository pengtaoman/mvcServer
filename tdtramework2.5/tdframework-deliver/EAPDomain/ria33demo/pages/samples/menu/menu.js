dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	unieap.byId('menu').bindDomNode(dojo.byId('btn1'));
});	
function fn_unbind(){
	unieap.byId('menu').unBindDomNode(dojo.byId('btn1'));
}
function fn_click(){
	alert("CHINA");
}