
dojo.addOnLoad(function(){
    dojo.parser.parse();
    dp.SyntaxHighlighter.HighlightAll('code');
    dojo.isFF && unieap.byId('keyBtn').setLabel('点击按钮(alt+shift+s)');
    
});


function evt_click(){
    alert('按钮点击事件')
}

function evt_dropBtnClick(){
    alert('点击了带图片的下拉按钮')
}

function evt_dropBtnArrowClick(){
    alert('您点击了下拉箭头')
}
