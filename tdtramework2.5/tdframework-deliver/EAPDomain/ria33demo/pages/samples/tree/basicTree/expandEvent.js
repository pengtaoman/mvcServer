
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
function testBeforeExpand(node){
    var label = node.getLabel();
    if (label == "数据结构") {
        alert("onBeforeExpand : " + node.getLabel() + "。返回false，阻止展开");
        return false;
    }
    else {
        alert("onBeforeExpand : " + node.getLabel());
        return true;
    }
    
}

function testAfterExpand(node){
    alert("onAfterExpand : " + node.getLabel());
}

function testBeforeCollapse(node){
    var label = node.getLabel();
    if (label == "表单构件") {
        alert("onBeforeCollapse : " + node.getLabel() + "。返回false，阻止收起");
        return false;
    }
    else {
        alert("onBeforeCollapse : " + node.getLabel());
        return true;
    }
}

function testAfterCollapse(node){
    alert("onAfterCollapse : " + node.getLabel());
}
