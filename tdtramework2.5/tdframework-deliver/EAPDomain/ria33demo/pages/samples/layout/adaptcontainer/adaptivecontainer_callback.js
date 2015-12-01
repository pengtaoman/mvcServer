dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
});
			
function heightChange(){
		if(this.isHidden())
			return ;
		alert("回调事件");
}		