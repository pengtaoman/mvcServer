
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
function bindData(node){
    var row = node.getTree().getBinding().getRow(node);
    unieap.byId('treeNodeForm').getBinding().bind(row)
}

function setTreeValue(value){
    var node = unieap.byId("formTree").getCurrentNode();
    unieap.byId("formTree").fireDataChange(node);
}
