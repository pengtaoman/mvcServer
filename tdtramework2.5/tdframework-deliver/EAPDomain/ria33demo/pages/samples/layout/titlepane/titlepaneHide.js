
dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
});
var showOrNot = false;
function show(){
		if(showOrNot){
			unieap.byId("titlepane").hide();
			unieap.byId("toggleButton").setLabel("显示TitlePane");
			showOrNot=false;
		}else{
		unieap.byId("titlepane").show();
		unieap.byId("toggleButton").setLabel("隐藏TitlePane");
		showOrNot=true;
	}
}