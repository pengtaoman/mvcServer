
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
function testBeforeClick(node){
    var label = node.getLabel();
    if (label == "数据结构") {
        alert("onBeforeClick : " + node.getLabel() + "。返回false，阻止后续事件");
        return false;
    }
    else {
        alert("onBeforeClick : " + node.getLabel());
        return true;
    }
}

function testClick(node){
    alert("onClick : " + node.getLabel());
}

function testAfterClick(node){
    alert("onAfterClick : " + node.getLabel());
}
